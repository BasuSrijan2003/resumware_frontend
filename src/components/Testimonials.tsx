
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Arjun Sharma",
      role: "IIT Delhi Graduate, Software Engineer at Google",
      image: "",
      content: "The IIT-specific resume template helped me highlight my technical projects in exactly the way recruiters wanted to see them. I received interview calls from all the top tech companies I applied to!"
    },
    {
      id: 2,
      name: "Priya Malhotra",
      role: "IIM Ahmedabad Alumna, Management Consultant",
      image: "",
      content: "Using IIT IIM Resume's templates and guidelines was a game-changer for my consulting applications. The format perfectly showcased my case competition experience and leadership skills."
    },
    {
      id: 3,
      name: "Rahul Verma",
      role: "IIT Bombay & IIM Calcutta, Product Manager",
      image: "",
      content: "As someone with both IIT and IIM backgrounds, I needed a resume that highlighted both technical and management skills. This platform offered exactly what I needed to land my dream product management role."
    },
    {
      id: 4,
      name: "Meera Patel",
      role: "IIT Madras, Data Scientist",
      image: "",
      content: "The specialized 'Data Science Focus' template helped me organize my projects and technical skills in a way that caught recruiters' attention. Secured interviews with top AI companies!"
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-light-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from students and professionals who secured their dream positions using our resume templates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-gray-300 mb-4" />
                <p className="mb-6 text-gray-700">{testimonial.content}</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.image} />
                    <AvatarFallback className="bg-iit-blue text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-iit-blue to-iim-maroon rounded-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Join 10,000+ Success Stories</h3>
            <p className="mb-6">
              Our templates and guidance have helped thousands of IIT and IIM students and alumni land positions at top companies globally.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-between">
              {["Google", "Microsoft", "McKinsey", "Amazon", "Goldman Sachs", "Bain & Co.", "Tesla", "Meta"].map((company, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-sm font-medium bg-white/20 py-2 px-4 rounded">{company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
