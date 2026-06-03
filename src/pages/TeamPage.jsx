import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TeamCard, { teamMembers } from '../components/TeamCard';

export default function TeamPage() {
  // Figma'daki dikey mobil akış sırasını yakalamak için veriyi sütun bazlı grupluyoruz
  const column1 = [teamMembers[0], teamMembers[1], teamMembers[2]]; // Sol Sütun
  const column2 = [teamMembers[3], teamMembers[4], teamMembers[5]]; // Orta Sütun
  const column3 = [teamMembers[6], teamMembers[7], teamMembers[8]]; // Sağ Sütun

  return (
    <div className="w-full bg-white font-sans text-[#252B42]">
      
      {/* ================= SECTION 1: HERO & COLLAGE ================= */}
      <section className="w-full flex flex-col items-center pt-12 pb-16 px-0 lg:px-0">
        <div className="max-w-[1050px] w-full flex flex-col items-center text-center px-8 gap-4 mb-10 md:mb-16">
          <h5 className="text-[16px] font-bold text-[#737373] uppercase tracking-wide">What We Do</h5>
          <h1 className="text-[40px] md:text-[58px] font-bold text-[#252B42] leading-tight tracking-tight">Innovation tailored for you</h1>
          <div className="flex items-center justify-center gap-4 text-[14px] font-bold mt-2">
            <Link to="/" className="text-[#252B42] hover:opacity-80 transition-opacity">Home</Link>
            <ChevronRight size={16} className="text-[#BDBDBD]" />
            <span className="text-[#737373]">Team</span>
          </div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-stretch gap-2 md:gap-2.5 md:h-[530px]">
          <div className="w-full md:w-1/2 h-[400px] md:h-full relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800" alt="Fashion Model" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-2.5 md:gap-2.5 md:h-full">
            <div className="flex flex-1 gap-2 md:gap-2.5 h-[200px] md:h-auto min-h-0">
              <div className="flex-1 h-full overflow-hidden relative"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=400" alt="Detail 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              <div className="flex-1 h-full overflow-hidden relative"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=400" alt="Detail 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
            </div>
            <div className="flex flex-1 gap-2 md:gap-2.5 h-[200px] md:h-auto min-h-0">
              <div className="flex-1 h-full overflow-hidden relative"><img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400" alt="Detail 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              <div className="flex-1 h-full overflow-hidden relative"><img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400" alt="Detail 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: MEET OUR TEAM (Yeni Tasarım) ================= */}
      <section className="w-full bg-white py-16 md:py-24 px-[42px] md:px-0">
        <div className="max-w-[1050px] mx-auto flex flex-col items-center">
          
          {/* Başlık Grubu */}
          <div className="text-center mb-20 md:mb-28 flex flex-col items-center gap-4">
            <h2 className="text-[40px] font-bold text-[#252B42] tracking-tight">Meet Our Team</h2>
            <p className="text-[14px] text-[#737373] font-medium leading-relaxed max-w-[450px]">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          {/* Sadece Flexbox ile 3 Sütunlu Grid-Like Yapı (Mobilde kusursuz sıralı akar) */}
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-12 md:gap-6">
            
            {/* Sütun 1 */}
            <div className="w-full md:w-[31%] flex flex-col gap-12 md:gap-14 items-center md:items-start">
              {column1.map((member) => (
                <TeamCard key={member.id} member={member} variant="horizontal" />
              ))}
            </div>

            {/* Sütun 2 */}
            <div className="w-full md:w-[31%] flex flex-col gap-12 md:gap-14 items-center md:items-start">
              {column2.map((member) => (
                <TeamCard key={member.id} member={member} variant="horizontal" />
              ))}
            </div>

            {/* Sütun 3 */}
            <div className="w-full md:w-[31%] flex flex-col gap-12 md:gap-14 items-center md:items-start">
              {column3.map((member) => (
                <TeamCard key={member.id} member={member} variant="horizontal" />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 3: CTA ================= */}
      <section className="w-full bg-white py-20 px-8 text-center flex flex-col items-center">
        <h2 className="text-[40px] font-bold text-[#252B42] mb-6 tracking-tight max-w-[550px] leading-tight">Start your 14 days free trial</h2>
        <p className="text-[14px] text-[#737373] font-medium leading-[20px] max-w-[400px] mb-8">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.</p>
        <button className="bg-[#23A6F0] text-white px-10 py-4 rounded-[5px] font-bold text-[14px] hover:bg-[#1a8bc7] transition-colors mb-10 cursor-pointer shadow">Try it free now</button>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:opacity-80 transition-opacity"><svg width="30" height="30" viewBox="0 0 24 24" fill="#23A6F0"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
          <a href="#" className="hover:opacity-80 transition-opacity"><svg width="30" height="30" viewBox="0 0 24 24" fill="#395185"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
          <a href="#" className="hover:opacity-80 transition-opacity"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
          <a href="#" className="hover:opacity-80 transition-opacity"><svg width="30" height="30" viewBox="0 0 24 24" fill="#0A66C2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
        </div>
      </section>

    </div>
  );
}