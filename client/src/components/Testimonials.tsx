import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Star, Quote } from "lucide-react";

// Peer testimonials - friends/classmates describing your help
const testimonials = [
    {
        name: "Classmate from GCT",
        role: "CIT Student",
        content: "Abdul Rasheed helped me debug my C++ project when I was stuck for hours. He has a great way of explaining complex concepts in simple terms.",
        avatar: "👨‍🎓",
        rating: 5,
    },
    {
        name: "Junior Student",
        role: "1st Year CIT",
        content: "Whenever I face issues with HTML or CSS, Abdul is my go-to person. He not only solves the problem but teaches me how to avoid it next time.",
        avatar: "👨‍💻",
        rating: 5,
    },
    {
        name: "Project Partner",
        role: "Web Development Team",
        content: "Working with Abdul on the GCT Bhakkar website was amazing. His attention to detail and problem-solving skills made our project stand out.",
        avatar: "👩‍💻",
        rating: 5,
    },
];

export function Testimonials() {
    const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isIntersecting) {
            setIsLoaded(true);
        }
    }, [isIntersecting]);

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className={`text-center mb-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Peer{" "}
                        <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Feedback</span>
                    </h2>
                    <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                        Insights and recommendations from classmates and project collaborators
                    </p>
                </div>

                <div ref={ref} className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 relative ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Quote Icon */}
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-orange-500/20" />

                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-neutral-300 mb-6 leading-relaxed italic">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center space-x-4">
                                <div className="text-3xl">{testimonial.avatar}</div>
                                <div>
                                    <div className="text-white font-semibold">{testimonial.name}</div>
                                    <div className="text-neutral-400 text-sm">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
