import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUser } from "../redux/authSlice";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { useEffect, useState } from "react";

// ✅ Validation schema for editable fields
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .max(15, "Phone number too long."),
});

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const API_URL = "http://localhost:8080"; // backend URL
  const user = useSelector((state) => state.auth.user);
  const userId = user?.userId;

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "", // only for display
      totalScore: 0,
      testsCompleted: 0,
      rank: 0,
    },
  });

  // ✅ Load email from Redux + fetch live data for stats
  useEffect(() => {
    if (!userId) return;

    form.reset({
      name: user?.name || "",
      phoneNumber: user?.phoneNumber?.toString() || "",
      email: user?.email || "",
      totalScore: user?.totalScore || 0,
      testsCompleted: user?.testsCompleted || 0,
      rank: user?.rank || 0,
    });

    // Optional: Fetch latest data from backend (if needed)
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/users/${userId}`);
        const data = res.data;

        // update only non-editable stats
        form.setValue("totalScore", data.totalScore || 0);
        form.setValue("testsCompleted", data.testsCompleted || 0);
        form.setValue("rank", data.rank || 0);
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // ✅ Update API call (only sends editable fields)
  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        phoneNumber: data.phoneNumber,
      };

      const response = await axios.put(`${API_URL}/api/users/${userId}`, payload);
      dispatch(updateUser({ ...user, ...response.data }));
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("Failed to update profile!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <Card className="w-full sm:max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Update Profile
        </CardTitle>
        <CardDescription className="text-center">
          Modify your personal details below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="update-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* 🔹 Email (from Redux only, not editable) */}
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </Field>
              )}
            />

            {/* 🔹 Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <Input {...field} placeholder="Enter your name" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* 🔹 Phone Number */}
            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Phone Number</FieldLabel>
                  <Input {...field} placeholder="+91XXXXXXXXXX" />
                  <FieldDescription>Enter your phone number.</FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* 🔹 Total Score */}
            <Controller
              name="totalScore"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Total Score</FieldLabel>
                  <Input {...field} disabled />
                </Field>
              )}
            />

            {/* 🔹 Tests Completed */}
            <Controller
              name="testsCompleted"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Tests Completed</FieldLabel>
                  <Input {...field} disabled />
                </Field>
              )}
            />

            {/* 🔹 Rank */}
            <Controller
              name="rank"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Rank</FieldLabel>
                  <Input {...field} disabled />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button variant="outline" type="submit" form="update-form">
          Update Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateProfile;
