
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 bg-iit-blue text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Your Perfect Resume?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of IIT and IIM students and alumni who have secured their dream positions with our specialized resume templates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-iit-blue hover:bg-gray-100">
              Get Started For Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              View Sample Resumes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
