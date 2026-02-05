import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageCircle, Clock, MapPin, Leaf, Award, Heart, Menu, X, ArrowRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import SmoothImage from './components/SmoothImage';

const WHATSAPP_URL = 'https://wa.me/1234567890?text=I%20would%20like%20to%20book%20a%20spa%20session';

function App() {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const navBackground = isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent';
  const navTextColor = isScrolled ? 'text-charcoal-dark' : 'text-white';

  useEffect(() => {
    // Simulate loading time for "Premium Reval"
    const timer = setTimeout(() => setLoading(false), 2000);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const services = [
    {
      name: 'Swedish Massage',
      price: '$80',
      duration: '60 min',
      description: 'Gentle, flowing strokes to promote deep relaxation and improve circulation.'
    },
    {
      name: 'Deep Tissue',
      price: '$100',
      duration: '60 min',
      description: 'Targeted pressure to release chronic muscle tension, knots, and stress.'
    },
    {
      name: 'Hot Stone Therapy',
      price: '$120',
      duration: '75 min',
      description: 'Warmed stones placed on key points to melt away stress and muscle stiffness.'
    },
    {
      name: 'Aromatherapy',
      price: '$95',
      duration: '60 min',
      description: 'Essential oils blended to enhance specific emotional and physical well-being.'
    },
    {
      name: 'Couples Retreat',
      price: '$220',
      duration: '90 min',
      description: 'Side-by-side massages in our private luxury suite for two.'
    },
    {
      name: 'Organic Facial',
      price: '$110',
      duration: '75 min',
      description: 'Botanical treatment customized for your skin type for a radiant glow.'
    }
  ];

  const galleryImages = [
    'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
    'https://images.pexels.com/photos/3865675/pexels-photo-3865675.jpeg',
    'https://images.pexels.com/photos/3997986/pexels-photo-3997986.jpeg',
    'https://images.pexels.com/photos/3865618/pexels-photo-3865618.jpeg',
    'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg',
    'https://images.pexels.com/photos/6663331/pexels-photo-6663331.jpeg'
  ];

  return (
    <div className="min-h-screen bg-sand-light text-charcoal font-sans selection:bg-primary-light selection:text-white overflow-hidden">

      {/* Premium Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[100] bg-charcoal-dark flex items-center justify-center text-sand-light"
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-4">Tranquility.</h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-px bg-primary-light mx-auto"
              />
              <p className="mt-4 text-sm uppercase tracking-[0.3em] text-white/60">Loading Sanctuary</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className={`text-2xl font-serif font-bold tracking-tighter ${navTextColor} transition-colors relative z-50`}>
            Tranquility.
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Gallery', 'About', 'Reviews', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium uppercase tracking-widest hover:text-primary-light transition-colors ${navTextColor}`}
              >
                {item}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-teal text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden relative z-50 ${mobileMenuOpen ? 'text-charcoal-dark' : navTextColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="md:hidden fixed inset-0 bg-sand-light z-40 flex flex-col items-center justify-center gap-8"
            >
              {['Services', 'Gallery', 'About', 'Reviews', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-serif font-bold text-charcoal-dark hover:text-primary-teal transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                className="mt-8 bg-primary-teal text-white px-10 py-4 rounded-full text-xl shadow-xl active:scale-95 transition-transform"
              >
                Book Appointment
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <SmoothImage
            src="https://images.pexels.com/photos/3865675/pexels-photo-3865675.jpeg"
            alt="Spa Hero Background"
            className="w-full h-full"
          />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-white/80 text-xs tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
              Premium Wellness Sanctuary
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 md:mb-8 leading-tight text-shadow-lg">
              Find Your <span className="italic text-primary-light">Balance</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-10 md:mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              Experience the art of mindful relaxation in a space designed to heal your body and soothe your soul.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[50px] min-w-[200px] group inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-primary-teal text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-2xl hover:scale-105"
              >
                <MessageCircle size={20} />
                <span>Book via WhatsApp</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* Stats / Features Banner */}
      <section className="bg-primary-teal text-white py-12 relative z-20 -mt-8 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { icon: Award, label: "Certified Experts", sub: "Licensed Therapists" },
            { icon: Leaf, label: "100% Organic", sub: "Premium Products" },
            { icon: Heart, label: "Serene Space", sub: "Private Suites" }
          ].map((item, i) => (
            <div key={i} className="pt-4 md:pt-0 px-4">
              <item.icon size={32} className="mx-auto mb-4 text-sand-light" />
              <h3 className="text-xl font-serif mb-1">{item.label}</h3>
              <p className="text-white/60 text-sm">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 px-6 bg-sand-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-dark mb-4">Curated Treatments</h2>
            <div className="w-24 h-1 bg-primary-light mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-charcoal/70 font-light max-w-2xl mx-auto">
              Our menu is thoughtfully designed to offer a holistic approach to wellness.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-primary-light/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-sand/30 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

                <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-charcoal-dark group-hover:text-primary-teal transition-colors pr-4">
                    {service.name}
                  </h3>
                  <span className="text-lg md:text-xl font-bold text-primary-light bg-primary-light/10 px-3 py-1 rounded-lg whitespace-nowrap">
                    {service.price}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-charcoal/50 mb-4">
                  <Clock size={16} />
                  <span>{service.duration}</span>
                </div>

                <p className="text-charcoal/70 leading-relaxed mb-6 text-sm md:text-base">
                  {service.description}
                </p>

                <a href={WHATSAPP_URL} target="_blank" className="flex items-center text-primary-teal font-medium text-sm group-hover:gap-2 transition-all p-2 -ml-2 rounded-lg hover:bg-primary-light/5">
                  Book This <ArrowRight size={14} className="ml-1" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section with "Parallax" feel grids */}
      <section id="gallery" className="py-16 md:py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-dark mb-4">Visual Serenity</h2>
              <p className="text-lg md:text-xl text-charcoal/70 font-light">Glimpses into our world of calm.</p>
            </div>
            <a href="#" className="hidden md:block text-primary-teal border-b border-primary-teal pb-1 hover:text-primary-dark transition-colors">
              View All Moments
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[200px]">
            {galleryImages.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`relative overflow-hidden rounded-2xl shadow-md group ${i === 0 ? 'md:col-span-8 md:row-span-2' :
                  i === 1 ? 'md:col-span-4 md:row-span-1' :
                    i === 2 ? 'md:col-span-4 md:row-span-1' :
                      'md:col-span-4 md:row-span-1'
                  }`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10 pointer-events-none" />
                <SmoothImage
                  src={image}
                  alt={`Gallery Image ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}

            <div className="md:hidden mt-4 text-center">
              <a href="#" className="text-primary-teal font-medium border-b border-primary-teal pb-1">
                View All Moments
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Heritage Story */}
      <section id="about" className="py-24 px-6 bg-sand relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative"
          >
            <div className="absolute inset-0 border border-charcoal/10 translate-x-4 translate-y-4 rounded-2xl z-0" />
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
              <SmoothImage
                src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg"
                alt="Founder in spa"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <span className="block text-primary-teal font-medium tracking-widest uppercase mb-4 text-sm">Our Heritage</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-charcoal-dark mb-8 leading-tight">
              A Sanctuary Built on <span className="italic text-primary-light">Silence</span>.
            </h2>
            <p className="text-lg text-charcoal/70 leading-relaxed mb-6">
              Founded in 2018, Tranquility began with a simple philosophy: that true wellness is found in the moments between breaths.
            </p>
            <p className="text-lg text-charcoal/70 leading-relaxed mb-10">
              What started as a small private studio has grown into the city's premier destination for holistic healing, yet our core promise remains unchanged—a space where time slows down, and the world fades away.
            </p>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-sand bg-gray-200 overflow-hidden">
                    <img src={`https://randomuser.me/api/portraits/women/${30 + i}.jpg`} className="w-full h-full object-cover" alt="Therapist" />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-bold text-charcoal-dark">Expert Healers</p>
                <p className="text-sm text-charcoal/60">50+ Years Combined Experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section - Social Proof */}
      <section id="reviews" className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-dark mb-4">Voices of Serenity</h2>
            <p className="text-xl text-charcoal/70 font-light max-w-2xl mx-auto">Join thousands of others who have found their peace.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "I've visited spas all over the world, but the attention to detail here is unmatched. The Hot Stone therapy completely reset my nervous system.",
                author: "Sarah Jenkins",
                role: "Regular Member",
                img: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                text: "Worth every penny. The environment is so immersive you forget you're in the city. Truly a premium experience from the moment you walk in.",
                author: "Michael Chen",
                authorImg: "https://randomuser.me/api/portraits/men/32.jpg",
                role: "Verified Client",
                img: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                text: "The couples retreat was magical. Private, luxurious, and the therapists were incredibly skilled. We're already booking our next session.",
                author: "Emma Thompson",
                role: "VIP Guest",
                img: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-sand-light/50 backdrop-blur-sm p-8 rounded-2xl border border-primary-light/10 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex gap-1 mb-6 text-yellow-500">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <p className="text-charcoal/80 italic mb-8 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={review.img} alt={review.author} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-charcoal-dark text-sm">{review.author}</p>
                    <p className="text-xs text-primary-teal uppercase tracking-wider">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Break Section */}
      <section className="py-24 md:py-32 px-6 bg-primary-dark relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl text-center relative z-10"
        >
          <Star size={40} className="text-sand-light/50 mx-auto mb-6 md:mb-8" />
          <h2 className="text-3xl md:text-6xl font-serif text-white leading-tight italic mb-6 md:mb-8 font-light">
            "The body heals with play, the mind heals with laughter, and the spirit heals with joy."
          </h2>
          <p className="text-white/60 text-sm md:text-lg uppercase tracking-widest">— Tranquility Philosophy</p>
        </motion.div>
      </section>

      {/* Location / Footer Hybrid */}
      <footer id="contact" className="bg-charcoal-dark text-sand-light pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-24">

          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-4xl font-serif font-bold text-white">Tranquility.</h3>
            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              An oasis of calm in the center of the city. Detailed to perfection, designed for your peace.
            </p>
            <div className="flex gap-4 pt-4">
              {/* Social Placeholders */}
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-light transition-colors cursor-pointer">
                  <div className="w-4 h-4 bg-white/50 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 md:block">
            <div className="md:mb-8">
              <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-6">Discover</h4>
              <ul className="space-y-3 md:space-y-4">
                {['Our Story', 'Treatments', 'Gift Cards', 'Membership'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/60 hover:text-primary-light transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-6 md:mb-8">Visit Us</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary-light mt-1 flex-shrink-0" size={20} />
                <span className="text-white/60 text-sm md:text-base">
                  123 Serenity Lane, Wellness District<br />
                  New York, NY 10012
                </span>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-primary-light mt-1 flex-shrink-0" size={20} />
                <span className="text-white/60 text-sm md:text-base">
                  Daily: 9:00 AM - 8:00 PM<br />
                  Sunday: 10:00 AM - 6:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs md:text-sm text-white/40 text-center md:text-left">
          <p>&copy; 2024 Tranquility Spa. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} className="md:w-8 md:h-8" />
      </motion.a>
    </div>
  );
}

export default App;
