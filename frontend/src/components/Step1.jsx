import { AlertCircle, ArrowRight, CheckCircle, Shield } from "lucide-react";
import React from "react";

const Step1 = ({setCurrentStep}) => {
  return (
    <div className="space-y-8">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <div className="flex items-start space-x-4">
          <Shield className="h-8 w-8 text-green-500 mt-1" />
          <div>
            <h2 className="text-2xl font-bold mb-4">Why IAM Roles?</h2>
            <div className="space-y-4 text-slate-300">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-white">
                    No Long-term Credentials:
                  </strong>{" "}
                  IAM roles provide temporary access tokens, reducing security
                  risks
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-white">Granular Permissions:</strong>{" "}
                  You control exactly what PromptOps can access in your account
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-white">Easy Revocation:</strong>{" "}
                  Disable access instantly by deleting the role
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-white">AWS Best Practice:</strong>{" "}
                  Recommended by AWS for third-party integrations
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-blue-400 mt-1" />
          <div>
            <h3 className="font-bold text-blue-200 mb-2">What You'll Need</h3>
            <ul className="space-y-2 text-blue-100">
              <li>• AWS Console access with IAM permissions</li>
              <li>• About 5 minutes to complete the setup</li>
              <li>• Basic understanding of AWS IAM (we'll guide you)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setCurrentStep(2);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
        >
          Continue <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Step1;
