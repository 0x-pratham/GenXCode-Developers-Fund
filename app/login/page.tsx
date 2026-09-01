'use client';
import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { login, signup } from './actions';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react'; // Github removed from here
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

function AuthContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [isLogin, setIsLogin] = useState(true);

  // Client-side OAuth Handler
  const handleOAuth = async (provider: 'google' | 'github') => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center p-6 relative z-10">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-genx-primary/15 rounded-full blur-[120px] -z-10 pointer-events-none transform-gpu"></div>

      <div className="w-full max-w-md p-8 md:p-10 bg-white/80 backdrop-blur-3xl border border-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(34,7,73,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] relative overflow-hidden">
        
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-bl from-genx-primary/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="w-12 h-12 bg-genx-soft text-genx-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-inner border border-genx-primary/10">
            <ShieldCheck size={24} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-heading font-bold text-genx-dark tracking-tight mb-2">
            {isLogin ? 'Welcome Back' : 'Become a Patron'}
          </h1>
          <p className="text-gray-500 font-body text-sm font-medium leading-relaxed px-2">
            {isLogin 
              ? 'Access your secure dashboard to track your impact.' 
              : 'Create your donor profile to fund the next generation.'}
          </p>
        </div>

        <div className="flex bg-gray-100/50 p-1.5 rounded-full mb-8 relative z-10 shadow-inner border border-gray-200/50">
          <button 
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all duration-300 relative z-10 ${isLogin ? 'text-genx-dark' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Log In
          </button>
          <button 
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all duration-300 relative z-10 ${!isLogin ? 'text-genx-dark' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Sign Up
          </button>
          
          <motion.div 
            initial={false}
            animate={{ x: isLogin ? '0%' : '100%', width: '50%' }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute top-1.5 bottom-1.5 left-0 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100/50"
          />
        </div>
        
        <div className="flex gap-4 mb-6 relative z-10">
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            className="flex-1 flex items-center justify-center gap-2 p-3.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-sm font-bold text-gray-700">Google</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleOAuth('github')}
            className="flex-1 flex items-center justify-center gap-2 p-3.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-[0.98]"
          >
            {/* Inline SVG replacing the Lucide Github icon */}
            <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="text-sm font-bold text-gray-700">GitHub</span>
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Or use email</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <form className="flex flex-col gap-5 relative z-10">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <label className="block text-gray-700 font-semibold text-xs uppercase tracking-wider mb-2 ml-1" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    placeholder="e.g. Prathamesh Bhil"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/60 border border-gray-200 text-genx-dark font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-genx-primary/10 focus:border-genx-primary transition-all shadow-sm"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-gray-700 font-semibold text-xs uppercase tracking-wider mb-2 ml-1" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/60 border border-gray-200 text-genx-dark font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-genx-primary/10 focus:border-genx-primary transition-all shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold text-xs uppercase tracking-wider mb-2 ml-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/60 border border-gray-200 text-genx-dark font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-genx-primary/10 focus:border-genx-primary transition-all shadow-sm"
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-3.5 mt-2 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium text-center shadow-inner"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-2">
            {isLogin ? (
              <button 
                formAction={login} 
                className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-genx-dark text-white rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:bg-genx-primary hover:shadow-[0_12px_30px_rgba(94,35,150,0.25)] active:scale-[0.98]"
              >
                Sign In Securely
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button 
                formAction={signup} 
                className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-genx-primary text-white rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:bg-genx-dark shadow-[0_8px_20px_rgba(94,35,150,0.2)] hover:shadow-[0_12px_30px_rgba(34,7,73,0.3)] active:scale-[0.98]"
              >
                Create Donor Profile
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[85vh] items-center justify-center">
        <div className="w-8 h-8 border-4 border-genx-primary/20 border-t-genx-primary rounded-full animate-spin"></div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}