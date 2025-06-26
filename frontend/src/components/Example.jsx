import React from "react";

const Example = () => {
  return (
    <section id="examples" className="py-20 px-6 bg-slate-800/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          See PromptOps in Action
        </h2>
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-slate-400 text-sm ml-4">
              PromptOps Terminal
            </span>
          </div>
          <div className="font-mono text-green-400">
            <div className="mb-4">
              <span className="text-blue-400">$</span> create 2 EC2 instances
              with load balancer
            </div>
            <div className="text-slate-300 space-y-2">
              <div>✓ Creating EC2 instances...</div>
              <div>✓ Configuring security groups...</div>
              <div>✓ Setting up Application Load Balancer...</div>
              <div>✓ Attaching instances to target group...</div>
              <div className="text-green-400 font-semibold">
                ✓ Infrastructure deployed successfully!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Example;
