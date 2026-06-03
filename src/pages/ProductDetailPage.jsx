import React from 'react';
import { ChevronRight, ChevronLeft, Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

import hooliLogo from '../assets/client-logos/hooli.png';
import lyftLogo from '../assets/client-logos/lyft.png';
import stripeLogo from '../assets/client-logos/stripe.png';
import robinhoodLogo from '../assets/client-logos/robinhood.png';
import awsLogo from '../assets/client-logos/aws.png';
import redditLogo from '../assets/client-logos/reddit.png';

const bestsellerProducts = Array(8).fill({
  title: 'Graphic Design',
  department: 'English Department',
  oldPrice: '$16.48',
  newPrice: '$6.48',
  colors: [], 
  img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400'
}).map((p, i) => ({ ...p, id: i + 1 }));

export default function ProductDetailPage() {
  return (
    <div className="w-full bg-white font-sans text-[#252B42]">
      
      {/* 1. BREADCRUMB */}
      <div className="bg-[#FAFAFA] py-[34px] md:py-6 px-8 lg:px-0">
        <div className="max-w-[1050px] mx-auto flex justify-center md:justify-start items-center gap-4 text-[14px] font-bold">
          <Link to="/" className="text-[#252B42] hover:opacity-80 transition-opacity">Home</Link>
          <ChevronRight size={16} className="text-[#BDBDBD]" />
          <Link to="/shop" className="text-[#BDBDBD] hover:text-[#252B42] transition-opacity">Shop</Link>
        </div>
      </div>

      {/* 2. PRODUCT OVERVIEW (Hero Alanı) */}
      <div className="bg-[#FAFAFA] pb-12 px-8 lg:px-0">
        <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row gap-8 lg:gap-10">
          
          {/* Sol Kısım: Resimler */}
          <div className="w-full max-w-[350px] mx-auto md:max-w-none md:w-1/2 flex flex-col gap-4">
            <div className="relative w-full aspect-[4/3] bg-gray-200 overflow-hidden rounded-md">
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800" 
                alt="Product Main" 
                className="w-full h-full object-cover"
              />
              <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition-transform">
                <ChevronLeft size={40} />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition-transform">
                <ChevronRight size={40} />
              </button>
            </div>
            <div className="flex gap-4">
              <div className="w-[100px] h-[75px] overflow-hidden rounded-md cursor-pointer border border-[#23A6F0]">
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=200" alt="Thumb 1" className="w-full h-full object-cover" />
              </div>
              <div className="w-[100px] h-[75px] overflow-hidden rounded-md cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=200" alt="Thumb 2" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Sağ Kısım: Ürün Detayları */}
          <div className="w-full max-w-[350px] mx-auto md:max-w-none md:w-1/2 flex flex-col justify-start text-left pt-2 md:pt-4">
            <h2 className="text-[20px] font-normal tracking-wide text-[#252B42] mb-3">Floating Phone</h2>
            
            <div className="flex items-center gap-2 mb-5">
              <div className="flex text-[#F3CD03]">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} />
              </div>
              <span className="text-[14px] font-bold text-[#737373]">10 Reviews</span>
            </div>
            
            <p className="text-[24px] font-bold text-[#252B42] mb-2">$1,139.33</p>
            
            <div className="flex gap-2 text-[14px] font-bold mb-8">
              <span className="text-[#737373]">Availability  :</span>
              <span className="text-[#23A6F0]">In Stock</span>
            </div>
            
            <p className="text-[14px] text-[#858585] leading-[20px] mb-6">
              Met minim Mollie non desert Alamo est sit cliquey dolor 
              do met sent. RELIT official consequent door ENIM RELIT Mollie. 
              Excitation venial consequent sent nostrum met.
            </p>
            
            <hr className="border-[#BDBDBD] mb-6" />
            
            <div className="flex items-center gap-3 mb-10">
              <span className="w-8 h-8 rounded-full bg-[#23A6F0] cursor-pointer hover:scale-110 transition-transform"></span>
              <span className="w-8 h-8 rounded-full bg-[#2DC071] cursor-pointer hover:scale-110 transition-transform"></span>
              <span className="w-8 h-8 rounded-full bg-[#E77C40] cursor-pointer hover:scale-110 transition-transform"></span>
              <span className="w-8 h-8 rounded-full bg-[#252B42] cursor-pointer hover:scale-110 transition-transform"></span>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-[#23A6F0] text-white text-[14px] font-bold px-6 py-3 rounded-md hover:bg-[#1a8cd1] transition-colors">
                Select Options
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-white border border-[#E8E8E8] rounded-full text-[#252B42] hover:bg-gray-50 transition-colors">
                <Heart size={20} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-white border border-[#E8E8E8] rounded-full text-[#252B42] hover:bg-gray-50 transition-colors">
                <ShoppingCart size={20} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-white border border-[#E8E8E8] rounded-full text-[#252B42] hover:bg-gray-50 transition-colors">
                <Eye size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. PRODUCT DESCRIPTION */}
      <div className="bg-white py-10 px-8 lg:px-0">
        <div className="max-w-[1050px] mx-auto flex flex-col items-center md:items-stretch">
          
          {/* Sekmeler */}
          <div className="w-full max-w-[330px] md:max-w-none flex flex-row flex-wrap justify-center md:justify-center items-center gap-4 md:gap-12 border-b border-[#ECECEC] pb-4 mb-8">
            <span className="text-[14px] font-semibold text-[#737373] cursor-pointer hover:text-[#252B42]">Description</span>
            <span className="text-[14px] font-semibold text-[#737373] cursor-pointer hover:text-[#252B42]">Additional Information</span>
            <span className="text-[14px] font-semibold text-[#737373] cursor-pointer hover:text-[#252B42]">Reviews (0)</span>
          </div>

          {/* İçerik Kolonları */}
          <div className="w-full max-w-[330px] md:max-w-none mx-auto flex flex-col md:flex-row gap-8 lg:gap-[30px]">
            {/* Görsel Kolonu */}
            <div className="w-full md:w-1/3">
              <div className="w-full aspect-square md:aspect-[3/4] lg:h-[392px] bg-gray-100 rounded-md overflow-hidden shadow-sm">
                <img src="https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=600" alt="Detail" className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* Metin Kolonu */}
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <h3 className="text-[24px] font-bold text-[#252B42]">the quick fox jumps over</h3>
              <p className="text-[14px] text-[#737373] leading-[20px]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
              </p>
              <p className="text-[14px] text-[#737373] leading-[20px]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
              </p>
              <p className="text-[14px] text-[#737373] leading-[20px]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
              </p>
            </div>
            
            {/* Liste Kolonu */}
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="text-[24px] font-bold text-[#252B42] mb-2">the quick fox jumps over</h3>
                {[1,2,3,4].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[14px] font-bold text-[#737373]">
                    <ChevronRight size={16} className="text-[#737373]" />
                    the quick fox jumps over the lazy dog
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 mt-2">
                <h3 className="text-[24px] font-bold text-[#252B42] mb-2">the quick fox jumps over</h3>
                {[1,2,3].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[14px] font-bold text-[#737373]">
                    <ChevronRight size={16} className="text-[#737373]" />
                    the quick fox jumps over the lazy dog
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* 4. BESTSELLER PRODUCTS */}
      <div className="bg-[#FAFAFA] py-12 px-8 lg:px-0">
        <div className="max-w-[1050px] mx-auto flex flex-col items-center md:items-stretch">
          
          <h3 className="w-full max-w-[330px] md:max-w-none text-[24px] font-bold text-[#252B42] mb-6 uppercase border-b border-[#ECECEC] pb-6 text-left">
            Bestseller Products
          </h3>
          
          
          <div className="w-full max-w-[330px] md:max-w-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] justify-items-center md:justify-items-start">
            {bestsellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} textAlign="left" />
            ))}
          </div>

        </div>
      </div>

      {/* 5. CLIENT LOGOS */}
     <div className="bg-[#FAFAFA] py-24 md:py-12 px-10 md:px-0 border-b border-[#ECECEC]">
      <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row justify-between items-center gap-[60px] md:gap-6">
        <img src={hooliLogo} alt="Hooli" className="w-[150px] md:w-[103px] object-contain hover:opacity-80 transition-opacity" />
        <img src={lyftLogo} alt="Lyft" className="w-[150px] md:w-[83px] object-contain hover:opacity-80 transition-opacity" />
        <img src={robinhoodLogo} alt="RobinHood" className="w-[150px] md:w-[83px] object-contain hover:opacity-80 transition-opacity" />
        <img src={stripeLogo} alt="Stripe" className="w-[150px] md:w-[102px] object-contain hover:opacity-80 transition-opacity" />
        <img src={awsLogo} alt="AWS" className="w-[150px] md:w-[104px] object-contain hover:opacity-80 transition-opacity" />
        <img src={redditLogo} alt="Reddit" className="w-[150px] md:w-[76px] object-contain hover:opacity-80 transition-opacity" />
      </div>
    </div>

    </div>
  );
}