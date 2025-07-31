import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
// Removed database dependencies - using Google Sheets instead
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Mail, Github, Globe, MapPin, Send, Loader2 } from "lucide-react";

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
    value: "mabdulrasheedtalal@gmail.com",
    link: "mailto:mabdulrasheedtalal@gmail.com"
  },
  {
    icon: Github,
    title: "GitHub",
    value: "@Abdul-Rasheed-Talal",
    link: "https://github.com/Abdul-Rasheed-Talal"
  },
  {
    icon: Globe,
    title: "Website",
    value: "Startup Journey Blog",
    link: "https://abdul-rasheed-talal.github.io/StartupJourney/"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Bhakkar, Pakistan",
    link: null
  }
];

export function Contact() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Google Sheets form submission - Replace with your actual Google Apps Script URL
      const googleSheetUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
      
      // TODO: Replace YOUR_SCRIPT_ID with your actual deployment URL from Google Apps Script
      
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

  return (
    <section id="contact" className="py-20 px-4 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Ready to collaborate, discuss opportunities, or just chat about technology? I'd love to hear from you!
          </p>
        </div>
        
        <div ref={ref} className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`space-y-8 transition-all duration-700 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Let's Connect</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8">
                I'm always open to discussing new opportunities, collaborating on projects, 
                or sharing knowledge with fellow developers and students.
              </p>
            </div>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={item.title} className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <item.icon className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">{item.title}</h4>
                    {item.link ? (
                      <a 
                        href={item.link} 
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-600 dark:text-slate-300">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className={`bg-slate-50 dark:bg-slate-900 border-0 shadow-lg transition-all duration-700 delay-200 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-2 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </Label>
                  <Input
                    id="email"  
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-2 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="mt-2 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="mt-2 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
