import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { toggleChecked, increaseCount, decreaseCount, removeFromCart } from '../store/actions/shoppingCartActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

export default function CartPage() {
  const { cart } = useSelector(state => state.shoppingCart);
  const user = useSelector(state => state.client.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const groupedCart = useMemo(() => {
    return cart.reduce((acc, item) => {
      const seller = item.product.store_name || "Genel Satıcılar";
      if (!acc[seller]) acc[seller] = [];
      acc[seller].push(item);
      return acc;
    }, {});
  }, [cart]);

  const handleCheckout = () => {
  
    const token = localStorage.getItem('token');
    const isLoggedIn = token || (user && Object.keys(user).length > 0);

    if (!isLoggedIn) {
      toast.warning("Siparişe devam etmek için lütfen giriş yapın.");
      navigate('/login');
    } else {
      navigate('/address');
    }
  };

  
  const subtotal = cart.filter(i => i.checked).reduce((sum, i) => sum + (i.product.price * i.count), 0);
  const baseShipping = subtotal === 0 ? 0 : 29.99; 
  const shippingDiscount = subtotal >= 150 ? 29.99 : 0; 
  const cartDiscount = subtotal > 500 ? subtotal * 0.1 : 0; 
  
  const total = subtotal + baseShipping - shippingDiscount - cartDiscount;

  return (
    <div className="max-w-[1200px] mx-auto py-12 px-4 flex flex-col lg:flex-row gap-8 bg-[#FAFAFA] min-h-screen">
      
      {/* SOL: ÜRÜN LİSTESİ */}
      <div className="flex-grow">
        <Link to="/shop" className="flex items-center gap-2 text-gray-500 hover:text-[#F27A1A] mb-6 font-semibold transition-colors w-max">
          <ArrowLeft size={20} /> Alışverişe Devam Et
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sepetim ({cart.length} Ürün)</h2>
        
        {Object.entries(groupedCart).length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded shadow-sm">
            <p className="text-gray-500 font-bold text-lg">Sepetiniz şu an boş!</p>
            <Link to="/shop" className="text-[#F27A1A] font-bold mt-3 inline-block px-6 py-2 border border-[#F27A1A] rounded hover:bg-[#FFF8F1] transition-colors">
              Hemen ürünleri keşfet
            </Link>
          </div>
        ) : (
          Object.entries(groupedCart).map(([seller, items]) => (
            <div key={seller} className="border border-gray-200 rounded mb-6 bg-white shadow-sm overflow-hidden">
              <div className="p-4 bg-[#FFF8F1] font-bold border-b border-gray-200 text-sm flex items-center gap-3 text-gray-700">
                <input type="checkbox" className="w-4 h-4 accent-[#F27A1A]" defaultChecked /> 
                Satıcı: <span className="text-[#F27A1A] text-base">{seller}</span>
              </div>
              
              {items.map(item => (
                <div key={item.product.id} className="p-5 flex items-center gap-4 border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={item.checked} 
                    onChange={() => dispatch(toggleChecked(item.product.id))} 
                    className="w-5 h-5 cursor-pointer accent-[#F27A1A]" 
                  />
                  <img src={item.product.images[0].url} className="w-20 h-20 object-cover rounded border border-gray-200" alt={item.product.name} />
                  
                  <div className="flex-grow">
                    <p className="font-bold text-gray-800 text-base">{item.product.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Stokta: {item.product.stock} Adet</p>
                  </div>

                  <div className="flex items-center border border-gray-300 rounded">
                    <button onClick={() => dispatch(decreaseCount(item.product.id))} className="p-2 text-gray-500 hover:text-[#F27A1A] hover:bg-gray-100 transition-colors"><Minus size={16}/></button>
                    <span className="px-4 font-bold text-sm text-gray-700">{item.count}</span>
                    <button onClick={() => dispatch(increaseCount(item.product.id))} className="p-2 text-gray-500 hover:text-[#F27A1A] hover:bg-gray-100 transition-colors"><Plus size={16}/></button>
                  </div>

                  {/* Fiyat Formatı: Dolar */}
                  <p className="font-bold text-[#F27A1A] w-28 text-right text-lg">
                    ${(item.product.price * item.count).toFixed(2)}
                  </p>
                  
                  <button onClick={() => dispatch(removeFromCart(item.product.id))} className="text-gray-400 hover:text-red-500 transition-colors ml-2">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* SAĞ: SİPARİŞ ÖZETİ KUTUSU */}
      {cart.length > 0 && (
        <div className="w-full lg:w-[320px] flex flex-col gap-4 sticky top-6 h-max">
          <button 
            onClick={handleCheckout} 
            disabled={subtotal === 0} 
            className="w-full bg-[#F27A1A] text-white font-bold py-3 rounded hover:bg-[#d96812] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sepeti Onayla
          </button>

          <div className="bg-white border border-gray-200 rounded shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sipariş Özeti</h3>
            
            <div className="space-y-3 text-sm text-gray-600 border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span>Ürünün Toplamı</span>
                <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Kargo Toplam</span>
                <span className="font-semibold text-gray-800">${baseShipping.toFixed(2)}</span>
              </div>
              
              {/* Kargo Bedava İndirimi */}
              {shippingDiscount > 0 && (
                <div className="flex justify-between text-[#F27A1A]">
                  <span className="w-2/3">$150 ve Üzeri Kargo Bedava</span>
                  <span className="font-semibold">-${shippingDiscount.toFixed(2)}</span>
                </div>
              )}

              {/* Ekstra Sepet İndirimi */}
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#F27A1A]">
                  <span>Sepet İndirimi (%10)</span>
                  <span className="font-semibold">-${cartDiscount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between text-lg font-bold text-[#F27A1A]">
              <span>Toplam</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={handleCheckout} 
            disabled={subtotal === 0} 
            className="w-full bg-[#F27A1A] text-white font-bold py-3 rounded hover:bg-[#d96812] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sepeti Onayla
          </button>

          <div className="flex items-center gap-2 justify-center mt-2 text-gray-500 text-xs">
             <span className="font-semibold">🔒 Güvenli Alışveriş</span>
          </div>
        </div>
      )}
    </div>
  );
}