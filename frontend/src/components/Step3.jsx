import { ArrowRight, CheckCircle, Copy, Settings } from "lucide-react";
import React from "react";

const Step3 = ({copiedStates,permissions,setCurrentStep}) => {
  return (
    <div className="space-y-8">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Settings className="h-6 w-6 text-purple-500" />
          Step 2: Attach Permissions
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-3">1. Attach Custom Policy</h3>
            <p className="text-slate-300 mb-4">
              From AWS, you can attach the policies directly from the options
              given or you can create the role first and then paste this custom
              policy
            </p>

            <div className="bg-slate-900 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">
                  Permissions Policy JSON
                </span>
                <button
                  onClick={() => copyToClipboard(permissions, "permissions")}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  {copiedStates.permissions ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copiedStates.permissions ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="text-sm text-slate-300 overflow-x-auto max-h-64">
                {permissions}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">2. Name Your Role</h3>
            <p className="text-slate-300">
              Give your role a descriptive name like:
            </p>
            <div className="bg-slate-900 rounded-lg p-3 mt-2 border border-slate-600">
              <code className="text-blue-400">PromptOpsExecutionRole</code>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">3. Add Description (Optional)</h3>
            <div className="bg-slate-900 rounded-lg p-3 border border-slate-600">
              <code className="text-slate-300 text-sm">
                Role for PromptOps to manage AWS infrastructure via natural
                language prompts
              </code>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-6 w-6 text-green-400 mt-1" />
          <div>
            <h3 className="font-bold text-green-200 mb-2">
              Security Best Practices
            </h3>
            <ul className="space-y-2 text-green-100">
              <li>
                • These permissions follow the principle of least privilege
              </li>
              <li>• You can modify permissions anytime in the IAM console</li>
              <li>
                • Consider adding resource-level restrictions for production
              </li>
              <li>• Monitor usage through AWS CloudTrail logs</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => {
            setCurrentStep(2);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="border border-slate-600 hover:border-slate-500 px-6 py-3 rounded-lg font-medium transition-all duration-200"
        >
          Previous
        </button>
        <button
          onClick={() => {
            setCurrentStep(4);
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

export default Step3;
