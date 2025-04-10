import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Trophy, Sparkles } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Industry-Approved Templates",
      description:
        "Our templates are designed based on feedback from actual recruiters at top firms and institutions.",
      color: "from-blue-500 to-indigo-600",
      hoverColor: "group-hover:from-blue-600 group-hover:to-indigo-700",
      iconBg: "bg-blue-500/10",
      delay: 0.1,
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI-Powered Optimization",
      description:
        "Our smart algorithms analyze your resume to suggest improvements based on successful candidates.",
      color: "from-violet-500 to-purple-600",
      hoverColor: "group-hover:from-violet-600 group-hover:to-purple-700",
      iconBg: "bg-violet-500/10",
      delay: 0.2,
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Proven Success Rate",
      description:
        "Over 90% of our users report receiving interview calls from their dream institutions.",
      color: "from-emerald-500 to-teal-600",
      hoverColor: "group-hover:from-emerald-600 group-hover:to-teal-700",
      iconBg: "bg-emerald-500/10",
      delay: 0.3,
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Expert Guidance",
      description:
        "Get personalized advice from alumni who have successfully navigated the admission process.",
      color: "from-amber-500 to-orange-600",
      hoverColor: "group-hover:from-amber-600 group-hover:to-orange-700",
      iconBg: "bg-amber-500/10",
      delay: 0.4,
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-95 z-0"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"></div>

      {/* Geometric Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-blue-500/30 rotate-45"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-purple-500/30 rotate-12 rounded-lg"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Elevate Your Career Prospects
          </h2>
          <p className="text-blue-100/90 text-lg max-w-2xl mx-auto">
            Our platform is specifically designed to help you create resumes
            that meet the high standards expected by top institutions and
            employers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="group"
            >
              <div className="h-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-8px] hover:shadow-lg hover:shadow-blue-500/10">
                <div
                  className={`${feature.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-white bg-opacity-20`}
                >
                  <div
                    className={`bg-gradient-to-r ${feature.color} rounded-lg p-2 transition-all duration-300 ${feature.hoverColor}`}
                  >
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-blue-100/70">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-blue-100/80 italic max-w-3xl mx-auto">
            In the competitive world of IIT and IIM placements, your resume is
            your first impression. Make it count with our specialized templates
            and guidance.
          </p>
          <div className="mt-8">
            <button className="relative overflow-hidden px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold group">
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Get Started Today</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
