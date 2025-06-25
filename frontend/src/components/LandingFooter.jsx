import { Terminal } from "lucide-react";
import React from "react";

const LandingFooter = () => {
  return (
    <footer className="py-12 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Terminal className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold">PromptOps</span>
        </div>
        <p className="text-slate-400">
          © 2025 PromptOps. Infrastructure automation for the modern era.
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
