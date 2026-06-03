import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';
import heroVisual from '../assets/hero.png';
import arrowIcon from '../assets/arrow2.png';

// Marka İkonları
import instagramIcon from '../assets/brand-icons/instagram-icon.png';
import youtubeIcon from '../assets/brand-icons/youtube-icon.png';
import facebookIcon from '../assets/brand-icons/facebook-icon.png';
import xIcon from '../assets/brand-icons/x-icon.png';

export default function ContactPage() {
  return (
    <div className="w-full bg-white font-sans text-[#252B42]">
      
      {/* ================= SECTION 1: CONTACT HERO ================= */}
      <section className="w-full max-w-[1290px] mx-auto px-5 md:px-10 py-6 relative">
        <div className="w-full bg-gradient-to-r from-[#96E9FB] to-[#ABECD6] rounded-[32px] md:rounded-[40px] relative flex flex-col lg:flex-row items-center lg:h-[680px] overflow-hidden lg:overflow-visible">
          
          <div className="absolute w-8 h-8 left-0 bottom-[37%] md:top-[50%] md:left-[18%] lg:top-[0px] lg:left-[56%] lg:w-20 lg:h-20 bg-white rounded-full md:block z-0"></div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left z-20 flex-1 px-6 pt-16 pb-0 md:py-15 md:px-15 lg:p-0 lg:pl-35 w-full">
            <h5 className="text-[#252B42] font-bold tracking-widest text-sm md:text-base mb-6 uppercase">
              CONTACT US
            </h5>
            
            <h1 className="text-4xl md:text-[40px] lg:text-[58px] font-bold text-[#252B42] leading-tight md:leading-tight lg:leading-[65px] tracking-tight mb-6 md:mb-8">
              Get in touch <br className="hidden lg:block" /> today!
            </h1>
            
            <p className="text-lg md:text-base lg:text-[20px] text-[#737373] max-w-[295px] md:max-w-[320px] lg:max-w-[380px] font-medium leading-relaxed mb-8 md:mb-10">
              We know how large objects will act, but things on a small scale
            </p>
            
            <div className="flex flex-col gap-3 mb-10 text-[#252B42] font-bold text-[20px] lg:text-[24px]">
              <p>Phone : +451 215 215</p>
              <p>Fax : +451 215 215</p>
            </div>

            <div className="flex items-center gap-7">
              <a href="#" className="hover:scale-110 hover:opacity-80 transition-all">
                <img src={xIcon} alt="X" className="w-[30px] h-[30px] object-contain" />
              </a>
              <a href="#" className="hover:scale-110 hover:opacity-80 transition-all">
                <img src={facebookIcon} alt="Facebook" className="w-[30px] h-[30px] object-contain" />
              </a>
              <a href="#" className="hover:scale-110 hover:opacity-80 transition-all">
                <img src={instagramIcon} alt="Instagram" className="w-[30px] h-[30px] object-contain" />
              </a>
              <a href="#" className="hover:scale-110 hover:opacity-80 transition-all">
                <img src={youtubeIcon} alt="Youtube" className="w-[30px] h-[30px] object-contain" />
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-none aspect-square md:aspect-auto md:h-[450px] lg:h-[750px] lg:absolute lg:bottom-0 lg:-right-[70px] lg:w-[750px] flex justify-center items-end z-10 pointer-events-none mx-auto mt-10 md:mt-0">
            <div className="absolute bottom-13 md:bottom-[15%] lg:bottom-auto w-[270px] h-[270px] md:w-[350px] md:h-[350px] lg:top-17 lg:right-17 lg:w-[520px] lg:h-[520px] bg-white rounded-full z-10"></div>
            <div className="absolute right-[5%] top-[25%] md:right-0 md:top-[20%] lg:right-[15px] lg:top-[25%] w-3 h-3 md:w-4 md:h-4 bg-[#9B84EE] rounded-full z-30"></div>
            <div className="absolute right-[7%] top-[45%] md:right-[6%] md:top-[45%] lg:right-[30px] lg:top-[47%] w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 bg-white rounded-full z-30 shadow-sm"></div>
            <div className="absolute left-[8%] bottom-[27%] md:left-[10%] md:bottom-[25%] lg:left-[13%] lg:bottom-[28%] w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-[#9B84EE] rounded-full z-30"></div>
            <img 
              src={heroVisual}
              alt="Contact Us Image" 
              className="relative z-20 h-[145%] md:h-[120%] lg:h-[100%] object-contain object-bottom pointer-events-auto select-none"
            />
          </div>

        </div>
      </section>

      {/* ================= SECTION 2: VISIT OUR OFFICE ================= */}
      <section className="w-full bg-[#FAFAFA] md:bg-white py-16 md:py-24 px-8 lg:px-0">
        <div className="max-w-[1050px] mx-auto flex flex-col items-center">
          
          {/* Bölüm Başlığı */}
          <div className="text-center mb-16">
            <h6 className="text-[14px] font-bold text-[#252B42] mb-4 uppercase">
              VISIT OUR OFFICE
            </h6>
            <h2 className="text-[40px] font-bold text-[#252B42] max-w-[330px] lg:max-w-[550px] mx-auto leading-[50px]">
              We help small businesses with big ideas
            </h2>
          </div>

          {/* İletişim Kartları */}
          <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-[30px] lg:gap-0">
            
            {/* 1. KART: Telefon (Beyaz) */}
            <div className="w-full max-w-[330px] bg-white flex flex-col items-center text-center py-12 px-10 gap-4 lg:border-r-0">
              <Phone size={72} className="text-[#23A6F0] mb-2" strokeWidth={1.5} />
              <div className="flex flex-col text-[14px] font-bold text-[#252B42]">
                <p>georgia.young@example.com</p>
                <p>georgia.young@ple.com</p>
              </div>
              <p className="text-[16px] font-bold text-[#252B42] mt-2 mb-2">Get Support</p>
              <button className="border border-[#23A6F0] text-[#23A6F0] font-bold text-[14px] rounded-full px-8 py-3 hover:bg-[#23A6F0] hover:text-white transition-colors">
                Submit Request
              </button>
            </div>

            {/* 2. KART: Konum */}
            <div className="w-full max-w-[330px] bg-[#252B42] flex flex-col items-center text-center py-16 lg:py-20 px-10 gap-4 shadow-lg z-10">
              <MapPin size={72} className="text-[#23A6F0] mb-2" strokeWidth={1.5} />
              <div className="flex flex-col text-[14px] font-bold text-white">
                <p>georgia.young@example.com</p>
                <p>georgia.young@ple.com</p>
              </div>
              <p className="text-[16px] font-bold text-white mt-2 mb-2">Get Support</p>
              <button className="border border-[#23A6F0] text-[#23A6F0] font-bold text-[14px] rounded-full px-8 py-3 hover:bg-[#23A6F0] hover:text-white transition-colors">
                Submit Request
              </button>
            </div>

            {/* 3. KART: Mail (Beyaz) */}
            <div className="w-full max-w-[330px] bg-white flex flex-col items-center text-center py-12 px-10 gap-4 lg:border-l-0">
              <Mail size={72} className="text-[#23A6F0] mb-2" strokeWidth={1.5} />
              <div className="flex flex-col text-[14px] font-bold text-[#252B42]">
                <p>georgia.young@example.com</p>
                <p>georgia.young@ple.com</p>
              </div>
              <p className="text-[16px] font-bold text-[#252B42] mt-2 mb-2">Get Support</p>
              <button className="border border-[#23A6F0] text-[#23A6F0] font-bold text-[14px] rounded-full px-8 py-3 hover:bg-[#23A6F0] hover:text-white transition-colors">
                Submit Request
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 3: LET'S TALK (CTA) ================= */}
      <section className="w-full bg-white py-16 md:py-20 px-8 text-center flex flex-col items-center">
        
        {/* Kıvrımlı Ok */}
        <img src={arrowIcon} alt="Arrow Down" className="w-[72px] object-contain mb-4" />

        <h5 className="text-[16px] font-bold text-[#252B42] mb-4 uppercase">
          WE CAN'T WAIT TO MEET YOU
        </h5>
        
        <h2 className="text-[58px] font-bold text-[#252B42] mb-6 tracking-tight">
          Let's Talk
        </h2>
        
        <button className="bg-[#23A6F0] text-white px-10 py-4 rounded-[5px] font-bold text-[14px] hover:bg-[#1a8bc7] transition-colors">
          Try it free now
        </button>

      </section>

    </div>
  );
}