"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

// --- Mock Button Component (Replace with your actual import if available) ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Button = ({ children, className, variant, style, ...props }: any) => (
  <button className={className} style={style} {...props}>
    {children}
  </button>
);
// --------------------------------------------------------------------------

// 🔑 TypeScript Interface for Client Data
interface Client {
  name: string;
  logo: string;
}

// Client data
const clients: Client[] = [
  { name: "Revolut", logo: "/revolut-logo.svg" },
  { name: "NorthOne", logo: "/northone-logo.svg" },
  { name: "Checkout", logo: "/checkout-logo.svg" },
];

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

// --- ANIMATION VARIANTS ---
const cardVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2, // Stagger effect
            duration: 0.8,
            ease: "easeOut" as const,
        },
    }),
};

const glowVariant: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.3, 0.4, 0.3],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut" as const,
      repeatType: "reverse" as const,
    },
  },
};

const mobileCardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    // FIX: Commenting out the subtle float animation that caused the "blinking" effect
    // y: [0, -5, 0], 
    transition: {
      opacity: { duration: 0.8, delay: 0.2 },
      scale: { duration: 0.5, delay: 0.2 },
      // FIX: Commenting out the infinite repeat transition
      // y: { 
      //   duration: 4, 
      //   repeat: Infinity,
      //   ease: "easeInOut" as const,
      // },
    },
  },
};


