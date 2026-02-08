import { useState, useEffect, ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface ViewportLazyLoaderProps {
    children: ReactNode;
    placeholder?: ReactNode;
    threshold?: number;
}

export function ViewportLazyLoader({ children, placeholder, threshold = 0.1 }: ViewportLazyLoaderProps) {
    const { ref, isIntersecting } = useIntersectionObserver({ threshold, rootMargin: '200px' });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (isIntersecting && !hasLoaded) {
            setHasLoaded(true);
        }
    }, [isIntersecting, hasLoaded]);

    return (
        <div ref={ref} className="min-h-[100px]">
            {hasLoaded ? children : placeholder}
        </div>
    );
}
