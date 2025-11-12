import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Mail, Phone } from "lucide-react";
import AccountInfoItem from "./AccountInfoItem";
import EmailVerificationSection from "./EmailVerificationSection";

const AccountTab = ({ user, phoneNumber, otpField, onSendVerification }) => {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-xl shadow-gray-200/50">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-green-50">
          <CardTitle className="text-xl flex items-center gap-2">
            <Settings className="w-5 h-5 text-green-600" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <AccountInfoItem
            icon={Mail}
            label="Mobile Number"
            value={phoneNumber}
            bgColor="bg-gray-50"
            iconColor="bg-blue-100 text-blue-600"
          />

          <AccountInfoItem
            icon={Phone}
            label="Email Address"
            value={user?.email}
            bgColor="bg-green-50"
            iconColor="bg-green-100 text-green-600"
          >
            <EmailVerificationSection
              isVerified={user?.isVerified}
              otpField={otpField}
              onSendVerification={onSendVerification}
            />
          </AccountInfoItem>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountTab;