import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram, Mail, ArrowRight, MapPin } from 'lucide-react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setEmail('');
            setTimeout(() => setIsSubmitted(false), 3000);
        }
    };

    const footerLinks = {
        Shop: ['New Arrivals', 'Collections', 'Best Sellers'],
        Help: ['Size Guide', 'Shipping', 'Returns'],
        About: ['Our Story', 'Sustainability', 'Journal'],
    };

    return (
        <footer ref={ref} className="bg-[var(--color-ink)] text-[var(--color-stone)] pt-24 pb-8 relative overflow-hidden">
            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(var(--color-paper) 1px, transparent 1px),
                           linear-gradient(90deg, var(--color-paper) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
                {/* Newsletter - Retro Style */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="text-center mb-24 pb-24 border-b border-[var(--color-graphite)]/30"
                >
                    {/* Decorative Element */}
                    <motion.div
                        initial={{ scale: 0, rotate: 45 }}
                        animate={isInView ? { scale: 1, rotate: 45 } : {}}
                        transition={{ delay: 0.2 }}
                        className="w-4 h-4 border border-[var(--color-stone)] mx-auto mb-8"
                    />

                    <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-graphite)] mb-6 font-medium">
                        — Join the Community —
                    </p>

                    <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-paper)] mb-6">
                        Stay in the Loop
                    </h3>
                    <p className="text-[var(--color-cool-grey)] mb-10 max-w-md mx-auto text-sm leading-relaxed">
                        Subscribe for new drops, exclusive offers, and stories from the studio.
                    </p>

                    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                        <div className="flex border border-[var(--color-graphite)] bg-transparent">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                className="flex-1 bg-transparent px-4 py-4 text-sm text-[var(--color-paper)] placeholder:text-[var(--color-graphite)] focus:outline-none"
                            />
                            <motion.button
                                type="submit"
                                whileHover={{ backgroundColor: 'var(--color-graphite)' }}
                                className="px-6 text-[var(--color-paper)] border-l border-[var(--color-graphite)] transition-colors"
                                aria-label="Subscribe"
                            >
                                <ArrowRight size={18} strokeWidth={1.5} />
                            </motion.button>
                        </div>
                    </form>

                    {isSubmitted && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-[var(--color-stone)] mt-4 tracking-wider"
                        >
                            Thank you for subscribing
                        </motion.p>
                    )}
                </motion.div>

                {/* Main Footer Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16"
                >
                    {/* Logo & Description */}
                    <div className="col-span-2">
                        <a href="/" className="font-serif text-3xl tracking-[0.2em] text-[var(--color-paper)] block mb-6">
                            APRIL
                        </a>
                        <p className="text-sm text-[var(--color-graphite)] mb-8 max-w-xs leading-relaxed">
                            Art you can wear. Stories you can feel. Artisanal fashion from the hills of Nagaland.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-xs text-[var(--color-graphite)]">
                            <div className="flex items-center gap-3">
                                <MapPin size={14} strokeWidth={1.5} />
                                <span>Kohima, Nagaland</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={14} strokeWidth={1.5} />
                                <span>hello@theaprilstudio.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-[10px] tracking-[0.3em] uppercase font-medium mb-6 text-[var(--color-stone)]">
                                {title}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <motion.a
                                            href="#"
                                            whileHover={{ x: 4 }}
                                            className="text-sm text-[var(--color-graphite)] hover:text-[var(--color-paper)] transition-colors inline-block"
                                        >
                                            {link}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </motion.div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[var(--color-graphite)]/30 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-[var(--color-graphite)] tracking-wider">
                    <p>© 2026 The April Studio. All rights reserved.</p>

                    {/* Instagram Link - Prominent */}
                    <motion.a
                        href="https://www.instagram.com/april.nagaland"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 text-[var(--color-stone)] hover:text-[var(--color-paper)] transition-colors"
                    >
                        <Instagram size={18} strokeWidth={1.5} />
                        <span className="text-xs tracking-[0.15em] uppercase">@april.nagaland</span>
                    </motion.a>

                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[var(--color-paper)] transition-colors uppercase">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-[var(--color-paper)] transition-colors uppercase">
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
