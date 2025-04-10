import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-resume-gray text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-white">IIT</span>
              <span className="text-red-300">IIM</span>
              <span className="text-gray-300">Resume</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Professional resume templates designed specifically for IIT and
              IIM students and alumni.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Templates", url: "#templates" },
                { name: "Pricing", url: "#pricing" },
                { name: "Testimonials", url: "#testimonials" },
                { name: "Blog", url: "#" },
                { name: "About Us", url: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-white transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                { name: "Resume Tips", url: "#" },
                { name: "Interview Preparation", url: "#" },
                { name: "Career Guides", url: "#" },
                { name: "Placement Statistics", url: "#" },
                { name: "Help Center", url: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-white transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">2003srijanbasu@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">+91 9088801139</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Barasat, Dunlop,
                  <br />
                  Kolkata, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} IIT IIM Resume. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
