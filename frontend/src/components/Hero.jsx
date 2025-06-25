import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  let navigate = useNavigate();
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Infrastructure
          </span>
          <br />
          at the Speed of Thought
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform natural language into AWS infrastructure. Just describe what
          you need, and PromptOps creates it instantly on your AWS account.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 flex items-center gap-2"
          >
            Start Building <ArrowRight className="h-5 w-5" />
          </button>
          <button className="border border-slate-600 hover:border-slate-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-slate-800">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
