import { CartProvider } from './context/CartContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
import Collections from './components/Collections';
import ShopSection from './components/ShopSection';
import FeaturedProduct from './components/FeaturedProduct';
import BrandEthos from './components/BrandEthos';
import Footer from './components/Footer';

function AppContent() {
    // Initialize butter-smooth scrolling
    useSmoothScroll();

    return (
        <div className="min-h-screen bg-[var(--color-paper)]">
            {/* Navigation */}
            <Navbar />

            {/* Cart Drawer */}
            <CartDrawer />

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <Hero />

                {/* Curated Collections */}
                <Collections />

                {/* Featured Product Spotlight */}
                <FeaturedProduct />

                {/* Shop All Products */}
                <ShopSection />

                {/* Brand Ethos */}
                <BrandEthos />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

function App() {
    return (
        <CartProvider>
            <AppContent />
        </CartProvider>
    );
}

export default App;
