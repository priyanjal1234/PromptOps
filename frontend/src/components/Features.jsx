import { Cloud, Shield, Zap } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why Choose PromptOps?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
            <Zap className="h-12 w-12 text-yellow-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
            <p className="text-slate-300 leading-relaxed">
              Deploy infrastructure in seconds, not hours. Our AI understands
              your intent and executes immediately.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
            <Shield className="h-12 w-12 text-green-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Secure by Default</h3>
            <p className="text-slate-300 leading-relaxed">
              Uses AWS IAM roles for secure access. No credentials stored,
              complete control over permissions.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
            <Cloud className="h-12 w-12 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">AWS Native</h3>
            <p className="text-slate-300 leading-relaxed">
              Built specifically for AWS with deep integration across all
              services and best practices built-in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