export default function HeroClientsSection() {
  // --- STATE AND EFFECTS ---
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isImageVisible, setIsImageVisible] = useState(true);

  useEffect(() => {
    // HERO SCROLL LOGIC
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsImageVisible(window.scrollY < 50);
      }
    };

    // CLIENTS RESIZE LOGIC
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) {
          setItemsPerView(1);
        } else if (window.innerWidth < 1024) {
          setItemsPerView(2);
        } else {
          setItemsPerView(3);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
      handleResize(); // Initial call
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // CLIENTS DATA MEMO
  const duplicatedClients = useMemo(() => {
    const duplicates = Array(itemsPerView * 2).fill(null).map(() => [...clients]).flat();
    return duplicates;
  }, [itemsPerView]); 

  const SCROLL_DURATION = `${clients.length * itemsPerView * 3}s`;
  const trackWidth = itemsPerView === 1 ? "w-[300%]" : itemsPerView === 2 ? "w-[200%]" : "w-[300%]";

  // HERO TEXT & BUTTON VARIANTS
  const textVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const buttonVariant: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.5 },
    },
  };

  const imageVariant: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" as const },
    },
  };

  // --- RENDER START ---

  return (
    <div
      // Main container with background color
      className="relative w-full"
      style={{
        background: '#030C32',
      }}
    >

      {/* ==================================================
        AMBIENT GLOW SYSTEM FOR BOTH SECTIONS (Background)
        ==================================================
      */}
      <div className="absolute inset-0 pointer-events-none z-10">

        {/* -------------------- HERO SECTION GLOWS -------------------- */}
        
        {/* Layer 1: Subtle Center Spotlight (Original Glow) */}
        <div
          className="
            md:absolute md:top-1/2 md:left-1/2
            transform -translate-x-1/2 -translate-y-1/2
            md:w-[1000px] md:h-[750px]
            bg-white/10
            blur-[200px]
            mix-blend-screen
            rounded-full
          "
        />

        {/* Layer 2: Ambient Atmosphere (Original Glow) */}
        <div
          className="
            md:absolute md:top-1/2 md:left-1/2
            transform -translate-x-1/2 -translate-y-1/2
            md:w-[1600px] md:h-[1400px]
           bg-white/1
            blur-[300px]
            mix-blend-screen
            rounded-full
          "
        />

        {/* Layer 3: Organic Focused Blob (Original Glow) */}
        <motion.div // Using motion for a subtle animation
          className="
            md:absolute md:top-[600px] md:left-1/3 
            md:w-[600px] md:h-[400px] 
            bg-white/15 
            blur-[150px] 
            mix-blend-screen
            rounded-[40%_60%_50%_70%/60%_40%_70%_50%]
          "
          variants={glowVariant} 
          animate="animate"
        />

        {/* Layer 4: Organic Large Subtle Spread (Original Glow) */}
        <div
          className="
            md:absolute md:top-[700px] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
            md:w-[900px] md:h-[700px] 
            bg-white/3 
            blur-[250px] 
            mix-blend-screen
            rounded-full 
          "
        />
        
        {/* -------------------- CLIENTS/FEATURES SECTION GLOWS -------------------- */}

        {/* Layer 5: Focused Blue Blob for Clients Section */}
        <motion.div
            className="
              absolute top-[1200px] left-1/4 
              w-[600px] h-[400px] 
              bg-[#113CFC]/15 
              blur-[150px] 
              mix-blend-screen
              rounded-[40%_60%_50%_70%/60%_40%_70%_50%]
              transform -translate-x-1/2
            "
            variants={glowVariant} 
            animate="animate"
        />

        {/* Layer 6: Large White Spread for Feature Cards Section */}
        <div
            className="
              absolute top-[2000px] left-1/2 
              w-[1200px] h-[1000px] 
              bg-white/1 
              blur-[300px] 
              mix-blend-screen
              rounded-full 
              transform -translate-x-1/2 -translate-y-1/2
            "
        />

      </div>
      
      {/* Background Decorative Image - Conditionally Rendered */}
      {isImageVisible && (
        <div
          // WAVE IMAGE FIX: Restored original styling
          className={`
            fixed -top-60 -left-32 w-[450px] h-[350px] opacity-40
            sm:h-[1000px] sm:w-[1000px] sm:-top-10 sm:-left-80
            lg:w-[900px] lg:h-[900px] lg:-40 lg:-left-70
            pointer-events-none z-0
            2xl:-top-60 2xl:-left-110 2xl:w-[1400px] 2xl:h-[1300px]
          `}
        >
          <Image
            src="/waves.svg"
            alt="Decorative background"
            width={800}
            height={800}
            className="w-full h-full object-contain z-[99]"
            priority
          />
        </div>
      )}

      {/* ==================================================
        HERO CONTENT SECTION
        ==================================================
      */}
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 lg:pt-32 pb-20">
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

              {/* === MOBILE-ONLY IMAGE WITH INTENSE GLOWS & ANIMATIONS === */}
              <div className="relative flex justify-center pt-8 pb-4 lg:hidden">
                {/* GLOWS BEHIND THE CARDS - NOW ANIMATED (MOBILE) */}
              
                {/* 1. Large, central white subtle glow (Static for clarity) */}
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/30 blur-[150px] rounded-full z-0"
                />
                
                {/* 2. Top-left blue focused glow (Animated) */}
                <motion.div
                  className="absolute top-[5%] left-[5%] w-[180px] h-[180px] bg-[#113CFC]/50 blur-[100px] rounded-full z-0"
                  variants={glowVariant}
                  animate="animate"
                />
                
                {/* 3. Bottom-right blue focused glow (Animated) */}
                <motion.div
                  className="absolute bottom-[5%] right-[5%] w-[180px] h-[180px] bg-[#113CFC]/50 blur-[100px] rounded-full z-0"
                  variants={glowVariant}
                  animate="animate"
                />
                
                {/* 4. Small, intense central white spot (Static) */}
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white/40 blur-[80px] rounded-full z-0"
                />
                
                {/* 5. Top-right subtle white glow (Static) */}
                <div
                  className="absolute top-[-5%] right-[0%] w-[150px] h-[150px] bg-white/20 blur-[70px] rounded-full z-0"
                />
                
                {/* 6. Bottom-left subtle blue spread (Animated) */}
                <motion.div
                  className="absolute bottom-[-5%] left-[0%] w-[150px] h-[150px] bg-[#113CFC]/30 blur-[70px] rounded-full z-0"
                  variants={glowVariant}
                  animate="animate"
                />

                {/* ANIMATED IMAGE */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={mobileCardVariant}
                  className="relative z-10 w-full max-w-sm" // Container for the Image motion
                >
                  <Image
                    src="/landing/sync-wallet-hero-cards.svg" // Path restored
                    alt="Cards Graphic"
                    width={900} 
                    height={900} 
                    className="w-full h-full object-contain" 
                    priority
                  />
                </motion.div>
              </div>
              {/* ======================================== */}


              <p className="text-xl sm:text-lg text-gray-300 leading-relaxed max-w-md text-center lg:text-left">
                Create, share, and manage your digital identity — built for
                professionals, teams, and institutions.
              </p>

              {/* Buttons */}
             <motion.div
                  className="flex gap-4 pt-2 justify-center lg:justify-start"
                  initial="hidden"
                  animate="visible"
                  variants={buttonVariant}
              >
                  <Link href="/contact">
                      <Button
                          className="bg-[#113CFC] hover:bg-[#0E33E0] text-white w-full sm:w-auto px-3 py-3 lg:px-8 lg:py-4 text-base font-medium rounded-lg shadow-lg transition-all duration-300"
                      >
                          Get Started
                      </Button>
                  </Link>

                  <Link href="/how-it-works">
                      <Button
                          variant="outline"
                          className="w-full sm:w-auto text-base font-medium
                                    text-white border-2 border-[#113CFC] bg-transparent
                                    hover:bg-[#113CFC] hover:text-white transition-all duration-300 rounded-lg px-3 py-3 lg:px-8 lg:py-4"
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
              {/* GLOWS BEHIND THE CARDS - MORE INTENSE (DESKTOP) */}
              
              {/* 1. Large, central white subtle glow */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/30 blur-[200px] rounded-full z-0"
              />
              {/* 2. Top-left blue focused glow */}
              <div
                className="absolute top-[5%] left-[5%] w-[220px] h-[220px] bg-[#113CFC]/50 blur-[150px] rounded-full z-0"
              />
              {/* 3. Bottom-right blue focused glow */}
              <div
                className="absolute bottom-[5%] right-[5%] w-[220px] h-[220px] bg-[#113CFC]/50 blur-[150px] rounded-full z-0"
              />
              {/* 4. Small, intense central white spot */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-white/40 blur-[120px] rounded-full z-0"
              />
              {/* 5. Top-right subtle white glow */}
              <div
                className="absolute top-[-5%] right-[0%] w-[180px] h-[180px] bg-white/20 blur-[100px] rounded-full z-0"
              />
              {/* 6. Bottom-left subtle blue spread */}
              <div
                className="absolute bottom-[-5%] left-[0%] w-[180px] h-[180px] bg-[#113CFC]/30 blur-[110px] rounded-full z-0"
              />

              <Image
                src="/hero-cards.svg"
                alt="Cards Graphic"
                width={800}
                height={800}
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg object-contain relative z-10" // Added relative z-10
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==================================================
        CLIENTS CONTENT SECTION
        ==================================================
      */}
      <div className="relative z-20 w-full overflow-hidden pb-20">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

            {/* TOP DIVIDER */}
            <div className="mb-5 border-t border-[#ffffff22]"></div>

            {/* LOGO SCROLL TRACK WRAPPER */}
            <div className="relative w-full py-8 overflow-hidden">

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

            {/* BOTTOM DIVIDER */}
            <div className="mt-5 border-t border-[#ffffff22]"></div>

        </div>
      </div>
      
      {/* ==================================================
        NEW: FEATURE CARDS SECTION - UNIFORM HEIGHTS
        ==================================================
      */}
      <div className="relative z-20 w-full pt-10 pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* CARD 1: Powerful Features (1/3 width) - UNIFORM HEIGHT */}
                <motion.div
                    className="p-8 rounded-xl bg-[#030C32] border border-white/10 shadow-2xl h-full lg:h-[400px] col-span-1 md:col-span-2 lg:col-span-1 overflow-hidden flex flex-col"
                    variants={cardVariant}
                    custom={0} // Stagger index 0
                >
                    <div className="flex flex-col space-y-4 justify-center items-center h-full flex-grow">
                        <h3 className="text-4xl font-bold text-white text-center gap-2">Powerful <br /> Features</h3>
                        <Image
                            src="/call-icon.svg"
                            className="object-contain text-center"
                            alt="Company Logo"
                            width={60}
                            height={60}
                        />
                    </div>
                </motion.div>
                
                {/* CARD 2: Seamless Onboarding (2/3 width) - UNIFORM HEIGHT & RESPONSIVE IMAGE */}
                <motion.div
                    className="relative p-8 rounded-xl bg-[#030C32] border border-white/10 shadow-2xl h-full lg:h-[400px] col-span-1 md:col-span-2 lg:col-span-2 overflow-hidden flex flex-col justify-between"
                    variants={cardVariant}
                    custom={1} // Stagger index 1
                >
                    {/* TOP RIGHT CORNER GLOW (White) */}
                    <div 
                        className="absolute hidden lg:block -top-32 -right-32 w-64 h-64 bg-white/10 blur-[150px] rounded-full z-0"
                    ></div>

                    {/* SEMI-CIRCLE ABOVE IMAGE (Desktop Only) - WHITE AMBIENT GLOW */}
                    <div 
                        className="absolute hidden lg:block -top-10 right-[8%] w-64 h-32 bg-white/10 rounded-b-full  z-20"
                    ></div>

                    {/* Content on the left, Image on the right (internal flex) */}
                    <div className="flex flex-col lg:flex-row justify-between h-full">
                        
                        {/* TEXT CONTENT (Left side) */}
                        <div className="lg:w-1/2 mb-6 lg:mb-0 pt-4 relative z-30 flex flex-col justify-center">
                            <h3 className="text-4xl font-bold text-white mb-4">Seamless <br /> onboarding</h3>
                            <p className="text-lg text-gray-300 max-w-lg">
                             Get started using a completely digital on-boarding process, and activate your OneCard in less than 5 minutes.
                            </p>
                        </div>
                        
                        {/* IMAGE CONTAINER (Right side) */}
                        <div className="lg:w-1/2 flex justify-center items-center relative z-10 w-full h-full">
                            
                            {/* IMAGE GLOW EFFECT (Desktop Only) - Kept BLUE for contrast with the phone/app */}
                            <div
                                className="absolute hidden lg:block w-48 h-48 bg-[#113CFC] opacity-30 rounded-full blur-[100px] z-0"
                                style={{ transform: 'translateY(-10%)' }} // Adjust position slightly for better visual alignment
                            ></div>

                            {/* Desktop Phone Image: ABSOLUTE/CLIPPED (Hidden on Mobile) */}
                            <Image
                                src="/phone.svg"
                                alt="Seamless onboarding sign-up screen"
                                width={350} 
                                height={700}
                                // CRUCIAL: absolute, top/right adjusted for the 400px card height
                                className="object-contain w-auto h-auto absolute lg:top-[-40px] lg:right-[-20px] lg:w-[350px] lg:h-[700px] lg:block hidden z-10" // Added z-10 to ensure it's above the glow
                            />
                            
                            {/* Mobile Phone Image: RESPONSIVE/FULLY VISIBLE (Hidden on Desktop) */}
                            <Image
                                src="/phone.svg" 
                                alt="Seamless onboarding sign-up screen"
                                width={180} // Smaller base dimensions for mobile
                                height={360}
                                // CRUCIAL: block lg:hidden for mobile-only. max-w-[200px] max-h-[250px] to constrain size.
                                className="object-contain block lg:hidden mt-8 mx-auto w-full max-w-[200px] max-h-[250px]"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* CARD 3: Networking (Full width, spanning 3 columns) - UNIFORM HEIGHT */}
                <motion.div
                    className="p-8 rounded-xl bg-[#030C32] border border-white/10 shadow-2xl h-full lg:h-[400px] col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden"
                    variants={cardVariant}
                    custom={2} // Stagger index 2
                >
                    <div className="flex flex-col lg:flex-row justify-between items-center h-full">
                        <div className="lg:w-1/2">
                            <h3 className="text-4xl font-bold text-white mb-4">Networking</h3>
                            <p className="text-lg text-gray-300 max-w-lg">
                                Share SYNC with new people. They get their own co-branded OneCard with separate offers while you keep track and control.
                            </p>
                        </div>
                        <div className="lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
                            <Image
                                src="/3-cards.svg" // Placeholder - Replace with your actual image path
                                alt="Stacked OneCard designs"
                                width={400}
                                height={300}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </div>
      </div>
      
    </div>
  );
}