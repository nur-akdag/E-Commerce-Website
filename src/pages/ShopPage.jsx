import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, LayoutGrid, List, Loader2, Search, Filter, X } from 'lucide-react';
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
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { productList, total, fetchState, categories } = useSelector(state => state.product);

  const [localSort, setLocalSort] = useState('');
  const [activeSort, setActiveSort] = useState('');
  const [localFilterText, setLocalFilterText] = useState('');
  const [activeFilterText, setActiveFilterText] = useState('');
  
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12; 
  const totalPages = Math.ceil((total || 0) / limit);

  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setActiveSort(localSort);
    setActiveFilterText(localFilterText);
    setCurrentPage(1); 
    setIsFilterOpen(false); 
  };

  useEffect(() => {
    setCurrentPage(1);
    setLocalFilterText('');
    setActiveFilterText('');
    setLocalSort('');
    setActiveSort('');
  }, [categoryId]);
  
  useEffect(() => {
    const params = {
      limit: limit,
      offset: (currentPage - 1) * limit
    };
    
    if (categoryId) params.category = categoryId;
    if (activeSort) params.sort = activeSort;
    if (activeFilterText) params.filter = activeFilterText;

    dispatch(fetchProductsAction(params));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  }, [categoryId, activeSort, activeFilterText, currentPage, dispatch]);

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
    <div className="w-full bg-white font-sans text-[#252B42] relative">
      
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

      {/* SECTION 2: TOP CATEGORIES */}
      <div className="bg-[#FAFAFA] pb-12 px-10 md:px-0">
        <div className="max-w-[1088px] mx-auto flex flex-wrap justify-center gap-[15px]">
          {top5Categories.map((cat, index) => (
            <div 
              key={cat.id || index} 
              onClick={() => {
                const gender = cat.code?.startsWith('k:') ? 'kadin' : 'erkek';
                const catSlug = cat.code?.includes(':') ? cat.code.split(':')[1] : cat.code;
                navigate(`/shop/${gender}/${catSlug}/${cat.id}`);
              }}
              className="relative w-[330px] h-[300px] md:w-[205px] md:h-[225px] overflow-hidden group cursor-pointer bg-gray-200"
            >
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/25 flex flex-col justify-center items-center text-white">
                <h3 className="text-[16px] font-bold leading-[24px] tracking-[0.1px] text-center uppercase">{cat.title}</h3>
                <p className="text-[14px] font-normal leading-[20px] tracking-[0.2px] mt-1 text-center">Rating: {cat.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: TOP FILTER ROW */}
      <div className="py-6 px-10 md:px-0 border-b border-[#ECECEC]">
        <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[14px] font-bold text-[#737373]">Showing all {total || 0} results</p>
          
          <div className="flex items-center gap-4">
            <span className="text-[14px] font-bold text-[#737373]">Views:</span>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2.5 border rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#23A6F0] text-white border-[#23A6F0]' : 'border-[#ECECEC] text-[#252B42] hover:bg-[#FAFAFA]'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2.5 border rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#23A6F0] text-white border-[#23A6F0]' : 'border-[#ECECEC] text-[#737373] hover:bg-[#FAFAFA]'}`}
            >
              <List size={16} />
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Arama Kutusu */}
            <div className="relative w-full md:w-[180px]">
              <input 
                type="text" 
                placeholder="Search..." 
                value={localFilterText}
                onChange={(e) => setLocalFilterText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFilterClick()}
                className="w-full h-[50px] bg-[#F9F9F9] border border-[#DDDDDD] rounded-md pl-10 pr-4 text-[14px] outline-none focus:border-[#23A6F0]"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
            </div>

            {/* Sıralama */}
            <select 
              value={localSort}
              onChange={(e) => setLocalSort(e.target.value)}
              className="h-[50px] bg-[#F9F9F9] border border-[#DDDDDD] rounded-md px-4 text-[14px] text-[#737373] outline-none cursor-pointer focus:border-[#23A6F0] w-full md:w-auto"
            >
              <option value="">Sort By</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:asc">Rating: Low to High</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>
            
            <button 
              onClick={handleFilterClick}
              className="h-[50px] bg-[#23A6F0] text-white text-[14px] font-bold px-6 rounded-md hover:bg-[#1a8cd1] transition-colors shadow-sm cursor-pointer w-full md:w-auto"
            >
              Apply
            </button>

            
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="h-[50px] border border-[#DDDDDD] px-5 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 text-[#252B42] font-bold w-full md:w-auto transition-colors"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4: MAIN LAYOUT */}
      <div className="py-12 px-4 md:px-0 min-h-[400px]">
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
            <div className="w-full text-center py-20 border border-dashed border-gray-300 rounded-lg flex flex-col items-center gap-4">
              <p className="text-[#737373] font-bold text-[18px]">No products found matching your criteria.</p>
              <button 
                onClick={() => {
                  setLocalFilterText('');
                  setActiveFilterText('');
                  setLocalSort('');
                  setActiveSort('');
                }} 
                className="px-6 py-2 bg-[#23A6F0] text-white rounded font-bold hover:bg-[#1a8cd1]"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {fetchState === 'FETCHED' && productList.length > 0 && (
            <>
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[30px] gap-y-12 justify-items-center" 
                  : "flex flex-col gap-6"
              }>
                {productList.slice(0, limit).map((apiProduct) => {
                  const mappedProduct = {
                    id: apiProduct.id,
                    title: apiProduct.name,
                    department: apiProduct.description,
                    oldPrice: `$${(apiProduct.price * 1.2).toFixed(2)}`,
                    newPrice: `$${apiProduct.price.toFixed(2)}`,
                    colors: ['bg-[#23A6F0]', 'bg-[#23856D]', 'bg-[#E77C40]', 'bg-[#252B42]'],
                    img: apiProduct.images?.[0]?.url || 'https://via.placeholder.com/400',
                    category_id: apiProduct.category_id
                  };
                  
                  return (
                    <div key={mappedProduct.id} className={viewMode === 'grid' ? "w-full flex justify-center" : "w-full"}>
                      {viewMode === 'grid' ? (
                        <ProductCard product={mappedProduct} />
                      ) : (
                        <div className="flex flex-col md:flex-row border border-[#ECECEC] rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white w-full">
                          <img src={mappedProduct.img} alt={mappedProduct.title} className="w-full md:w-[250px] h-[250px] object-cover cursor-pointer" onClick={() => navigate(`/shop/category/details/${mappedProduct.id}`)} />
                          <div className="p-6 flex flex-col justify-center flex-1">
                            <h3 className="text-xl font-bold text-[#252B42] cursor-pointer hover:text-[#23A6F0]" onClick={() => navigate(`/shop/category/details/${mappedProduct.id}`)}>{mappedProduct.title}</h3>
                            <p className="text-[#737373] text-sm mt-3 mb-6 line-clamp-3 leading-relaxed">{mappedProduct.department}</p>
                            <div className="flex items-center gap-4">
                              <span className="text-[#BDBDBD] font-bold line-through text-lg">{mappedProduct.oldPrice}</span>
                              <span className="text-[#23856D] font-bold text-2xl">{mappedProduct.newPrice}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-16 px-4">
                  <div className="flex border border-[#BDBDBD] rounded-md font-bold text-[12px] sm:text-[14px] text-[#23A6F0] overflow-hidden divide-x divide-[#BDBDBD] shadow-sm max-w-full overflow-x-auto">
                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="px-3 sm:px-5 py-4 text-[#BDBDBD] bg-[#F3F3F3] hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap">
                      First
                    </button>
                    <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1} className="px-3 sm:px-5 py-4 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap">
                      Prev
                    </button>
                    {getPageNumbers().map(page => (
                      <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 sm:px-5 py-4 cursor-pointer transition-colors whitespace-nowrap ${currentPage === page ? 'bg-[#23A6F0] text-white cursor-default' : 'hover:bg-gray-50 text-[#23A6F0]'}`}>
                        {page}
                      </button>
                    ))}
                    <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages} className="px-3 sm:px-5 py-4 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap">
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

      {/* AÇILIR FİLTRE PENCERESİ */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end transition-opacity">
          
          {/* Siyah alana tıklayınca kapanması için arka plan */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsFilterOpen(false)}></div>
          
          {/* Sağdan kayarak gelen filtre paneli */}
          <div className="relative w-full max-w-[350px] h-full bg-white shadow-2xl flex flex-col transform transition-transform animate-slide-in-right">
            
            {/* Modal Başlık */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-xl font-bold text-[#252B42] flex items-center gap-2">
                <Filter size={20} className="text-[#23A6F0]" /> Advanced Filters
              </h3>
              <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-1 shadow-sm">
                <X size={24} />
              </button>
            </div>

            {/* Modal İçerik (Kaydırılabilir) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              <div>
                <h4 className="font-bold mb-4 text-[#252B42] uppercase text-sm tracking-wider">Category</h4>
                <div className="space-y-3">
                  {['T-Shirts', 'Shoes', 'Accessories', 'Dresses'].map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer text-[#737373] hover:text-[#23A6F0] transition-colors">
                      <input type="radio" name="sidebar-category" className="w-4 h-4 accent-[#23A6F0]" />
                      <span className="text-[14px] font-semibold">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-[#252B42] uppercase text-sm tracking-wider">Brands</h4>
                <div className="space-y-3">
                  {['Nike', 'Adidas', 'Puma', 'Vans'].map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer text-[#737373] hover:text-[#23A6F0] transition-colors">
                      <input type="checkbox" className="w-4 h-4 accent-[#23A6F0]" />
                      <span className="text-[14px] font-semibold">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-[#252B42] uppercase text-sm tracking-wider">Color</h4>
                <div className="flex gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#23A6F0] cursor-pointer hover:scale-110 shadow-sm border border-transparent hover:border-gray-300"></span>
                  <span className="w-8 h-8 rounded-full bg-[#2DC071] cursor-pointer hover:scale-110 shadow-sm border border-transparent hover:border-gray-300"></span>
                  <span className="w-8 h-8 rounded-full bg-[#E77C40] cursor-pointer hover:scale-110 shadow-sm border border-transparent hover:border-gray-300"></span>
                  <span className="w-8 h-8 rounded-full bg-[#252B42] cursor-pointer hover:scale-110 shadow-sm border border-transparent hover:border-gray-300"></span>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-[#252B42] uppercase text-sm tracking-wider">Filter By Price</h4>
                <input type="range" className="w-full accent-[#23A6F0]" min="0" max="1000" />
                <div className="flex justify-between mt-2 text-[#737373] font-bold text-sm">
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </div>

            </div>

            {/* Modal Alt Kısmı (Sabit Buton) */}
            <div className="p-6 border-t border-gray-100 bg-white">
              <button 
                onClick={handleFilterClick} 
                className="w-full bg-[#23A6F0] text-white py-4 rounded-md font-bold text-lg hover:bg-[#1a8cd1] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                Apply Filters
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}