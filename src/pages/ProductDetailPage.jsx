import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight, ChevronLeft, Heart, ShoppingCart, Eye, Star, Loader2, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProductDetailAction, fetchProductsAction } from '../store/actions/productActions';
import { addToCart } from '../store/actions/shoppingCartActions';

import hooliLogo from '../assets/client-logos/hooli.png';
import lyftLogo from '../assets/client-logos/lyft.png';
import stripeLogo from '../assets/client-logos/stripe.png';
import robinhoodLogo from '../assets/client-logos/robinhood.png';
import awsLogo from '../assets/client-logos/aws.png';
import redditLogo from '../assets/client-logos/reddit.png';

import { toast } from 'react-toastify';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productDetail, detailFetchState, productList } = useSelector(state => state.product);

  const handleAddToCart = () => {
    dispatch(addToCart(productDetail));

    toast.success("Ürün sepetinize eklendi!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {
    dispatch(fetchProductDetailAction(productId));

    if (!productList || productList.length === 0) {
      dispatch(fetchProductsAction());
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, productId]);

  const bestsellerProducts = React.useMemo(() => {
    return productList ? [...productList].slice(0, 8).map(apiProduct => ({
      id: apiProduct.id,
      title: apiProduct.name,
      department: apiProduct.description,
      oldPrice: `$${(apiProduct.price * 1.2).toFixed(2)}`,
      newPrice: `$${apiProduct.price.toFixed(2)}`,
      colors: ['bg-[#23A6F0]', 'bg-[#23856D]', 'bg-[#E77C40]', 'bg-[#252B42]'],
      img: apiProduct.images?.[0]?.url || 'https://via.placeholder.com/400',
      category_id: apiProduct.category_id
    })) : [];
  }, [productList]);

  if (detailFetchState === 'FETCHING' || !productDetail) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <Loader2 className="animate-spin text-[#23A6F0]" size={48} />
        <span className="text-[#737373] font-bold text-xl">Ürün Detayları Yükleniyor...</span>
      </div>
    );
  }

  if (detailFetchState === 'FAILED') {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <span className="text-[#E74C3C] font-bold text-xl">Ürün bulunamadı veya bir hata oluştu.</span>
        <button onClick={() => navigate(-1)} className="text-[#23A6F0] underline font-bold">Geri Dön</button>
      </div>
    );
  }

  const mainImage = productDetail.images?.[0]?.url || 'https://via.placeholder.com/800';

  return (
    <div className="w-full bg-white font-sans text-[#252B42]">
      
      {/* 1. BREADCRUMB & GERİ BUTONU */}
      <div className="bg-[#FAFAFA] py-[34px] md:py-6 px-8 lg:px-0">
        <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-[#737373] hover:text-[#252B42] transition-colors cursor-pointer font-bold"
          >
            <ArrowLeft size={18} /> Geri Dön
          </button>

          <div className="flex items-center gap-4 text-[14px] font-bold">
            <Link to="/" className="text-[#252B42] hover:opacity-80 transition-opacity">Home</Link>
            <ChevronRight size={16} className="text-[#BDBDBD]" />
            <Link to="/shop" className="text-[#BDBDBD] hover:text-[#252B42] transition-opacity">Shop</Link>
          </div>
        </div>
      </div>

      {/* 2. PRODUCT OVERVIEW */}
      <div className="bg-[#FAFAFA] pb-12 px-8 lg:px-0">
        <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row gap-8 lg:gap-[60px]">
          
          {/* Sol Kısım: Resimler */}
          <div className="w-full max-w-[350px] md:max-w-[506px] mx-auto md:mx-0 flex flex-col gap-4">
            <div className="relative w-full aspect-[4/3] bg-[#FAFAFA] overflow-hidden rounded-sm">
              <img 
                src={mainImage} 
                alt={productDetail.name} 
                className="w-full h-full object-cover object-center"
              />
              <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition-transform">
                <ChevronLeft size={48} strokeWidth={1.5} />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition-transform">
                <ChevronRight size={48} strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Küçük Görseller (Thumbnails) */}
            <div className="flex gap-[19px]">
              <div className="w-[100px] h-[75px] overflow-hidden rounded-sm cursor-pointer border border-[#23A6F0]">
                <img src={mainImage} alt="Thumb 1" className="w-full h-full object-cover object-center" />
              </div>
              
              <div className="w-[100px] h-[75px] overflow-hidden rounded-sm cursor-pointer border border-transparent opacity-50 hover:opacity-100 transition-opacity">
                <img src={mainImage} alt="Thumb 2" className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </div>

          {/* Sağ Kısım: Ürün Detayları */}
          <div className="w-full md:flex-1 flex flex-col justify-start text-left pt-2 md:pt-4">
            <h2 className="text-[20px] font-semibold tracking-wide text-[#252B42] mb-3">
              {productDetail.name}
            </h2>
            
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex text-[#F3CD03]">
                {[...Array(Math.round(productDetail.rating || 0))].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
                {[...Array(5 - Math.round(productDetail.rating || 0))].map((_, i) => (
                  <Star key={`empty-${i}`} size={18} />
                ))}
              </div>
              <span className="text-[14px] font-bold text-[#737373]">
                {productDetail.sell_count} Reviews
              </span>
            </div>
            
            <p className="text-[24px] font-bold text-[#252B42] mb-2">
              ${productDetail.price.toFixed(2)}
            </p>
            
            <div className="flex gap-2 text-[14px] font-bold mb-6">
              <span className="text-[#737373]">Availability  :</span>
              <span className="text-[#23A6F0]">In Stock</span>
            </div>
            
            <p className="text-[14px] text-[#858585] leading-[20px] mb-6">
              {productDetail.description}
            </p>
            
            <hr className="border-[#BDBDBD] mb-6" />
            
            <div className="flex items-center gap-2.5 mb-[40px]">
              <span className="w-[30px] h-[30px] rounded-full bg-[#23A6F0] cursor-pointer hover:scale-110 transition-transform"></span>
              <span className="w-[30px] h-[30px] rounded-full bg-[#2DC071] cursor-pointer hover:scale-110 transition-transform"></span>
              <span className="w-[30px] h-[30px] rounded-full bg-[#E77C40] cursor-pointer hover:scale-110 transition-transform"></span>
              <span className="w-[30px] h-[30px] rounded-full bg-[#252B42] cursor-pointer hover:scale-110 transition-transform"></span>
            </div>

            <div className="flex items-center gap-2.5">
              <button 
                onClick={handleAddToCart}
                className="bg-[#23A6F0] text-white text-[14px] font-bold px-5 py-[10px] rounded hover:bg-[#1a8cd1] transition-colors"
              >
                Select Options
              </button>
              
              <button className="w-10 h-10 flex items-center justify-center bg-white border border-[#E8E8E8] rounded-full text-[#252B42] hover:bg-gray-50 transition-colors">
                <Heart size={20} />
              </button>
              <button 
                onClick={handleAddToCart}
                className="w-10 h-10 flex items-center justify-center bg-white border border-[#E8E8E8] rounded-full text-[#252B42] hover:bg-gray-50 transition-colors"
              >
                <ShoppingCart size={20} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-white border border-[#E8E8E8] rounded-full text-[#252B42] hover:bg-gray-50 transition-colors">
                <Eye size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. PRODUCT DESCRIPTION  */}
      <div className="bg-white py-10 px-8 lg:px-0">
        <div className="max-w-[1050px] mx-auto flex flex-col items-center md:items-stretch">
          
          <div className="w-full max-w-[330px] md:max-w-none flex flex-row flex-wrap justify-center md:justify-center items-center gap-4 md:gap-12 border-b border-[#ECECEC] pb-4 mb-8">
            <span className="text-[14px] font-semibold text-[#737373] cursor-pointer hover:text-[#252B42]">Description</span>
            <span className="text-[14px] font-semibold text-[#737373] cursor-pointer hover:text-[#252B42]">Additional Information</span>
            <span className="text-[14px] font-semibold text-[#737373] cursor-pointer hover:text-[#252B42]">Reviews ({productDetail.sell_count})</span>
          </div>

          <div className="w-full max-w-[330px] md:max-w-none mx-auto flex flex-col md:flex-row gap-8 lg:gap-[30px]">
            <div className="w-full md:w-1/3">
              <div className="w-full aspect-square md:aspect-[3/4] lg:h-[392px] bg-gray-100 rounded-md overflow-hidden shadow-sm">
                <img src={mainImage} alt={productDetail.name} className="w-full h-full object-cover object-center" />
              </div>
            </div>
            
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <h3 className="text-[24px] font-bold text-[#252B42]">{productDetail.name} - Detaylar</h3>
              <p className="text-[14px] text-[#737373] leading-[20px]">
                {productDetail.description}
              </p>
              <p className="text-[14px] text-[#737373] leading-[20px]">
                Bu ürün Workintech e-ticaret altyapısı kullanılarak sunulmaktadır. Kalite ve güvence standartlarımız gereği en iyi malzemeler kullanılarak üretilmiştir.
              </p>
            </div>
            
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="text-[24px] font-bold text-[#252B42] mb-2">Öne Çıkan Özellikler</h3>
                {[
                  `Stok Durumu: ${productDetail.stock} Adet`,
                  `Müşteri Puanı: ${productDetail.rating} / 5.0`,
                  `Toplam Satış: ${productDetail.sell_count}`,
                  `Kategori ID: ${productDetail.category_id}`
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-[14px] font-bold text-[#737373]">
                    <ChevronRight size={16} className="text-[#737373]" />
                    {item}
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
            {bestsellerProducts.length > 0 ? (
              bestsellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} textAlign="left" />
              ))
            ) : (
              <p className="text-[#737373] font-bold">Önerilen ürünler yükleniyor...</p>
            )}
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