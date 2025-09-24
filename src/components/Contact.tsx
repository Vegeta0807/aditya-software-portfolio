import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import Heading, { SectionPalette } from "@/components/Heading";
import ScrollToLink from "./ScrollToLink";

interface ContactProps { palette?: SectionPalette }

const Contact = ({ palette }: ContactProps) => {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <Heading as="h2" size="lg" palette={palette} className="mb-16 text-center">
          Let's Connect
        </Heading>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card p-8 animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                <Input 
                  id="name"
                  placeholder="Your Name"
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-400/50 transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-400/50 transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                <Input 
                  id="subject"
                  placeholder="Project Collaboration"
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-400/50 transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                <Textarea 
                  id="message"
                  placeholder="Tell me about your project or just say hello!"
                  rows={5}
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-400/50 resize-none transition-colors"
                />
              </div>
              
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-2xl font-bold mb-6 text-white">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>adityabarangali@gmail.com</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>+91 7021781485</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>Navi Mumbai, India</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-xl font-bold mb-4 text-white">Follow Me</h3>
              
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-xl font-bold mb-4 text-white">Availability</h3>
              <p className="text-gray-300">
                Currently available for freelance projects and full-time opportunities. 
                Let's discuss how we can work together!
              </p>
            </div>
          </div>
        </div>
      </div>
      <ScrollToLink href="#hero" />
    </section>
  );
};

export default Contact;