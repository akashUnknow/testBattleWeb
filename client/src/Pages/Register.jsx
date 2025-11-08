import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits.")
    .max(10, "Phone number must be 10 digits."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const Register = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });
const onSubmit = async (data) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json(); // Read once only

    if (response.ok) {
      toast.success("Registration Successful!", {
        description: "You can now log in.",
        position: "bottom-right",
      });
      navigate("/dashboard");
    } else {
      // ✅ Handle backend error messages gracefully
      toast.error("Registration Failed", {
        description:
          result.error || result.message || "Something went wrong!",
        position: "bottom-right",
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Network Error", {
      description: "Unable to connect to the server.",
      position: "bottom-right",
    });
  }
};


  return (
    <Card className="w-full sm:max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <Input {...field} placeholder="Full Name" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Phone */}
            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Phone Number</FieldLabel>
                  <Input {...field} placeholder="10-digit number" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
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
                  <Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <FieldDescription>
                    Must be at least 6 characters long.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => navigate("/login")}>
            Back to Login
          </Button>
          <Button type="submit" form="register-form">
            Register
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Register;
