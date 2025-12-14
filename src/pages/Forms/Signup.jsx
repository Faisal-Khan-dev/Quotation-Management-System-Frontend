import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm"
import BeforeAfterSlider from "../../components/authComponent/BeforeAfter";
import { assets } from "../../assets/assets";

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col-reverse  lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-13 lg:px-16 bg-white">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </div>

      <BeforeAfterSlider />
    </div>
  );
}
