"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Info } from 'lucide-react';

// ==================================================================
// --- Mock Button Component (To ensure the merged component runs) ---
// ==================================================================
// This is a placeholder; replace with your actual Button component import.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Button = ({ children, className, variant, style, ...props }: any) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${className}`}
    style={style}
    {...props}
  >
    {children}
  </button>
);
// --------------------------------------------------------------------------

// --- Placeholders for Card Data & Sub-Component (for running the code) ---
interface Client { name: string; logo: string; }
const clients: Client[] = [ { name: "Revolut", logo: "/landing/revolut-logo.svg" }, { name: "NorthOne", logo: "/landing/northone-logo.svg" }, { name: "Checkout", logo: "/landing/checkout-logo.svg" }, { name: "Revolut", logo: "/landing/revolut-logo.svg" }, { name: "NorthOne", logo: "/landing/northone-logo.svg" }, { name: "Checkout", logo: "/landing/checkout-logo.svg" }, ];
interface CardFeature { text: string; }
interface CardData { id: string; name: string; price: string; image: string; features: CardFeature[]; link: string; imageBgColor: string; }
const cardsData: CardData[] = [ { id: "nova-card", name: "Nova Card", price: "₦30,000", image: "/landing/nova-card-back.svg", features: [{ text: "Durable plastic finish" },{ text: "Full-color surface printing" },{ text: "Lightweight and everyday use" }], link: "/cards/nova", imageBgColor: "#001e6e", }, { id: "maple-card", name: "Maple Card", price: "₦40,000", image: "/landing/maple-card-back.svg", features: [{ text: "Premium wooden body" },{ text: "Laser-engraved details" },{ text: "Natural texture and unique finish" }], link: "/cards/maple", imageBgColor: "#4f4940", }, { id: "metal-card", name: "Metal Card", price: "₦50,000", image: "/landing/metal-card-back.svg", features: [{ text: "Solid metal construction" },{ text: "Minimal print, sleek look" },{ text: "Designed for a premium feel" }], link: "/cards/metal", imageBgColor: "#1d1d1d", }, ];
const textVariant: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const }, }, };
const buttonVariant: Variants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.5 }, }, };
const imageVariant: Variants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" as const }, }, };
const sectionTextVariants: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const }, }, };
const cardVariants: Variants = { hidden: { opacity: 0, y: 50, scale: 0.95 }, visible: (i: number) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" as const, }, }), };

// Reusable Logo Component
const LogoItem = ({ client }: { client: Client }) => (
  <div className="flex items-center justify-center w-full md:w-1/2 lg:w-1/3  mx-5 px-16 lg:px-6">
    <Image
      src={client.logo}
      alt={client.name}
      width={180}
      height={80}
      className="object-contain filter brightness-100 hover:brightness-125 transition-all duration-300 h-full max-w-40 lg:max-w-[400px] w-[200px]"
    />
  </div>
);

// Reusable Card Component
const CardComponent = ({ card, custom }: { card: CardData; custom: number }) => {
  return (
    <motion.div
      className="relative p-6 rounded-xl border border-white/10 bg-[#030C32] shadow-2xl overflow-hidden group 
                 ring-1 ring-[#113CFC]/30 shadow-[0_0_15px_rgba(17,60,252,0.15)] transition-all duration-300
                hover:ring-[#113CFC]/60 hover:shadow-[0_0_30px_rgba(17,60,252,0.3)] 
                w-[300px] flex-shrink-0 md:w-auto md:max-w-md lg:max-w-none snap-center"
      variants={cardVariants}
      custom={custom}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
    >
      {/* INTENSE, FOCUSED, ANIMATED GLOW WITHIN CARD - These are still local to the card, which is good */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute -top-16 -right-16 w-80 h-80 bg-[#113CFC]/70 blur-[150px] rounded-full"
          style={{ mixBlendMode: 'screen' }}
          initial={{ opacity: 0.3, scale: 0.8 }}
          whileInView={{ opacity: 0.4, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }}
          viewport={{ once: true, amount: 0.5 }}
          whileHover={{ opacity: 0.9, scale: 1.15, transition: { duration: 0.4, ease: "easeOut" } }}
        />
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-white/30 blur-[180px] rounded-full"
          style={{ mixBlendMode: 'screen' }}
          initial={{ opacity: 0.1, scale: 0.7 }}
          whileInView={{ opacity: 0.2, scale: 1, transition: { duration: 1, ease: "easeOut", delay: 0.1 } }}
          viewport={{ once: true, amount: 0.5 }}
          whileHover={{ opacity: 0.5, scale: 1.25, transition: { duration: 0.5, ease: "easeOut" } }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-start text-left space-y-4 cursor-pointer">
        <div 
            className="w-full h-40 flex items-center justify-center mb-4 rounded-lg p-2 font-[inter]"
            style={{ backgroundColor: card.imageBgColor }} 
        >
          <Image
            src={card.image}
            alt={card.name}
            width={220} 
            height={140} 
            className="object-contain"
            priority 
          />
        </div>

        <h3 className="text-2xl font-bold text-white">{card.name}</h3>
        <p className="text-xl text-white font-semibold">{card.price}</p>

        <ul className="text-gray-300 text-sm space-y-2 text-left w-full pl-0">
          {card.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-[#113CFC] mr-2 text-base  leading-none">•</span>
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>

        <Link href={card.link} passHref className="w-full flex items-center justify-center">
         <Info className="w-5 h-5 text-white" />
          <Button
            variant="ghost"
            className="text-white cursor-pointer transition-colors duration-200 text-base"
          >
            More Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
// --------------------------------------------------------------------------


// ==================================================================
// --- MERGED MAIN COMPONENT (Clients Section Height Increased to py-20) ---
// ==================================================================

export default function MergedLandingSection() {
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isImageVisible, setIsImageVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) { setItemsPerView(1); } 
        else if (window.innerWidth < 1024) { setItemsPerView(2); } 
        else { setItemsPerView(3); }
      }
    };
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > 50) { setIsImageVisible(false); } 
        else { setIsImageVisible(true); }
      }
    };
    if (typeof window !== 'undefined') {
      handleResize(); 
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const duplicatedClients = useMemo(() => {
    const effectiveDuplicates = itemsPerView === 3 ? 2 : 3;
    const duplicates = Array(effectiveDuplicates).fill(null).map(() => [...clients]).flat();
    return duplicates;
  }, [itemsPerView]);

  const SCROLL_DURATION = `${clients.length * itemsPerView * 3}s`;
  const trackWidth = itemsPerView === 1 ? "w-[300%]" : itemsPerView === 2 ? "w-[200%]" : "w-[300%]";


  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: '#030C32', // Main background for the entire page
      }}
    >

      {/* ==================================================
        GLOBAL CENTRALIZED GLOW SYSTEM 
        (ALL SECTION-WIDE GLOWS CONSOLIDATED HERE)
        ==================================================
      */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Glows from original HeroClientsSection */}
        {/* <div
          className="md:absolute md:top-1/2 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[1000px] md:h-[750px] bg-white/10 blur-[200px] mix-blend-screen rounded-full"
        /> */}
        {/* <div
          className="md:absolute md:top-1/2 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[1600px] md:h-[1400px] bg-white/1 blur-[300px] mix-blend-screen rounded-full"
        /> */}
        <div
          className="md:absolute md:top-[600px] md:left-1/3 md:w-[600px] md:h-[400px] bg-white/15 blur-[150px] mix-blend-screen rounded-[40%_60%_50%_70%/60%_40%_70%_50%]"
        />
        <div
          className="md:absolute md:top-[700px] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:h-[700px] bg-white/3 blur-[250px] mix-blend-screen rounded-full"
        />
        
        {/* Glows from original ChoosePerfectCardSection - MOVED HERE */}
        <div
          className="absolute -top-40 right-1/4 transform translate-x-1/2 w-[600px] h-[500px] bg-[#113CFC]/30 blur-[250px] rounded-full mix-blend-screen"
        />
        <div
          className="absolute -top-60 right-1/2 transform translate-x-1/2 w-[1000px] h-[800px] bg-white/10 blur-[300px] rounded-full mix-blend-screen"
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-white/8 blur-[220px] rounded-full mix-blend-screen"
        />
        <div
          className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-[#113CFC]/15 blur-[180px] rounded-full mix-blend-screen"
        />
        <div
          className="absolute top-10 left-10 w-[500px] h-[400px] bg-white/15 blur-[180px] rounded-full mix-blend-screen"
        />
      </div>

      {/* Background Decorative Image - Conditionally Rendered */}
      {isImageVisible && (
        <div
          className={`
            fixed -top-[120px] -left-[155px] w-[650px] h-[1000px] opacity-40
            sm:h-[1000px] sm:w-[1000px] sm:-top-30 sm:-left-80
             lg:w-[900px] lg:h-[900px] lg:-top-40 lg:-left-70
            pointer-events-none z-0
            2xl:-top-60 2xl:-left-110 2xl:w-[1400px] 2xl:h-[1300px]
          `}
        >
          <Image
            src="/landing/waves.svg"
            alt="Decorative background"
            width={800}
            height={800}
            className="w-full h-full object-cover z-[99]"
            priority
          />
        </div>
      )}

      {/* ==================================================
        SECTION 1: HERO CONTENT
        ==================================================
      */}
      <div className="relative z-20 ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 lg:pt-42 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT SIDE CONTENT */}
            <motion.div
              className="space-y-6 h-full"
              initial="hidden"
              animate="visible"
              variants={textVariant}
            >
              <h1 className="text-center text-4xl sm:text-5xl lg:text-7xl font-bold font-[abhaya] text-white leading-tight lg:flex lg:flex-col lg:items-start">
                <span className="lg:w-full lg:text-left">
                    One Card.
                </span>
                <span className="text-[#113CFC] lg:w-full lg:text-left">
                    Endless Possibilities
                </span>
            </h1>

              {/* === MOBILE-ONLY IMAGE WITH INTENSE GLOWS === */}
              <div className="relative flex justify-center pt-8 pb-4 lg:hidden">
                {/* GLOWS BEHIND THE CARDS - MOBILE */}
                {/* ... (Mobile-only glows remain local for specific effect) ... */}
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/30 blur-[150px] rounded-full z-0"
                />
                <div
                  className="absolute top-[5%] left-[5%] w-[180px] h-[180px] bg-[#113CFC]/50 blur-[100px] rounded-full z-0"
                />
                <div
                  className="absolute bottom-[5%] right-[5%] w-[180px] h-[180px] bg-[#113CFC]/50 blur-[100px] rounded-full z-0"
                />
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white/40 blur-[80px] rounded-full z-0"
                />
                <div
                  className="absolute top-[-5%] right-[0%] w-[150px] h-[150px] bg-white/20 blur-[70px] rounded-full z-0"
                />
                <div
                  className="absolute bottom-[-5%] left-[0%] w-[150px] h-[150px] bg-[#113CFC]/30 blur-[70px] rounded-full z-0"
                />

                <Image
                   src="/landing/sync-wallet-hero-cards.svg"
                  alt="Cards Graphic"
                  width={900} 
                  height={900} 
                  className="w-full max-w-sm object-contain relative z-10" 
                  priority
                />
              </div>

              <p className="text-lg lg:text-lg text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0 text-justify font-[inter]">
                Create, share, and manage your digital identity — built for
                professionals, teams, and institutions.
              </p>

             <motion.div
                  className="flex gap-4 pt-2 justify-center lg:justify-start"
                  initial="hidden"
                  animate="visible"
                  variants={buttonVariant}
              >
                  <Link href="/cards" passHref>
                       <Button className="bg-[#113CFC] hover:bg-[#0E33E0] cursor-pointer text-white w-full sm:w-auto px-3 py-3 lg:px-8 lg:py-3 text-base font-medium rounded-lg shadow-lg transition-all duration-300">
                          Buy Card
                      </Button>
                  </Link>

                  <Link href="/how-it-works" passHref>
                      <Button
                          variant="outline"
                          className="w-full sm:w-auto text-base font-medium cursor-pointer
                                    text-white border-2 border-[#113CFC] bg-transparent
                                    hover:bg-[#113CFC] hover:text-white transition-all duration-300 rounded-lg px-3 py-3 lg:px-8 lg:py-3s"
                      >
                          See How It Works
                      </Button>
                  </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE IMAGE (DESKTOP) */}
            <motion.div
              className="relative hidden lg:flex justify-end"
              initial="hidden"
              animate="visible"
              variants={imageVariant}
            >
              {/* GLOWS BEHIND THE CARDS - DESKTOP */}
              {/* ... (Desktop-only glows remain local for specific effect) ... */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/30 blur-[200px] rounded-full z-0"
              />
              <div
                className="absolute top-[5%] left-[5%] w-[220px] h-[220px] bg-[#113CFC]/50 blur-[150px] rounded-full z-0"
              />
              <div
                className="absolute bottom-[5%] right-[5%] w-[220px] h-[220px] bg-[#113CFC]/50 blur-[150px] rounded-full z-0"
              />
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-white/40 blur-[120px] rounded-full z-0"
              />
              <div
                className="absolute top-[-5%] right-[0%] w-[180px] h-[180px] bg-white/20 blur-[100px] rounded-full z-0"
              />
              <div
                className="absolute bottom-[-5%] left-[0%] w-[180px] h-[180px] bg-[#113CFC]/30 blur-[110px] rounded-full z-0"
              />

              <Image
                src="/landing/hero-cards.svg"
                alt="Cards Graphic"
                width={900} 
                height={900} 
                className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl object-contain relative z-10" 
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>


      {/* ==================================================
        SECTION 2: CLIENTS LOGO SCROLL (HEIGHT INCREASED to py-20)
        ==================================================
      */}
      <div className="relative z-20 w-full overflow-hidden pb-12 py-20 "> {/* Reduced pb for tighter integration */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
            {/* Heading */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300 text-[17px]  mb-2">
                Clients Include
              </p>

              <h2 className="text-2xl xs: sm:text-4xl lg:text-[36px] font-medium text-white">
                <span>Our trusted Organizations and Universities</span>
              </h2>
            </motion.div>

            {/* LOGO SCROLL TRACK WRAPPER */}
            <div className="relative w-full py-20 overflow-hidden border-t border-b border-white/20"> {/* ⬅️ INCREASED from py-8/py-12 to py-20 */}

              {/* Left Glow Effect for the Logo Track */}
              <div 
                className="
                  md:absolute md:inset-y-0 md:left-0 md:w-32 md:h-full 
                  bg-[#113CFC]/10 blur-3xl rounded-full 
                  pointer-events-none z-10
                " 
              />
              
              {/* Right Glow Effect for the Logo Track */}
              <div 
                className="
                  md:absolute md:inset-y-0 md:right-0 md:w-32 md:h-full 
                  bg-[#113CFC]/10 blur-3xl rounded-full 
                  pointer-events-none z-10
                " 
              />

              <motion.div
                className={`flex flex-nowrap whitespace-nowrap ${trackWidth}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                style={{
                  animation: `scroll-left ${SCROLL_DURATION} linear infinite`,
                }}
              >
                {/* Render the duplicated list of logos for infinite loop */}
                {duplicatedClients.map((client, index) => (
                  <LogoItem key={index} client={client} />
                ))}

              </motion.div>

              {/* FADE OVERLAYS: Blend logos into the background at the edges */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030C32] to-transparent pointer-events-none z-30" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030C32] to-transparent pointer-events-none z-30" />

            </div>
        </div>
      </div>

      {/* ==================================================
        SECTION 3: CARD SELECTION (Adjusted top padding for closer sync)
        ==================================================
      */}
      <div className="relative w-full overflow-hidden pt-12 md:pt-16 pb-24 md:pb-32"> {/* Adjusted pt-12/16 */}
        {/* SECTION GLOW SYSTEM - **REMOVED, NOW PART OF GLOBAL GLOW SYSTEM** */}

        <div className="relative z-10 max-w-7xl mx-auto px-0 lg:px-8">
          {/* Section Heading and Description */}
          <motion.div
            className="text-center mb-12 space-y-4 px-6 lg:px-0" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionTextVariants}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Choose Your Perfect Card
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Compare all card types and find the one that matches your style
              and needs. Each card is designed for different preferences and use
              cases.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pt-6 pb-4 px-6 md:px-8 lg:px-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-x-visible lg:justify-items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {cardsData.map((card, index) => (
              <CardComponent key={card.id} card={card} custom={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}