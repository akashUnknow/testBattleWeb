import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginFailure,
  loginSuccess,
} from "../redux/authSlice";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const Login = () => {
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // 🔹 Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 🔹 Normal login
  const onSubmit = async (data) => {
    dispatch(loginStart());
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Login Successful", {
          description: `Welcome ${result.name || result.email}`,
        });

        dispatch(
          loginSuccess({
            user: {
              name: result.name || "User",
              email: result.email,
              userId: result.userId,
            },
            token: result.token,
          })
        );

        localStorage.setItem("token", result.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ name: result.name, email: result.email ,userId: result.userId})
        );

        navigate("/dashboard");
      } else {
        toast.error("Login Failed", {
          description: result.error || result.message || "Invalid credentials",
        });
        dispatch(
          loginFailure(result.error || result.message || "Invalid credentials")
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Network Error", {
        description: "Unable to reach the server",
      });
      dispatch(loginFailure("Network Error: Unable to reach the server"));
    }
  };

  // 🔹 OAuth2 Google login
  const googleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };

  return (
    <Card className="w-full sm:max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Login
        </CardTitle>
        <CardDescription className="text-center">
          Sign in to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* 🔹 Email & Password Login Form */}
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input {...field} placeholder="you@example.com" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input {...field} type="password" placeholder="••••••••" />
                  <FieldDescription>
                    Enter your account password.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        {/* 🔹 Divider */}
        <div className="my-6 text-center text-sm text-gray-500">or</div>

        {/* 🔹 Google OAuth */}
        <div className="flex flex-col gap-3">
          <Button variant="outline" onClick={googleLogin}>
            Continue with Google
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>

          <Button type="submit" form="login-form" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </CardFooter>

      {/* 🔹 Show error toast */}
      {error && (
        <p className="text-center text-red-500 text-sm pb-4">{error}</p>
      )}
    </Card>
  );
};

export default Login;
