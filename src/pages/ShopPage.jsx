import React from 'react';
import { ChevronRight, LayoutGrid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard'; 

import hooliLogo from '../assets/client-logos/hooli.png';
import lyftLogo from '../assets/client-logos/lyft.png';
import stripeLogo from '../assets/client-logos/stripe.png';
import robinhoodLogo from '../assets/client-logos/robinhood.png';
import awsLogo from '../assets/client-logos/aws.png';
import redditLogo from '../assets/client-logos/reddit.png';

// Mock Data - Kategoriler
const categories = [
  { id: 1, title: 'CLOTHS', items: '5 Items', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400' },
  { id: 2, title: 'CLOTHS', items: '5 Items', img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=400' },
  { id: 3, title: 'CLOTHS', items: '5 Items', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400' },
  { id: 4, title: 'CLOTHS', items: '5 Items', img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=400' },
  { id: 5, title: 'CLOTHS', items: '5 Items', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400' },
];

const products = Array(12).fill({
  id: 1,
  title: 'Graphic Design',
  department: 'English Department',
  oldPrice: '$16.48',
  newPrice: '$6.48',
  colors: ['bg-[#23A6F0]', 'bg-[#23856D]', 'bg-[#E77C40]', 'bg-[#252B42]'],
  img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400'
}).map((p, i) => ({ ...p, id: i + 1 }));

export default function ShopPage() {
  return (

    <div className="w-full bg-white font-sans text-[#252B42]">
      
      {/* SECTION 1: BREADCRUMB ROW */}
      
      <div className="bg-[#FAFAFA] pt-[48px] pb-[34px] md:py-6 px-10 md:px-0">
        
        <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row justify-between items-center gap-[54px] md:gap-4">
          
          <h2 className="text-[24px] font-bold leading-[32px] tracking-[0.1px] text-center">
            Shop
          </h2>
          
          <div className="flex items-center gap-1 text-[14px] font-bold">
            <a href="/" className="hover:opacity-80">Home</a>
            <ChevronRight size={14} className="text-[#BDBDBD]" />
            <span className="text-[#BDBDBD]">Shop</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: CATEGORIES  */}
      <div className="bg-[#FAFAFA] pb-12 px-10 md:px-0">
        <div className="max-w-[1088px] mx-auto flex flex-wrap justify-center gap-[15px]">
          {categories.map((cat) => (
            
            <div key={cat.id} className="relative w-[330px] h-[300px] md:w-[205px] md:h-[225px] overflow-hidden group cursor-pointer">
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/25 flex flex-col justify-center items-center text-white">
                
                <h3 className="text-[16px] font-bold leading-[24px] tracking-[0.1px] text-center">
                  {cat.title}
                </h3>
                
                <p className="text-[14px] font-normal leading-[20px] tracking-[0.2px] mt-1 text-center">
                  {cat.items}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: FILTER ROW */}
      <div className="py-6 px-10 md:px-0">
        <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[14px] font-bold text-[#737373]">Showing all 12 results</p>
          <div className="flex items-center gap-4">
            <span className="text-[14px] font-bold text-[#737373]">Views:</span>
            <button className="p-2.5 border border-[#ECECEC] rounded-md text-[#252B42] hover:bg-[#FAFAFA]">
              <LayoutGrid size={16} />
            </button>
            <button className="p-2.5 border border-[#ECECEC] rounded-md text-[#737373] hover:bg-[#FAFAFA]">
              <List size={16} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            {/* Popularity */}
            <select className="w-[140px] h-[50px] bg-[#F9F9F9] border border-[#DDDDDD] rounded-md px-10 text-[14px] text-[#737373] font-normal outline-none cursor-pointer">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <button className="h-[50px] bg-[#23A6F0] text-white text-[14px] font-bold px-6 rounded-md hover:bg-[#1a8cd1] transition-colors">
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4: PRODUCT CARDS GRID */}
      <div className="py-12 px-10 md:px-0">
        <div className="max-w-[1050px] mx-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[30px] gap-y-12 justify-items-center">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="flex justify-center mt-16">
            <div className="w-[310px] h-[75px] flex border border-[#BDBDBD] rounded-md font-bold text-[14px] text-[#23A6F0]">
              <button className="flex-1 text-[#BDBDBD] bg-[#F3F3F3] border-r border-[#BDBDBD] rounded-l-md hover:bg-gray-200">First</button>
              <button className="flex-1 border-r border-[#BDBDBD] hover:bg-gray-50">1</button>
              <button className="flex-1 border-r border-[#BDBDBD] bg-[#23A6F0] text-white">2</button>
              <button className="flex-1 border-r border-[#BDBDBD] hover:bg-gray-50">3</button>
              <button className="flex-1 rounded-r-md hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: CLIENT LOGOS */}
      
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