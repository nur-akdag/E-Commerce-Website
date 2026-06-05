import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { loginUserAction } from '../store/actions/clientActions';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      rememberMe: false
    }
  });

  const onSubmit = async (data) => {
    
    try {
      await dispatch(loginUserAction(
        { email: data.email, password: data.password }, 
        data.rememberMe, 
        navigate
      ));
    } catch (error) {
      
    }
  };

  return (
    <div className="w-full min-h-[70vh] bg-[#FAFAFA] flex flex-col items-center justify-center py-12 px-4 font-sans text-[#252B42]">
      <div className="w-full max-w-[400px] bg-white rounded-lg shadow-sm border border-[#ECECEC] p-8 flex flex-col">
        
        <h2 className="text-[28px] font-bold text-center mb-2 tracking-tight">Login</h2>
        <p className="text-[14px] text-[#737373] text-center mb-8 font-medium">Welcome back! Please enter your details.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold">Email *</label>
            <input
              type="email"
              placeholder="example@domain.com"
              className={`border ${errors.email ? 'border-[#E74C3C]' : 'border-[#BDBDBD]'} rounded p-3 text-[14px] outline-none focus:border-[#23A6F0]`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <span className="text-[#E74C3C] text-[12px] font-semibold">{errors.email.message}</span>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold">Password *</label>
            <input
              type="password"
              placeholder="••••••••"
              className="border border-[#BDBDBD] rounded p-3 text-[14px] outline-none focus:border-[#23A6F0]"
              {...register('password', {
                required: 'Password is required'
              })}
            />
            {errors.password && <span className="text-[#E74C3C] text-[12px] font-semibold">{errors.password.message}</span>}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2 mt-2">
            <input 
              type="checkbox" 
              id="rememberMe" 
              className="w-4 h-4 cursor-pointer accent-[#23A6F0]"
              {...register('rememberMe')}
            />
            <label htmlFor="rememberMe" className="text-[14px] text-[#737373] cursor-pointer">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#23A6F0] text-white font-bold p-3.5 rounded-md mt-4 hover:bg-[#1a8bc7] transition-colors disabled:bg-[#BDBDBD] disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Log In</span>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}