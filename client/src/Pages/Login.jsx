// import React, { useState } from "react";
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

const formSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const Login = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  // const [user, setUser] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 🔹 Fetch user info if already logged in
  // useEffect(() => {
  //   fetch(`${API_URL}/user-info`, { credentials: "include" })
  //     .then((res) => (res.ok ? res.json() : null))
  //     .then((data) => {
  //       if (data) {
  //         setUser(data);
  //         toast.success("Welcome back!", { description: data.name });
  //         navigate("/dashboard");
  //       }
  //     })
  //     .catch(() => {});
  // }, []);

  // 🔹 Handle normal email/password login
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Login Successful", { description: `Welcome ${result.name}` });
        localStorage.setItem("token", result.token);
        navigate("/dashboard");
      } else {
        toast.error("Login Failed", {
          description: result.message || "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Network Error", {
        description: "Unable to reach the server",
      });
    }
  };

  // 🔹 OAuth2 Google login
  const googleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };



  return (
    <Card className="w-full sm:max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent>
        {/* 🔹 Normal Email/Password Login */}
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input {...field} placeholder="you@example.com" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input {...field} type="password" placeholder="••••••••" />
                  <FieldDescription>Enter your account password.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        {/* 🔹 Divider */}
        <div className="my-6 text-center text-sm text-gray-500">or</div>

        {/* 🔹 Google & GitHub OAuth buttons */}
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
          <Button variant="secondary" onClick={() => navigate("/register")}>
            Register
          </Button>
          <Button type="submit" form="login-form">
            Login
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Login;
