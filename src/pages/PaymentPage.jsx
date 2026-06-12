import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { api } from '../api/axiosInstance';
import { Plus, X, Trash2, Edit2, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';

export default function PaymentPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  

  const finalAddressId = location.state?.selectedAddressId || 1; 
  
  const { cart } = useSelector(state => state.shoppingCart);
  
  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
  
  const [is3DSecure, setIs3DSecure] = useState(true);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState(1);

  const { register, handleSubmit, reset } = useForm();

  // Hesaplamalar
  const subtotal = cart.filter(i => i.checked).reduce((sum, i) => sum + (i.product.price * i.count), 0);
  const baseShipping = subtotal === 0 ? 0 : 29.99; 
  const shippingDiscount = subtotal >= 150 ? 29.99 : 0; 
  const cartDiscount = subtotal > 500 ? subtotal * 0.1 : 0; 
  const total = subtotal + baseShipping - shippingDiscount - cartDiscount;

  // Dinamik Taksit Seçenekleri Kurgusu
  const installments = [
    { count: 1, label: "Tek Çekim", amount: total },
    ...(total >= 300 ? [{ count: 3, label: "3 Taksit", amount: total / 3 }] : []),
    ...(total >= 500 ? [{ count: 6, label: "6 Taksit", amount: total / 6 }] : []),
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    api.get('/user/card', { headers: { Authorization: token } })
      .then(res => {
        setCards(res.data);
        if (res.data.length > 0 && !selectedCardId) {
          setSelectedCardId(res.data[0].id);
        }
      })
      .catch(err => console.error("Kartlar çekilemedi:", err));
  }, [refreshKey]);

  const handleAddNew = () => {
    setEditingCard(null);
    reset({ name_on_card: '', card_no: '', expire_month: '', expire_year: '' });
    setIsFormOpen(true);
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    reset({
      name_on_card: card.name_on_card,
      card_no: card.card_no,
      expire_month: card.expire_month,
      expire_year: card.expire_year
    });
    setIsFormOpen(true);
  };

  const handleDelete = (cardId, e) => {
    e.stopPropagation(); 
    const token = localStorage.getItem('token');
    api.delete(`/user/card/${cardId}`, { headers: { Authorization: token } })
      .then(() => {
        setRefreshKey(prev => prev + 1);
        if (selectedCardId === cardId) setSelectedCardId(null); 
      })
      .catch(err => console.error("Kart silinemedi:", err));
  };

  const onSubmit = (data) => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: token } };

    const payload = {
      card_no: data.card_no.replace(/\s/g, ''),
      expire_month: Number(data.expire_month),
      expire_year: Number(data.expire_year),
      name_on_card: data.name_on_card
    };

    if (editingCard) {
      payload.id = editingCard.id;
      api.put('/user/card', payload, config)
        .then(() => {
          setIsFormOpen(false);
          setRefreshKey(prev => prev + 1);
        })
        .catch(err => console.error("Kart güncellenemedi:", err));
    } else {
      api.post('/user/card', payload, config)
        .then(() => {
          setIsFormOpen(false);
          setRefreshKey(prev => prev + 1);
        })
        .catch(err => console.error("Kart eklenemedi:", err));
    }
  };

  const maskCardNumber = (num) => {
    if (!num) return "";
    const str = String(num);
    return `${str.substring(0, 4)} ${str.substring(4, 6)}** **** ${str.substring(12, 16)}`;
  };

  // Siparişi Tamamlama Fonksiyonu
  const handleCompleteOrder = async () => {
    if (!selectedCardId) return;

    const selectedCard = cards.find(c => c.id === selectedCardId);
    const checkedItems = cart.filter(item => item.checked);

    if (checkedItems.length === 0) {
      toast.warning("Sepetinizde seçili ürün bulunmuyor.");
      return;
    }

    const payload = {
      address_id: finalAddressId,
      order_date: new Date().toISOString(),
      card_no: Number(selectedCard.card_no),
      card_name: selectedCard.name_on_card,
      card_expire_month: selectedCard.expire_month,
      card_expire_year: selectedCard.expire_year,
      card_ccv: 321, 
      price: total,
      products: checkedItems.map(item => ({
        product_id: item.product.id,
        count: item.count,
        detail: "Standart"
      }))
    };

    try {
      const token = localStorage.getItem('token');
      await api.post('/order', payload, { headers: { Authorization: token } });
      
      toast.success("Tebrikler! Siparişiniz başarıyla oluşturuldu ve ödemeniz alındı! 🎉");
      dispatch({ type: 'CLEAR_CART' }); 
      navigate('/'); 
      
    } catch (error) {
      console.error("Sipariş oluşturulamadı:", error.response?.data || error.message);
      toast.error("Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8 bg-[#FAFAFA] min-h-screen">
      
      {/* SOL KOLON */}
      <div className="flex-1">
        
        {/* Üst Sekmeler */}
        <div className="flex border border-gray-200 rounded-sm overflow-hidden mb-6 bg-white shadow-sm">
          <Link to="/address" className="flex-1 p-4 border-r border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Adres Bilgileri</h2>
              <p className="text-xs mt-1">Teslimat Adresi Belirlendi</p>
            </div>
            <span className="text-sm font-semibold underline cursor-pointer">Değiştir</span>
          </Link>
          
          <div className="flex-1 p-4 border-b-4 border-b-[#F27A1A]">
            <h2 className="text-[#F27A1A] text-lg font-semibold">Ödeme Seçenekleri</h2>
            <p className="text-xs text-gray-500 mt-1">Banka/Kredi Kartı veya Alışveriş Kredisi ile ödemenizi güvenle yapabilirsiniz.</p>
          </div>
        </div>

        {/* Kart ile Öde Başlığı */}
        <div className="bg-white border border-gray-200 rounded shadow-sm p-5 mb-4 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <input type="radio" checked readOnly className="accent-[#F27A1A] w-5 h-5" />
            <h3 className="text-lg font-bold text-gray-800">Kart ile Öde</h3>
          </div>
          <p className="text-sm text-gray-500 ml-7">Kart ile ödemeyi seçtiniz. Banka veya Kredi Kartı kullanarak ödemenizi güvenle yapabilirsiniz.</p>
        </div>

        {/* Alt Izgara (Kartlar ve Taksit) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-gray-200 rounded shadow-sm p-6">
          
          {/* Kayıtlı Kartlar Listesi */}
          <div className="flex flex-col border-r-0 md:border-r border-gray-200 md:pr-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-semibold text-gray-800 text-lg">Kart Bilgileri</h4>
              <button onClick={handleAddNew} className="text-sm text-gray-500 hover:text-[#F27A1A] underline flex items-center gap-1">
                <Plus size={16} /> Yeni Kart Ekle
              </button>
            </div>

            <div className="space-y-5">
              {cards.map(card => (
                <div key={card.id} className="relative cursor-pointer" onClick={() => setSelectedCardId(card.id)}>
                  
                  {/* Radyo Buton ve Başlık */}
                  <label className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input type="radio" checked={selectedCardId === card.id} readOnly className="accent-[#F27A1A] w-4 h-4" />
                    <span className="font-bold text-gray-700 text-sm">{card.name_on_card.split(' ')[0]} Kartım</span>
                  </label>

                  {/* Kredi Kartı Kutusu */}
                  <div className={`relative flex flex-col justify-between border rounded-lg p-5 transition-all bg-white ${
                    selectedCardId === card.id ? 'border-[#F27A1A] shadow-[0_0_0_1px_#F27A1A]' : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    
                    {/* Kart Görsel İçeriği */}
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="font-extrabold text-gray-300 italic text-xl">BANK</div>
                        <div className="flex">
                          <div className="w-8 h-8 bg-red-500 rounded-full mix-blend-multiply opacity-80"></div>
                          <div className="w-8 h-8 bg-yellow-400 rounded-full mix-blend-multiply opacity-80 -ml-4"></div>
                        </div>
                      </div>

                      <div className="text-right space-y-1 mt-4">
                        <p className="tracking-widest font-mono text-gray-800 font-bold">{maskCardNumber(card.card_no)}</p>
                        <p className="text-sm text-gray-600 font-mono font-semibold">{String(card.expire_month).padStart(2, '0')}/{card.expire_year}</p>
                      </div>
                    </div>

                    
                    <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleEdit(card); }} 
                        className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-[#F27A1A] transition-colors"
                      >
                        <Edit2 size={16} /> Düzenle
                      </button>
                      
                      <button 
                        onClick={(e) => handleDelete(card.id, e)} 
                        className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} /> Sil
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 cursor-pointer" onClick={() => setIs3DSecure(!is3DSecure)}>
              <input type="checkbox" checked={is3DSecure} readOnly className="w-5 h-5 accent-gray-700" />
              <span className="font-semibold text-gray-800 flex items-center gap-1 text-sm">
                <ShieldCheck size={18} className="text-gray-800" /> 3D Secure ile ödemek istiyorum.
              </span>
            </div>
          </div>

          {/* Taksit Seçenekleri Tablosu */}
          <div className="flex flex-col md:pl-2">
            <h4 className="font-semibold text-gray-800 text-lg mb-6">Taksit Seçenekleri</h4>
            <p className="text-sm text-gray-500 mb-4">Kartınıza uygun taksit seçeneğini seçiniz</p>
            
            <div className="border border-gray-200 rounded overflow-hidden">
              <div className="bg-gray-50 grid grid-cols-2 p-3 border-b text-sm font-semibold text-gray-600">
                <span>Taksit Sayısı</span>
                <span className="text-right">Aylık Ödeme</span>
              </div>
              
              {installments.map((inst) => (
                <label 
                  key={inst.count} 
                  className={`grid grid-cols-2 p-4 border-b last:border-0 items-center cursor-pointer transition-colors ${selectedInstallment === inst.count ? 'bg-[#FFFBF9]' : 'bg-white hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="installment" 
                      checked={selectedInstallment === inst.count} 
                      onChange={() => setSelectedInstallment(inst.count)} 
                      className="accent-[#F27A1A] w-4 h-4" 
                    />
                    <span className={`font-semibold ${selectedInstallment === inst.count ? 'text-[#F27A1A]' : 'text-gray-800'}`}>
                      {inst.label}
                    </span>
                  </div>
                  <span className={`text-right font-bold ${selectedInstallment === inst.count ? 'text-[#F27A1A]' : 'text-gray-800'}`}>
                    ${inst.amount.toFixed(2)}
                  </span>
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* SAĞ KOLON: Sipariş Özeti */}
      <div className="w-full lg:w-[320px] flex flex-col gap-4 sticky top-6 h-max">
        
        {/* Üst Buton */}
        <button 
          onClick={handleCompleteOrder}
          disabled={!selectedCardId || !isTermsAccepted}
          className="w-full bg-gray-500 text-white font-bold py-4 rounded hover:bg-gray-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          Ödeme Yap
        </button>

        {/* Sözleşme Onay */}
        <div className="bg-white p-4 border border-gray-200 rounded shadow-sm text-sm text-gray-600 flex items-start gap-3">
          <input 
            type="checkbox" 
            id="terms-checkbox"
            checked={isTermsAccepted}
            onChange={(e) => setIsTermsAccepted(e.target.checked)}
            className="mt-1 accent-[#F27A1A] cursor-pointer w-4 h-4 shrink-0" 
          />
          <label htmlFor="terms-checkbox" className="cursor-pointer select-none leading-relaxed">
            <span className="font-semibold underline">Ön Bilgilendirme Koşulları</span>'nı ve <span className="font-semibold underline">Mesafeli Satış Sözleşmesi</span>'ni okudum, onaylıyorum.
          </label>
        </div>

        {/* Sipariş Özeti Kutusu */}
        <div className="bg-white border border-gray-200 rounded shadow-sm p-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-5">Sipariş Özeti</h3>
          <div className="space-y-3 text-sm text-gray-600 border-b border-gray-200 pb-5 mb-5">
            <div className="flex justify-between">
              <span>Ürünün Toplamı</span>
              <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Kargo Toplam</span>
              <span className="font-semibold text-gray-800">${baseShipping.toFixed(2)}</span>
            </div>
            
            {shippingDiscount > 0 && (
              <div className="flex justify-between text-[#F27A1A]">
                <span className="w-2/3">$150 ve Üzeri Kargo Bedava</span>
                <span className="font-semibold">-${shippingDiscount.toFixed(2)}</span>
              </div>
            )}

            {cartDiscount > 0 && (
              <div className="flex justify-between text-[#F27A1A]">
                <span>Sepet İndirimi (%10)</span>
                <span className="font-semibold">-${cartDiscount.toFixed(2)}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between text-lg font-bold text-[#F27A1A]">
            <span className="text-gray-800">Toplam</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Alt Buton */}
        <button 
          onClick={handleCompleteOrder}
          disabled={!selectedCardId || !isTermsAccepted}
          className="w-full bg-gray-500 text-white font-bold py-4 rounded hover:bg-gray-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          Ödeme Yap
        </button>
      </div>

      {/* MODAL: Yeni Kart Ekleme / Düzenleme */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px] overflow-hidden">
            <div className="flex justify-between items-center border-b p-5 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                {editingCard ? 'Kartı Düzenle' : 'Kart Bilgileri'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Kart Üzerindeki İsim</label>
                <input 
                  {...register("name_on_card", { required: true })} 
                  placeholder="Örn: Ali Baş" 
                  className="p-3 border rounded focus:border-[#F27A1A] outline-none" 
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Kart Numarası</label>
                <input 
                  {...register("card_no", { required: true, minLength: 16, maxLength: 16 })} 
                  placeholder="1234 1234 1234 1234" 
                  maxLength={16}
                  className="p-3 border rounded focus:border-[#F27A1A] outline-none tracking-widest" 
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Son Kullanma (Ay)</label>
                  <select {...register("expire_month", { required: true })} className="p-3 border rounded focus:border-[#F27A1A] outline-none bg-white">
                    <option value="">Ay</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i+1} value={i+1}>{String(i+1).padStart(2, '0')}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Son Kullanma (Yıl)</label>
                  <select {...register("expire_year", { required: true })} className="p-3 border rounded focus:border-[#F27A1A] outline-none bg-white">
                    <option value="">Yıl</option>
                    {[...Array(15)].map((_, i) => (
                      <option key={i} value={new Date().getFullYear() + i}>{new Date().getFullYear() + i}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#F27A1A] text-white font-bold py-3 rounded mt-2 hover:bg-[#d96812] transition-colors">
                {editingCard ? 'Güncelle' : 'Kartı Kaydet'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}