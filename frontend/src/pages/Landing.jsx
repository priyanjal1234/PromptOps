import React from "react";
import {
  Cloud,
  Zap,
  Shield,
  ArrowRight,
  Terminal,
  Layers,
  Clock,
  CheckCircle,
  Users,
  Globe,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LandingNav from "../components/LandingNav";
import Hero from "../components/Hero";
import Example from "../components/Example";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Benefits from "../components/Benefits";
import CTA from "../components/CTA";
import LandingFooter from "../components/LandingFooter";

const Landing = () => {
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="min-h-screen">
        {/* Navigation */}
        <LandingNav />

        {/* Hero Section */}
        <Hero />

        {/* Example Section */}
        <Example />

        {/* Features Section */}
        <Features />

        {/* How It Works */}
        <HowItWorks />

        {/* Benefits Grid */}
        <Benefits />

        {/* CTA Section */}
        <CTA />

        {/* Footer */}
        <LandingFooter />
      </div>
    </div>
  );
};

export default Landing;
