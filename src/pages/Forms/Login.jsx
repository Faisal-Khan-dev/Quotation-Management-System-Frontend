import LoginForm from "./LoginForm";
import BeforeAfterSlider from "../../components/authComponent/BeforeAfter";
import { assets } from "../../assets/assets";

export default function Login() {
  return (
    
    <div className="min-h-screen flex flex-col-reverse lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16 lg:px-16 bg-white">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>

      <BeforeAfterSlider />
    </div>
  );
}
