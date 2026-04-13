'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useTransform } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  BarChart3, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  ArrowRight,
  CheckCircle2,
  Users,
  TrendingUp,
  MessageSquare,
  Briefcase,
  LayoutDashboard,
  Award,
  Quote,
  Lock,
  Shield
} from 'lucide-react';
import Image from 'next/image';

// --- Counter Component ---
function Counter({ value, suffix = '', duration = 2 }: { value: number, suffix?: string, duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

// --- Consultation Modal ---
function ConsultationModal({ isOpen, onClose, t, lang }: { isOpen: boolean, onClose: () => void, t: any, lang: string }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 md:p-12">
            <h3 className="text-3xl font-black tracking-tighter mb-2 font-be-vietnam">{t.nav.consult}</h3>
            <p className="text-navy/50 mb-8">{t.contact.subtitle}</p>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-navy/40">{t.contact.form.name}</label>
                  <input type="text" required className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-gold transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-navy/40">{t.contact.form.phone}</label>
                  <input type="tel" required className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-gold transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-navy/40">{t.contact.form.company}</label>
                <input type="text" required className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-gold transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-navy/40">{t.contact.form.industry}</label>
                <input type="text" required className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-gold transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-navy/40">{t.contact.form.issue}</label>
                <textarea rows={3} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-gold transition-all" />
              </div>
              <button className="w-full bg-navy text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-navy-light transition-all shadow-xl shadow-navy/20 mt-4">
                {t.contact.form.submit}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// --- Translations ---
const translations = {
  vi: {
    nav: {
      home: 'Trang chủ',
      taxServices: 'Dịch vụ Thuế',
      training: 'Đào tạo',
      knowledge: 'Kiến thức',
      contact: 'Liên hệ',
      consult: 'Đăng ký tư vấn'
    },
    hero: {
      headline: 'Chuyên gia Thuế & Kế toán cho Doanh nghiệp SME',
      subheadline: 'Chúng tôi không chỉ làm kế toán, chúng tôi bảo vệ doanh nghiệp bạn trước rủi ro thuế.',
      cta: 'Nhận tư vấn miễn phí'
    },
    knowledge: {
      title: 'Kiến thức & Tin tức',
      subtitle: 'Cập nhật những thay đổi mới nhất về chính sách thuế và kinh nghiệm quản trị doanh nghiệp.',
      more: 'Xem tất cả bài viết'
    },
    stats: {
      title: 'Vì sao nên chọn Sovereign Tax',
      items: [
        { label: 'Lĩnh vực', value: 25, suffix: '+', icon: Briefcase },
        { label: 'Dự án', value: 10000, suffix: '+', icon: LayoutDashboard },
        { label: 'Khách hàng', value: 1000, suffix: '+', icon: Users },
        { label: 'Năm kinh nghiệm', value: 15, suffix: '+', icon: Award }
      ]
    },
    services: {
      title: 'Dịch vụ Thuế chuyên sâu',
      desc: 'Báo cáo chính xác, quyết toán an toàn, tư vấn tận tâm. Cam kết chịu trách nhiệm trên mọi con số.',
      items: [
        {
          title: 'Kế toán thuế trọn gói',
          desc: 'Quản lý toàn diện hồ sơ thuế, đảm bảo tính tuân thủ và tối ưu chi phí hàng tháng.',
          icon: ShieldCheck
        },
        {
          title: 'Quyết toán thuế năm',
          desc: 'Thực hiện quyết toán thuế TNDN, TNCN với độ chính xác tuyệt đối và giải trình chuyên nghiệp.',
          icon: BarChart3
        },
        {
          title: 'Hoàn thuế doanh nghiệp',
          desc: 'Tư vấn và thực hiện thủ tục hoàn thuế GTGT, thuế xuất nhập khẩu nhanh chóng, đúng luật.',
          icon: TrendingUp
        }
      ],
      cta: 'Nhận báo giá chi tiết'
    },
    training: {
      title: 'Đào tạo Quản trị Thuế cho Chủ doanh nghiệp',
      message: 'Biết để không bị qua mặt, biết để tối ưu chi phí. Khóa học dạy cách quản trị rủi ro, không dạy làm nghề.',
      benefits: [
        'Kiểm soát dòng tiền & tối ưu hóa lợi nhuận',
        'Đọc hiểu báo cáo tài chính & phát hiện sai sót',
        'Tối ưu số thuế phải nộp một cách hợp pháp'
      ],
      cta: 'Đăng ký học thử ngay'
    },
    testimonials: {
      title: 'Lòng tin từ các nhà quản trị',
      items: [
        {
          quote: 'Từ khi đồng hành cùng Sovereign Tax, tôi hoàn toàn yên tâm tập trung vào kinh doanh mà không lo lắng về các rủi ro pháp lý hay sai sót trong báo cáo thuế.',
          author: 'Nguyễn Văn An',
          position: 'CEO, TechCore Solutions',
          avatar: 'https://picsum.photos/seed/an/100/100'
        },
        {
          quote: 'Giải pháp tư vấn thuế của họ thực sự mang lại giá trị thực tế, giúp doanh nghiệp chúng tôi tiết kiệm được hơn 20% chi phí vận hành mỗi năm.',
          author: 'Lê Thị Mai',
          position: 'Founder, GreenRetail Group',
          avatar: 'https://picsum.photos/seed/mai/100/100'
        }
      ],
      commitment: {
        title: 'Cam kết bảo mật & Trách nhiệm',
        items: [
          {
            title: 'Bảo mật tuyệt đối',
            desc: 'Toàn bộ dữ liệu tài chính của khách hàng được mã hóa và bảo mật theo tiêu chuẩn quốc tế ISO 27001.',
            icon: Lock
          },
          {
            title: 'Trách nhiệm pháp lý',
            desc: 'Chúng tôi chịu hoàn toàn trách nhiệm trước cơ quan thuế về mọi số liệu và tư vấn mà chúng tôi cung cấp.',
            icon: Shield
          },
          {
            title: 'Minh bạch quy trình',
            desc: 'Quy trình làm việc rõ ràng, báo cáo tiến độ thời gian thực giúp chủ doanh nghiệp dễ dàng kiểm soát.',
            icon: CheckCircle2
          }
        ]
      }
    },
    contact: {
      title: 'Liên hệ với chúng tôi',
      subtitle: 'Hãy để chuyên gia của chúng tôi đồng hành cùng sự phát triển bền vững của bạn.',
      form: {
        name: 'Họ tên',
        phone: 'Số điện thoại',
        company: 'Tên doanh nghiệp',
        industry: 'Ngành nghề kinh doanh',
        issue: 'Vấn đề cần tư vấn',
        submit: 'Gửi yêu cầu'
      },
      info: {
        address: 'Đà Nẵng, Việt Nam',
        phone: 'Hotline Zalo: 093 4983638',
        email: 'Email: contact@sovereigntax.vn'
      }
    },
    footer: {
      about: 'Sovereign Tax - Đối tác chiến lược về Thuế và Quản trị Tài chính cho SME Việt Nam.',
      rights: '© 2024 Sovereign Tax. Tất cả quyền được bảo lưu.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      taxServices: 'Tax Services',
      training: 'Training',
      knowledge: 'Knowledge',
      contact: 'Contact',
      consult: 'Register Consultation'
    },
    hero: {
      headline: 'Tax & Accounting Experts for SMEs',
      subheadline: 'We don\'t just do accounting; we protect your business from tax risks.',
      cta: 'Get Free Consultation'
    },
    knowledge: {
      title: 'Knowledge & News',
      subtitle: 'Stay updated with the latest changes in tax policy and business management experience.',
      more: 'View all articles'
    },
    stats: {
      title: 'Why Choose Sovereign Tax',
      items: [
        { label: 'Industries', value: 25, suffix: '+', icon: Briefcase },
        { label: 'Projects', value: 10000, suffix: '+', icon: LayoutDashboard },
        { label: 'Clients', value: 1000, suffix: '+', icon: Users },
        { label: 'Years Experience', value: 15, suffix: '+', icon: Award }
      ]
    },
    services: {
      title: 'In-depth Tax Services',
      desc: 'Accurate reporting, safe settlement, dedicated advice. Committed to responsibility for every number.',
      items: [
        {
          title: 'Full Tax Accounting',
          desc: 'Comprehensive management of tax records, ensuring compliance and monthly cost optimization.',
          icon: ShieldCheck
        },
        {
          title: 'Annual Tax Settlement',
          desc: 'Perform CIT and PIT settlements with absolute accuracy and professional explanation.',
          icon: BarChart3
        },
        {
          title: 'Corporate Tax Refund',
          desc: 'Consult and perform VAT and import-export tax refund procedures quickly and legally.',
          icon: TrendingUp
        }
      ],
      cta: 'Get Detailed Quote'
    },
    training: {
      title: 'Tax Management Training for Business Owners',
      message: 'Know to avoid being misled, know to optimize costs. Courses teach risk management, not the trade.',
      benefits: [
        'Cash flow control & profit optimization',
        'Read financial statements & detect errors',
        'Optimize tax payable legally'
      ],
      cta: 'Register for Trial Now'
    },
    testimonials: {
      title: 'Trust from Executives',
      items: [
        {
          quote: 'Since partnering with Sovereign Tax, I have complete peace of mind to focus on business without worrying about legal risks or tax reporting errors.',
          author: 'Nguyen Van An',
          position: 'CEO, TechCore Solutions',
          avatar: 'https://picsum.photos/seed/an/100/100'
        },
        {
          quote: 'Their tax consulting solutions bring real value, helping our business save more than 20% in operating costs every year.',
          author: 'Le Thi Mai',
          position: 'Founder, GreenRetail Group',
          avatar: 'https://picsum.photos/seed/mai/100/100'
        }
      ],
      commitment: {
        title: 'Security & Responsibility Commitment',
        items: [
          {
            title: 'Absolute Security',
            desc: 'All client financial data is encrypted and secured according to international ISO 27001 standards.',
            icon: Lock
          },
          {
            title: 'Legal Responsibility',
            desc: 'We take full responsibility before tax authorities for all figures and advice we provide.',
            icon: Shield
          },
          {
            title: 'Process Transparency',
            desc: 'Clear workflows and real-time progress reports help business owners maintain easy control.',
            icon: CheckCircle2
          }
        ]
      }
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Let our experts accompany your sustainable development.',
      form: {
        name: 'Full Name',
        phone: 'Phone Number',
        company: 'Company Name',
        industry: 'Business Industry',
        issue: 'Consultation Issue',
        submit: 'Send Request'
      },
      info: {
        address: 'Da Nang, Vietnam',
        phone: 'Zalo Hotline: 093 4983638',
        email: 'Email: contact@sovereigntax.vn'
      }
    },
    footer: {
      about: 'Sovereign Tax - Strategic Partner in Tax and Financial Management for Vietnamese SMEs.',
      rights: '© 2024 Sovereign Tax. All rights reserved.'
    }
  }
};

export default function LandingPage() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dynamicData, setDynamicData] = useState<any>(null);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Fetch dynamic content
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setDynamicData(data))
      .catch(err => console.error('Failed to fetch content', err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Merge dynamic data into translations if available
  const activeHero = dynamicData?.hero || t.hero;
  const activeKnowledge = dynamicData?.knowledge || [];

  const toggleLang = () => {
    setLang(prev => prev === 'vi' ? 'en' : 'vi');
  };

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Sovereign Tax",
    "image": "https://picsum.photos/seed/quang/800/800",
    "@id": "https://sovereigntax.vn",
    "url": "https://sovereigntax.vn",
    "telephone": "+84934983638",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Đà Nẵng",
      "addressLocality": "Đà Nẵng",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 16.047079,
      "longitude": 108.206230
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:30"
    },
    "sameAs": [
      "https://zalo.me/0934983638"
    ],
    "description": "Chuyên gia Thuế & Kế toán cho Doanh nghiệp SME tại Việt Nam. Dịch vụ kế toán thuế trọn gói, quyết toán thuế và đào tạo quản trị.",
    "service": [
      {
        "@type": "Service",
        "name": "Kế toán thuế trọn gói",
        "description": "Quản lý toàn diện hồ sơ thuế, đảm bảo tính tuân thủ và tối ưu chi phí hàng tháng."
      },
      {
        "@type": "Service",
        "name": "Quyết toán thuế năm",
        "description": "Thực hiện quyết toán thuế TNDN, TNCN với độ chính xác tuyệt đối."
      },
      {
        "@type": "Service",
        "name": "Đào tạo Quản trị Thuế",
        "description": "Khóa học quản trị rủi ro thuế dành cho chủ doanh nghiệp."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white text-navy selection:bg-gold/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} t={t} lang={lang} />

      {/* --- Navbar --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-navy flex items-center justify-center rounded-lg shadow-lg">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter text-navy uppercase font-be-vietnam">Sovereign Tax</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8 text-sm font-semibold uppercase tracking-wider">
              <a href="#home" className="hover:text-gold transition-colors">{t.nav.home}</a>
              <a href="#services" className="hover:text-gold transition-colors">{t.nav.taxServices}</a>
              <a href="#training" className="hover:text-gold transition-colors">{t.nav.training}</a>
              <a href="#knowledge" className="hover:text-gold transition-colors">{t.nav.knowledge}</a>
              <a href="#contact" className="hover:text-gold transition-colors">{t.nav.contact}</a>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={toggleLang}
                className="flex items-center gap-1 text-xs font-bold border border-navy/20 px-3 py-1.5 rounded-full hover:bg-navy hover:text-white transition-all"
              >
                <Globe className="w-3 h-3" />
                {lang === 'vi' ? 'VN / EN' : 'EN / VN'}
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-navy-light transition-all shadow-xl shadow-navy/20"
              >
                {t.nav.consult}
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-navy" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white shadow-2xl p-8 flex flex-col gap-6 md:hidden"
            >
              <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">{t.nav.home}</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">{t.nav.taxServices}</a>
              <a href="#training" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">{t.nav.training}</a>
              <a href="#knowledge" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">{t.nav.knowledge}</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">{t.nav.contact}</a>
              <div className="h-px bg-navy/10 w-full" />
              <button onClick={toggleLang} className="flex items-center gap-2 font-bold">
                <Globe className="w-4 h-4" /> {lang === 'vi' ? 'Tiếng Việt' : 'English'}
              </button>
              <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="bg-navy text-white text-center py-4 rounded-xl font-bold">
                {t.nav.consult}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative pt-40 pb-32 md:pt-56 md:pb-48 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-navy/5 -skew-x-12 translate-x-1/4 z-0" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-block bg-gold/10 text-gold text-xs font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-8">
                The Sovereign Authority
              </span>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter mb-8 font-be-vietnam">
                {activeHero.headline[lang] || activeHero.headline}
              </h1>
              <p className="text-xl md:text-2xl text-navy/70 leading-relaxed mb-12 max-w-2xl">
                {activeHero.subheadline[lang] || activeHero.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-navy text-white px-10 py-5 rounded-xl text-lg font-bold flex items-center justify-center gap-3 hover:bg-navy-light transition-all shadow-2xl shadow-navy/30 group"
                >
                  {t.hero.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="#services" 
                  className="border-2 border-navy/10 text-navy px-10 py-5 rounded-xl text-lg font-bold flex items-center justify-center hover:bg-navy/5 transition-all"
                >
                  {t.nav.taxServices}
                </a>
              </div>
            </motion.div>

            {/* Mr. Quang Nguyen 3D Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex flex-col items-center"
            >
              {/* 3D Ring Effect Container */}
              <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] perspective-1000 flex items-center justify-center">
                
                {/* Rotating Outer Ring 1 */}
                <motion.div 
                  animate={{ rotateZ: 360, rotateY: [15, 25, 15] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[105%] h-[105%] rounded-full border border-gold/30 transform-style-3d"
                />

                {/* Rotating Outer Ring 2 */}
                <motion.div 
                  animate={{ rotateZ: -360, rotateX: [15, 25, 15] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[110%] h-[110%] rounded-full border border-gold/10 transform-style-3d"
                />

                <motion.div 
                  animate={{ 
                    rotateY: [-5, 5, -5],
                    rotateX: [2, -2, 2],
                    y: [0, -15, 0]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative w-64 h-64 md:w-96 md:h-96 transform-style-3d"
                >
                  {/* Main 3D Ring Frame */}
                  <div className="absolute inset-0 rounded-full border-[16px] border-gold shadow-[0_0_60px_rgba(212,175,55,0.4)] z-10" />
                  
                  {/* Inner Glow */}
                  <div className="absolute inset-0 rounded-full bg-gold/5 blur-2xl" />
                  
                  {/* Image Container - Cropped "ngang ngực" */}
                  <div className="absolute inset-4 rounded-full border-4 border-navy overflow-hidden bg-navy shadow-inner transform-style-3d">
                    <div className="relative w-full h-full">
                      <Image 
                        src="https://picsum.photos/seed/quang/800/800" 
                        alt="Mr. Quang Nguyen" 
                        fill 
                        className="object-cover object-top scale-[1.35] translate-y-[10%]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Gradient Overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 w-16 h-16 bg-gold rounded-2xl shadow-2xl flex items-center justify-center z-20 rotate-12"
                  >
                    <ShieldCheck className="text-navy w-8 h-8" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Name Tag */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center"
              >
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-navy font-be-vietnam">Mr. Quang Nguyen</h3>
                <div className="h-1.5 w-16 bg-gold mx-auto mt-3 rounded-full" />
                <p className="text-sm font-black uppercase tracking-[0.4em] text-navy/40 mt-4">Founder & Principal Partner</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-12 hidden lg:block opacity-20">
          <div className="grid grid-cols-5 gap-4">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-navy rounded-full" />
            ))}
          </div>
        </div>
      </section>

      {/* --- Statistics Section --- */}
      <section className="py-24 bg-white border-y border-navy/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 font-be-vietnam uppercase text-navy/80">{t.stats.title}</h2>
            <div className="h-1 w-24 bg-gold mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {t.stats.items.map((stat: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-navy group-hover:text-white transition-all duration-500">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-navy mb-2 font-be-vietnam">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-navy/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Tax Services Section --- */}
      <section id="services" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 font-be-vietnam">{t.services.title}</h2>
              <p className="text-lg text-navy/60 leading-relaxed">{t.services.desc}</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="text-navy font-bold flex items-center gap-2 group border-b-2 border-gold pb-1">
              {t.services.cta}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.services.items.map((service: any, idx: number) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-navy/5"
              >
                <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center mb-8">
                  <service.icon className="text-navy w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-be-vietnam">{service.title}</h3>
                <p className="text-navy/60 leading-relaxed mb-8">{service.desc}</p>
                <div className="h-1 w-12 bg-gold/30 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Training Section --- */}
      <section id="training" className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/training/800/1000" 
                  alt="Training Session" 
                  width={800} 
                  height={1000}
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-navy/20" />
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center">
                      <Users className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-gold">Expert Faculty</p>
                      <p className="font-bold">15+ Years Experience</p>
                    </div>
                  </div>
                  <p className="text-sm text-navy/70 italic">&quot;Chúng tôi dạy cách quản trị rủi ro, không dạy làm nghề.&quot;</p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-gold font-black tracking-widest text-xs uppercase mb-6 block">Professional Training</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 font-be-vietnam leading-tight">
                {t.training.title}
              </h2>
              <p className="text-xl text-navy/70 leading-relaxed mb-10">
                {t.training.message}
              </p>
              
              <div className="space-y-6 mb-12">
                {t.training.benefits.map((benefit: string, i: number) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-navy/5 p-1 rounded-full">
                      <CheckCircle2 className="text-navy w-5 h-5" />
                    </div>
                    <p className="font-semibold text-lg">{benefit}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex bg-navy text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-navy-light transition-all shadow-xl shadow-navy/20"
              >
                {t.training.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Testimonials & Commitment Section --- */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Testimonials */}
            <div>
              <h2 className="text-4xl font-black tracking-tighter mb-16 font-be-vietnam">{t.testimonials.title}</h2>
              
              <div className="space-y-12">
                {t.testimonials.items.map((item: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-12 border-l-4 border-navy/5"
                  >
                    <Quote className="absolute -left-3 -top-2 text-gold/30 w-10 h-10" />
                    <p className="text-xl md:text-2xl font-medium text-navy/80 italic leading-relaxed mb-8">
                      &quot;{item.quote}&quot;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg">
                        <Image 
                          src={item.avatar} 
                          alt={item.author} 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="font-black text-navy">{item.author}</p>
                        <p className="text-sm font-bold text-navy/40 uppercase tracking-widest">{item.position}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Commitment Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-navy rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-12 font-be-vietnam leading-tight relative z-10">
                {t.testimonials.commitment.title}
              </h3>

              <div className="space-y-10 relative z-10">
                {t.testimonials.commitment.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-all duration-500">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-white/60 leading-relaxed text-sm md:text-base">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Knowledge Section --- */}
      <section id="knowledge" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <span className="text-gold font-black tracking-widest text-xs uppercase mb-4 block">Insights & Updates</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 font-be-vietnam uppercase">{t.knowledge.title}</h2>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto">{t.knowledge.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeKnowledge.map((item: any, idx: number) => (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-navy/5"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title[lang]} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-navy">
                    {item.date}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 font-be-vietnam leading-tight group-hover:text-gold transition-colors">
                    {item.title[lang]}
                  </h3>
                  <p className="text-navy/50 text-sm leading-relaxed mb-8 line-clamp-3">
                    {item.excerpt[lang]}
                  </p>
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-navy group/btn">
                    {lang === 'vi' ? 'Đọc tiếp' : 'Read more'}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="bg-navy text-white px-10 py-4 rounded-xl font-bold hover:bg-navy-light transition-all shadow-xl shadow-navy/20">
              {t.knowledge.more}
            </button>
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-32 bg-navy text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 border border-white rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 border border-white rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 font-be-vietnam">{t.contact.title}</h2>
              <p className="text-xl text-white/70 leading-relaxed mb-12 max-w-md">
                {t.contact.subtitle}
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                    <MapPin className="text-gold w-6 h-6" />
                  </div>
                  <p className="text-lg font-medium">{t.contact.info.address}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Phone className="text-gold w-6 h-6" />
                  </div>
                  <p className="text-lg font-medium">{t.contact.info.phone}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Mail className="text-gold w-6 h-6" />
                  </div>
                  <p className="text-lg font-medium">{t.contact.info.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl text-navy">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-navy/40">{t.contact.form.name}</label>
                    <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-gold transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-navy/40">{t.contact.form.phone}</label>
                    <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-gold transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-navy/40">{t.contact.form.company}</label>
                  <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-gold transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-navy/40">{t.contact.form.industry}</label>
                  <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-gold transition-all" />
                </div>
                <button className="w-full bg-navy text-white py-5 rounded-xl font-black uppercase tracking-widest hover:bg-navy-light transition-all shadow-xl shadow-navy/20">
                  {t.contact.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-20 bg-white border-t border-navy/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-navy flex items-center justify-center rounded-lg">
                <ShieldCheck className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tighter text-navy uppercase font-be-vietnam">Sovereign Tax</span>
            </div>
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-navy/40">
              <a href="#home" className="hover:text-navy transition-colors">{t.nav.home}</a>
              <a href="#services" className="hover:text-navy transition-colors">{t.nav.taxServices}</a>
              <a href="#training" className="hover:text-navy transition-colors">{t.nav.training}</a>
              <a href="#knowledge" className="hover:text-navy transition-colors">{t.nav.knowledge}</a>
              <a href="#contact" className="hover:text-navy transition-colors">{t.nav.contact}</a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-navy/5">
            <p className="text-navy/40 text-sm font-medium">{t.footer.about}</p>
            <p className="text-navy/40 text-xs font-bold uppercase tracking-widest">{t.footer.rights}</p>
          </div>
        </div>
      </footer>

      {/* --- Floating Action Buttons --- */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-3 items-end pr-4 md:pr-6">
        <motion.button 
          whileHover={{ x: -10 }}
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-3 bg-navy text-white p-4 rounded-l-2xl shadow-2xl transition-all hover:bg-navy-light"
        >
          <span className="hidden group-hover:block font-bold text-xs uppercase tracking-widest">{t.nav.consult}</span>
          <MessageSquare className="w-6 h-6" />
        </motion.button>
        
        <motion.a 
          whileHover={{ x: -10 }}
          href="tel:0934983638"
          className="group flex items-center gap-3 bg-navy text-white p-4 rounded-l-2xl shadow-2xl transition-all hover:bg-navy-light"
        >
          <span className="hidden group-hover:block font-bold text-xs uppercase tracking-widest">{lang === 'vi' ? 'Gọi Điện' : 'Call Now'}</span>
          <Phone className="w-6 h-6" />
        </motion.a>

        <motion.a 
          whileHover={{ x: -10 }}
          href="https://zalo.me/0934983638"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-[#0068ff] text-white p-4 rounded-l-2xl shadow-2xl transition-all hover:bg-[#0052cc]"
        >
          <span className="hidden group-hover:block font-bold text-xs uppercase tracking-widest">Zalo</span>
          <div className="w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3l-1.5 4.5Z" />
              <text x="12" y="15" font-family="Arial" font-size="8" text-anchor="middle" fill="currentColor" font-weight="bold" stroke="none">Z</text>
            </svg>
          </div>
        </motion.a>
      </div>
    </div>
  );
}
