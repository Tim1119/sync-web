"use client";

import Image from "next/image";
import Link from "next/link";
// Assuming you have a standard Shadcn/UI Button component
// import { Button } from "@/components/ui/button"; 
import { motion, Variants } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

// --- Mock Button Component (Replace with your actual import if available) ---
// Note: Adjusted props to match usage in the Hero section (Link/passHref)
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
  { name: "Revolut", logo: "/revolut-logo.svg" },
  { name: "NorthOne", logo: "/northone-logo.svg" },
  { name: "Checkout", logo: "/checkout-logo.svg" },
];

// Reusable Logo Component
const LogoItem = ({ client }: { client: Client }) => (
  // 1. Responsive Widths (Controls 1, 2, or 3 logos visible)
  // 2. Responsive Spacing (px-16 on mobile for space, lg:px-6 for tighter desktop)
  <div className="flex items-center justify-center w-full md:w-1/2 lg:w-1/3  mx-5 px-16 lg:px-6">
    <Image
      src={client.logo}
      alt={client.name}
      // width and height are still required for Next.js Image optimization
      width={180}
      height={80}
      // 3. Responsive Logo Size (max-w-40 large on mobile, lg:max-w-28 smaller on desktop)
      className="object-contain filter brightness-100 hover:brightness-125 transition-all duration-300 h-full max-w-40 lg:max-w-[400px] w-[200px]"
    />
  </div>
);

// --- NEW VARIANT FOR FEATURE CARDS ---
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


