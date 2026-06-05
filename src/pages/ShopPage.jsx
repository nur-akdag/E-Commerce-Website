import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChevronRight, LayoutGrid, List, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard'; 
import { fetchProductsAction } from '../store/actions/productActions';

import hooliLogo from '../assets/client-logos/hooli.png';
import lyftLogo from '../assets/client-logos/lyft.png';
import stripeLogo from '../assets/client-logos/stripe.png';
import robinhoodLogo from '../assets/client-logos/robinhood.png';
import awsLogo from '../assets/client-logos/aws.png';
import redditLogo from '../assets/client-logos/reddit.png';

export default function ShopPage() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const { productList, total, fetchState, categories } = useSelector(state => state.product);

 
  const [localSort, setLocalSort] = useState('');
  const [activeSort, setActiveSort] = useState('');

  
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12; 
  const totalPages = Math.ceil((total || 0) / limit);

  const handleFilterClick = () => {
    setActiveSort(localSort);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);
  
  useEffect(() => {
    const params = {
      limit: limit,
      offset: (currentPage - 1) * limit
    };
    
    if (categoryId) params.category = categoryId;
    if (activeSort) params.sort = activeSort;

    dispatch(fetchProductsAction(params));

    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  }, [categoryId, activeSort, currentPage, dispatch]);

  const top5Categories = categories && categories.length > 0 
    ? [...categories]
        .filter(cat => cat.title && !cat.title.includes('Yükleniyor'))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5)
    : Array.from({ length: 5 }, (_, index) => ({
        id: `skeleton-${index}`, 
        title: 'KATEGORİ YÜKLENİYOR...', 
        rating: 0, 
        img: 'https://via.placeholder.com/400'
      }));

  
  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage === 1) pages = [1, 2, 3];
      else if (currentPage === totalPages) pages = [totalPages - 2, totalPages - 1, totalPages];
      else pages = [currentPage - 1, currentPage, currentPage + 1];
    }
    return pages;
  };

  return (
    <div className="w-full bg-white font-sans text-[#252B42]">
      
      {/* SECTION 1: BREADCRUMB */}
      <div className="bg-[#FAFAFA] pt-[48px] pb-[34px] md:py-6 px-10 md:px-0">
        <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row justify-between items-center gap-[54px] md:gap-4">
          <h2 className="text-[24px] font-bold leading-[32px] tracking-[0.1px] text-center">Shop</h2>
          <div className="flex items-center gap-1 text-[14px] font-bold">
            <a href="/" className="hover:opacity-80">Home</a>
            <ChevronRight size={14} className="text-[#BDBDBD]" />
            <span className="text-[#BDBDBD]">Shop</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: CATEGORIES */}
      <div className="bg-[#FAFAFA] pb-12 px-10 md:px-0">
        <div className="max-w-[1088px] mx-auto flex flex-wrap justify-center gap-[15px]">
          {top5Categories.map((cat, index) => (
            <div key={cat.id || index} className="relative w-[330px] h-[300px] md:w-[205px] md:h-[225px] overflow-hidden group cursor-pointer bg-gray-200">
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/25 flex flex-col justify-center items-center text-white">
                <h3 className="text-[16px] font-bold leading-[24px] tracking-[0.1px] text-center uppercase">{cat.title}</h3>
                <p className="text-[14px] font-normal leading-[20px] tracking-[0.2px] mt-1 text-center">Rating: {cat.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: FILTER ROW */}
      <div className="py-6 px-10 md:px-0 border-b border-[#ECECEC]">
        <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[14px] font-bold text-[#737373]">Showing all {total || 0} results</p>
          
          <div className="flex items-center gap-4">
            <span className="text-[14px] font-bold text-[#737373]">Views:</span>
            <button className="p-2.5 border border-[#ECECEC] rounded-md text-[#252B42] hover:bg-[#FAFAFA]"><LayoutGrid size={16} /></button>
            <button className="p-2.5 border border-[#ECECEC] rounded-md text-[#737373] hover:bg-[#FAFAFA]"><List size={16} /></button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
           
            <select 
              value={localSort}
              onChange={(e) => setLocalSort(e.target.value)}
              className="h-[50px] bg-[#F9F9F9] border border-[#DDDDDD] rounded-md px-4 text-[14px] text-[#737373] outline-none cursor-pointer focus:border-[#23A6F0]"
            >
              <option value="">Sort By</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:asc">Rating: Low to High</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>
            <button 
              onClick={handleFilterClick}
              className="h-[50px] bg-[#23A6F0] text-white text-[14px] font-bold px-6 rounded-md hover:bg-[#1a8cd1] transition-colors shadow-sm cursor-pointer"
            >
              Filter
            </button>
          </div>

        </div>
      </div>

      {/* SECTION 4: PRODUCT CARDS GRID */}
      <div className="py-12 px-10 md:px-0 min-h-[400px]">
        <div className="max-w-[1050px] mx-auto">
          
          {fetchState === 'FETCHING' && (
            <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-[#23A6F0]" size={40} />
              <span className="text-[#737373] font-bold">Loading Products...</span>
            </div>
          )}

          {fetchState === 'FAILED' && (
            <div className="w-full text-center py-10 bg-[#FFEBEB] text-[#E74C3C] font-bold rounded-md">
              Failed to load products. Please try again.
            </div>
          )}

          {fetchState === 'FETCHED' && productList.length === 0 && (
            <div className="w-full text-center py-10 text-[#737373] font-bold text-[18px]">
              No products found matching your criteria.
            </div>
          )}

          {fetchState === 'FETCHED' && productList.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[30px] gap-y-12 justify-items-center">
                {productList.slice(0, limit).map((apiProduct, index) => {
                  const mappedProduct = {
                    id: apiProduct.id,
                    title: apiProduct.name,
                    department: apiProduct.description,
                    oldPrice: `$${(apiProduct.price * 1.2).toFixed(2)}`,
                    newPrice: `$${apiProduct.price.toFixed(2)}`,
                    colors: ['bg-[#23A6F0]', 'bg-[#23856D]', 'bg-[#E77C40]', 'bg-[#252B42]'],
                    img: apiProduct.images?.[0]?.url || 'https://via.placeholder.com/400'
                  };
                  return (
                    
                    <div key={mappedProduct.id} className={`w-full flex justify-center ${index >= 4 ? 'hidden sm:flex' : 'flex'}`}>
                      <ProductCard product={mappedProduct} />
                    </div>
                  );
                })}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-16 px-4">
                 
                  <div className="flex border border-[#BDBDBD] rounded-md font-bold text-[12px] sm:text-[14px] text-[#23A6F0] overflow-hidden divide-x divide-[#BDBDBD] shadow-sm max-w-full overflow-x-auto">
                    
                    {/* İlk Sayfaya Git (First) */}
                    <button 
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="px-3 sm:px-5 py-4 text-[#BDBDBD] bg-[#F3F3F3] hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                    >
                      First
                    </button>
                    
                    {/* Bir Önceki Sayfa (Prev) */}
                    <button 
                      onClick={() => setCurrentPage(prev => prev - 1)}
                      disabled={currentPage === 1}
                      className="px-3 sm:px-5 py-4 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                    >
                      Prev
                    </button>
                    
                    {/* Dinamik Sayfa Numaraları */}
                    {getPageNumbers().map(page => (
                      <button 
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 sm:px-5 py-4 cursor-pointer transition-colors whitespace-nowrap ${
                          currentPage === page 
                            ? 'bg-[#23A6F0] text-white cursor-default' 
                            : 'hover:bg-gray-50 text-[#23A6F0]'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    {/* Bir Sonraki Sayfa (Next) */}
                    <button 
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 sm:px-5 py-4 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                    >
                      Next
                   </button>

                  </div>
                </div>
              )} 
              
            </> 
          )} 
          
        </div> 
      </div> 


      {/* SECTION 5: CLIENT LOGOS */}
      <div className="bg-[#FAFAFA] py-24 md:py-12 px-10 md:px-0 border-b border-[#ECECEC]">
        <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row justify-between items-center gap-[60px] md:gap-6">
          <img src={hooliLogo} alt="Hooli" className="w-[150px] md:w-[103px] object-contain hover:opacity-80 transition-opacity cursor-pointer" />
          <img src={lyftLogo} alt="Lyft" className="w-[150px] md:w-[83px] object-contain hover:opacity-80 transition-opacity cursor-pointer" />
          <img src={robinhoodLogo} alt="RobinHood" className="w-[150px] md:w-[83px] object-contain hover:opacity-80 transition-opacity cursor-pointer" />
          <img src={stripeLogo} alt="Stripe" className="w-[150px] md:w-[102px] object-contain hover:opacity-80 transition-opacity cursor-pointer" />
          <img src={awsLogo} alt="AWS" className="w-[150px] md:w-[104px] object-contain hover:opacity-80 transition-opacity cursor-pointer" />
          <img src={redditLogo} alt="Reddit" className="w-[150px] md:w-[76px] object-contain hover:opacity-80 transition-opacity cursor-pointer" />
        </div>
      </div>

    </div>
  );
  }
