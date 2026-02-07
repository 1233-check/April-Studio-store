import { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Memoized Hero for optimal performance
const Hero = memo(function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);

    // Smooth spring physics for butter animations
    const springConfig = { stiffness: 80, damping: 25, mass: 0.5 };
    const springY = useSpring(y, springConfig);
    const springScale = useSpring(scale, springConfig);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden bg-[var(--color-ash)]">
            {/* Background Image - Priority loading */}
            <motion.div
                style={{ y: springY, scale: springScale }}
                className="absolute inset-0 transform-gpu"
            >
                <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80"
                    alt="Woman in flowing dress"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                    style={{
                        filter: 'sepia(25%) saturate(0.5) contrast(0.9) brightness(0.95)',
                    }}
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-paper)]/60 via-transparent to-[var(--color-paper)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-paper)]/40 via-transparent to-[var(--color-paper)]/40" />
                {/* Vignette */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(28,27,25,0.3) 100%)' }}
                />
            </motion.div>

            {/* Corner Frames */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[var(--color-ink)]/30" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[var(--color-ink)]/30" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[var(--color-ink)]/30" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[var(--color-ink)]/30" />

            {/* Content */}
            <motion.div
                style={{ y: textY, opacity }}
                className="relative h-full flex flex-col items-center justify-center text-center px-6 transform-gpu"
            >
                {/* Side Lines */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute left-12 top-1/3 bottom-1/3 w-px bg-[var(--color-ink)]/20 hidden lg:block origin-top"
                />
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                    className="absolute right-12 top-1/3 bottom-1/3 w-px bg-[var(--color-ink)]/20 hidden lg:block origin-top"
                />

                {/* Diamond */}
                <motion.div
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 1, rotate: 45 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-4 h-4 border-2 border-[var(--color-ink)] mb-10"
                />

                {/* Brand Label */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-[11px] tracking-[0.5em] uppercase text-[var(--color-graphite)] mb-8 font-semibold"
                >
                    — The April Studio —
                </motion.p>

                {/* Main Headlines - Faster animations */}
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--color-ink)] leading-[0.95] tracking-tight"
                    >
                        Art You Can Wear.
                    </motion.h1>
                </div>

                <div className="overflow-hidden mt-3">
                    <motion.h1
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--color-graphite)] leading-[0.95] tracking-tight italic"
                    >
                        Stories You Can Feel.
                    </motion.h1>
                </div>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-10 text-sm md:text-base text-[var(--color-graphite)] max-w-lg leading-relaxed"
                >
                    Artisanal fashion crafted with intention in the hills of Nagaland.
                    Each piece tells a story of heritage and timeless elegance.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="mt-12"
                >
                    <motion.a
                        href="#collections"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-outline"
                    >
                        Explore Collection
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Scroll Line */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px h-16 bg-gradient-to-b from-[var(--color-ink)] to-transparent"
                />
            </motion.div>
        </section>
    );
});

export default Hero;
