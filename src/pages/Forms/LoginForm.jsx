import { useState } from "react";
import { Button } from "../../components/authComponent/UIButton";
import { Input } from "../../components/authComponent/Input";
import { Label } from "../../components/authComponent/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { base_url } from "../../services/config.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 const [loadingUser, setLoadingUser] = useState(false);
 const [loadingAdmin, setLoadingAdmin] = useState(false);
 const {login} = useAuthContext()

  const navigate = useNavigate()

  const handleLogin = async (e, role) => {
    e.preventDefault();

    if (role === "staff") setLoadingUser(true);
    else if(role === "admin") setLoadingAdmin(true);

    try {
      const url = `${base_url}/auth/login`;
      const res = await axios.post(url, { email, password, role });

      toast.success(`${role === "admin" ? "Admin" : "User"} logged in successfully!`);

      
      

      login(res.data.token)
      
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong!";
      alert(message);
    } finally {
      if (role === "staff") setLoadingUser(false);
      else if(role === "admin")setLoadingAdmin(false);
    }
  };


  return (
    <div className="w-full">
      <div className=" text-center">
        <h1 className="font-heading text-5xl mt-15 font-medium tracking-tight leading-tight text-foreground mb-3">
          Log in
        </h1>
        <p className="text-base font-normal leading-normal mb-8 text-gray-600">
          Enter your email and password to log in.
        </p>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-normal text-foreground relative bottom-2 font-medium"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="brownmartin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 bg-white text-foreground border-gray-300 focus:border-[#008CFF] focus:outline-none focus-visible:ring-0 rounded-lg"
            aria-label="Email address"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm  text-foreground relative bottom-2 font-medium"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 pr-12 bg-white text-foreground border border-gray-300 focus:border-[#008CFF] focus:outline-none focus-visible:ring-0 rounded-lg"
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" strokeWidth={2} />
              ) : (
                <EyeIcon className="w-5 h-5" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <a
            href="#"
            className="text-sm font-normal mt-[-10px] mb-3 text-[#008CFF] text-primary hover:text-secondary rounded px-1"
          >
            Forgot password?
          </a>
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            onClick={()=>navigate("/signup")}
            className="w-full h-10 text-[#F9F9F9] bg-primary bg-[#008CFF] hover:bg-secondary font-normal text-base rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer focus:ring-offset-2 shadow-md hover:shadow-lg"
          >
            Sign Up
          </Button>
          <Button
            type="submit"
            onClick={(e) => {
              handleLogin(e, "staff");
            }}
            disabled={loadingUser}
            className={`w-full cursor-pointer h-10 text-[#F9F9F9] bg-primary hover:bg-secondary font-normal text-base rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md hover:shadow-lg ${
              loadingUser
                ? "opacity-50 cursor-not-allowed hover:bg-primary"
                : "bg-[#008CFF]"
            }`}
          >
            Login as user
          </Button>
          <Button
            type="submit"
            onClick={(e) => {
              handleLogin(e, "admin");
            }}
            disabled={loadingAdmin}
            className={`w-full cursor-pointer h-10 text-[#F9F9F9] bg-primary hover:bg-secondary font-normal text-base rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md hover:shadow-lg ${
              loadingAdmin
                ? "opacity-50 cursor-not-allowed hover:bg-primary"
                : "bg-[#008CFF]"
            }`}
          >
            Log as admin
          </Button>
        </div>
      </form>
    </div>
  );
}
