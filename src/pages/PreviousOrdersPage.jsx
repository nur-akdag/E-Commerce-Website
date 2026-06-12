import React, { useEffect, useState } from 'react';
import { api } from '../api/axiosInstance';
import { ChevronDown, ChevronUp, Package, Calendar, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PreviousOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/order', { headers: { Authorization: token } });
        console.log("Backend'den Gelen Siparişler:", res.data);
        
        setOrders(res.data);
      } catch (error) {
        console.error("Siparişler çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderPanel = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const formatDate = (isoString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(isoString).toLocaleDateString('tr-TR', options);
  };

  return (
    <div className="max-w-[1000px] mx-auto py-12 px-4 min-h-[70vh] bg-white">
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <Package size={28} className="text-[#F27A1A]" />
        <h2 className="text-2xl font-bold text-gray-800">Geçmiş Siparişlerim</h2>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 font-semibold animate-pulse">Siparişleriniz yükleniyor...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed rounded-lg shadow-sm">
          <p className="text-gray-500 font-bold text-lg">Henüz hiç sipariş vermemişsiniz.</p>
          <Link to="/shop" className="text-[#F27A1A] mt-2 inline-block font-semibold hover:underline">
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden transition-all">
              
              {/* SİPARİŞ ANA BAŞLIĞI */}
              <div 
                onClick={() => toggleOrderPanel(order.id)}
                className="flex flex-wrap items-center justify-between p-5 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar size={12}/> Sipariş Tarihi</span>
                    <span className="font-semibold text-sm text-gray-800">{formatDate(order.order_date || order.createdAt)}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Sipariş Özeti</span>
                    <span className="font-semibold text-sm text-[#F27A1A]">{order.products?.length || 0} Ürün</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 flex items-center gap-1"><CreditCard size={12}/> Ödenen Tutar</span>
                    <span className="font-bold text-sm text-gray-800">${(order.price || 0).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    Sipariş Alındı
                  </span>
                  {expandedOrderId === order.id ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>
              </div>

              {/* AÇILIR PANEL DETAYLARI */}
              {expandedOrderId === order.id && (
                <div className="p-5 border-t border-gray-200 bg-white">
                  <h4 className="font-semibold text-gray-800 mb-4 text-sm border-b pb-2">Sipariş Detayı (ID: #{order.id})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.products && order.products.map((item, index) => {
                      
                      
                      const productId = item.product_id || item.id || item.product?.id || index;
                      const productName = item.product?.name || item.name || `Ürün (ID: ${productId})`;
                      const productDetail = item.detail || 'Standart';
                      const productCount = item.count || 1;
                      const productImage = item.product?.images?.[0]?.url || item.images?.[0]?.url || null;

                      return (
                        <div key={index} className="flex items-center justify-between border rounded-lg p-4 bg-gray-50 gap-4 shadow-sm">
                          <div className="flex items-center gap-3">
                            {productImage && (
                              <img src={productImage} className="w-14 h-14 object-cover rounded border bg-white shadow-xs" alt={productName} />
                            )}
                            <div className="flex flex-col">
                              <span className="font-bold text-sm text-gray-800 line-clamp-1">{productName}</span>
                              <span className="text-xs text-gray-500 mt-1">
                                Kod: <span className="font-mono text-gray-700 bg-gray-200 px-1 rounded">{productId}</span> 
                                <span className="mx-1.5">|</span> 
                                Varyant: <span className="font-medium text-gray-700">{productDetail}</span>
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="block text-sm font-extrabold text-[#F27A1A] bg-[#FFF8F1] px-2.5 py-1 rounded-full border border-[#FBE3D3]">
                              {productCount} Adet
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}