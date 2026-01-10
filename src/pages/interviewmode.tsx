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
  ChevronRight,
  Activity,
} from "lucide-react";

const InterviewMode = () => {
  const navigate = useNavigate();

  const upcomingFeatures = [
    {
      icon: Sparkles,
      title: "AI-Guided Builder",
      description: "Step-by-step resume creation with neural assistance.",
    },
    {
      icon: CheckCircle,
      title: "Smart Suggestions",
      description: "Intelligent real-time content recommendations.",
    },
    {
      icon: Rocket,
      title: "Live Render",
      description: "Visual document updates as you input data.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden font-sans antialiased">
      {/* Background Architecture */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full" />
        {/* Subtle Geometric Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-5xl py-12 md:py-20">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/resume-builder")}
            className="mb-12 text-slate-500 hover:text-white hover:bg-white/5 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
              Return to Nexus
            </span>
          </Button>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-12 h-[2px] bg-indigo-500"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-400">
                Under Construction
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-8">
              THE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-light italic">
                INTERVIEW
              </span>{" "}
              MODE
            </h1>
            <p className="text-slate-400 text-lg max-w-xl font-medium leading-relaxed mb-10">
              We are architecting a step-by-step cognitive mapping process to
              build your professional profile from zero using neural-parsing
              logic.
            </p>

            <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl max-w-xs backdrop-blur-md">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Stay Tuned
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-tight">
                  Coming Soon 2026
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progress Visualizer */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-10 rounded-[40px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full translate-x-16 -translate-y-16" />
              <Activity className="w-8 h-8 text-indigo-400 mb-8" />
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">
                    Core Logic Integration
                  </span>
                  {/* <span className="text-3xl font-black text-white italic tracking-tighter">
                    75%
                  </span> */}
                </div>
                <div className="h-4 bg-black/40 rounded-full p-1 overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold text-center">
                  Compiling Assets...
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Upcoming Modules Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full bg-slate-900/40 backdrop-blur-xl border-white/5 hover:border-indigo-500/30 transition-all rounded-[32px] group">
                <CardContent className="p-8 text-left">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all">
                    <feature.icon className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
                  </div>
                  <h3 className="font-black text-white uppercase tracking-tight mb-3 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-indigo-600 rounded-[40px] p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-20 -translate-y-20" />
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-6 italic">
            Need a result today?
          </h2>
          <p className="text-indigo-100/70 text-sm mb-10 max-w-md mx-auto font-medium">
            Our high-speed document injection system is fully operational.
            Switch to the upload module to generate your document instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/resume-builder")}
              className="h-16 px-12 rounded-2xl bg-white text-indigo-600 font-black uppercase tracking-widest text-xs hover:bg-slate-100 group transition-all"
            >
              Create Your Resume{" "}
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-16 px-12 rounded-2xl border-white/20 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10"
            >
              <Bell className="mr-2 h-4 w-4" /> Notify Deployment
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewMode;
