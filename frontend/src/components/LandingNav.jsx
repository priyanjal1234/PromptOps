import { Terminal } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingNav = () => {
    const options = ["Examples","Features","How it Works","Benefits","Call to Action"]
    const navigate = useNavigate()
    return (
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="h-8 w-8 text-blue-500" />
              <span onClick={() => {
                navigate("/")
                window.scrollTo({top: 0 , behavior: "smooth"})
              }} className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                PromptOps
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <ul className="flex gap-8 cursor-pointer">
                {
                options.map((option,index) => (
                  <li className="hover:text-[#54B8F8]"><a href={`#${option.toLowerCase()}`}>{option}</a></li>
                ))
              }
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
};

export default LandingNav;
