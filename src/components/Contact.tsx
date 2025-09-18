import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-aurora-purple to-aurora-orange bg-clip-text text-transparent">
          Let's Connect
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 text-aurora-aqua">Send a Message</h3>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground/80">Name</label>
                <Input 
                  id="name"
                  placeholder="Your Name"
                  className="glass border-aurora-aqua/30 focus:border-aurora-purple/50"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="glass border-aurora-aqua/30 focus:border-aurora-purple/50"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground/80">Subject</label>
                <Input 
                  id="subject"
                  placeholder="Project Collaboration"
                  className="glass border-aurora-aqua/30 focus:border-aurora-purple/50"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</label>
                <Textarea 
                  id="message"
                  placeholder="Tell me about your project or just say hello!"
                  rows={5}
                  className="glass border-aurora-aqua/30 focus:border-aurora-purple/50 resize-none"
                />
              </div>
              
              <Button variant="aurora" className="w-full glow-on-hover">
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass-card animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-2xl font-bold mb-6 text-aurora-purple">Get in Touch</h3>
              
              <div className="space-y-4">
                <a 
                  href="mailto:alex.chen@example.com" 
                  className="flex items-center gap-3 text-foreground/80 hover:text-aurora-aqua transition-colors"
                >
                  <Mail className="w-5 h-5 text-aurora-aqua" />
                  <span>alex.chen@example.com</span>
                </a>
                
                <a 
                  href="tel:+15551234567" 
                  className="flex items-center gap-3 text-foreground/80 hover:text-aurora-green transition-colors"
                >
                  <Phone className="w-5 h-5 text-aurora-green" />
                  <span>+1 (555) 123-4567</span>
                </a>
                
                <div className="flex items-center gap-3 text-foreground/80">
                  <MapPin className="w-5 h-5 text-aurora-orange" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-xl font-bold mb-4 text-aurora-green">Follow Me</h3>
              
              <div className="flex gap-4">
                <Button variant="glass" size="icon" className="glow-on-hover">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="glass" size="icon" className="glow-on-hover">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="glass" size="icon" className="glow-on-hover">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="glass-card animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-xl font-bold mb-4 text-aurora-orange">Availability</h3>
              <p className="text-foreground/80">
                Currently available for freelance projects and full-time opportunities. 
                Let's discuss how we can work together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;