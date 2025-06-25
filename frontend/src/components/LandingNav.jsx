import { Terminal } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const LandingNav = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              PromptOps
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to={"/login"}
              className="text-slate-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-slate-800"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
