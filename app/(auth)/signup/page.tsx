import SignupForm from "@/components/auth/signup/signup-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Join Cartly today and revolutionize your shopping experience. Create an account to access personalized features, track your orders, and enjoy seamless shopping like never before.",
}

function SignupPage() {
  return (
    <SignupForm />
  )
}

export default SignupPage