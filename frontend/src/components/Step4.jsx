import { CheckCircle, Cloud } from "lucide-react";
import React from "react";

const Step4 = ({
  assumeRole,
  handleAssumeRoleChange,
  disabled,
  connectToAWS,
  setCurrentStep,
}) => {
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
            <h3 className="font-bold mb-3">1. Enter Role ARN</h3>
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
            <h3 className="font-bold mt-3 mb-3">3. Enter Region</h3>
            <input
              type="text"
              placeholder="if the region is global then us-east-1 is a good choice"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              value={assumeRole.region}
              onChange={handleAssumeRoleChange}
              name="region"
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
    </div>
  );
};

export default Step4;
