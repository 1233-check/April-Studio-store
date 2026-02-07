import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const storyPoints = [
    {
        id: 1,
        number: '01',
        title: 'Artisanal Craft',
        subtitle: 'Hands That Shape Dreams',
        description: 'Each piece begins with skilled artisans in our Nagaland studio, where traditional techniques meet contemporary vision.',
        image: 'https://images.unsplash.com/photo-1558171013-4c088753af8f?w=800&q=80',
    },
    {
        id: 2,
        number: '02',
        title: 'Slow Fashion',
        subtitle: 'Quality Over Quantity',
        description: 'We believe in creating fewer pieces, but better ones. Each garment is made to be cherished for years, not seasons.',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    },
    {
        id: 3,
        number: '03',
        title: 'Sustainable',
        subtitle: 'Mindful by Design',
        description: 'From organic fabrics to natural dyes, every choice we make honors both the wearer and the earth.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    },
];

export default function BrandEthos() {
    const [activeStory, setActiveStory] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const currentStory = storyPoints[activeStory];

    const nextStory = () => setActiveStory((prev) => (prev + 1) % storyPoints.length);
    const prevStory = () => setActiveStory((prev) => (prev - 1 + storyPoints.length) % storyPoints.length);

    // Auto advance
    useEffect(() => {
        const timer = setInterval(nextStory, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section ref={ref} id="about" className="bg-[var(--color-ash)]">
            {/* Split Layout */}
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* Left - Image Panel */}
                <div className="lg:w-1/2 h-[50vh] lg:h-screen relative overflow-hidden bg-[var(--color-stone)]">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeStory}
                            src={currentStory.image}
                            alt={currentStory.title}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 w-full h-full object-cover img-vintage"
                        />
                    </AnimatePresence>

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/50 via-transparent to-transparent" />

                    {/* Large number */}
                    <motion.span
                        key={`num-${activeStory}`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 0.15, y: 0 }}
                        className="absolute bottom-8 left-8 font-serif text-[180px] leading-none text-[var(--color-paper)]"
                    >
                        {currentStory.number}
                    </motion.span>

                    {/* Navigation arrows */}
                    <div className="absolute bottom-8 right-8 flex gap-2">
                        <button
                            onClick={prevStory}
                            className="w-12 h-12 border border-[var(--color-paper)]/50 text-[var(--color-paper)] flex items-center justify-center hover:bg-[var(--color-paper)]/10 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextStory}
                            className="w-12 h-12 border border-[var(--color-paper)]/50 text-[var(--color-paper)] flex items-center justify-center hover:bg-[var(--color-paper)]/10 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Right - Content Panel */}
                <div className="lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-16 lg:py-0 bg-[var(--color-ash)]">

                    {/* Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4 mb-10"
                    >
                        <div className="w-8 h-px bg-[var(--color-ink)]" />
                        <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-graphite)] font-semibold">
                            Our Philosophy
                        </span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8 leading-[0.95]"
                    >
                        Made with<br />
                        <em className="text-[var(--color-graphite)]">Intention.</em>
                    </motion.h2>

                    {/* Dynamic description */}
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={activeStory}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="text-lg text-[var(--color-graphite)] max-w-md mb-12 leading-relaxed"
                        >
                            {currentStory.description}
                        </motion.p>
                    </AnimatePresence>

                    {/* Story tabs */}
                    <div className="space-y-6 mb-12">
                        {storyPoints.map((story, index) => (
                            <button
                                key={story.id}
                                onClick={() => setActiveStory(index)}
                                className={`flex items-start gap-5 text-left transition-opacity duration-300 ${index === activeStory ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                                    }`}
                            >
                                <span className={`font-serif text-4xl transition-colors ${index === activeStory ? 'text-[var(--color-ink)]' : 'text-[var(--color-stone)]'
                                    }`}>
                                    {story.number}
                                </span>
                                <div>
                                    <h3 className="font-serif text-xl mb-0.5">{story.title}</h3>
                                    <p className="text-xs text-[var(--color-graphite)]">{story.subtitle}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Progress dots */}
                    <div className="flex gap-3 mb-10">
                        {storyPoints.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveStory(index)}
                                className={`h-1 transition-all duration-500 ${index === activeStory
                                        ? 'w-8 bg-[var(--color-ink)]'
                                        : 'w-4 bg-[var(--color-stone)]'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.a
                        href="https://www.instagram.com/april.nagaland"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 8 }}
                        className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold group"
                    >
                        <span className="border-b-2 border-[var(--color-ink)] pb-1">
                            Follow Our Journey
                        </span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="border-t border-[var(--color-stone)] bg-[var(--color-paper)] py-16">
                <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { num: '5,000+', label: 'Happy Customers' },
                        { num: '20K+', label: 'Instagram Family' },
                        { num: '100%', label: 'Natural Fabrics' },
                        { num: '50+', label: 'Local Artisans' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className="font-serif text-4xl md:text-5xl block mb-2">{stat.num}</span>
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-graphite)]">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
