import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
import Collections from './components/Collections';
import ShopSection from './components/ShopSection';
import FeaturedProduct from './components/FeaturedProduct';
import BrandEthos from './components/BrandEthos';
import Footer from './components/Footer';

function App() {
    return (
        <CartProvider>
            <div className="min-h-screen bg-[var(--color-cream)]">
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
        </CartProvider>
    );
}

export default App;
