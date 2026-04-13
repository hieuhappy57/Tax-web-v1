'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Save, 
  Plus, 
  Trash2, 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut,
  ChevronRight,
  Globe
} from 'lucide-react';

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/content');
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert('Cập nhật thành công!');
      }
    } catch (err) {
      alert('Lỗi khi cập nhật!');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Sai mật khẩu!');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 w-full max-w-md shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-gold/20">
              <Settings className="text-navy w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase">Sovereign Admin</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Mật khẩu quản trị</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-gold outline-none transition-all"
                placeholder="Nhập admin123"
              />
            </div>
            <button className="w-full bg-gold text-navy py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gold/90 transition-all shadow-xl shadow-gold/20">
              Đăng nhập
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <div className="w-72 bg-navy text-white flex flex-col p-8 fixed h-full">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
            <Settings className="text-navy w-5 h-5" />
          </div>
          <span className="font-black tracking-tighter uppercase text-sm">Sovereign Admin</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('hero')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'hero' ? 'bg-white/10 text-gold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Trang chủ (Hero)
          </button>
          <button 
            onClick={() => setActiveTab('knowledge')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'knowledge' ? 'bg-white/10 text-gold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <FileText className="w-4 h-4" /> Kiến thức & Tin tức
          </button>
        </nav>

        <button 
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white transition-colors text-sm font-bold"
        >
          <LogOut className="w-4 h-4" /> Đăng xuất
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-navy uppercase">Quản lý nội dung</h1>
            <p className="text-navy/40 text-sm font-bold uppercase tracking-widest mt-1">Cập nhật nội dung để tối ưu SEO Google</p>
          </div>
          <button 
            onClick={handleSave}
            className="bg-navy text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-navy-light transition-all shadow-xl shadow-navy/20"
          >
            <Save className="w-4 h-4" /> Lưu thay đổi
          </button>
        </header>

        <div className="bg-white rounded-[2rem] shadow-sm border border-navy/5 p-10">
          {activeTab === 'hero' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gold flex items-center gap-2">
                    <Globe className="w-3 h-3" /> Tiếng Việt
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-navy/30">Tiêu đề chính (Headline)</label>
                      <textarea 
                        value={data.hero.headline.vi}
                        onChange={(e) => setData({...data, hero: {...data.hero, headline: {...data.hero.headline, vi: e.target.value}}})}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-gold transition-all min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-navy/30">Tiêu đề phụ (Subheadline)</label>
                      <textarea 
                        value={data.hero.subheadline.vi}
                        onChange={(e) => setData({...data, hero: {...data.hero, subheadline: {...data.hero.subheadline, vi: e.target.value}}})}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-gold transition-all min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gold flex items-center gap-2">
                    <Globe className="w-3 h-3" /> English
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-navy/30">Headline (EN)</label>
                      <textarea 
                        value={data.hero.headline.en}
                        onChange={(e) => setData({...data, hero: {...data.hero, headline: {...data.hero.headline, en: e.target.value}}})}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-gold transition-all min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-navy/30">Subheadline (EN)</label>
                      <textarea 
                        value={data.hero.subheadline.en}
                        onChange={(e) => setData({...data, hero: {...data.hero, subheadline: {...data.hero.subheadline, en: e.target.value}}})}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-gold transition-all min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div className="space-y-10">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black tracking-tighter text-navy uppercase">Danh sách bài viết</h3>
                <button 
                  onClick={() => {
                    const newItem = {
                      id: Date.now().toString(),
                      title: { vi: 'Bài viết mới', en: 'New Article' },
                      excerpt: { vi: 'Tóm tắt bài viết...', en: 'Article excerpt...' },
                      date: new Date().toISOString().split('T')[0],
                      image: 'https://picsum.photos/seed/new/600/400'
                    };
                    setData({...data, knowledge: [newItem, ...data.knowledge]});
                  }}
                  className="bg-gold text-navy px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gold/90 transition-all"
                >
                  <Plus className="w-4 h-4" /> Thêm bài viết
                </button>
              </div>

              <div className="space-y-6">
                {data.knowledge.map((item: any, idx: number) => (
                  <div key={item.id} className="bg-slate-50 rounded-2xl p-6 border border-navy/5 relative group">
                    <button 
                      onClick={() => {
                        const newKnowledge = data.knowledge.filter((k: any) => k.id !== item.id);
                        setData({...data, knowledge: newKnowledge});
                      }}
                      className="absolute top-6 right-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-navy/30">Tiêu đề (VI)</label>
                          <input 
                            value={item.title.vi}
                            onChange={(e) => {
                              const newKnowledge = [...data.knowledge];
                              newKnowledge[idx].title.vi = e.target.value;
                              setData({...data, knowledge: newKnowledge});
                            }}
                            className="w-full bg-white border-none rounded-xl px-4 py-2 text-sm font-bold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-navy/30">Tóm tắt (VI)</label>
                          <textarea 
                            value={item.excerpt.vi}
                            onChange={(e) => {
                              const newKnowledge = [...data.knowledge];
                              newKnowledge[idx].excerpt.vi = e.target.value;
                              setData({...data, knowledge: newKnowledge});
                            }}
                            className="w-full bg-white border-none rounded-xl px-4 py-2 text-sm min-h-[80px]"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-navy/30">Title (EN)</label>
                          <input 
                            value={item.title.en}
                            onChange={(e) => {
                              const newKnowledge = [...data.knowledge];
                              newKnowledge[idx].title.en = e.target.value;
                              setData({...data, knowledge: newKnowledge});
                            }}
                            className="w-full bg-white border-none rounded-xl px-4 py-2 text-sm font-bold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-navy/30">Excerpt (EN)</label>
                          <textarea 
                            value={item.excerpt.en}
                            onChange={(e) => {
                              const newKnowledge = [...data.knowledge];
                              newKnowledge[idx].excerpt.en = e.target.value;
                              setData({...data, knowledge: newKnowledge});
                            }}
                            className="w-full bg-white border-none rounded-xl px-4 py-2 text-sm min-h-[80px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
