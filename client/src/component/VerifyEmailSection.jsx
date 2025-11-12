import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useDispatch } from "react-redux";
import { updateVerification } from "../redux/authSlice";


export default function VerifyEmailSection() {
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
      const res = await fetch("http://localhost:8080/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      })
      const data = await res.json()
      console.log("Server response:", data)
      if (data.success) {
        dispatch(updateVerification(true));
      } else {
        alert("Invalid OTP. Please try again.")
      }
    } catch (err) {
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
