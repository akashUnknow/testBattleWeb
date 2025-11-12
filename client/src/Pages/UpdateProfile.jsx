import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/authSlice";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  User,
  Award,
  FileText,
  Settings,
  Mail,
  Phone,
  Trophy,
  Target,
  Hash,
} from "lucide-react";
import VerifyEmailSection from "../component/VerifyEmailSection";


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .max(15, "Phone number too long."),
});

const UpdateProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;
  const user = useSelector((state) => state.auth.user);
  const userId = user?.userId;
  const [loading, setLoading] = useState(false);
  const [OtpField, setOtpField] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      totalScore: 0,
      testsCompleted: 0,
      rank: 0,
    },
  });
  // const handleSubmitOtp = async () => {
  //   // Implement OTP submission logic here
  // };

  const handleSendVerificationEmail = async () => {
    setOtpField(true);
    try {
      const response = await fetch(
        `${API_URL}/api/users/send-verification-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        }
      );
      
      if (response.ok) {
        alert("✅ Verification email sent! Please check your inbox.");
      } else {
        alert("❌ Failed to send verification email. Please try again later.");
      }
    } catch (error) {
      console.log("❌ Error sending verification email:", error);
      alert("❌ An error occurred. Please try again later.");
    }
  };

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

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/users/${userId}`);
        const data = await res.json();
        form.setValue("totalScore", data.totalScore || 0);
        form.setValue("testsCompleted", data.testsCompleted || 0);
        form.setValue("rank", data.rank || 0);
        form.setValue("phoneNumber", data.phoneNumber || "");
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        phoneNumber: data.phoneNumber,
      };

      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      dispatch(updateUser({ ...user, ...result }));
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("Failed to update profile!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "exams", label: "Your Exams", icon: FileText },
    { id: "account", label: "Account", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-2 md:p-2">
      <div className="max-w-5xl mx-auto">
        {/* Header with gradient */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-600">Manage your profile and preferences</p>
        </div>

        {/* Modern Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg shadow-blue-100/50 border border-gray-100 mb-4 p-2">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Section */}
        {activeTab === "profile" && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Card className="border-0 shadow-lg shadow-blue-100/50 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Trophy className="w-8 h-8 opacity-80" />
                    <span className="text-3xl font-bold">
                      {form.watch("totalScore")}
                    </span>
                  </div>
                  <p className="text-blue-100 font-medium">Total Score</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-indigo-100/50 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="w-8 h-8 opacity-80" />
                    <span className="text-3xl font-bold">
                      {form.watch("testsCompleted")}
                    </span>
                  </div>
                  <p className="text-indigo-100 font-medium">Tests Completed</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-purple-100/50 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Hash className="w-8 h-8 opacity-80" />
                    <span className="text-3xl font-bold">
                      {form.watch("rank")}
                    </span>
                  </div>
                  <p className="text-purple-100 font-medium">Your Rank</p>
                </CardContent>
              </Card>
            </div>

            {/* Profile Form */}
            <Card className="md:col-span-3 border-0 shadow-xl shadow-gray-200/50">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-blue-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Email */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      Email Address
                    </label>
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          disabled
                          className="bg-gray-50 border-gray-200 h-12 cursor-not-allowed"
                        />
                      )}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed
                    </p>
                  </div>

                  {/* Name */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      Full Name
                    </label>
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <div>
                          <Input
                            {...field}
                            disabled
                            className="border-gray-200 h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                          {fieldState.invalid && (
                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                              {fieldState.error?.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      Phone Number
                    </label>
                    <Controller
                      name="phoneNumber"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <div>
                          <Input
                            {...field}
                            placeholder="+91XXXXXXXXXX"
                            className="border-gray-200 h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                          {fieldState.invalid && (
                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                              {fieldState.error?.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>

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
          </div>
        )}

        {/* Exams Section */}
        {activeTab === "exams" && (
          <Card className="border-0 shadow-xl shadow-gray-200/50">
            <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-indigo-50">
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Your Exam Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Exam Stats Coming Soon
                </h3>
                <p className="text-gray-500">
                  Detailed analytics and performance metrics will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Account Section */}
        {activeTab === "account" && (
          <div className="space-y-6">
            <Card className="border-0 shadow-xl shadow-gray-200/50">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-green-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Settings className="w-5 h-5 text-green-600" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 mb-1">
                      Mobile Number{" "}
                    </p>
                    <p className="text-gray-900 font-medium">
                      {form.watch("phoneNumber")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 mb-1">
                      Email Address
                    </p>
                    <p className="text-gray-900 font-medium">{user?.email}</p>
                    {user?.isVerified ? (
                      <p className="text-sm text-green-600 font-medium mt-1">
                        Verified ✔️
                      </p>
                    ) : (
                      <div>
                        <p className="text-sm text-red-600 font-medium mt-1">
                          Not Verified ❌
                        </p>
                        {OtpField ? (
                          <div className="mt-2">
                            <VerifyEmailSection />
                      
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            className="mt-2 bg-green-500 hover:bg-green-600 text-white font-medium h-10 px-4 rounded-lg shadow-md shadow-green-200"
                            onClick={handleSendVerificationEmail}
                          >
                            Send Verification Email
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl shadow-red-100/50 border-red-100">
              <CardHeader className="border-b bg-gradient-to-r from-red-50 to-orange-50">
                <CardTitle className="text-xl text-red-600">
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Delete Account
                    </h4>
                    <p className="text-sm text-gray-600">
                      Permanently delete your account and all associated data.
                      This action cannot be undone.
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 flex-shrink-0"
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
