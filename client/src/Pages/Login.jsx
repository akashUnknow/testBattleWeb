import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;
  const from = location.state?.from ;

  // 🔹 Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

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
              isVerified: result.isVerified,
            },
            token: result.token,
          })
        );

        localStorage.setItem("token", result.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ name: result.name, email: result.email, userId: result.userId })
        );

        navigate("/", { replace: true });

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

  // 🔹 OAuth2 Google login - Store redirect location
  const googleLogin = () => {
    // Store the intended destination before OAuth redirect
    sessionStorage.setItem('oauth_redirect', from);
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
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
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