import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Terminal,
  Send,
  User,
  Bot,
  Copy,
  CheckCircle,
  Clock,
  AlertCircle,
  Zap,
  Cloud,
  Settings,
  Plus,
  MoreVertical,
  Trash2,
  Edit3,
} from "lucide-react";
import cloudService from "../services/Cloud";
import { toast } from "react-toastify";


const Chat = ({ onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "assistant",
      content:
        'Welcome to PromptOps! I\'m here to help you create and manage AWS infrastructure using natural language. Just describe what you need, and I\'ll make it happen.\n\nFor example, you can say:\n• "Create 2 EC2 instances with a load balancer"\n• "Set up an RDS database with backup enabled"\n• "Deploy a Lambda function for image processing"\n\nWhat would you like to build today?',
      timestamp: new Date(),
      status: "sent",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedStates, setCopiedStates] = useState({});
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const copyToClipboard = (text, messageId) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [messageId]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [messageId]: false });
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    console.log(inputValue);
    try {
      let res = await cloudService.promptDone(inputValue);
      let assistantMsg = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: res?.data?.aiResponse,
        timestamp: new Date(),
        status: "sent",
      };
      setIsLoading(false);
      setMessages((prev) => [...prev, assistantMsg]);
      console.log(res);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                <Terminal className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  PromptOps Assistant
                </h1>
                <p className="text-sm text-slate-400">
                  AWS Infrastructure at your command
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Plus className="h-5 w-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-4 ${
                message.type === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-gradient-to-r from-green-500 to-teal-500"
                }`}
              >
                {message.type === "user" ? (
                  <User className="h-5 w-5 text-white" />
                ) : (
                  <Bot className="h-5 w-5 text-white" />
                )}
              </div>

              {/* Message Content */}
              <div
                className={`flex-1 max-w-3xl ${
                  message.type === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-4 rounded-2xl ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-slate-800 text-slate-100 border border-slate-700"
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </div>

                  {/* Message Actions */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600/50">
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      {message.status === "sending" && (
                        <div className="animate-spin rounded-full h-3 w-3 border-b border-slate-400"></div>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(message.content, message.id)
                      }
                      className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {copiedStates[message.id] ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      <span>
                        {copiedStates[message.id] ? "Copied" : "Copy"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading Message */}
          {isLoading && (
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 max-w-3xl">
                <div className="inline-block p-4 rounded-2xl bg-slate-800 border border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-400"></div>
                    <span className="text-slate-300">
                      Analyzing your request and deploying infrastructure...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-slate-800/50 backdrop-blur-md border-t border-slate-700 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe the AWS infrastructure you want to create..."
                  className="w-full bg-slate-900 border border-slate-600 rounded-2xl px-4 py-3 pr-12 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none min-h-[52px] max-h-[120px]"
                  rows={1}
                />
                <div className="absolute right-3 bottom-3 text-xs text-slate-500">
                  {inputValue.length}/2000
                </div>
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 p-3 rounded-2xl transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5 text-white" />
              </button>
            </div>
          </form>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() =>
                setInputValue("Create 2 EC2 instances with a load balancer")
              }
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-full transition-colors"
            >
              <Cloud className="h-3 w-3 inline mr-1" />
              EC2 + Load Balancer
            </button>
            <button
              onClick={() =>
                setInputValue(
                  "Set up an RDS MySQL database with backup enabled"
                )
              }
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-full transition-colors"
            >
              <Settings className="h-3 w-3 inline mr-1" />
              RDS Database
            </button>
            <button
              onClick={() =>
                setInputValue("Deploy a Lambda function for image processing")
              }
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-full transition-colors"
            >
              <Zap className="h-3 w-3 inline mr-1" />
              Lambda Function
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
