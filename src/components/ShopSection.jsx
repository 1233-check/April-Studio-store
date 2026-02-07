import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

function ProductCard({ product, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { addItem, setIsOpen } = useCart();

    const handleAddToCart = () => {
        addItem(product);
        setIsOpen(true);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group"
        >
            {/* Image Container */}
            <motion.div
                animate={{ y: isHovered ? -8 : 0 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[3/4] bg-[var(--color-stone)] overflow-hidden mb-4"
            >
                <motion.img
                    src={product.image}
                    alt={product.name}
                    animate={{ scale: isHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-[filter] duration-500"
                />

                {/* Badge */}
                {product.badge && (
                    <div className="absolute top-4 left-4 bg-[var(--color-ink)] text-[var(--color-paper)] px-3 py-1.5">
                        <span className="text-[9px] tracking-[0.15em] uppercase font-medium">{product.badge}</span>
                    </div>
                )}

                {/* Wishlist Button */}
                <motion.button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 w-9 h-9 bg-[var(--color-paper)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Heart
                        size={14}
                        strokeWidth={1.5}
                        className={isWishlisted ? 'fill-[var(--color-ink)] text-[var(--color-ink)]' : 'text-[var(--color-graphite)]'}
                    />
                </motion.button>

                {/* Hover Actions */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-4 left-4 right-4 flex gap-2"
                        >
                            <motion.button
                                onClick={handleAddToCart}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-ink)] text-[var(--color-paper)] py-3 text-[10px] tracking-[0.15em] uppercase font-medium"
                            >
                                <ShoppingBag size={12} strokeWidth={1.5} />
                                Add to Bag
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-12 flex items-center justify-center bg-[var(--color-paper)] text-[var(--color-ink)]"
                            >
                                <Eye size={14} strokeWidth={1.5} />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Border Frame */}
                <div className="absolute inset-3 border border-[var(--color-paper)]/0 group-hover:border-[var(--color-paper)]/20 transition-colors pointer-events-none" />
            </motion.div>

            {/* Product Info */}
            <div className="space-y-1">
                <p className="text-[9px] tracking-[0.25em] uppercase text-[var(--color-graphite)]">
                    {product.collection}
                </p>
                <h3 className="font-serif text-base group-hover:text-[var(--color-graphite)] transition-colors">
                    {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                    <p className="font-serif text-sm">₹{product.price.toLocaleString()}</p>
                    <span className="text-[10px] text-[var(--color-concrete)] line-through">
                        ₹{Math.round(product.price * 1.2).toLocaleString()}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export default function ShopSection() {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

    return (
        <section className="py-24 md:py-32 bg-[var(--color-paper)]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-3 h-3 border border-[var(--color-graphite)] rotate-45" />
                            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-graphite)] font-medium">
                                — The Collection —
                            </p>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-ink)]">
                            Shop All
                        </h2>
                    </motion.div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
