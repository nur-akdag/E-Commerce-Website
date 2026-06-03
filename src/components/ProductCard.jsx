import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, textAlign = "center" }) {
  if (!product) return null;

  
  const isLeft = textAlign === "left";
  const alignClass = isLeft ? "text-left" : "text-center";
  const justifyClass = isLeft ? "justify-start" : "justify-center";
  
  
  const textPaddingClass = isLeft ? "pl-[25px] md:pl-0 pr-[25px] md:pr-0" : "";

  return (
    <Link to={`/product/${product.id}`} className={`w-[350px] md:w-[240px] flex flex-col group cursor-pointer bg-white transition-all duration-300 hover:shadow-sm pb-6 ${alignClass}`}>
      
      {/* 1. GÖRSEL ALANI */}
      <div className="w-full h-[430px] md:h-[300px] overflow-hidden mb-6 bg-[#FAFAFA]">
        <img 
          src={product.img} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 2. METİN VE FİYAT ALANI */}
      <div className={`flex flex-col w-full ${textPaddingClass}`}>
        
        <h4 className="font-bold text-[16px] tracking-tight text-[#252B42] mb-2">
          {product.title}
        </h4>

        <p className="text-[14px] font-bold text-[#737373] mb-2">
          {product.department}
        </p>

        {/* Fiyat Alanı */}
        <div className={`flex gap-1.5 font-bold text-base mb-4 ${justifyClass}`}>
          <span className="text-[#BDBDBD] line-through">
            {product.oldPrice}
          </span>
          <span className="text-[#23856D]">
            {product.newPrice}
          </span>
        </div>

        {/* Renk Seçenekleri */}
        {product.colors && product.colors.length > 0 && (
          <div className={`flex gap-1.5 mt-auto ${justifyClass}`}>
            {product.colors.map((color, idx) => (
              <span 
                key={idx} 
                className={`w-4 h-4 rounded-full border border-black/5 ${color} transition-transform hover:scale-110`} 
              />
            ))}
          </div>
        )}
        
      </div>
    </Link>
  );
}