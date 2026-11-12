import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { BuyPage } from './pages/BuyPage';
import { RentPage } from './pages/RentPage';
import { SellPage } from './pages/SellPage';
import { ConstructionPage } from './pages/ConstructionPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);

  return (
    <PropertyProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1D2733] antialiased">
          {/* Top Navigation Bar */}
          <Navbar onOpenFavorites={() => setFavoritesDrawerOpen(true)} />

          {/* Main Page Routes */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/properties/:slug" element={<PropertyDetailPage />} />
              <Route path="/buy" element={<BuyPage />} />
              <Route path="/rent" element={<RentPage />} />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/construction" element={<ConstructionPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Luxury 4-Column Footer */}
          <Footer />

          {/* Persistent Floating WhatsApp & Call Widget */}
          <FloatingWhatsApp />

          {/* Saved Properties Slide-Over Wishlist */}
          <FavoritesDrawer
            isOpen={favoritesDrawerOpen}
            onClose={() => setFavoritesDrawerOpen(false)}
          />

          {/* Smooth Scroll to Top */}
          <ScrollToTop />
        </div>
      </BrowserRouter>
    </PropertyProvider>
  );
}
