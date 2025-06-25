import { ArrowRight, CheckCircle, Copy, ExternalLink, Key } from "lucide-react";
import React from "react";

const Step2 = ({ copiedStates, accountId, externalId, setCurrentStep,copyToClipboard }) => {
  return (
    <div className="space-y-8">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Key className="h-6 w-6 text-blue-500" />
          Step 1: Create IAM Role
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-3">1. Open AWS IAM Console</h3>
            <a
              href="https://console.aws.amazon.com/iam/home#/roles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              Open IAM Roles <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div>
            <h3 className="font-bold mb-3">2. Click "Create Role"</h3>
            <p className="text-slate-300">
              Choose "AWS account" as the trusted entity type
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold mb-3">3. Configure Trust Relationship</h3>
            <p className="text-slate-300 mb-4">
              Select "Another AWS account" and use this account id:
            </p>

            <div className="bg-slate-900 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => copyToClipboard(accountId, "account")}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  {copiedStates.account ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copiedStates.account ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                {accountId}
              </pre>
            </div>
            <p className="text-slate-300 ">
              Then check the box for Require external id and paste this
            </p>

            <div className="bg-slate-900 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span>External Id</span>
                <button
                  onClick={() => copyToClipboard(externalId, "external")}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  {copiedStates.external ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copiedStates.external ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                {externalId}
              </pre>
            </div>
          </div>

          {/* <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-yellow-400 mt-1" />
                        <div className="text-yellow-100">
                          <strong>Note:</strong> Replace "PROMPTOPS_ACCOUNT_ID"
                          with the actual PromptOps AWS account ID that will be
                          provided after signup.
                        </div>
                      </div>
                    </div> */}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => {
            setCurrentStep(1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="border border-slate-600 hover:border-slate-500 px-6 py-3 rounded-lg font-medium transition-all duration-200"
        >
          Previous
        </button>
        <button
          onClick={() => {
            setCurrentStep(3);
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

export default Step2;
