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
import userService from "../services/User";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";
import { Link, useNavigate } from "react-router-dom";
import loginSchema from "../schemas/loginSchema";

const Login = ({ onBack, onLogin }) => {
  const [formData, setFormData] = useState({
    
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
    if(isLoggedin) {
      return navigate("/onboarding")
    }
    else {
      return navigate("/login")
    }
  },[])

  function handleLoginChange(e) {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();

    let result = loginSchema.safeParse(formData);

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
        await userService.loginAccount(formData);
        setIsLoading(false);
        toast.success("Login Successfull");
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
            <h1 className="text-3xl font-bold mb-2">Login Your Account</h1>
            
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              

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
                    onChange={handleLoginChange}
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
                    onChange={handleLoginChange}
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

              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Logging you in...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Login
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link
                to={'/register'}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
