import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useDispatch, useSelector } from "react-redux";
import { updateVerification } from "../redux/authSlice";
import { toast } from "sonner";


export default function VerifyEmailSection() {
  const API_URL = import.meta.env.VITE_API_URL;
   const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // const[isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState("") // will store 6 digits

  const handleSubmitOtp = async () => {
    if (otp.length !== 6) {
      alert("Please enter all 6 digits of the OTP.")
      return
    }

    console.log("OTP entered:", otp)

    // Example: call backend API for verification
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp?email=${user.email}&otp=${otp}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ otp }),
      })
      const data = await res.json()

      console.log("Server response:", data)
      if (data.isVerified) {
        toast.success("Email verified successfully!")
        dispatch(updateVerification(true));
      } else {
        toast.error("Invalid OTP. Please try again.")
        alert("Invalid OTP. Please try again.")
      }
    } catch (err) {
      toast.error("Error verifying OTP. Please try again later.")
      console.error("Error verifying OTP:", err)
    }
  }

  return (
    <div className="mt-2">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Enter OTP
      </label>

      <InputOTP
        value={otp}
        onChange={(value) => setOtp(value)} // update OTP when user types
        maxLength={6}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <Button
        onClick={handleSubmitOtp}
        variant="outline"
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-medium h-10 px-4 rounded-lg shadow-md shadow-green-200"
      >
        Verify Email
      </Button>
    </div>
  )
}
