import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Construction,
  Sparkles,
  ArrowLeft,
  Bell,
  Rocket,
  Clock,
  CheckCircle,
} from "lucide-react";

const BuildFromScratch = () => {
  const navigate = useNavigate();

  const upcomingFeatures = [
    {
      icon: Sparkles,
      title: "AI-Guided Builder",
      description: "Step-by-step resume creation with AI assistance",
    },
    {
      icon: CheckCircle,
      title: "Smart Suggestions",
      description: "Get intelligent content recommendations",
    },
    {
      icon: Rocket,
      title: "Real-time Preview",
      description: "See your resume update as you type",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans antialiased">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-4xl py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/resume-builder")}
          className="mb-8 text-slate-500 hover:text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resume Builder
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-white/[0.03] border-white/10 rounded-[40px] overflow-hidden backdrop-blur-xl">
            <CardContent className="pt-20 pb-16 px-10">
              <div className="flex justify-center mb-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />
                  <div className="relative w-24 h-24 bg-indigo-600 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl">
                    <Construction className="w-12 h-12 text-white -rotate-12" />
                  </div>
                </div>
              </div>

              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-white uppercase tracking-tighter italic">
                  Feature Coming Soon
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                  We're working hard to bring you an amazing resume builder
                  experience. Build your resume from scratch with AI-powered
                  guidance and real-time previews.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 mb-16 p-3 bg-white/5 rounded-2xl w-fit mx-auto border border-white/5">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
                  Expected Launch: Q1 2026
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {upcomingFeatures.map((f, i) => (
                  <div
                    key={i}
                    className="bg-black/40 border border-white/5 p-8 rounded-3xl hover:border-indigo-500/30 transition-all text-center group"
                  >
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-500/20 transition-colors">
                      <f.icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="font-bold text-white uppercase tracking-tight mb-2 text-sm">
                      {f.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  onClick={() => navigate("/resume-builder")}
                  className="h-14 px-10 rounded-xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all"
                >
                  <Sparkles className="mr-2 h-4 w-4" /> Try Upload Feature
                </Button>
                <Button
                  variant="outline"
                  className="h-14 px-10 rounded-xl border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/5"
                >
                  <Bell className="mr-2 h-4 w-4" /> Notify Me When Ready
                </Button>
              </div>

              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-[10px] uppercase tracking-widest mb-3 font-black text-slate-500">
                  <span>Development Progress</span>
                  <span className="text-indigo-400">75%</span>
                </div>
                <div className="h-3 bg-black/40 rounded-full border border-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-indigo-600 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
          <p className="mt-8 text-center text-[10px] uppercase tracking-widest font-black text-slate-600">
            In the meantime, you can use our{" "}
            <button
              onClick={() => navigate("/resume-builder")}
              className="text-indigo-400 hover:underline"
            >
              upload feature
            </button>{" "}
            to transform your existing resume instantly.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BuildFromScratch;
