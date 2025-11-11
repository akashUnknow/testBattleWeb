import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { toast } from "sonner";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUser = JSON.parse(localStorage.getItem("user"));


    if (localToken && localUser) {
      setUser(localUser);
      return; 
    }

    axios
      .get(`${API_URL}/user-info`, { withCredentials: true })
      .then((response) => {
        setUser(response.data);

        // ✅ Store in Redux
        dispatch(
          loginSuccess({
            user: {
              name: response.data.name,
              email: response.data.email,
              userId: response.data.userId,
            },
            token: "oauth-session",
          })
        );

        // ✅ Save locally for quick reloads
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", "oauth-session");

        toast.success(`Welcome ${response.data.name || "User"}!`);
      })
      .catch((error) => {
        console.error("❌ Error fetching Google user info:", error);
      });
  }, [dispatch, API_URL]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      {user ? (
        <div className="bg-gray-50 p-4 rounded shadow-md">
          <p>
            Name: <strong>{user.name}</strong>
          </p>
          <p>
            Email: <strong>{user.email}</strong>
          </p>
          {user.email_verified ? (
            <p className="text-green-600">✅ Email Verified</p>
          ) : (
            <p className="text-red-500">❌ Email Not Verified</p>
          )}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Dashboard;
