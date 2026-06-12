import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { api } from '../api/axiosInstance';
import { Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AddressPage() {
  const dispatch = useDispatch();
  
  
  const addresses = useSelector(state => state.address?.list || []);
  const { cart } = useSelector(state => state.shoppingCart); 
  
 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState(null); 
  const [editingAddress, setEditingAddress] = useState(null); 
  const [isBillingSame, setIsBillingSame] = useState(true);
  
  const { register, handleSubmit, reset, setValue } = useForm();

  const subtotal = cart.filter(i => i.checked).reduce((sum, i) => sum + (i.product.price * i.count), 0);
  const baseShipping = subtotal === 0 ? 0 : 29.99; 
  const shippingDiscount = subtotal >= 150 ? 29.99 : 0; 
  const cartDiscount = subtotal > 500 ? subtotal * 0.1 : 0; 
  const total = subtotal + baseShipping - shippingDiscount - cartDiscount;

  const isNextStepDisabled = !selectedAddressId || !isBillingSame;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    api.get('/user/address', { headers: { Authorization: token } })
      .then(res => {
        dispatch({ type: 'SET_ADDRESSES', payload: res.data });
        if (res.data.length > 0 && !selectedAddressId) {
          setSelectedAddressId(res.data[0].id);
        }
      })
      .catch(err => console.error("Adres çekme hatası:", err));
  }, [dispatch, refreshKey]);

  const handleAddNew = () => {
    setEditingAddress(null);
    reset({ title: '', name: '', surname: '', phone: '', city: '', district: '', neighborhood: '' });
    setIsFormOpen(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    reset({
      title: address.title,
      name: address.name,
      surname: address.surname,
      phone: address.phone,
      city: address.city,
      district: address.district,
      neighborhood: address.neighborhood
    });
    setIsFormOpen(true);
  };

  
  const handleDelete = (id, e) => {
    e.stopPropagation(); 
    const token = localStorage.getItem('token');
    
    api.delete(`/user/address/${id}`, { headers: { Authorization: token } })
      .then(() => {
        
        if (selectedAddressId === id) {
          setSelectedAddressId(null);
        }
        setRefreshKey(prev => prev + 1); 
      })
      .catch(err => console.error("Adres silinemedi:", err));
  };

  const onSubmit = (data) => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: token } };

    const payload = {
      title: data.title,
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      city: data.city,
      district: data.district,
      neighborhood: data.neighborhood
    };

    if (editingAddress) {
      payload.id = editingAddress.id; 
      api.put('/user/address', payload, config)
        .then(() => {
          setIsFormOpen(false);
          setRefreshKey(prev => prev + 1);
        })
        .catch(err => console.error("Adres güncellenemedi:", err));
    } else {
      api.post('/user/address', payload, config)
        .then(() => {
          setIsFormOpen(false);
          setRefreshKey(prev => prev + 1);
        })
        .catch(err => console.error("Adres eklenemedi:", err));
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8 bg-[#FAFAFA] min-h-screen">
      
      {/* SOL KOLON: Adres Seçimi */}
      <div className="flex-1">
        
        {/* Üst Sekmeler */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 bg-white p-4 border border-b-4 border-b-[#F27A1A] rounded-t-sm shadow-sm flex flex-col justify-center">
            <h2 className="text-[#F27A1A] text-xl font-semibold">Adres Bilgileri</h2>
            <p className="text-xs text-gray-500 mt-1">
              {addresses.length > 0 ? addresses[0].neighborhood.substring(0, 30) + '...' : 'Adres seçin'}
            </p>
          </div>
          
          <Link 
            to="/payment" 
            state={{ selectedAddressId }}
            className={`flex-1 bg-white p-4 border rounded-sm shadow-sm text-gray-600 flex flex-col justify-center transition-colors ${isNextStepDisabled ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'}`}
          >
            <h2 className="text-lg font-semibold text-gray-700">Ödeme Seçenekleri</h2>
            <p className="text-xs text-gray-500 mt-1">Banka/Kredi Kartı ile güvenle ödeyin.</p>
          </Link>
        </div>

        {/* Uyarı Mesajı */}
        <div className="bg-[#FFF8F1] border border-[#FBE3D3] p-4 rounded mb-6 flex items-start gap-3 text-sm text-gray-700">
          <div className="w-5 h-5 bg-[#F27A1A] text-white rounded-full flex items-center justify-center font-bold mt-0.5 shrink-0">i</div>
          <p>Kurumsal faturalı alışveriş yapmak için "Faturamı Aynı Adrese Gönder" tikini kaldırın ve Fatura adresi olarak kayıtlı Kurumsal Fatura adresinizi seçin.</p>
        </div>

        {/* Adres Grid Alanı */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Teslimat Adresi</h3>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={isBillingSame}
              onChange={(e) => setIsBillingSame(e.target.checked)}
              className="accent-[#F27A1A] w-4 h-4 cursor-pointer" 
            />
            Faturamı Aynı Adrese Gönder
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Yeni Adres Ekleme Butonu */}
          <div 
            onClick={handleAddNew}
            className="border-2 border-dashed border-gray-300 rounded bg-gray-50 flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-100 transition-colors min-h-[160px]"
          >
            <Plus size={32} className="text-[#F27A1A] mb-2" />
            <span className="font-semibold text-gray-700">Yeni Adres Ekle</span>
          </div>

          {/* Adres Kartları */}
          {addresses.map((addr) => (
            <div 
              key={addr.id} 
              onClick={() => setSelectedAddressId(addr.id)}
              className={`border rounded p-4 cursor-pointer flex flex-col min-h-[160px] transition-all ${
                selectedAddressId === addr.id 
                  ? 'border-[#F27A1A] shadow-[0_0_0_1px_#F27A1A] bg-[#FFFBF9]' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="delivery_address" 
                    checked={selectedAddressId === addr.id}
                    readOnly
                    className="accent-[#F27A1A] w-4 h-4"
                  />
                  <span className="font-bold text-gray-800 text-sm">{addr.title}</span>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleEdit(addr);
                    }}
                    className="text-sm font-semibold text-gray-600 hover:text-[#F27A1A] underline"
                  >
                    Düzenle
                  </button>
                  <button 
                    onClick={(e) => handleDelete(addr.id, e)}
                    className="text-sm font-semibold text-gray-400 hover:text-red-500 underline transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-700 mb-1 font-medium">
                <span className="flex items-center gap-1">👤 {addr.name} {addr.surname}</span>
                <span className="flex items-center gap-1">📱 {addr.phone}</span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-3 mt-1 leading-relaxed">
                {addr.neighborhood}, {addr.district} / {addr.city}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SAĞ KOLON: Sipariş Özeti */}
      <div className="w-full lg:w-[320px] flex flex-col gap-4 sticky top-6 h-max">
        
        {/* Üst Buton */}
        <Link to="/payment" state={{ selectedAddressId }} className={isNextStepDisabled ? "pointer-events-none opacity-50" : ""}>
          <button 
            disabled={isNextStepDisabled} 
            className="w-full bg-[#F27A1A] text-white font-bold py-3 rounded hover:bg-[#d96812] transition-colors shadow-sm disabled:cursor-not-allowed"
          >
            Kaydet ve Devam Et
          </button>
        </Link>

        {/* Dinamik Fiyat Kutusu */}
        <div className="bg-white border rounded shadow-sm p-4">
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
            <span>Toplam</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Alt Buton */}
        <Link to="/payment" state={{ selectedAddressId }} className={isNextStepDisabled ? "pointer-events-none opacity-50" : ""}>
          <button 
            disabled={isNextStepDisabled} 
            className="w-full bg-[#F27A1A] text-white font-bold py-3 rounded hover:bg-[#d96812] transition-colors shadow-sm disabled:cursor-not-allowed"
          >
            Kaydet ve Devam Et
          </button>
        </Link>
      </div>

      {/* MODAL: Adres Ekleme */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-5 sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-800">
                {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Adres Başlığı</label>
                <input {...register("title")} placeholder="Örn: Ev, İş" className="p-2 border rounded focus:border-[#F27A1A] outline-none" required />
              </div>

              <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Telefon</label>
                <input {...register("phone")} placeholder="05XXXXXXXXX" className="p-2 border rounded focus:border-[#F27A1A] outline-none" required />
              </div>

              <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Ad</label>
                <input {...register("name")} className="p-2 border rounded focus:border-[#F27A1A] outline-none" required />
              </div>

              <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Soyad</label>
                <input {...register("surname")} className="p-2 border rounded focus:border-[#F27A1A] outline-none" required />
              </div>

              <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">İl</label>
                <select {...register("city")} className="p-2 border rounded focus:border-[#F27A1A] outline-none bg-white" required>
                  <option value="">İl Seçiniz</option>
                  <option value="İstanbul">İstanbul</option>
                  <option value="Ankara">Ankara</option>
                  <option value="İzmir">İzmir</option>
                </select>
              </div>

              <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">İlçe</label>
                <input {...register("district")} className="p-2 border rounded focus:border-[#F27A1A] outline-none" required />
              </div>

              <div className="col-span-2 flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Açık Adres (Mahalle, Sokak, No)</label>
                <textarea {...register("neighborhood")} className="p-2 border rounded focus:border-[#F27A1A] outline-none h-24" required />
              </div>

              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2 border rounded text-gray-600 hover:bg-gray-50 font-semibold">
                  İptal
                </button>
                <button type="submit" className="px-6 py-2 bg-[#F27A1A] text-white rounded hover:bg-[#d96812] font-semibold transition-colors">
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}