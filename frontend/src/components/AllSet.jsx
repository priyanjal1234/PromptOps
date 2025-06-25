import { CheckCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AllSet = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30  p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">You're All Set!</h3>
        <p className="text-slate-300 mb-6">
          Your AWS account is now securely connected to PromptOps. You can start
          creating infrastructure with natural language prompts.
        </p>
        <Link to={'/chat'} className="bg-gradient-to-r mt-3 from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105">
          Go to Chat
        </Link>
      </div>
    </div>
  );
};

export default AllSet;
