import { useState, useEffect, useRef } from 'react';

// Optimized image component with lazy loading and blur placeholder
export function OptimizedImage({
    src,
    alt,
    className = '',
    priority = false,
    ...props
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef(null);

    useEffect(() => {
        if (priority) {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '200px', // Start loading 200px before entering viewport
                threshold: 0.01
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    return (
        <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...props}>
            {/* Blur placeholder */}
            <div
                className={`absolute inset-0 bg-[var(--color-stone)] transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
            />

            {/* Actual image */}
            {isInView && (
                <img
                    src={src}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                />
            )}
        </div>
    );
}

export default OptimizedImage;
