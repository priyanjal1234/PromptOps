import { ArrowLeft, Terminal } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const OnNav = ({currentStep}) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  to={"/"}
                  className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back</span>
                </Link>
                <div className="flex items-center space-x-2">
                  <Terminal className="h-8 w-8 text-blue-500" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    PromptOps
                  </span>
                </div>
              </div>
              <div className="text-slate-400">Step {currentStep} of 4</div>
            </div>
          </div>
        </nav>
  )
}

export default OnNav