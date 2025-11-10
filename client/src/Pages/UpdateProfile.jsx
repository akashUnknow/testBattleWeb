import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUser } from "../redux/authSlice";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
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
const formSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  name: z.string().min(2, "Name must be at least 2 characters."),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits."),
  isVerified: z.boolean(),
});

const UpdateProfile = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      isVerified: false,
    },
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log("Updating profile with data:", data);
  };

  return (
    <Card className="w-full sm:max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Update Profile
        </CardTitle>
        <CardDescription className="text-center">
          update your profile information below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* 🔹 Email & Password Login Form */}
        <form id="update-form" onSubmit={form.handleSubmit(onSubmit)}>
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
            {/* phoneNumber */}
            <Controller
              name="PhoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input {...field} type="tel" placeholder="+91" />
                  <FieldDescription>Enter Phone Number.</FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* name */}
            <Controller
              name="Name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input {...field} type="text" placeholder="AKAHS" />
                  <FieldDescription>Enter your Name.</FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* isVerified */}

            <Controller
              name="isVerified"
              control={form.control}
              render={({ field }) => (
                <div className="flex items-center gap-3 mt-3">
                  <label className="font-medium text-sm">Is Verified:</label>
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className={`px-3 py-1 rounded-md text-white text-sm font-semibold ${
                      field.value ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {field.value ? "True" : "False"}
                  </button>
                </div>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>

        <Button variant="primary" type="submit" form="update-form">
          Update Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateProfile;
