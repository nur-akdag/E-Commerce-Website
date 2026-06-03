import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { 
  Phone, 
  Mail, 
  User, 
  Search, 
  ShoppingCart, 
  Heart, 
  Menu, 
  X,
  ChevronDown 
} from 'lucide-react';

import instagramIcon from '../assets/brand-icons/instagram-icon.png';
import youtubeIcon from '../assets/brand-icons/youtube-icon.png';
import facebookIcon from '../assets/brand-icons/facebook-icon.png';
import xIcon from '../assets/brand-icons/x-icon.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  return (
    <header className="w-full bg-white font-sans">
      
      {/* 1. DESKTOP TOP BAR */}
      <div className="hidden lg:block bg-[#252B42] text-white py-3">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 flex justify-between items-center text-sm font-bold tracking-wide">
          
          {/* İletişim Bilgileri */}
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

          {/* Kampanya Metni */}
          <div className="text-center">
            Follow Us and get a chance to win 80% off
          </div>

          {/* Sosyal Medya İkonları */}
          <div className="flex items-center gap-5">
            <span>Follow Us :</span>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={instagramIcon} alt="Instagram" className="w-4 h-4 object-contain" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={youtubeIcon} alt="Youtube" className="w-4 h-4 object-contain" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={facebookIcon} alt="Facebook" className="w-4 h-4 object-contain" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={xIcon} alt="X" className="w-4 h-4 object-contain" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ANA NAVIGASYON BAR */}
      <div className="w-full bg-white py-6">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#252B42] tracking-tight">
            Bandage
          </Link>

          {/* MASAÜSTÜ MENÜ */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-bold text-[#737373]">
            <Link to="/" className="hover:text-[#252B42] transition-colors">Home</Link>
            <Link to="/shop" className="flex items-center gap-1 hover:text-[#252B42] transition-colors">
              Shop <ChevronDown size={14} className="text-[#737373]" />
            </Link>
            <Link to="/about" className="hover:text-[#252B42] transition-colors">About</Link>
            <Link to="/blog" className="hover:text-[#252B42] transition-colors">Blog</Link>
            <Link to="/team" className="hover:text-[#252B42] transition-colors">Team</Link>
            <Link to="/contact" className="hover:text-[#252B42] transition-colors">Contact</Link>
            <Link to="/pages" className="hover:text-[#252B42] transition-colors">Pages</Link>
          </nav>

          {/* AKSİYON ALANI */}
          <div className="flex items-center gap-6 font-bold text-sm">
            
            {/* Masaüstü Login / Register */}
            <div className="hidden lg:flex items-center gap-1.5 text-[#23A6F0] cursor-pointer hover:opacity-80 transition-opacity">
              <User size={18} />
              <span>Login / Register</span>
            </div>

            {/* İkon Grubu */}
            <div className="flex items-center gap-5">
              <button className="cursor-pointer text-[#252B42] md:text-[#23A6F0] hover:opacity-70 transition-opacity">
                <Search size={22} />
              </button>

              <div className="flex items-center gap-1 cursor-pointer text-[#252B42] md:text-[#23A6F0] hover:opacity-70 transition-opacity">
                <ShoppingCart size={22} />
                <span className="font-normal text-xs hidden md:inline">1</span>
              </div>

              <div className="hidden md:flex items-center gap-1 text-[#23A6F0] cursor-pointer hover:opacity-70 transition-opacity">
                <Heart size={22} />
                <span className="font-normal text-xs">1</span>
              </div>

              <button 
                className="md:hidden text-[#252B42] cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. MOBİL AÇILIR MENÜ */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-8 pt-12 pb-16 bg-white text-[30px] font-normal text-[#737373] tracking-wide transition-all duration-300">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Home</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Shop</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">About</Link>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Blog</Link>
            <Link to="/team" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Team</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Contact</Link>
            <Link to="/pages" onClick={() => setIsMenuOpen(false)} className="hover:text-[#252B42] transition-colors">Pages</Link>
        </div>
      )}
    </header>
  );
}