import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyTokenAction } from './store/actions/clientActions';
import { fetchCategoriesAction } from './store/actions/productActions';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './layout/Header';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage'; 
import Footer from './layout/Footer';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import AboutPage from './pages/AboutUs';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';


export default function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(verifyTokenAction());
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#252B42]">
      
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
}