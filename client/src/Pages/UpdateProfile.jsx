import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/authSlice";
import { useState } from "react";
import { User, FileText, Settings, TableRowsSplit } from "lucide-react";
import { useProfileForm } from "../component/updateProfileCom/useProfileForm";
import LoadingSpinner from "../component/updateProfileCom/LoadingSpinner";
import TabNavigation from "../component/updateProfileCom/TabNavigation";
import ProfileTab from "../component/updateProfileCom/ProfileTab";
import ExamsTab from "../component/updateProfileCom/ExamsTab";
import AccountTab from "../component/updateProfileCom/AccountTab";
import { toast } from "sonner";

const UpdateProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [otpField, setOtpField] = useState(null);

  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;
  const user = useSelector((state) => state.auth.user);
  const userId = user?.userId;

  const form = useProfileForm(user, userId, API_URL, setLoading);

  const handleSendVerificationEmail = async () => {
    setOtpField(true);
    try {
      const response = await fetch(
        `${API_URL}/api/auth/send-otp?email=${user.email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        toast.success("Verification email sent! Please check your inbox.");
        // alert("✅ Verification email sent! Please check your inbox.");
      } else {
        toast.error("Failed to send verification email. Please try again later.");
        // alert("❌ Failed to send verification email. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.log("❌ Error sending verification email:", error);
      // alert("❌ An error occurred. Please try again later.");
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        phoneNumber: data.phoneNumber,
      };
      // console.log("Submitt'ing profile update with payload:", payload);
      // console.log("User ID:", userId);

      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      // console.log("Profile update response:", result);

      if (response.ok) {
        dispatch(updateUser({ ...user, ...result }));
        toast.success("Profile updated successfully");
        // console.log("✅ Profile updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("❌ Error updating profile:", error);
      alert("Failed to update profile!");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "exams", label: "Your Exams", icon: FileText },
    { id: "account", label: "Account", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-2 md:p-2">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-600">Manage your profile and preferences</p>
        </div>

        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "profile" && (
          <ProfileTab form={form} onSubmit={onSubmit} />
        )}

        {activeTab === "exams" && <ExamsTab />}

        {activeTab === "account" && (
          <AccountTab
            user={user}
            phoneNumber={form.watch("phoneNumber")}
            otpField={otpField}
            onSendVerification={handleSendVerificationEmail}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