export default function HeroClientsSection() {
  // State to track screen size for dynamic track width and duration
  const [itemsPerView, setItemsPerView] = useState(3);

  // Effect to determine how many items should be visible based on viewport width
  useEffect(() => {
    const handleResize = () => {
      // Safely access window.innerWidth
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) {
          setItemsPerView(1); // Mobile: 1 logo
        } else if (window.innerWidth < 1024) {
          setItemsPerView(2); // Medium: 2 logos
        } else {
          setItemsPerView(3); // Large: 3 logos
        }
      }
    };

    if (typeof window !== 'undefined') {
      handleResize(); // Set initial value
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Duplicate the clients array to fill the track (3 sets for itemsPerView=3, 2 for itemsPerView=2, etc.)
  const duplicatedClients = useMemo(() => {
    // We duplicate the list to ensure the track is full enough for smooth looping
    // Using 3x clients for 1 and 2 itemsPerView, and 2x clients for 3 itemsPerView
    // A simplified approach for looping: duplicate enough to cover the viewport + a full set to scroll past
    const effectiveDuplicates = itemsPerView === 3 ? 2 : 3;
    const duplicates = Array(effectiveDuplicates).fill(null).map(() => [...clients]).flat();
    return duplicates;
  }, [itemsPerView]);

  // Calculate scroll duration based on the number of original items and speed multiplier (3s per item)
  const SCROLL_DURATION = `${clients.length * itemsPerView * 3}s`;

  // Calculate width percentage for the motion track element
  const trackWidth = itemsPerView === 1 ? "w-[300%]" : itemsPerView === 2 ? "w-[200%]" : "w-[300%]";

  // Scroll logic for the decorative background image
  const [isImageVisible, setIsImageVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > 50) {
          setIsImageVisible(false);
        } else {
          setIsImageVisible(true);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Animation variants (kept for structure)
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

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: '#030C32',
      }}
    >

      {/* ==================================================
        CENTRALIZED GLOW SYSTEM 
        ==================================================
      */}
      <div className="absolute inset-0 pointer-events-none z-10">

        {/* Layer 1: Subtle Center Spotlight (Original Glow - UNMOVED) */}
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

        {/* Layer 2: Ambient Atmosphere (Original Glow - UNMOVED) */}
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

        {/* Layer 3: Organic Focused Blob (New Glow - MOVED) */}
        <div
          className="
            md:absolute md:top-[600px] md:left-1/3 
            md:w-[600px] md:h-[400px] 
            bg-white/15 
            blur-[150px] 
            mix-blend-screen
            rounded-[40%_60%_50%_70%/60%_40%_70%_50%]
          "
        />

        {/* Layer 4: Organic Large Subtle Spread (New Glow - MOVED) */}
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
            src="/waves.svg"
            alt="Decorative background"
            width={800}
            height={800}
            className="w-full h-full object-cover z-[99]"
            priority
          />
        </div>
      )}

      {/* ==================================================
        HERO CONTENT SECTION (REFURBISHED)
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

              {/* === MOBILE-ONLY IMAGE WITH INTENSE GLOWS === */}
              <div className="relative flex justify-center pt-8 pb-4 lg:hidden">
                {/* GLOWS BEHIND THE CARDS - MORE INTENSE */}
              
                {/* 1. Large, central white subtle glow */}
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/30 blur-[150px] rounded-full z-0"
                />
                {/* 2. Top-left blue focused glow */}
                <div
                  className="absolute top-[5%] left-[5%] w-[180px] h-[180px] bg-[#113CFC]/50 blur-[100px] rounded-full z-0"
                />
                {/* 3. Bottom-right blue focused glow */}
                <div
                  className="absolute bottom-[5%] right-[5%] w-[180px] h-[180px] bg-[#113CFC]/50 blur-[100px] rounded-full z-0"
                />
                {/* 4. Small, intense central white spot */}
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white/40 blur-[80px] rounded-full z-0"
                />
                {/* 5. Top-right subtle white glow */}
                <div
                  className="absolute top-[-5%] right-[0%] w-[150px] h-[150px] bg-white/20 blur-[70px] rounded-full z-0"
                />
                {/* 6. Bottom-left subtle blue spread */}
                <div
                  className="absolute bottom-[-5%] left-[0%] w-[150px] h-[150px] bg-[#113CFC]/30 blur-[70px] rounded-full z-0"
                />

                <Image
                  // Path changed to the original in HeroClientsSection
                   src="/landing/sync-wallet-hero-cards.svg"
                  alt="Cards Graphic"
                  width={900} 
                  height={900} 
                  className="w-full max-w-sm object-contain relative z-10" 
                  priority
                />
              </div>
              {/* ======================================== */}


              <p className="text-xl lg:text-lg text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0 text-justify font-[inter]">
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
                  <Link href="/contact" passHref>
                       <Button className="bg-[#113CFC] hover:bg-[#0E33E0] text-white w-full sm:w-auto px-3 py-3 lg:px-8 lg:py-4 text-base font-medium rounded-lg shadow-lg transition-all duration-300">
                          Get Started
                      </Button>
                  </Link>

                  <Link href="/how-it-works" passHref>
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
              // Hidden on mobile, only visible on large screens
              className="relative hidden lg:flex justify-end"
              initial="hidden"
              animate="visible"
              variants={imageVariant}
            >
              {/* GLOWS BEHIND THE CARDS - MORE INTENSE */}
              
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

              {/* Left Glow Effect for the Logo Track (md: prefix added) */}
              <div 
                className="
                  md:absolute md:inset-y-0 md:left-0 md:w-32 md:h-full 
                  bg-[#113CFC]/10 blur-3xl rounded-full 
                  pointer-events-none z-10
                " 
              />
              
              {/* Right Glow Effect for the Logo Track (md: prefix added) */}
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
                // Use a main 3-column grid (lg:grid-cols-3)
                // Grid parent ensures children (Card 1 & Card 2) match height
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* CARD 1: Powerful Features (1/3 width) - UNIFORM HEIGHT */}
                <motion.div
                    // UPDATED: Background to #030C32 and added subtle border
                    className="p-8 rounded-xl bg-[#030C32] border border-white/10 shadow-2xl h-full lg:h-[400px] col-span-1 md:col-span-2 lg:col-span-1 overflow-hidden flex flex-col"
                    variants={cardVariant}
                    custom={0} // Stagger index 0
                >
                    {/* h-full and flex-grow ensure content fills the height */}
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
                    // UPDATED: Background to #030C32 and added subtle border
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
                    // UPDATED: Background to #030C32 and added subtle border
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