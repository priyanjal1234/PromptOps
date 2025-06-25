import React, { useState } from "react";
import {
  ArrowLeft,
  Shield,
  Copy,
  CheckCircle,
  ExternalLink,
  AlertCircle,
  Terminal,
  Cloud,
  Key,
  Settings,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import cloudService from "../services/Cloud";
import { toast } from "react-toastify";
import OnNav from "../components/OnNav";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [copiedStates, setCopiedStates] = useState({});
  const [accountId, setaccountId] = useState(588826069254);
  const [disabled, setdisabled] = useState(false);
  const [externalId, setexternalId] = useState("prompt-ops-1234");
  const [assumeRole, setassumeRole] = useState({
    roleArn: "",
    externalId: "",
  });

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [key]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [key]: false });
    }, 2000);
  };

  const trustPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::588826069254:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "promptops-external-id"
        }
      }
    }
  ]
}`;

  const permissions = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:*",
        "elasticloadbalancing:*",
        "rds:*",
        "s3:*",
        "lambda:*",
        "iam:PassRole",
        "cloudformation:*",
        "cloudwatch:*",
        "logs:*"
      ],
      "Resource": "*"
    }
  ]
}`;

  function handleAssumeRoleChange(e) {
    let { name, value } = e.target;
    setassumeRole((prev) => ({ ...prev, [name]: value }));
  }

  async function connectToAWS() {
    if (!assumeRole.roleArn || !assumeRole.externalId) {
      return;
    }

    try {
      await cloudService.connectAccount(assumeRole);
      toast.success("AWS Connection Successfull");
      setdisabled(true);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error in connecting with AWS"
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="min-h-screen">
        {/* Navigation */}
        <OnNav currentStep={currentStep} />

        <div className="pt-24 pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-300">
                  Setup Progress
                </span>
                <span className="text-sm font-medium text-slate-300">
                  {Math.round((currentStep / 4) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                Connect Your AWS Account
              </h1>
              <p className="text-xl text-slate-300">
                Set up secure access using AWS IAM roles for maximum security
              </p>
            </div>

            {currentStep === 1 && (
              <Step1 setCurrentStep = {setCurrentStep}/>
            )}

            {currentStep === 2 && (
              <Step2 copyToClipboard = {copyToClipboard} copiedStates = {copiedStates} accountId = {accountId} externalId = {externalId} setCurrentStep = {setCurrentStep}/>
            )}

            {currentStep === 3 && (
              <Step3 copiedStates = {copiedStates} permissions = {permissions} setCurrentStep = {setCurrentStep}/>
            )}

            {currentStep === 4 && (
              <Step4 assumeRole = {assumeRole} handleAssumeRoleChange = {handleAssumeRoleChange} disabled = {disabled} connectToAWS = {connectToAWS} setCurrentStep = {setCurrentStep} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
