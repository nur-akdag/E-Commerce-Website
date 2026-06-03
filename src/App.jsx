import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage'; 
import Footer from './layout/Footer';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import AboutPage from './pages/AboutUs';


export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#252B42]">
      
      <Header />
      
      
      <main className="flex-grow">
        <Routes>
        
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/about" element={<AboutPage />} />

        </Routes>
      </main>
    
      <Footer />

    </div>
  );
}