import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Search, User, ShoppingBag, X, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { itemCount, setIsOpen } = useCart();

    // Magnetic cursor effect for nav items
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
    const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Shop', href: '#shop' },
        { name: 'Collections', href: '#collections' },
        { name: 'About', href: '#about' },
        { name: 'Journal', href: '#journal' },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-4 shadow-sm' : 'bg-transparent py-6'
                    }`}
            >
                <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="lg:hidden p-2 -ml-2"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                >
                                    <X size={20} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                >
                                    <Menu size={20} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    {/* Left Nav Links - Desktop */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.slice(0, 2).map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="relative text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-charcoal-light)] hover:text-[var(--color-deep-charcoal)] transition-colors py-2"
                                whileHover="hover"
                            >
                                {link.name}
                                <motion.span
                                    className="absolute bottom-0 left-0 h-px bg-[var(--color-deep-charcoal)]"
                                    initial={{ width: 0 }}
                                    variants={{
                                        hover: { width: '100%' }
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* Logo - Center */}
                    <motion.a
                        href="/"
                        whileHover={{ scale: 1.05 }}
                        className="relative font-serif text-2xl lg:text-3xl tracking-[0.15em] text-[var(--color-deep-charcoal)]"
                    >
                        <span className="relative z-10">APRIL</span>
                        <motion.span
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-muted-rose)]"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.a>

                    {/* Right Nav Links - Desktop */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.slice(2).map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="relative text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-charcoal-light)] hover:text-[var(--color-deep-charcoal)] transition-colors py-2"
                                whileHover="hover"
                            >
                                {link.name}
                                <motion.span
                                    className="absolute bottom-0 left-0 h-px bg-[var(--color-deep-charcoal)]"
                                    initial={{ width: 0 }}
                                    variants={{
                                        hover: { width: '100%' }
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 text-[var(--color-charcoal-light)] hover:text-[var(--color-deep-charcoal)] transition-colors"
                            aria-label="Search"
                        >
                            <Search size={18} strokeWidth={1.5} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="hidden sm:block p-3 text-[var(--color-charcoal-light)] hover:text-[var(--color-deep-charcoal)] transition-colors"
                            aria-label="Account"
                        >
                            <User size={18} strokeWidth={1.5} />
                        </motion.button>
                        <motion.button
                            onClick={() => setIsOpen(true)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative p-3 text-[var(--color-charcoal-light)] hover:text-[var(--color-deep-charcoal)] transition-colors"
                            aria-label="Shopping cart"
                        >
                            <ShoppingBag size={18} strokeWidth={1.5} />
                            <AnimatePresence>
                                {itemCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute top-1 right-1 w-4 h-4 bg-[var(--color-muted-rose)] text-white text-[10px] font-semibold rounded-full flex items-center justify-center"
                                    >
                                        {itemCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-[var(--color-cream)] lg:hidden"
                    >
                        <motion.nav
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center justify-center h-full gap-8"
                        >
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="font-serif text-4xl text-[var(--color-deep-charcoal)] hover:text-[var(--color-muted-rose)] transition-colors"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex gap-6 mt-8"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="p-3 text-[var(--color-charcoal-light)]"
                                >
                                    <Search size={24} strokeWidth={1.5} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="p-3 text-[var(--color-charcoal-light)]"
                                >
                                    <User size={24} strokeWidth={1.5} />
                                </motion.button>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
