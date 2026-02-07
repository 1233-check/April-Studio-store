import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const collections = [
    {
        id: 1,
        name: 'Rosé Whirl',
        description: 'Delicate pinks that dance with the light',
        image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop',
        productCount: 12,
        price: 3499,
    },
    {
        id: 2,
        name: 'Shadow Pearl',
        description: 'Iridescent tones for the bold and beautiful',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
        productCount: 8,
        price: 4499,
    },
    {
        id: 3,
        name: 'Silver Mist',
        description: 'Cool tones that evoke morning dew',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
        productCount: 15,
        price: 3999,
    },
    {
        id: 4,
        name: 'Ash & Ember',
        description: 'Raw textures meet refined silhouettes',
        image: 'https://images.unsplash.com/photo-1558171013-4c088753af8f?w=600&h=800&fit=crop',
        productCount: 10,
        price: 4199,
    },
];

function CollectionCard({ collection, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [isHovered, setIsHovered] = useState(false);
    const { addItem, setIsOpen } = useCart();

    const handleQuickAdd = () => {
        addItem({
            id: collection.id + 100,
            name: `${collection.name} Essential`,
            collection: collection.name,
            price: collection.price,
            image: collection.image,
        });
        setIsOpen(true);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="scroll-item w-[85vw] md:w-[45vw] lg:w-[30vw] flex-shrink-0 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                animate={{ y: isHovered ? -8 : 0 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[3/4] overflow-hidden bg-[var(--color-stone)]"
            >
                {/* Image with grayscale effect */}
                <motion.img
                    src={collection.image}
                    alt={collection.name}
                    animate={{ scale: isHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-[filter] duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/70 via-transparent to-transparent" />

                {/* Collection Number - Retro Style */}
                <div className="absolute top-6 left-6 text-[var(--color-paper)]">
                    <span className="font-serif text-4xl opacity-50">0{index + 1}</span>
                </div>

                {/* Quick Add Button */}
                <motion.button
                    onClick={handleQuickAdd}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-6 right-6 w-10 h-10 bg-[var(--color-paper)] text-[var(--color-ink)] flex items-center justify-center"
                >
                    <Plus size={18} strokeWidth={1.5} />
                </motion.button>

                {/* Content at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-[var(--color-paper)]">
                    <motion.div
                        animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8 }}
                        transition={{ duration: 0.4 }}
                    >
                        <p className="text-[10px] tracking-[0.3em] uppercase mb-2 text-[var(--color-stone)]">
                            {collection.productCount} pieces
                        </p>
                        <h3 className="font-serif text-2xl md:text-3xl mb-2">{collection.name}</h3>
                        <p className="text-xs text-[var(--color-concrete)] mb-4 max-w-xs">
                            {collection.description}
                        </p>

                        {/* View Collection Link */}
                        <motion.a
                            href="#"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase border-b border-[var(--color-paper)]/50 pb-1"
                        >
                            View Collection
                            <ArrowRight size={12} />
                        </motion.a>
                    </motion.div>
                </div>

                {/* Border Frame - Retro */}
                <div className="absolute inset-4 border border-[var(--color-paper)]/10 pointer-events-none" />
            </motion.div>
        </motion.div>
    );
}

export default function Collections() {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });
    const scrollRef = useRef(null);

    return (
        <section id="collections" className="py-24 md:py-32 bg-[var(--color-ash-light)] overflow-hidden">
            {/* Header */}
            <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end justify-between"
                >
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-3 h-3 border border-[var(--color-graphite)] rotate-45" />
                            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-graphite)] font-medium">
                                — Collections —
                            </p>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-ink)]">
                            Curated for You
                        </h2>
                    </div>

                    <motion.a
                        href="#"
                        initial={{ opacity: 0 }}
                        animate={isHeaderInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.4 }}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-2 mt-6 md:mt-0 text-xs tracking-[0.15em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-ink)] transition-colors"
                    >
                        View All
                        <ArrowRight size={14} strokeWidth={1.5} />
                    </motion.a>
                </motion.div>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={scrollRef}
                className="horizontal-scroll pl-6 lg:pl-12"
            >
                {collections.map((collection, index) => (
                    <CollectionCard key={collection.id} collection={collection} index={index} />
                ))}
                {/* End Spacer */}
                <div className="w-6 lg:w-12 flex-shrink-0" />
            </div>

            {/* Scroll Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="max-w-7xl mx-auto px-6 lg:px-12 mt-8 flex justify-center"
            >
                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-graphite)]">
                    ← Scroll to explore →
                </p>
            </motion.div>
        </section>
    );
}
