// src/components/Hero.tsx
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Brain,
  Target,
  Cpu,
  Network,
  Code,
  LineChart,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import heroimg1 from "@/assets/images/ai-feature-image.webp";

const Hero = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const fullText = "Supercharge Your Career with AI-Powered Resume Crafting";
  const typingSpeed = 75;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      setTheme(newTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Optimized neural network animation with reduced nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
    }> = [];
    const connections: Array<{ from: number; to: number }> = [];
    const numNodes = 30;

    // Create nodes
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 0.3 - 0.15,
        vy: Math.random() * 0.3 - 0.15,
      });
    }

    // Create fewer connections
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        if (Math.random() > 0.97) {
          connections.push({
            from: i,
            to: j,
          });
        }
      }
    }

    let animationId: number;

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const lineColor =
        theme === "dark"
          ? "rgba(96, 165, 250, 0.15)"
          : "rgba(99, 102, 241, 0.12)";

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;

      connections.forEach((connection) => {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        if (Math.random() > 0.997) {
          const packetPosition = Math.random();
          const packetX = fromNode.x + (toNode.x - fromNode.x) * packetPosition;
          const packetY = fromNode.y + (toNode.y - fromNode.y) * packetPosition;

          const packetColor =
            theme === "dark"
              ? "rgba(96, 165, 250, 0.6)"
              : "rgba(99, 102, 241, 0.5)";

          ctx.fillStyle = packetColor;
          ctx.beginPath();
          ctx.arc(packetX, packetY, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const mouseDx = mousePosition.x * canvas.width - node.x;
        const mouseDy = mousePosition.y * canvas.height - node.y;
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

        const glow = mouseDistance < 150 ? (1 - mouseDistance / 150) * 0.6 : 0;

        const nodeColor =
          theme === "dark"
            ? `rgba(96, 165, 250, ${0.3 + glow})`
            : `rgba(99, 102, 241, ${0.25 + glow})`;

        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        if (glow > 0) {
          ctx.shadowBlur = 10;
          const glowColor =
            theme === "dark"
              ? "rgba(96, 165, 250, 0.4)"
              : "rgba(99, 102, 241, 0.3)";

          ctx.shadowColor = glowColor;

          const glowNodeColor =
            theme === "dark"
              ? "rgba(96, 165, 250, 0.7)"
              : "rgba(99, 102, 241, 0.6)";

          ctx.fillStyle = glowNodeColor;
          ctx.beginPath();
          ctx.arc(
            node.x,
            node.y,
            node.radius * (1 + glow * 0.5),
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [mousePosition, theme]);

  // Throttled mouse position tracking
  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
        rafId = 0;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Typing effect
  useEffect(() => {
    if (!isTyping) return;

    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [typedText, isTyping, fullText]);

  const handleCreateResume = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewTemplates = () => {
    document
      .getElementById("templates")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950 pt-24 md:pt-32">
      {/* Neural Network Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40 dark:opacity-30"
        style={{ zIndex: 0 }}
      />

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-gray-900/50 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                AI-Powered Resume Builder
              </span>
            </motion.div>

            {/* Main Heading with Typing Effect */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
              {typedText}
              {isTyping && (
                <span className="inline-block w-1 h-12 ml-1 bg-blue-600 dark:bg-blue-400 animate-blink" />
              )}
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Land your dream job with intelligent resume optimization. Our
              AI-powered platform analyzes job descriptions and tailors your
              resume to beat ATS systems and impress recruiters.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Brain, text: "Smart AI Analysis" },
                { icon: Target, text: "ATS Optimized" },
                { icon: Zap, text: "Instant Feedback" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <feature.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleCreateResume}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Create Your Resume
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={handleViewTemplates}
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                View Templates
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-3 pt-4">
              {[
                {
                  icon: CheckCircle,
                  text: "AI analyzes your experience and suggests optimal phrasing",
                },
                {
                  icon: CheckCircle,
                  text: "Engineered to pass Applicant Tracking Systems",
                },
                {
                  icon: CheckCircle,
                  text: "Get tailored advice to strengthen your application",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <item.icon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroimg1}
                alt="AI Resume Builder"
                className="w-full h-auto object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    LLM Models
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Powered by advanced AI technology
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600">
          <span className="text-xs font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight className="w-5 h-5 rotate-90" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
