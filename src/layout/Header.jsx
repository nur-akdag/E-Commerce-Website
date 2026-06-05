import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { 
  Phone, 
  Mail, 
  User, 
  Search, 
  ShoppingCart, 
  Heart, 
  AlignRight, 
  X,
  ChevronDown 
} from 'lucide-react';

import instagramIcon from '../assets/brand-icons/instagram-icon.png';
import youtubeIcon from '../assets/brand-icons/youtube-icon.png';
import facebookIcon from '../assets/brand-icons/facebook-icon.png';
import xIcon from '../assets/brand-icons/x-icon.png';

import { useSelector } from 'react-redux';
import md5 from 'md5';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const user = useSelector(state => state.client.user);

  const categories = useSelector(state => state.product.categories);

  
  const kadinCategories = categories?.filter(c => c.gender === 'k' || c.code?.startsWith('k:')) || [];
  const erkekCategories = categories?.filter(c => c.gender === 'e' || c.code?.startsWith('e:')) || [];

  const getCategorySlug = (code) => code?.includes(':') ? code.split(':')[1] : code;

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

              {/* DROPDOWN MENU KUTUSU */}
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
            <Link to="/pages" className="hover:text-[#252B42] transition-colors">Pages</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-1 text-[#23A6F0] text-sm font-bold">
            {user && user.name ? (
              <div className="flex items-center gap-3 text-[#252B42] ml-2">
                <img 
                  src={`https://www.gravatar.com/avatar/${md5(user.email.trim().toLowerCase())}?s=40&d=identicon`} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full border border-[#ECECEC]"
                />
                <span>{user.name}</span>
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

          
          <div className="flex items-center gap-4 md:gap-5">
            <button className="cursor-pointer text-[#737373] md:text-[#23A6F0] hover:opacity-70 transition-opacity">
              <Search size={26} className="md:w-[22px] md:h-[22px]" />
            </button>
            <div className="flex items-center gap-1 cursor-pointer text-[#737373] md:text-[#23A6F0] hover:opacity-70 transition-opacity">
              <ShoppingCart size={26} className="md:w-[22px] md:h-[22px]" />
              <span className="font-normal text-xs hidden md:inline">1</span>
            </div>
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

        <div className="md:hidden flex flex-col items-center gap-6 pt-4 pb-10 bg-white text-[30px] font-normal text-[#737373] tracking-wide">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Home</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Shop</Link>
            <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Pricing</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Contact</Link>
        </div>
  
    </header>
  );
}