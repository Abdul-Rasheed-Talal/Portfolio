import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Mail, Github, MapPin, Send, Loader2, Phone, CheckCircle } from "lucide-react";

import aboutData from "../content/about.json";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: aboutData.social.email,
    link: `mailto:${aboutData.social.email}`
  },
  {
    icon: Phone,
    title: "Phone",
    value: aboutData.social.phone,
    link: `tel:${aboutData.social.phone}`
  },
  {
    icon: Github,
    title: "GitHub",
    value: `@${aboutData.social.github.split('/').pop()}`,
    link: aboutData.social.github
  },
  {
    icon: MapPin,
    title: "Location",
    value: aboutData.location,
    link: null
  }
];

export function Contact() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      setIsLoaded(true);
    }
  }, [isIntersecting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Google Sheets form submission
      const googleSheetUrl = "https://script.google.com/macros/s/AKfycbwkpcsN6mih7UX8CMhHeoyq22p4laAXwpg-ZsdjgpXDSQjGSkDHfv7sOivD0or5H3bc/exec";

      console.log('Contact form submitted:', formData);

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('timestamp', new Date().toISOString());

      await fetch(googleSheetUrl, {
        method: 'POST',
        body: formDataToSend,
      });

      toast({
        title: "Message Sent!",
        description: "Thank you for your message! I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };



  // Normal Mode
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Ready to collaborate? Let's discuss your next project and create something amazing together.
          </p>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`space-y-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-neutral-300 mb-8">
                I'm always open to discussing new opportunities, collaborating on projects,
                or sharing knowledge with fellow developers and students.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={item.title} className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <item.icon className="text-orange-400 h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{item.title}</h4>
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-neutral-400 hover:text-orange-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-neutral-400">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2 text-neutral-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Quick Response</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Open to Learn</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-neutral-300">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-2 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-neutral-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-2 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-neutral-300">
                  Subject
                </Label>
                <Input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="mt-2 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="How can I help you?"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-neutral-300">
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="mt-2 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/25"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
