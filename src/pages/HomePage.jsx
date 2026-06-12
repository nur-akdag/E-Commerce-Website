import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsAction } from '../store/actions/productActions';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import hooliLogo from '../assets/client-logos/hooli.png';
import lyftLogo from '../assets/client-logos/lyft.png';
import stripeLogo from '../assets/client-logos/stripe.png';
import robinhoodLogo from '../assets/client-logos/robinhood.png';
import awsLogo from '../assets/client-logos/aws.png';
import redditLogo from '../assets/client-logos/reddit.png';
import heroVisual from '../assets/hero.png';

// ─── Hero Slides Data
const heroSlides = [
  {
    id: 1,
    badge: 'SUMMER 2020',
    badgeColor: '#2A7CC7',
    title: 'NEW COLLECTION',
    subtitle: 'Discover the products your customers keep coming back for.',
    gradient: 'from-[#96E9FB] to-[#ABECD6]',
    ctaText: 'SHOP NOW',
    ctaLink: '/shop',
    image: heroVisual,
    imageAlt: 'New Collection Girl',
  },
  {
    id: 2,
    badge: 'BEST SELLERS',
    badgeColor: '#23856D',
    title: 'TOP RATED PICKS',
    subtitle: 'Discover the products your customers keep coming back for.',
    gradient: 'from-[#F6D365] to-[#FDA085]',
    ctaText: 'VIEW ALL',
    ctaLink: '/shop',
    image: heroVisual,
    imageAlt: 'Best Sellers Collection',
  },
  
];

