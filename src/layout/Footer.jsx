import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full font-sans bg-white">
      
      {/* 1. ÜST BAR (Logolar ve Sosyal Medya) */}
      <div className="w-full bg-[#FAFAFA] border-b border-[#E6E6E6]">
        <div className="max-w-[1050px] mx-auto px-10 lg:px-0 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <a href="/" className="text-2xl font-bold text-[#252B42] tracking-tight">
            Bandage
          </a>
          
          <div className="flex items-center gap-5 text-[#23A6F0]">
            {/* Facebook */}
            <a href="#" className="hover:opacity-80 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:opacity-80 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            {/* Twitter */}
            <a href="#" className="hover:opacity-80 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
          </div>
        </div>
      </div>

      {/* 2. ORTA İÇERİK ALANI */}
      <div className="w-full">

        <div className="max-w-[1050px] mx-auto px-10 lg:px-0 py-16 flex flex-col md:flex-row flex-wrap justify-between gap-10 lg:gap-5">
          
          {/* Sütun 1: Company Info */}
          <div className="flex flex-col gap-5 min-w-[140px]">
            <h5 className="font-bold text-[#252B42] text-base mb-2">Company Info</h5>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">About Us</a>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">Carrier</a>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">We are hiring</a>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">Blog</a>
          </div>

          {/* Sütun 2: Legal */}
          <div className="flex flex-col gap-5 min-w-[140px]">
            <h5 className="font-bold text-[#252B42] text-base mb-2">Legal</h5>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">About Us</a>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">Carrier</a>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">We are hiring</a>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">Blog</a>
          </div>

          {/* Sütun 3: Features */}
          <div className="flex flex-col gap-5 min-w-[140px]">
            <h5 className="font-bold text-[#252B42] text-base mb-2">Features</h5>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">Business Marketing</a>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">User Analytic</a>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">Live Chat</a>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">Unlimited Support</a>
          </div>

          {/* Sütun 4: Resources */}
          <div className="flex flex-col gap-5 min-w-[140px]">
            <h5 className="font-bold text-[#252B42] text-base mb-2">Resources</h5>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">IOS & Android</a>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">Watch a Demo</a>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">Customers</a>
            <a href="#" className="text-[#737373] text-sm font-bold hover:text-[#23A6F0] transition-colors">API</a>
          </div>

          {/* Sütun 5: Get In Touch (Form) */}
          <div className="flex flex-col gap-5 lg:max-w-[320px] w-full">
            <h5 className="font-bold text-[#252B42] text-base mb-2">Get In Touch</h5>
            
            <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-[#F9F9F9] border border-[#E6E6E6] text-[#737373] text-sm px-5 py-4 rounded-l-[5px] outline-none focus:border-[#23A6F0] transition-colors"
              />
              <button 
                type="submit" 
                className="bg-[#23A6F0] text-white px-6 py-4 text-sm font-normal rounded-r-[5px] hover:bg-[#1a8bc7] transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-[#737373] text-xs font-normal">
              Lore imp sum dolor Amit
            </p>
          </div>

        </div>
      </div>

      {/* 3. ALT BAR */}
      <div className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1050px] mx-auto px-10 lg:px-0 pt-6 pb-6 text-[14px] font-bold text-[#737373] text-center md:text-left">
          <p className="max-w-[200px] mx-auto md:max-w-none md:mx-0">
            Made With Love By Finland All Right Reserved
          </p>
        </div>
      </div>
      
    </footer>
  );
}