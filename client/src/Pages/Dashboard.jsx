import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserInfo = async () => {
      // Check local storage first
      const localToken = localStorage.getItem("token");
      const localUser = JSON.parse(localStorage.getItem("user"));

      if (localToken && localUser && isAuthenticated) {
        setUser(localUser);
        setLoading(false);
        return;
      }

      // If not in local storage, try to fetch from backend (OAuth flow)
      try {
        const response = await axios.get(`${API_URL}/user-info`, {
          withCredentials: true,
        });

        const userData = response.data;
        setUser(userData);

        // ✅ Update Redux state to mark user as authenticated
        dispatch(
          loginSuccess({
            user: {
              name: userData.name,
              email: userData.email,
              userId: userData.userId,
              isVerified: userData.email_verified,
            },
            token: "oauth-session", // Mark as OAuth session
          })
        );

        // ✅ Save to localStorage for persistence
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", "oauth-session");

        toast.success(`Welcome ${userData.name || "User"}!`);
      } catch (error) {
        console.error("❌ Error fetching user info:", error);
        // If fetch fails, user is not authenticated
        // Don't show error toast here - let ProtectedRoute handle redirect
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [dispatch, API_URL, isAuthenticated]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-lg text-gray-600">Unable to load user information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

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
    </div>
  );
};

export default Dashboard;