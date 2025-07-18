import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Terminal,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import registerSchema from "../schemas/registerSchema";
import userService from "../services/User";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ onBack, onLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let {isLoggedin} = useSelector(state => state.user)

  useEffect(() => {
    if(isLoading) {
      return navigate("/onboarding")
    }
    else {
      return navigate("/register")
    }
  },[])


  function handleRegisterChange(e) {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();

    let result = registerSchema.safeParse(formData);

    if (!result.success) {
      setIsLoading(false);
      const fieldErrors = {};
      result.error.errors.forEach(function (err) {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});

      setIsLoading(true);

      try {
        await userService.createAccount(formData);
        setIsLoading(false);
        toast.success("Registration Successfull");
        dispatch(setLoggedin(true));
        navigate("/onboarding");
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
            <p className="text-slate-400">
              Join thousands of developers building with PromptOps
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleRegisterChange}
                    className={`w-full bg-slate-900 border ${
                      errors.name ? "border-red-500" : "border-slate-600"
                    } rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors`}
                    placeholder="John"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleRegisterChange}
                    className={`w-full bg-slate-900 border ${
                      errors.email ? "border-red-500" : "border-slate-600"
                    } rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleRegisterChange}
                    className={`w-full bg-slate-900 border ${
                      errors.password ? "border-red-500" : "border-slate-600"
                    } rounded-lg pl-10 pr-12 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 text-blue-600 bg-slate-900 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                  required
                />
                <label htmlFor="terms" className="text-sm text-slate-300">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Create Account
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link
                to={'/login'}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
