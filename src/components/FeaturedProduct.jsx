import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check, Heart, Share2, Truck } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function FeaturedProduct() {
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedSize, setSelectedSize] = useState('M');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { addItem } = useCart();

    const product = products[0]; // The Twilight Dress
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    const handleAddToCart = () => {
        if (isLoading || isAdded) return;
        setIsLoading(true);

        setTimeout(() => {
            addItem({ ...product, size: selectedSize });
            setIsLoading(false);
            setIsAdded(true);

            setTimeout(() => {
                setIsAdded(false);
            }, 3000);
        }, 1200);
    };

    return (
        <section ref={ref} id="shop" className="py-32 md:py-40 bg-[var(--color-warm-white)] relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-muted-rose)]/5 via-transparent to-[var(--color-silver-mist)]/5" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        {/* Main Image */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                            className="relative aspect-[4/5] bg-[var(--color-shadow-pearl)] overflow-hidden rounded-sm"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="absolute top-6 left-6 bg-[var(--color-deep-charcoal)] text-[var(--color-cream)] px-4 py-2 rounded-sm"
                            >
                                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">{product.badge}</span>
                            </motion.div>

                            {/* Wishlist Button */}
                            <motion.button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute top-6 right-6 w-10 h-10 bg-[var(--color-cream)] rounded-full flex items-center justify-center shadow-lg"
                            >
                                <Heart
                                    size={18}
                                    className={isWishlisted ? 'fill-[var(--color-muted-rose)] text-[var(--color-muted-rose)]' : 'text-[var(--color-charcoal-light)]'}
                                />
                            </motion.button>
                        </motion.div>

                        {/* Thumbnail Strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex gap-4 mt-4"
                        >
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    className={`w-20 h-24 bg-[var(--color-shadow-pearl)] rounded-sm overflow-hidden cursor-pointer ${i === 1 ? 'ring-2 ring-[var(--color-deep-charcoal)]' : 'opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <div className="h-px w-8 bg-[var(--color-muted-rose)]" />
                            <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-muted-rose)] font-medium">
                                Featured Piece
                            </p>
                        </motion.div>

                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
                            {product.name}
                        </h2>

                        <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-charcoal-light)] mb-6">
                            {product.collection} Collection
                        </p>

                        <p className="text-lg text-[var(--color-charcoal-light)] leading-relaxed mb-8 max-w-md">
                            {product.description} Crafted from premium sustainable fabric with hand-finished
                            details that whisper elegance with every movement.
                        </p>

                        {/* Size Selector */}
                        <div className="mb-8">
                            <p className="text-xs tracking-[0.2em] uppercase font-medium mb-4">Select Size</p>
                            <div className="flex gap-3">
                                {sizes.map((size) => (
                                    <motion.button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-12 h-12 flex items-center justify-center text-sm font-medium transition-all ${selectedSize === size
                                                ? 'bg-[var(--color-deep-charcoal)] text-[var(--color-cream)]'
                                                : 'border border-[var(--color-charcoal-light)]/30 text-[var(--color-charcoal-light)] hover:border-[var(--color-deep-charcoal)]'
                                            }`}
                                    >
                                        {size}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-4 mb-10 py-6 border-y border-[var(--color-shadow-pearl)]">
                            <div>
                                <span className="text-xs tracking-wider uppercase text-[var(--color-charcoal-light)] block mb-1">
                                    Fabric
                                </span>
                                <span className="text-sm">{product.fabric}</span>
                            </div>
                            <div>
                                <span className="text-xs tracking-wider uppercase text-[var(--color-charcoal-light)] block mb-1">
                                    Made In
                                </span>
                                <span className="text-sm">Nagaland, India</span>
                            </div>
                        </div>

                        {/* Price & CTA */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-baseline gap-4">
                                <p className="font-serif text-4xl">₹{product.price.toLocaleString()}</p>
                                <span className="text-sm text-[var(--color-charcoal-light)] line-through">₹{(product.price * 1.2).toLocaleString()}</span>
                                <span className="text-xs tracking-wider uppercase bg-[var(--color-muted-rose)]/20 text-[var(--color-muted-rose)] px-2 py-1 rounded-sm">
                                    20% Off
                                </span>
                            </div>

                            <div className="flex gap-4">
                                <motion.button
                                    onClick={handleAddToCart}
                                    disabled={isLoading}
                                    whileHover={{ scale: isLoading || isAdded ? 1 : 1.02 }}
                                    whileTap={{ scale: isLoading || isAdded ? 1 : 0.98 }}
                                    className={`flex-1 relative px-10 py-5 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 overflow-hidden ${isAdded
                                            ? 'bg-green-600 text-white'
                                            : 'bg-[var(--color-deep-charcoal)] text-[var(--color-cream)] hover:bg-[var(--color-charcoal-light)]'
                                        }`}
                                >
                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.span
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center justify-center gap-3"
                                            >
                                                <span className="spinner" />
                                                Adding to Bag...
                                            </motion.span>
                                        ) : isAdded ? (
                                            <motion.span
                                                key="added"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <Check size={18} />
                                                Added Successfully!
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                key="default"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                Add to Bag
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-14 h-14 flex items-center justify-center border border-[var(--color-charcoal-light)]/30 text-[var(--color-charcoal-light)] hover:border-[var(--color-deep-charcoal)] hover:text-[var(--color-deep-charcoal)] transition-colors"
                                >
                                    <Share2 size={18} />
                                </motion.button>
                            </div>

                            {/* Shipping Info */}
                            <div className="flex items-center gap-3 text-sm text-[var(--color-charcoal-light)]">
                                <Truck size={18} />
                                <span>Free shipping on orders above ₹2,000</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
