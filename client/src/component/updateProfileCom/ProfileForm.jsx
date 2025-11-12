import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone } from "lucide-react";
import ProfileFormField from "./ProfileFormField";

const ProfileForm = ({ form, onSubmit }) => {
  return (
    <Card className="md:col-span-3 border-0 shadow-xl shadow-gray-200/50">
      <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-blue-50">
        <CardTitle className="text-xl flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          <ProfileFormField
            name="email"
            control={form.control}
            label="Email Address"
            icon={Mail}
            disabled
            helperText="Email cannot be changed"
          />

          <ProfileFormField
            name="name"
            control={form.control}
            label="Full Name"
            icon={User}
            disabled
          />

          <ProfileFormField
            name="phoneNumber"
            control={form.control}
            label="Phone Number"
            icon={Phone}
            placeholder="+91XXXXXXXXXX"
          />

          <Button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all duration-200"
          >
            Update Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;