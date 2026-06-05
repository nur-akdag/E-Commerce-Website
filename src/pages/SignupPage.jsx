import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const [roles, setRoles] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [loadingRoles, setLoadingRoles] = useState(true);
  
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onChange'
  });

  // Seçilen rolü anlık takip etmek için watch kullanıyoruz
  const watchRoleId = watch('role_id');

  // Seçilen rolün "Store" (Mağaza) olup olmadığını kontrol eden mantık
  const selectedRoleObj = roles.find(r => r.id === Number(watchRoleId));
  const isStoreSelected = selectedRoleObj?.code?.toLowerCase() === 'store';

  // 1. Rolleri Backend'den Çekme ve Customer'ı Default Yapma
  useEffect(() => {
    api.get('/roles')
      .then((res) => {
        setRoles(res.data);
        // "customer" koduna sahip rolü bulup varsayılan seçiyoruz
        const customerRole = res.data.find(r => r.code?.toLowerCase() === 'customer');
        if (customerRole) {
          setValue('role_id', String(customerRole.id));
        }
        setLoadingRoles(false);
      })
      .catch((err) => {
        console.error('Role listesi çekilemedi:', err);
        setLoadingRoles(false);
      });
  }, [setValue]);

  // 2. Form Gönderme Aşaması (Payload Temizliği)
  const onSubmit = async (data) => {
    setServerError(null);

    // Ana veri kalıbı (Customer & Admin)
    let payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: Number(data.role_id)
    };

    // Eğer rol Store ise, tam istenen formatta "store" objesini içe gömüyoruz
    if (isStoreSelected) {
      payload.store = {
        name: data.storeName,
        phone: data.storePhone,
        tax_no: data.storeTaxNo,
        bank_account: data.storeBankAccount
      };
    }

    try {
      await api.post('/signup', payload);
      
      // Başarılı senaryo: Uyarı ver ve önceki sayfaya yönlendir
      alert('You need to click link in email to activate your account!');
      navigate(-1);
    } catch (error) {
      // Başarısız senaryo: Hatayı yakala ve form sayfasında göster
      const msg = error.response?.data?.message || 'Something went wrong. Please check your data.';
      setServerError(msg);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-[460px] bg-white rounded-lg shadow-sm border border-[#ECECEC] p-8 flex flex-col">
        
        <h2 className="text-[28px] font-bold text-[#252B42] text-center mb-2 tracking-tight">Sign Up</h2>
        <p className="text-[14px] text-[#737373] text-center mb-8 font-medium">Create a new account to join us</p>

        {/* Backend Hata Paneli */}
        {serverError && (
          <div className="bg-[#FFEBEB] text-[#E74C3C] text-[14px] font-bold p-4 rounded-md mb-6 text-center border border-[#FADBD8]">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          
          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#252B42]">Name *</label>
            <input
              type="text"
              placeholder="Min 3 characters"
              className={`border ${errors.name ? 'border-[#E74C3C]' : 'border-[#BDBDBD]'} rounded p-3 text-[14px] outline-none focus:border-[#23A6F0] bg-white`}
              {...register('name', {
                required: 'Name field is required',
                minLength: { value: 3, message: 'Name must be at least 3 characters' }
              })}
            />
            {errors.name && <span className="text-[#E74C3C] text-[12px] font-semibold">{errors.name.message}</span>}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#252B42]">Email *</label>
            <input
              type="email"
              placeholder="example@domain.com"
              className={`border ${errors.email ? 'border-[#E74C3C]' : 'border-[#BDBDBD]'} rounded p-3 text-[14px] outline-none focus:border-[#23A6F0] bg-white`}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
            />
            {errors.email && <span className="text-[#E74C3C] text-[12px] font-semibold">{errors.email.message}</span>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#252B42]">Password *</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`border ${errors.password ? 'border-[#E74C3C]' : 'border-[#BDBDBD]'} rounded p-3 text-[14px] outline-none focus:border-[#23A6F0] bg-white`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._#^&*+-])[A-Za-z\d@$!%*?&._#^&*+-]{8,}$/,
                  message: 'Must include numbers, lowercase, uppercase and special characters'
                }
              })}
            />
            {errors.password && <span className="text-[#E74C3C] text-[12px] font-semibold">{errors.password.message}</span>}
          </div>

          {/* Password Confirm Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#252B42]">Confirm Password *</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`border ${errors.confirmPassword ? 'border-[#E74C3C]' : 'border-[#BDBDBD]'} rounded p-3 text-[14px] outline-none focus:border-[#23A6F0] bg-white`}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === watch('password') || 'Passwords do not match'
              })}
            />
            {errors.confirmPassword && <span className="text-[#E74C3C] text-[12px] font-semibold">{errors.confirmPassword.message}</span>}
          </div>

          {/* Role Selection Box */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#252B42]">Role *</label>
            {loadingRoles ? (
              <div className="text-[14px] text-[#737373] animate-pulse">Fetching roles...</div>
            ) : (
              <select
                className="border border-[#BDBDBD] bg-white rounded p-3 text-[14px] outline-none focus:border-[#23A6F0] cursor-pointer"
                {...register('role_id', { required: 'Please select a role' })}
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* ================= MAĞAZA ÖZEL ALANLARI (CONDITIONAL) ================= */}
          {isStoreSelected && (
            <div className="flex flex-col gap-5 border-t border-[#ECECEC] pt-5 mt-2 transition-all duration-300">
              <h3 className="text-[16px] font-bold text-[#23A6F0]">Store Details</h3>

              {/* Store Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[#252B42]">Store Name *</label>
                <input
                  type="text"
                  placeholder="Min 3 characters"
                  className={`border ${errors.storeName ? 'border-[#E74C3C]' : 'border-[#BDBDBD]'} rounded p-3 text-[14px] outline-none focus:border-[#23A6F0] bg-white`}
                  {...register('storeName', {
                    required: 'Store Name is required',
                    minLength: { value: 3, message: 'Store Name must be at least 3 characters' }
                  })}
                />
                {errors.storeName && <span className="text-[#E74C3C] text-[12px] font-semibold">{errors.storeName.message}</span>}
              </div>

              {/* Store Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[#252B42]">Store Phone *</label>
                <input
                  type="tel"
                  placeholder="05xxxxxxxxx"
                  className={`border ${errors.storePhone ? 'border-[#E74C3C]' : 'border-[#BDBDBD]'} rounded p-3 text-[14px] outline-none focus:border-[#23A6F0] bg-white`}
                  {...register('storePhone', {
                    required: 'Store Phone is required',
                    pattern: {
                      value: /^(\+90|0)?5\d{9}$/,
                      message: 'Please enter a valid Türkiye phone number'
                    }
                  })}
                />
                {errors.storePhone && <span className="text-[#E74C3C] text-[12px] font-semibold">{errors.storePhone.message}</span>}
              </div>

              {/* Store Tax ID */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[#252B42]">Store Tax ID *</label>
                <input
                  type="text"
                  placeholder="T1234V123456"
                  className={`border ${errors.storeTaxNo ? 'border-[#E74C3C]' : 'border-[#BDBDBD]'} rounded p-3 text-[14px] outline-none focus:border-[#23A6F0] bg-white`}
                  {...register('storeTaxNo', {
                    required: 'Tax ID is required',
                    pattern: {
                      value: /^T\d{4}V\d{6}$/,
                      message: 'Tax ID must match pattern TXXXXVXXXXXX'
                    }
                  })}
                />
                {errors.storeTaxNo && <span className="text-[#E74C3C] text-[12px] font-semibold">{errors.storeTaxNo.message}</span>}
              </div>

              {/* Store Bank Account (IBAN) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[#252B42]">Store Bank Account (IBAN) *</label>
                <input
                  type="text"
                  placeholder="TR..."
                  className={`border ${errors.storeBankAccount ? 'border-[#E74C3C]' : 'border-[#BDBDBD]'} rounded p-3 text-[14px] outline-none focus:border-[#23A6F0] bg-white`}
                  {...register('storeBankAccount', {
                    required: 'IBAN is required',
                    pattern: {
                      value: /^TR\d{2}\d{22}$/,
                      message: 'Please enter a valid Türkiye IBAN (TR + 24 digits)'
                    }
                  })}
                />
                {errors.storeBankAccount && <span className="text-[#E74C3C] text-[12px] font-semibold">{errors.storeBankAccount.message}</span>}
              </div>
            </div>
          )}

          {/* Submit Button & Spinner */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#23A6F0] text-white font-bold p-3.5 rounded-md mt-4 hover:bg-[#1a8bc7] transition-colors disabled:bg-[#BDBDBD] disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}