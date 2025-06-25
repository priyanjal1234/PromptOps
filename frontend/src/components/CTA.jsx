import React from "react";

const CTA = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          Ready to Transform Your Infrastructure Workflow?
        </h2>
        <p className="text-xl text-slate-300 mb-12">
          Join thousands of developers who are building faster with PromptOps.
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-6 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
          Get Started Free
        </button>
      </div>
    </section>
  );
};

export default CTA;
