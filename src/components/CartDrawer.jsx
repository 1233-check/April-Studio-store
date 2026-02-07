import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, total, updateQuantity, removeItem } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-50 drawer-overlay"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[var(--color-cream)] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--color-shadow-pearl)]">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={20} strokeWidth={1.5} />
                                <h2 className="font-serif text-xl">Your Bag</h2>
                                <span className="text-xs bg-[var(--color-deep-charcoal)] text-[var(--color-cream)] rounded-full w-5 h-5 flex items-center justify-center">
                                    {items.length}
                                </span>
                            </div>
                            <motion.button
                                onClick={() => setIsOpen(false)}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 -mr-2 text-[var(--color-charcoal-light)] hover:text-[var(--color-deep-charcoal)] transition-colors"
                                aria-label="Close cart"
                            >
                                <X size={20} strokeWidth={1.5} />
                            </motion.button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center h-full text-center"
                                >
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <ShoppingBag size={64} strokeWidth={0.5} className="text-[var(--color-soft-silver)] mb-6" />
                                    </motion.div>
                                    <h3 className="font-serif text-xl mb-2">Your bag is empty</h3>
                                    <p className="text-sm text-[var(--color-charcoal-light)] mb-6 max-w-[200px]">
                                        Discover our curated collections and find your next favorite piece.
                                    </p>
                                    <motion.button
                                        onClick={() => setIsOpen(false)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn-outline"
                                    >
                                        Start Shopping
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <div className="space-y-6">
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ delay: index * 0.1 }}
                                            layout
                                            className="group flex gap-4 p-4 bg-[var(--color-warm-white)] rounded-sm"
                                        >
                                            {/* Product Image */}
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className="w-24 h-32 bg-[var(--color-shadow-pearl)] overflow-hidden rounded-sm shrink-0"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>

                                            {/* Product Info */}
                                            <div className="flex-1 flex flex-col">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-serif text-base">{item.name}</h3>
                                                        <p className="text-xs text-[var(--color-charcoal-light)] mt-0.5">
                                                            {item.collection}
                                                        </p>
                                                        {item.size && (
                                                            <p className="text-xs text-[var(--color-charcoal-light)] mt-1">
                                                                Size: {item.size}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <motion.button
                                                        onClick={() => removeItem(item.id)}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="p-1 text-[var(--color-charcoal-light)] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 size={16} />
                                                    </motion.button>
                                                </div>

                                                <div className="mt-auto flex items-center justify-between">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-1 bg-[var(--color-cream)] rounded-sm">
                                                        <motion.button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="p-2 text-[var(--color-charcoal-light)] hover:text-[var(--color-deep-charcoal)]"
                                                        >
                                                            <Minus size={14} />
                                                        </motion.button>
                                                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                                        <motion.button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="p-2 text-[var(--color-charcoal-light)] hover:text-[var(--color-deep-charcoal)]"
                                                        >
                                                            <Plus size={14} />
                                                        </motion.button>
                                                    </div>

                                                    {/* Price */}
                                                    <p className="font-serif text-base">
                                                        ₹{(item.price * item.quantity).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="p-6 border-t border-[var(--color-shadow-pearl)] bg-[var(--color-warm-white)]"
                            >
                                {/* Subtotal */}
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-[var(--color-charcoal-light)]">Subtotal</span>
                                    <span className="font-serif text-lg">₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-sm text-[var(--color-charcoal-light)]">Shipping</span>
                                    <span className="text-sm text-green-600">
                                        {total >= 2000 ? 'Free' : '₹150'}
                                    </span>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center mb-6 py-4 border-t border-[var(--color-shadow-pearl)]">
                                    <span className="text-sm uppercase tracking-wider font-medium">Total</span>
                                    <span className="font-serif text-2xl">
                                        ₹{(total >= 2000 ? total : total + 150).toLocaleString()}
                                    </span>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-[var(--color-deep-charcoal)] text-[var(--color-cream)] py-5 text-xs font-medium tracking-[0.15em] uppercase flex items-center justify-center gap-3 hover:bg-[var(--color-charcoal-light)] transition-colors"
                                >
                                    Proceed to Checkout
                                    <ArrowRight size={16} />
                                </motion.button>

                                <p className="text-center text-xs text-[var(--color-charcoal-light)] mt-4">
                                    Secure checkout • Free returns within 14 days
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
