import { use, useState } from "react";
import { Button } from "../../components/authComponent/UIButton";
import { Input } from "../../components/authComponent/Input";
import { Label } from "../../components/authComponent/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";
import {base_url} from '../../services/config.js'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true);
      try {
         
        const url = `${base_url}/auth/register-company`;
      const res = await axios.post(url, {
        name,
        companyName,
        email,
        password,
        confirmPassword,
      });
       
          
        if (res.status == 201) {
          toast.success("Admin signup successfully!")
          setCompanyName("")
          setEmail("")
          setConfirmPassword("")
          setName("")
          setPassword("")
          navigate('/')
        }

        
     } catch (error) {
      const message = error.response?.data?.message || "Something went wrong!";
      alert(message);
          
      } finally {
          setLoading(false)
     }
  };

  return (
    <div className="w-full">
      <div className=" text-center">
        <h1 className="font-heading text-5xl font-medium tracking-tight leading-tight text-foreground">
          Sign Up
        </h1>
        <p className="text-base font-normal leading-normal mt-1 mb-5 text-gray-600">
          Enter your email and password to Sign Up.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <Label
            htmlFor="name"
            className="text-sm font-normal text-foreground relative bottom-2 font-medium"
          >
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Write here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-11 bg-white text-foreground border-gray-300 focus:border-[#008CFF] focus:outline-none focus-visible:ring-0 rounded-lg"
            aria-label="Email address"
          />
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="company name"
            className="text-sm font-normal text-foreground relative bottom-2 font-medium"
          >
            Company Name
          </Label>
          <Input
            id="companyName"
            type="text"
            placeholder="Yuor Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="h-11 bg-white text-foreground border-gray-300 focus:border-[#008CFF] focus:outline-none focus-visible:ring-0 rounded-lg"
            aria-label="Email address"
          />
        </div>
        <div className="space-y-1">
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
            className="h-11 bg-white text-foreground border-gray-300 focus:border-[#008CFF] focus:outline-none focus-visible:ring-0 rounded-lg"
            aria-label="Email address"
          />
        </div>

        <div className="space-y-1">
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
              className="h-11 pr-12 bg-white text-foreground border border-gray-300 focus:border-[#008CFF] focus:outline-none focus-visible:ring-0 rounded-lg"
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
        <div className="space-y-1">
          <Label
            htmlFor="confirm password"
            className="text-sm  text-foreground relative bottom-2 font-medium"
          >
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="h-11 pr-12 bg-white text-foreground border border-gray-300 focus:border-[#008CFF] focus:outline-none focus-visible:ring-0 rounded-lg"
              aria-label="confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="w-5 h-5" strokeWidth={2} />
              ) : (
                <EyeIcon className="w-5 h-5" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <Button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer h-10 text-[#F9F9F9] bg-primary hover:bg-secondary font-normal text-base rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md hover:shadow-lg ${loading ? "opacity-50 cursor-not-allowed hover:bg-primary" : "bg-[#008CFF]"}`}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

