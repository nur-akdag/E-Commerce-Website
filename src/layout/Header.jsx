import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { 
  Phone, 
  Mail, 
  User, 
  Search, 
  ShoppingCart, 
  Heart, 
  AlignRight, 
  X,
  ChevronDown,
  LogOut,
  Package
} from 'lucide-react';
import md5 from 'md5';

import instagramIcon from '../assets/brand-icons/instagram-icon.png';
import youtubeIcon from '../assets/brand-icons/youtube-icon.png';
import facebookIcon from '../assets/brand-icons/facebook-icon.png';
import xIcon from '../assets/brand-icons/x-icon.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.client.user);
  const categories = useSelector(state => state.product.categories);
  const cart = useSelector(state => state.shoppingCart.cart);
  
  const kadinCategories = categories?.filter(c => c.gender === 'k' || c.code?.startsWith('k:')) || [];
  const erkekCategories = categories?.filter(c => c.gender === 'e' || c.code?.startsWith('e:')) || [];

  const getCategorySlug = (code) => code?.includes(':') ? code.split(':')[1] : code;

  
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    dispatch({ type: 'SET_USER', payload: {} }); 
    navigate('/'); 
  };

  return (
    <header className="w-full bg-white font-sans relative z-50">
      
      {/* 1. DESKTOP TOP BAR */}
      <div className="hidden lg:block bg-[#252B42] text-white py-3">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 flex justify-between items-center text-sm font-bold tracking-wide">
          <div className="flex items-center gap-5">
            <a href="tel:2255550118" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Phone size={16} />
              <span>(225) 555-0118</span>
            </a>
            <a href="mailto:michelle.rivera@example.com" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Mail size={16} />
              <span>michelle.rivera@example.com</span>
            </a>
          </div>
          <div className="text-center">Follow Us and get a chance to win 80% off</div>
          <div className="flex items-center gap-5">
            <span>Follow Us :</span>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:opacity-80 transition-opacity"><img src={instagramIcon} alt="Instagram" className="w-4 h-4 object-contain" /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><img src={youtubeIcon} alt="Youtube" className="w-4 h-4 object-contain" /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><img src={facebookIcon} alt="Facebook" className="w-4 h-4 object-contain" /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><img src={xIcon} alt="X" className="w-4 h-4 object-contain" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ANA NAVIGASYON BAR */}
      <div className="w-full bg-white py-6">
        <div className="max-w-[1440px] mx-auto px-5 md:px-12 flex items-center justify-between">
          <Link to="/" className="text-[24px] font-bold text-[#252B42] tracking-tight">Bandage</Link>

          <nav className="hidden md:flex items-center gap-5 text-sm font-bold text-[#737373]">
            <Link to="/" className="hover:text-[#252B42] transition-colors">Home</Link>

            <div className="relative group">
              <Link to="/shop" className="flex items-center gap-1 hover:text-[#252B42] transition-colors py-2">
                Shop <ChevronDown size={14} className="text-[#737373] group-hover:text-[#252B42] transition-colors" />
              </Link>

              {/* MAĞAZA DROPDOWN */}
              <div className="absolute top-full left-0 bg-white border border-[#ECECEC] shadow-lg rounded-sm p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex gap-12 min-w-[250px]">
                <div className="flex flex-col gap-3 w-1/2">
                  <h3 className="font-bold text-[#252B42] text-[14px] mb-2">Kadın</h3>
                  <div className="flex flex-col gap-2">
                    {kadinCategories.map(category => (
                      <Link 
                        key={category.id} 
                        to={`/shop/kadin/${getCategorySlug(category.code)}/${category.id}`}
                        className="text-[14px] font-medium text-[#737373] hover:text-[#23A6F0] transition-colors"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                  <h3 className="font-bold text-[#252B42] text-[14px] mb-2">Erkek</h3>
                  <div className="flex flex-col gap-2">
                    {erkekCategories.map(category => (
                      <Link 
                        key={category.id} 
                        to={`/shop/erkek/${getCategorySlug(category.code)}/${category.id}`}
                        className="text-[14px] font-medium text-[#737373] hover:text-[#23A6F0] transition-colors"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        
            <Link to="/about" className="hover:text-[#252B42] transition-colors">About</Link>
            <Link to="/blog" className="hover:text-[#252B42] transition-colors">Blog</Link>
            <Link to="/team" className="hover:text-[#252B42] transition-colors">Team</Link>
            <Link to="/contact" className="hover:text-[#252B42] transition-colors">Contact</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-1 text-[#23A6F0] text-sm font-bold">
            
            {user && Object.keys(user).length > 0 && (user.name || user.email) ? (
              /* KULLANICI PROFİLİ VE SİPARİŞLER/ÇIKIŞ YAP DROPDOWN'U */
              <div className="relative group flex items-center cursor-pointer ml-2 py-2">
                
                <img 
                  src={`https://www.gravatar.com/avatar/${md5((user.email || '').trim().toLowerCase())}?s=40&d=identicon`} 
                  alt={user.name || 'User'} 
                  className="w-8 h-8 rounded-full border border-[#ECECEC] mr-2"
                />
                <div className="flex items-center gap-1 text-[#252B42] hover:text-[#23A6F0] transition-colors">
                  
                  {user.name || (user.email && user.email.split('@')[0]) || 'Hesabım'}
                  <ChevronDown size={14} className="text-[#737373] group-hover:text-[#23A6F0]" />
                </div>

                {/* Profil Menüsü (Siparişlerim & Çıkış) */}
                <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-[#ECECEC] shadow-lg rounded-sm py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">
                  <Link 
                    to="/orders" 
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#737373] hover:bg-[#F27A1A] hover:text-white transition-colors"
                  >
                    <Package size={16} />
                    Siparişlerim
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-bold text-left"
                  >
                    <LogOut size={16} />
                    Çıkış Yap
                  </button>
                </div>
              </div>
            ) : (
              <>
                <User size={18} className="mr-1" />
                <Link to="/login" className="hover:underline">Login</Link>
                <span className="mx-0.5">/</span>
                <Link to="/signup" className="hover:underline">Register</Link>
              </>
            )}
          </div>

          {/* İKON GRUBU */}
          <div className="flex items-center gap-4 md:gap-5">
            
            <button className="cursor-pointer text-[#737373] md:text-[#23A6F0] hover:opacity-70 transition-opacity">
              <Search size={26} className="md:w-[22px] md:h-[22px]" />
            </button>

            {/* SEPET DROPDOWN */}
            <div className="relative group flex items-center">
              <div className="flex items-center gap-1 cursor-pointer text-[#737373] md:text-[#23A6F0] hover:text-[#23A6F0] transition-colors py-2">
                <ShoppingCart size={22} className="md:w-[22px] md:h-[22px]" />
                <span className="font-bold text-xs">{cart.length}</span>
              </div>

              <div className="absolute top-full right-0 mt-1 w-[300px] bg-white border border-[#ECECEC] shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">
                <h4 className="font-bold border-b pb-2 mb-3">Sepetim ({cart.length} Ürün)</h4>
                {cart.length > 0 ? (
                  <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex gap-3 items-center">
                        <img src={item.product.images[0].url} className="w-12 h-12 object-cover rounded" alt={item.product.name} />
                        <div>
                          <p className="text-xs font-bold line-clamp-1">{item.product.name}</p>
                          <p className="text-[10px] text-[#737373]">Adet: {item.count}</p>
                        </div>
                        <p className="ml-auto font-bold text-sm">${(item.product.price * item.count).toFixed(2)}</p>
                      </div>
                    ))}
                    <div className="pt-3 border-t">
                      <Link to="/cart">
                        <button className="w-full bg-[#23A6F0] text-white py-2 rounded text-xs font-bold hover:bg-[#1a8cd1] transition-colors">Sepete Git</button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-center text-[#737373]">Sepetiniz boş.</p>
                )}
              </div>
            </div>

            {/* HEART & MENU TIKLAMALARI */}
            <div className="hidden md:flex items-center gap-1 text-[#23A6F0] cursor-pointer hover:opacity-70 transition-opacity">
              <Heart size={22} />
              <span className="font-normal text-xs">1</span>
            </div>
            <button className="md:hidden text-[#737373] cursor-pointer ml-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={30} /> : <AlignRight size={30} />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBİL MENÜ */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-6 pt-4 pb-10 bg-white text-[30px] font-normal text-[#737373] tracking-wide border-t">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Home</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Shop</Link>
          <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Pricing</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Contact</Link>
          
          {/* Mobil Menü Kullanıcı Kontrolleri */}
          {user && Object.keys(user).length > 0 && (user.name || user.email) && (
            <div className="flex flex-col items-center gap-4 mt-4 border-t w-full pt-6">
              <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="text-[20px] text-[#23A6F0] hover:text-[#252B42]">Siparişlerim</Link>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-[20px] text-red-500 font-bold">Çıkış Yap</button>
            </div>
          )}
        </div>
      )}
        
    </header>
  );
}