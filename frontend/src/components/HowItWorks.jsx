import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-20 px-6 bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold mb-4">Connect Your AWS Account</h3>
            <p className="text-slate-300">
              Securely connect using AWS IAM roles. No access keys needed, you
              maintain full control.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold mb-4">Describe What You Need</h3>
            <p className="text-slate-300">
              Use natural language to describe your infrastructure requirements.
              Be as detailed or simple as you want.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold mb-4">Watch It Deploy</h3>
            <p className="text-slate-300">
              Our AI interprets your request and deploys the infrastructure
              automatically to your AWS account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