export default function HomePage() {
  const dispatch = useDispatch();

  const { productList, fetchState, categories } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (fetchState === 'NOT_FETCHED') {
      dispatch(fetchProductsAction());
    }
  }, [dispatch, fetchState]);

  const [visibleProducts, setVisibleProducts] = useState(5);
  const totalProducts = productList?.length || 0;

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 5);
  };

  return (
    <div className="w-full flex flex-col bg-white font-['Montserrat'] overflow-x-hidden">

      {/* ================= SECTION 1: HERO SLIDER ================= */}
<section className="w-full max-w-[1290px] mx-auto px-5 md:px-10 py-6 relative">

  <style>{`
    /* Swiper taşmalarına izin veriyoruz ki görsel ve daireler kutudan çıksın */
    .hero-swiper {
      overflow: visible !important;
    }
    .hero-swiper .swiper-wrapper {
      overflow: visible !important;
    }
    .hero-swiper .swiper-slide {
      overflow: visible !important;
      isolation: isolate; /* z-index karmaşasını önler */
    }

    /* Oklar */
    .hero-swiper .swiper-button-next,
    .hero-swiper .swiper-button-prev {
      color: #252B42;
      background: rgba(255,255,255,0.75);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      transition: background 0.2s;
    }
    .hero-swiper .swiper-button-next:hover,
    .hero-swiper .swiper-button-prev:hover {
      background: rgba(255,255,255,0.95);
    }
    .hero-swiper .swiper-button-next::after,
    .hero-swiper .swiper-button-prev::after {
      font-size: 16px;
      font-weight: 900;
    }

    /* Noktalar */
    .hero-swiper .swiper-pagination-bullet {
      background: #252B42;
      opacity: 0.35;
      width: 10px;
      height: 10px;
      transition: opacity 0.2s, transform 0.2s;
    }
    .hero-swiper .swiper-pagination-bullet-active {
      opacity: 1;
      transform: scale(1.3);
      background: #252B42;
    }
  `}</style>

  <Swiper
    className="hero-swiper"
    modules={[Autoplay, Pagination, Navigation, EffectFade]}
    effect="fade"
    fadeEffect={{ crossFade: true }}
    loop={true}
    autoplay={{ delay: 5000, disableOnInteraction: false }}
    pagination={{ clickable: true }}
    navigation={true}
    speed={700}
  >
    {heroSlides.map((slide) => (
      <SwiperSlide key={slide.id}>
        
        
        <div className={`w-full bg-gradient-to-r ${slide.gradient} rounded-[32px] md:rounded-[40px] relative flex flex-col lg:flex-row items-center lg:h-[680px] overflow-visible`}>

          {/* Sol taraftaki dekoratif yuvarlak */}
          <div className="absolute w-8 h-8 left-0 bottom-[37%] md:top-[50%] md:left-[18%] lg:top-[0px] lg:left-[56%] lg:w-20 lg:h-20 bg-white rounded-full z-0 block"></div>

          {/* ── Metin alanı ── */}
          <div className="relative z-20 flex flex-col items-center md:items-start text-center md:text-left flex-1 px-6 pt-16 pb-0 md:py-15 md:px-15 lg:p-0 lg:pl-35 w-full">
            <h5
              className="font-bold tracking-widest text-sm md:text-base mb-6 uppercase"
              style={{ color: slide.badgeColor || '#252B42' }}
            >
              {slide.badge}
            </h5>
            <h1 className="text-4xl md:text-[40px] lg:text-[58px] font-bold text-[#252B42] leading-tight lg:leading-[65px] tracking-tight mb-6 md:mb-8">
              {slide.title}
            </h1>
            <p className="text-lg md:text-base lg:text-[20px] text-[#737373] max-w-[295px] md:max-w-[320px] lg:max-w-[380px] font-medium leading-relaxed mb-8 md:mb-10">
              {slide.subtitle}
            </p>
            <Link
              to={slide.ctaLink}
              className="inline-block bg-[#23A6F0] text-white px-8 py-3 lg:px-10 lg:py-4 rounded-[5px] font-bold text-base lg:text-[24px] tracking-wider uppercase hover:bg-[#1a8bc7] transition-all shadow-md cursor-pointer text-center mb-10 lg:mb-0"
            >
              {slide.ctaText}
            </Link>
          </div>

          {/* ── Görsel ve Daireler ── */}
          <div className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-none aspect-square md:aspect-auto md:h-[450px] lg:h-[750px] lg:absolute lg:bottom-0 lg:-right-[70px] lg:w-[750px] flex justify-center items-end z-10 pointer-events-none mx-auto mt-10 md:mt-0 overflow-visible">
            
            {/* Büyük beyaz daire */}
            <div className="absolute bottom-13 md:bottom-[15%] lg:bottom-auto w-[270px] h-[270px] md:w-[350px] md:h-[350px] lg:top-17 lg:right-17 lg:w-[520px] lg:h-[520px] bg-white rounded-full z-10"></div>

            {/* Küçük mor nokta */}
            <div className="absolute right-[5%] top-[25%] md:right-0 md:top-[20%] lg:right-[15px] lg:top-[25%] w-3 h-3 md:w-4 md:h-4 bg-[#9B84EE] rounded-full z-30"></div>

            {/* Orta beyaz nokta */}
            <div className="absolute right-[7%] top-[45%] md:right-[6%] md:top-[45%] lg:right-[30px] lg:top-[47%] w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 bg-white rounded-full z-30 shadow-sm"></div>

            {/* Küçük mor nokta */}
            <div className="absolute left-[8%] bottom-[27%] md:left-[10%] md:bottom-[25%] lg:left-[13%] lg:bottom-[28%] w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-[#9B84EE] rounded-full z-30"></div>

            {/* Hero görseli */}
            <img
              src={slide.image}
              alt={slide.imageAlt}
              className="relative z-20 h-[145%] md:h-[120%] lg:h-[100%] object-contain object-bottom pointer-events-auto select-none"
            />
          </div>

        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>

   
       

      {/* ================= SECTION 2: CLIENTS LOGOS ================= */}
      <section className="w-full max-w-[1050px] mx-auto px-8 lg:px-0 py-16 md:py-24 bg-white">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 md:gap-8 items-center justify-items-center">
          <div className="w-[180px] md:w-[120px] lg:w-[100px] flex justify-center items-center hover:opacity-80 transition-opacity duration-200 cursor-pointer filter grayscale"><img src={hooliLogo} alt="Hooli" className="max-h-20 md:max-h-14 lg:max-h-12 object-contain" /></div>
          <div className="w-[180px] md:w-[120px] lg:w-[150px] flex justify-center items-center hover:opacity-80 transition-opacity duration-200 cursor-pointer filter grayscale"><img src={lyftLogo} alt="Lyft" className="max-h-20 md:max-h-14 lg:max-h-12 object-contain" /></div>
          <div className="w-[180px] md:w-[120px] lg:w-[150px] flex justify-center items-center hover:opacity-80 transition-opacity duration-200 cursor-pointer filter grayscale"><img src={robinhoodLogo} alt="Robinhood" className="max-h-20 md:max-h-14 lg:max-h-12 object-contain" /></div>
          <div className="w-[180px] md:w-[120px] lg:w-[150px] flex justify-center items-center hover:opacity-80 transition-opacity duration-200 cursor-pointer filter grayscale"><img src={stripeLogo} alt="Stripe" className="max-h-20 md:max-h-14 lg:max-h-12 object-contain" /></div>
          <div className="w-[180px] md:w-[120px] lg:w-[150px] flex justify-center items-center hover:opacity-80 transition-opacity duration-200 cursor-pointer filter grayscale"><img src={awsLogo} alt="AWS" className="max-h-20 md:max-h-14 lg:max-h-12 object-contain" /></div>
          <div className="w-[180px] md:w-[120px] lg:w-[150px] flex justify-center items-center hover:opacity-80 transition-opacity duration-200 cursor-pointer filter grayscale"><img src={redditLogo} alt="Reddit" className="max-h-20 md:max-h-14 lg:max-h-12 object-contain" /></div>
        </div>
      </section>

      {/* ================= SECTION 3: TOP PRODUCT OF THE WEEK ================= */}
      <section className="w-full max-w-[1185px] mx-auto px-8 lg:px-0 py-12">
        <div className="flex flex-col md:flex-row gap-4 w-full h-auto md:h-[600px]">
          
          {(() => {
            const top3Products = productList && productList.length > 0 
              ? [...productList].sort((a, b) => b.rating - a.rating).slice(0, 3)
              : [];

            const hero1 = top3Products[0] || { name: 'Top Product Of the Week', images: [{url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800'}] };
            const hero2 = top3Products[1] || { name: 'Top Product Of the Week', images: [{url: 'https://images.unsplash.com/photo-1434389678369-18342cb31124?q=80&w=800'}] };
            const hero3 = top3Products[2] || { name: 'Top Product Of the Week', images: [{url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800'}] };

            return (
              <>
                <div className="relative w-full md:w-1/2 h-[450px] md:h-full bg-[#FAFAFA] overflow-hidden group">
                  <img 
                    src={hero1.images?.[0]?.url || 'https://via.placeholder.com/800'} 
                    alt={hero1.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute bottom-0 left-0 w-full md:w-[70%] bg-[#2D8BC0]/90 p-8 md:p-10 flex flex-col gap-5 text-white">
                    <h3 className="text-[22px] md:text-[32px] font-bold leading-tight line-clamp-2 min-h-[64px]" title={hero1.name}>
                      {hero1.name}
                    </h3>
                    <button className="border border-white rounded-[5px] px-8 py-4 w-max font-bold text-sm tracking-widest hover:bg-white hover:text-[#23A6F0] transition-colors cursor-pointer">
                      EXPLORE ITEMS
                    </button>
                  </div>
                </div>

                <div className="flex flex-col w-full md:w-1/2 gap-4 h-[700px] md:h-full">
                  <div className="relative w-full flex-1 bg-[#FAFAFA] overflow-hidden group">
                    <img 
                      src={hero2.images?.[0]?.url || 'https://via.placeholder.com/800'} 
                      alt={hero2.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute bottom-0 left-0 w-full md:w-[70%] bg-[#2D8BC0]/90 p-6 md:p-8 flex flex-col gap-4 text-white">
                      <h4 className="text-[20px] md:text-[24px] font-bold leading-snug line-clamp-2 min-h-[58px]" title={hero2.name}>
                        {hero2.name}
                      </h4>
                      <button className="border border-white rounded-[5px] px-6 py-3 w-max font-bold text-sm tracking-widest hover:bg-white hover:text-[#23A6F0] transition-colors cursor-pointer">
                        EXPLORE ITEMS
                      </button>
                    </div>
                  </div>

                  <div className="relative w-full flex-1 bg-[#FAFAFA] overflow-hidden group">
                    <img 
                      src={hero3.images?.[0]?.url || 'https://via.placeholder.com/800'} 
                      alt={hero3.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute bottom-0 left-0 w-full md:w-[70%] bg-[#2D8BC0]/90 p-6 md:p-8 flex flex-col gap-4 text-white">
                      <h4 className="text-[20px] md:text-[24px] font-bold leading-snug line-clamp-2 min-h-[58px]" title={hero3.name}>
                        {hero3.name}
                      </h4>
                      <button className="border border-white rounded-[5px] px-6 py-3 w-max font-bold text-sm tracking-widest hover:bg-white hover:text-[#23A6F0] transition-colors cursor-pointer">
                        EXPLORE ITEMS
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}

        </div>
      </section>

      {/* ================= SECTION 4: BESTSELLER PRODUCTS ================= */}
      <section className="w-full max-w-[1124px] mx-auto px-8 lg:px-0 py-16 flex flex-col items-center min-h-[500px]">
        <div className="text-center flex flex-col gap-3 mb-16">
          <h4 className="text-xl font-medium text-[#737373] hidden md:block">Featured Products</h4>
          <h3 className="text-3xl font-bold text-[#252B42] tracking-tight">BESTSELLER PRODUCTS</h3>
          <p className="text-sm font-medium text-[#737373]">Problems trying to resolve the conflict between</p>
        </div>

        {fetchState === 'FETCHING' && (
          <div className="flex flex-col items-center justify-center py-10 gap-4">
            <Loader2 className="animate-spin text-[#23A6F0]" size={40} />
            <span className="text-[#737373] font-bold">Loading Featured Products...</span>
          </div>
        )}

        {fetchState === 'FETCHED' && (
          <>
            <div className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-16 w-full">
              {[...productList]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, visibleProducts)
                .map((product) => {
                  const slugify = (text) => text.toString().toLowerCase()
                    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                    .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
                  
                  const slug = slugify(product.name || 'product');
                  const catId = product.category_id || 1;
                  const cat = categories?.find(c => c.id === catId);
                  const gender = cat?.gender === 'e' ? 'erkek' : 'kadin';
                  const catName = cat?.code ? cat.code.split(':')[1] : 'kategori';
                  const targetUrl = `/shop/${gender}/${catName}/${catId}/${slug}/${product.id}`;

                  return (
                    <Link 
                      key={product.id} 
                      to={targetUrl}
                      className="flex flex-col w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(20%-19.2px)] bg-white cursor-pointer group justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 pb-4 rounded-sm"
                    >
                      <div className="w-full aspect-[3/4] bg-[#FAFAFA] overflow-hidden mb-6 relative rounded-[4px]">
                        <img 
                          src={product.images?.[0]?.url || 'https://via.placeholder.com/400x600?text=No+Image'} 
                          alt={product.name} 
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div className="flex flex-col items-center text-center gap-2 px-2 flex-grow justify-between">
                        <div className="flex flex-col items-center gap-1 w-full">
                          <h5 className="font-bold text-[#252B42] text-base line-clamp-1 min-h-[24px] w-full" title={product.name}>
                            {product.name}
                          </h5>
                          <p className="text-sm font-bold text-[#737373] line-clamp-2 min-h-[40px] px-1 w-full">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2 mt-auto w-full">
                          <div className="flex items-center gap-2 font-bold text-base">
                            <span className="text-[#BDBDBD] line-through">${(product.price * 1.2).toFixed(2)}</span>
                            <span className="text-[#23856D]">${product.price.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-1.5 pt-1">
                            <div className="w-4 h-4 rounded-full bg-[#23A6F0]"></div>
                            <div className="w-4 h-4 rounded-full bg-[#2DC071]"></div>
                            <div className="w-4 h-4 rounded-full bg-[#E77C40]"></div>
                            <div className="w-4 h-4 rounded-full bg-[#252B42]"></div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>

            {visibleProducts < productList.length && (
              <button 
                onClick={handleLoadMore}
                className="mt-20 border border-[#23A6F0] text-[#23A6F0] px-10 py-4 rounded-[5px] font-bold text-sm tracking-wider uppercase hover:bg-[#23A6F0] hover:text-white transition-colors cursor-pointer shadow-sm"
              >
                LOAD MORE PRODUCTS
              </button>
            )}
          </>
        )}
      </section>

      {/* ================= SECTION 5: WE LOVE WHAT WE DO ================= */}
      <section className="w-full max-w-[1050px] mx-auto px-8 lg:px-0 py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-24 w-full">
          <div className="flex flex-col lg:max-w-[450px] max-w-[280px] items-start text-left w-full lg:w-1/2 gap-4 lg:gap-6 order-1 lg:order-2">
            <h5 className="text-[#23A6F0] font-bold text-base tracking-wide">Featured Products</h5>
            <h2 className="text-[40px] lg:text-4xl font-bold text-[#252B42] tracking-tight leading-tight w-full">We love what we do</h2>
            <p className="text-sm lg:text-base text-[#737373] leading-relaxed mt-2">Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics</p>
            <p className="text-sm lg:text-base text-[#737373] leading-relaxed">Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics</p>
          </div>
          <div className="flex flex-row gap-4 w-full lg:w-1/2 h-[450px] md:h-[500px] order-2 lg:order-1">
            <div className="flex-1 overflow-hidden"><img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600" alt="Girl with glasses" className="w-full h-full object-cover object-top" /></div>
            <div className="flex-1 overflow-hidden"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600" alt="Girl in yellow" className="w-full h-full object-cover object-top" /></div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: THE BEST SERVICES ================= */}
      <section className="w-full max-w-[1050px] mx-auto px-8 lg:px-0 py-20 flex flex-col items-center">
        <div className="text-center flex flex-col max-w-[260px] gap-3 mb-20">
          <h4 className="text-xl font-medium text-[#737373]">Featured Products</h4>
          <h3 className="text-[24px] font-bold text-[#252B42] tracking-tight uppercase">The Best Services</h3>
          <p className="text-sm font-medium text-[#737373]">Problems trying to resolve the conflict between</p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-20 lg:gap-8">
          <div className="flex flex-col items-center text-center gap-5 flex-1 max-w-[260px] md:max-w-[300px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#23A6F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <h3 className="text-2xl font-bold text-[#252B42]">Easy Wins</h3>
            <p className="text-sm text-[#737373] font-medium leading-relaxed">Get your best looking smile now!</p>
          </div>
          <div className="flex flex-col items-center text-center gap-5 flex-1 max-w-[260px] md:max-w-[300px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#23A6F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            <h3 className="text-2xl font-bold text-[#252B42]">Concrete</h3>
            <p className="text-sm text-[#737373] font-medium leading-relaxed">Defalcate is most focused in helping you discover your most beautiful smile</p>
          </div>
          <div className="flex flex-col items-center text-center gap-5 flex-1 max-w-[260px] md:max-w-[300px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#23A6F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            <h3 className="text-2xl font-bold text-[#252B42]">Hack Growth</h3>
            <p className="text-sm text-[#737373] font-medium leading-relaxed">Overcame any hurdle or any other problem.</p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 7: FEATURED POSTS (BLOG) ================= */}
      <section className="w-full max-w-[1050px] mx-auto px-8 lg:px-0 py-20 flex flex-col items-center bg-white">
        <div className="text-center flex flex-col gap-3 mb-16">
          <h4 className="text-sm font-bold text-[#23A6F0]">Practice Advice</h4>
          <h3 className="text-[40px] font-bold text-[#252B42] tracking-tight">Featured Posts</h3>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 w-full">
          <div className="flex flex-col sm:flex-row w-full lg:w-1/2 bg-white hover:shadow-md transition-shadow duration-300 group border border-[#EEEEEE]">
            <div className="relative w-full sm:w-[45%] h-[300px] sm:h-auto overflow-hidden">
              <div className="absolute top-5 left-5 bg-[#E74040] text-white text-sm font-bold px-3 py-1 rounded shadow-sm z-10">NEW</div>
              <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600" alt="Blog Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 w-full sm:w-[55%] gap-4">
              <div className="flex gap-4 text-xs font-normal text-[#737373]"><span className="text-[#8EC2F2]">Google</span><span>Trending</span><span>New</span></div>
              <h4 className="text-[#252B42] font-bold text-xl leading-snug mt-1">Loudest à la Madison #1 (L'integral)</h4>
              <p className="text-[#737373] text-sm leading-relaxed">We focus on ergonomics and meeting you where you work. It's only a keystroke away.</p>
              <div className="flex justify-between items-center py-2 text-xs font-medium text-[#737373]">
                <div className="flex items-center gap-1.5"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#23A6F0" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 22 April 2021</div>
                <div className="flex items-center gap-1.5"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#23856D" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> 10 comments</div>
              </div>
              <div className="flex items-center gap-2 font-bold text-sm text-[#737373] mt-2 hover:text-[#23A6F0] transition-colors cursor-pointer">Learn More <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#23A6F0" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-1/2 bg-white hover:shadow-md transition-shadow duration-300 group border border-[#EEEEEE]">
            <div className="relative w-full sm:w-[45%] h-[300px] sm:h-auto overflow-hidden">
              <div className="absolute top-5 left-5 bg-[#E74040] text-white text-sm font-bold px-3 py-1 rounded shadow-sm z-10">NEW</div>
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600" alt="Blog Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 w-full sm:w-[55%] gap-4">
              <div className="flex gap-4 text-xs font-normal text-[#737373]"><span className="text-[#8EC2F2]">Google</span><span>Trending</span><span>New</span></div>
              <h4 className="text-[#252B42] font-bold text-xl leading-snug mt-1">Loudest à la Madison #1 (L'integral)</h4>
              <p className="text-[#737373] text-sm leading-relaxed">We focus on ergonomics and meeting you where you work. It's only a keystroke away.</p>
              <div className="flex justify-between items-center py-2 text-xs font-medium text-[#737373]">
                <div className="flex items-center gap-1.5"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#23A6F0" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 22 April 2021</div>
                <div className="flex items-center gap-1.5"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#23856D" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> 10 comments</div>
              </div>
              <div className="flex items-center gap-2 font-bold text-sm text-[#737373] mt-2 hover:text-[#23A6F0] transition-colors cursor-pointer">Learn More <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#23A6F0" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}