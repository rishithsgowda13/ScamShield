'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AuthWall({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isBotChecked, setIsBotChecked] = useState(false);
  const [checkingBot, setCheckingBot] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBotChecked) return;
    setLoading(true);
    // Simulate real auth validation API call
    setTimeout(() => {
      setLoading(false);
      onLogin(); // grant access
    }, 1500);
  };

  const handleBotCheck = () => {
    if (isBotChecked) return;
    setCheckingBot(true);
    setTimeout(() => {
      setCheckingBot(false);
      setIsBotChecked(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 min-h-screen bg-[#030303] overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FF9D]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden relative">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#00FF9D]/10 rounded-2xl flex items-center justify-center border border-[#00FF9D]/20 mb-4 shadow-[0_0_30px_rgba(0,255,157,0.15)]">
              <Shield className="w-8 h-8 text-[#00FF9D]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight text-center">
              {isLogin ? 'Secure Access' : 'Create Identity'}
            </h2>
            <p className="text-white/40 text-sm font-medium mt-2 text-center">
              Strictly authenticated personnel only. Anti-Bot Engine active.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 relative"
                >
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-4">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input 
                      required 
                      type="text" 
                      placeholder="Agent Name"
                      className="w-full bg-black/50 border border-white/10 rounded-xl h-14 pl-12 pr-4 text-white focus:border-[#00FF9D]/50 focus:outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  required 
                  type="email" 
                  placeholder="agent@nexus.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl h-14 pl-12 pr-4 text-white focus:border-[#00FF9D]/50 focus:outline-none transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-4">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  required 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded-xl h-14 pl-12 pr-4 text-white focus:border-[#00FF9D]/50 focus:outline-none transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            {/* Anti Bot Check */}
            <div 
              onClick={handleBotCheck}
              className={`mt-6 p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${isBotChecked ? 'bg-[#00FF9D]/10 border-[#00FF9D]/30' : 'bg-black/50 border-white/10 hover:border-white/30'}`}
            >
              <div className="w-6 h-6 rounded-md border border-white/20 bg-black/80 flex items-center justify-center shrink-0">
                {checkingBot && <Loader2 className="w-4 h-4 text-white/40 animate-spin" />}
                {isBotChecked && <CheckCircle2 className="w-4 h-4 text-[#00FF9D]" />}
              </div>
              <div>
                <p className={`text-sm font-bold ${isBotChecked ? 'text-[#00FF9D]' : 'text-white/80'}`}>
                  {isBotChecked ? 'Humanity Verified' : 'Verify Humanity'}
                </p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">
                  Protects system from automated bots
                </p>
              </div>
            </div>

            <Button 
              type="submit"
              disabled={loading || !isBotChecked}
              className={`w-full h-14 rounded-xl font-black uppercase text-sm tracking-widest transition-all mt-6 shadow-none border-0 ${loading ? 'opacity-80' : ''} ${isBotChecked ? 'bg-[#00FF9D] hover:bg-[#00FF9D]/80 text-black shadow-[0_0_20px_rgba(0,255,157,0.2)]' : 'bg-white/5 text-white/10 hover:bg-white/5 cursor-not-allowed'}`}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (
                <span className="flex items-center justify-center gap-2">
                  {isLogin ? 'Authenticate' : 'Initialize Identity'} <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-8 text-center relative z-20">
            <p className="text-white/40 text-sm">
              {isLogin ? "Don't have clearance?" : "Already an agent?"}
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)} 
                className="ml-2 text-[#00FF9D] font-bold hover:underline underline-offset-4 pointer-events-auto cursor-pointer"
              >
                {isLogin ? 'Request Access' : 'Login Here'}
              </button>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
