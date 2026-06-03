import React from 'react';
import user1 from '../assets/team-photos/user1.jpg';
import user2 from '../assets/team-photos/user2.png';
import user3 from '../assets/team-photos/user3.png';
import user4 from '../assets/team-photos/user4.jpg';
import user5 from '../assets/team-photos/user5.jpg';
import user6 from '../assets/team-photos/user6.png';
import user7 from '../assets/team-photos/user7.jpg';
import user8 from '../assets/team-photos/user8.jpg';
import user9 from '../assets/team-photos/user9.jpg';

export const teamMembers = [
  { id: 1, name: 'Gökhan Özdemir', role: 'Project Manager', img: user1 },
  { id: 2, name: 'Nur Akdağ', role: 'Full Stack Developer', img: user2 },
  { id: 3, name: 'Ali Yılmaz', role: 'Frontend Developer', img: user3 },
  { id: 4, name: 'Selin Kaya', role: 'Backend Developer', img: user4 },
  { id: 5, name: 'Can Demir', role: 'DevOps Engineer', img: user5 },
  { id: 6, name: 'Zeynep Çelik', role: 'QA Tester', img: user6 },
  { id: 7, name: 'Deniz Aras', role: 'Product Owner', img: user7 },
  { id: 8, name: 'Burak Şahin', role: 'Marketing Specialist', img: user8 },
  { id: 9, name: 'Ece Yurt', role: 'Content Creator', img: user9 }
];

export default function TeamCard({ member, variant = 'vertical' }) {
  if (!member) return null;

  // ================= YUVARLAK AVATAR TASARIMI (TeamPage İçin) =================
  if (variant === 'horizontal') {
    return (
      <div className="flex flex-row items-center gap-6 w-full max-w-[320px]">
        {/* Yuvarlak Profil Resmi */}
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden flex-shrink-0 bg-[#FAFAFA]">
          <img 
            src={member.img} 
            alt={member.name} 
            className="w-full h-full object-cover"
          />
        </div>
        {/* İsim ve Departman Metin Alanı */}
        <div className="flex flex-col justify-center text-left">
          <h4 className="font-bold text-[16px] text-[#252B42] mb-1">{member.name}</h4>
          <p className="text-[14px] text-[#737373] font-medium tracking-wide">{member.role}</p>
        </div>
      </div>
    );
  }

  // ================= DİKEY TASARIM (AboutPage İçin Aynen Korundu) =================
  return (
    <div className="w-[310px] h-[400px] md:w-[316px] md:h-auto flex flex-col items-center bg-white rounded-sm overflow-hidden">
      <div className="w-full h-[260px] md:h-[230px] overflow-hidden mb-6 bg-[#FAFAFA]">
        <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>
      <div className="flex flex-col items-center gap-2 mb-4 px-4 text-center">
        <h4 className="font-bold text-[16px] text-[#252B42]">{member.name}</h4>
        <p className="font-bold text-[14px] text-[#737373]">{member.role}</p>
      </div>
      <div className="flex items-center gap-5 mt-auto mb-6 md:mb-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#23A6F0" className="w-6 h-6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#23A6F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#23A6F0" className="w-6 h-6"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
      </div>
    </div>
  );
}