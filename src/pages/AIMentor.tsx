// src/components/AIMentorSection.tsx
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  BookOpen,
  Brain,
  Lightbulb,
  FileText,
  Mic,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import laptopImage from "@/assets/images/laptop.jpg";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIMentorSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "👋 Hi! I'm your AI Study Mentor. I can help you with course materials, explain concepts, answer questions, and guide you through your college journey. What would you like to learn today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response - Feature not ready yet
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Feature coming soon! I'm not quite ready to assist yet. Thanks for your patience! ✨",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    {
      icon: BookOpen,
      label: "Explain Concept",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: FileText,
      label: "Summarize Notes",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      icon: Brain,
      label: "Study Plan",
      color: "bg-green-500/10 text-green-500",
    },
    {
      icon: Lightbulb,
      label: "Practice Quiz",
      color: "bg-amber-500/10 text-amber-500",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:bg-blue-500/20">
            <Sparkles className="h-3 w-3 mr-1" />
            Coming Soon
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your AI Study Mentor
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Get instant help with course materials, personalized study plans,
            and 24/7 academic support
          </p>
        </div>

        {/* Compact Image Section */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-md rounded-xl overflow-hidden border-2 border-border shadow-lg group">
            <img
              src={laptopImage}
              alt="AI Study Mentor"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

            {/* Overlay Badges */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-background/80 backdrop-blur-sm border-blue-500/40 text-blue-600 dark:text-blue-400 text-xs"
                >
                  Explanations
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-background/80 backdrop-blur-sm border-purple-500/40 text-purple-600 dark:text-purple-400 text-xs"
                >
                  Study Plans
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-background/80 backdrop-blur-sm border-green-500/40 text-green-600 dark:text-green-400 text-xs"
                >
                  Quizzes
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Dark Chat Container */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 rounded-3xl p-6 shadow-2xl">
          {/* Quick Actions (shown when chat is fresh) */}
          {messages.length === 1 && (
            <div className="mb-8 space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-white mb-2">
                  How can I help you today?
                </h3>
                <p className="text-slate-400">
                  Choose a quick action or ask me anything
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    className={`${action.color} p-4 rounded-xl hover:scale-105 transition-all duration-200 border border-white/10 hover:border-white/20 group`}
                    onClick={() =>
                      setInput(`Help me with ${action.label.toLowerCase()}`)
                    }
                  >
                    <action.icon className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-medium">{action.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-6 mb-6 max-h-[500px] overflow-y-auto scrollbar-hide">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-10 w-10 border-2 border-blue-500/30">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      <Brain className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                      : "bg-white/5 backdrop-blur-xl text-slate-100 border border-white/10"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p className="text-xs opacity-60 mt-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {message.role === "user" && (
                  <Avatar className="h-10 w-10 border-2 border-blue-500/30">
                    <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-600 text-white">
                      You
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="h-10 w-10 border-2 border-blue-500/30">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <Brain className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/10">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="pb-2">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border-2 border-white/10 shadow-2xl p-3 hover:border-blue-500/50 transition-all duration-300">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask me anything about your studies..."
                className="min-h-[80px] bg-transparent border-0 text-white placeholder:text-slate-400 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-slate-400 hover:text-white hover:bg-white/10"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-slate-400 hover:text-white hover:bg-white/10"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-3">
              AI Mentor can make mistakes. Always verify important information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIMentorSection;
