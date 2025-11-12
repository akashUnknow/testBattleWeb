import { Button } from "@/components/ui/button";
// import VerifyEmailSection from "../component/VerifyEmailSection";
import VerifyEmailSection from "../VerifyEmailSection";

const EmailVerificationSection = ({ isVerified, otpField, onSendVerification }) => {
  if (isVerified) {
    return (
      <p className="text-sm text-green-600 font-medium mt-1">
        Verified ✔️
      </p>
    );
  }

  return (
    <div>
      <p className="text-sm text-red-600 font-medium mt-1">
        Not Verified ❌
      </p>
      {otpField ? (
        <div className="mt-2">
          <VerifyEmailSection />
        </div>
      ) : (
        <Button
          variant="outline"
          className="mt-2 bg-green-500 hover:bg-green-600 text-white font-medium h-10 px-4 rounded-lg shadow-md shadow-green-200"
          onClick={onSendVerification}
        >
          Send Verification Email
        </Button>
      )}
    </div>
  );
};

export default EmailVerificationSection;