import { Clock, Globe, Layers, Users } from "lucide-react";
import React from "react";

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Built for Modern Teams
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Save Time</h3>
            <p className="text-slate-400 text-sm">
              Deploy in minutes instead of days
            </p>
          </div>
          <div className="text-center">
            <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Team Friendly</h3>
            <p className="text-slate-400 text-sm">
              No DevOps expertise required
            </p>
          </div>
          <div className="text-center">
            <Layers className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Best Practices</h3>
            <p className="text-slate-400 text-sm">
              Built-in security and optimization
            </p>
          </div>
          <div className="text-center">
            <Globe className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Scale Ready</h3>
            <p className="text-slate-400 text-sm">
              From prototype to production
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
