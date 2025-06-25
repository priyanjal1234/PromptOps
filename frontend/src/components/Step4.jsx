import { CheckCircle, Cloud } from "lucide-react";
import React from "react";

const Step4 = ({ assumeRole, handleAssumeRoleChange,disabled,connectToAWS,setCurrentStep }) => {
  return (
    <div className="space-y-8">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Cloud className="h-6 w-6 text-green-500" />
          Step 3: Complete Connection
        </h2>

        <div className="space-y-6">
          {/* <div>
                      <h3 className="font-bold mb-3">1. Copy Role ARN</h3>
                      <p className="text-slate-300 mb-4">
                        After creating the role, copy its ARN from the role
                        summary page. It should look like:
                      </p>
                      
                        <input
                          type="text"
                          placeholder="arn:aws:iam::YOUR_ACCOUNT_ID:role/PromptOpsExecutionRole
"
                          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                        />
                      
                    </div> */}

          <div>
            <h3 className="font-bold mb-3">2. Enter Role ARN</h3>
            <input
              type="text"
              placeholder="arn:aws:iam::123456789012:role/PromptOpsExecutionRole"
              className="w-full bg-slate-900 border border-slate-600 mb-2 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              value={assumeRole.roleArn}
              onChange={handleAssumeRoleChange}
              name="roleArn"
            />
            <h3 className="font-bold mb-3">2. Enter External Id</h3>
            <input
              type="text"
              placeholder="random-1234"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              value={assumeRole.externalId}
              onChange={handleAssumeRoleChange}
              name="externalId"
            />
          </div>

          <div>
            <h3 className="font-bold mb-3">3. Test Connection</h3>
            <button
              disabled={disabled}
              onClick={connectToAWS}
              className={`${
                disabled
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2`}
            >
              <CheckCircle className="h-5 w-5" />
              Test AWS Connection
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-2xl p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">You're All Set!</h3>
        <p className="text-slate-300 mb-6">
          Your AWS account is now securely connected to PromptOps. You can start
          creating infrastructure with natural language prompts.
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105">
          Go to Dashboard
        </button>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => {
            setCurrentStep(3);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="border border-slate-600 hover:border-slate-500 px-6 py-3 rounded-lg font-medium transition-all duration-200"
        >
          Previous
        </button>
      </div>
    </div>
  );
};

export default Step4;
