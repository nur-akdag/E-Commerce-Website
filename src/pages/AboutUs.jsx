import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react'; 
// Ortak kart bileşeni ve veri havuzu import edildi
import TeamCard, { teamMembers } from '../components/TeamCard';

import hooliLogo from '../assets/client-logos/hooli.png';
import lyftLogo from '../assets/client-logos/lyft.png';
import stripeLogo from '../assets/client-logos/stripe.png';
import robinhoodLogo from '../assets/client-logos/robinhood.png';
import awsLogo from '../assets/client-logos/aws.png';
import redditLogo from '../assets/client-logos/reddit.png';

export default function AboutPage() {
  return (
    <div className="w-full bg-white font-sans text-[#252B42]">
      
      {/* ================= SECTION 1: ABOUT HERO ================= */}
      <section className="w-full max-w-[1050px] mx-auto px-8 md:px-0 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4">
        
        {/* Sol Taraf: Metin İçerikleri */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h5 className="hidden md:block text-[16px] font-bold tracking-wide text-[#252B42] mb-6 uppercase">
            ABOUT COMPANY
          </h5>
          <h1 className="text-[40px] md:text-[58px] font-bold text-[#252B42] leading-tight tracking-tight mb-6">
            ABOUT US
          </h1>
          <p className="text-[20px] text-[#737373] max-w-[350px] font-medium leading-relaxed mb-8">
            We know how large objects will act, but things on a small scale
          </p>
          <button className="bg-[#23A6F0] text-white text-[14px] font-bold px-10 py-4 rounded-[5px] hover:bg-[#1a8bc7] transition-colors shadow-md cursor-pointer">
            Get Quote Now
          </button>
        </div>

        {/* Sağ Taraf: Alışveriş Yapan Kadın Görseli & Arka Plan Yuvarlağı */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          {/* Fonda Duran Pembe Büyük Daire */}
          <div className="absolute w-[280px] h-[280px] md:w-[440px] md:h-[440px] bg-[#FFEBEB] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></div>
          {/* Ufak Süs Daireleri */}
          <div className="absolute w-4 h-4 bg-[#9B84EE] rounded-full top-4 left-[15%] z-10"></div>
          <div className="absolute w-2 h-2 bg-[#9B84EE] rounded-full bottom-12 right-[10%] z-10"></div>

          {/* Ana Görsel */}
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600" 
            alt="About Us Hero" 
            className="relative z-20 w-full max-w-[350px] md:max-w-[450px] object-contain"
          />
        </div>

      </section>

      {/* ================= SECTION 2: STATEMENT BLOCK ================= */}
      <section className="w-full max-w-[1050px] mx-auto px-8 md:px-0 py-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Sol Blok: Başlıklar */}
        <div className="w-full md:w-7/12 flex flex-col gap-6 text-center md:text-left">
          <span className="text-[14px] font-bold text-[#E74C3C]">Problems trying</span>
          <h2 className="text-[24px] font-bold text-[#252B42] leading-tight max-w-[400px] mx-auto md:mx-0">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </h2>
        </div>
        {/* Sağ Blok: Açıklama Metni */}
        <div className="w-full md:w-5/12 text-center md:text-left">
          <p className="text-[14px] text-[#737373] leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
      </section>

      {/* ================= SECTION 3: STATS (NUMBERS) ================= */}
      <section className="w-full max-w-[1050px] mx-auto px-8 md:px-0 py-16 md:py-24">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-16 md:gap-4 text-center">
          
          <div className="flex flex-col gap-2">
            <h3 className="text-[58px] font-bold text-[#252B42] tracking-tight">15K</h3>
            <p className="text-[16px] font-bold text-[#737373]">Happy Customers</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-[58px] font-bold text-[#252B42] tracking-tight">150K</h3>
            <p className="text-[16px] font-bold text-[#737373]">Monthly Visitors</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-[58px] font-bold text-[#252B42] tracking-tight">15</h3>
            <p className="text-[16px] font-bold text-[#737373]">Countries Worldwide</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-[58px] font-bold text-[#252B42] tracking-tight">100+</h3>
            <p className="text-[16px] font-bold text-[#737373]">Top Partners</p>
          </div>

        </div>
      </section>

      {/* ================= SECTION 4: VIDEO BANNER ================= */}
      <section className="w-full max-w-[1050px] mx-auto px-8 md:px-0 py-8">
        <div className="w-full aspect-[16/9] bg-gray-200 rounded-[20px] overflow-hidden relative flex items-center justify-center group shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200" 
            alt="Video Background" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
          />
          {/* Karartma Katmanı */}
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Mavi Oynatma Butonu */}
          <button className="relative z-10 w-[76px] h-[76px] bg-[#23A6F0] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform cursor-pointer">
            <Play size={28} fill="currentColor" className="ml-1" />
          </button>
        </div>
      </section>

      {/* ================= SECTION 5: MEET OUR TEAM ================= */}
      <section className="w-full max-w-[1050px] mx-auto px-8 md:px-0 py-24 flex flex-col items-center">
        
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-bold text-[#252B42] mb-3 tracking-tight">Meet Our Team</h2>
          <p className="text-[14px] text-[#737373] max-w-[450px] mx-auto leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        {/* Ortak bileşen kullanılarak ilk 3 üye dinamik olarak listelendi */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6">
          {teamMembers.slice(0, 3).map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

      </section>

      {/* ================= SECTION 6: BIG COMPANIES ARE HERE ================= */}
      <section className="w-full bg-[#FAFAFA] py-20 px-8 lg:px-0 text-center flex flex-col items-center">
        
        <div className="mb-16">
          <h2 className="text-[40px] font-bold text-[#252B42] mb-3 tracking-tight">Big Companies Are Here</h2>
          <p className="text-[14px] text-[#737373] max-w-[450px] mx-auto leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
      </section>

      {/* Client Logos */}
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

      {/* ================= SECTION 7: WORK WITH US (CTA BANNER) ================= */}
      <section className="w-full flex flex-col md:flex-row items-stretch min-h-[500px]">
        
        {/* Sol Mavi Kısım */}
        <div className="w-full md:w-[60%] bg-[#2A7CC7] text-white flex flex-col justify-center items-center md:items-start text-center md:text-left px-8 py-16 md:py-0 lg:pl-32">
          <h5 className="text-[16px] font-bold tracking-wider mb-6 uppercase">
            WORK WITH US
          </h5>
          <h2 className="text-[40px] font-bold leading-tight tracking-tight mb-6">
            Now Let's grow Yours
          </h2>
          <p className="text-[14px] opacity-90 max-w-[380px] leading-relaxed mb-8">
            The gradual accumulation of information about how atomic and molecular processes proceed here there and everywhere.
          </p>
          <button className="border border-white text-white font-bold text-[14px] rounded-[5px] px-10 py-4 hover:bg-white hover:text-[#2A7CC7] transition-colors cursor-pointer">
            Button
          </button>
        </div>

        {/* Sağ Fotoğraf Kısmı */}
        <div className="w-full md:w-[40%] h-[400px] md:h-auto overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600" 
            alt="Work With Us Girl" 
            className="w-full h-full object-cover"
          />
        </div>

      </section>

    </div>
  );
}