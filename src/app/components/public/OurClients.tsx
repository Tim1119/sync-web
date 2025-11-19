"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

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

// New Variant for the central organic glow
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

export default function ClientsSection() {
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
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

    handleResize();
    if (typeof window !== 'undefined') {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const duplicatedClients = useMemo(() => {
    // Ensuring enough duplication for smooth loop
    const duplicates = Array(2).fill(null).map(() => [...clients]).flat();
    return duplicates;
  }, []); 

  // SCROLL_DURATION is now based on client count
  const SCROLL_DURATION = `${clients.length * 4}s`; 
  const trackWidth = "w-[200%]"; // Assuming 2 sets of clients for the scroll

  return (
    <div
      // KEY CHANGE 1: Removing overflow-hidden from the main container
      // This allows absolute children (the glows) to bleed outside.
      className="relative w-full" 
      style={{
        background: '#030C32',
      }}
    >
      {/* ==================================================
        AMBIENT GLOW SYSTEM FOR CLIENT SECTION (z-0 to z-10)
        ==================================================
      */}
      <div className="absolute inset-0 pointer-events-none z-10">

        {/* 1. Subtle Center Spotlight (Center of the combined area) */}
        <div
          className="
            absolute left-1/2 
            // KEY CHANGE 2: Positioned relative to the middle of the combined Hero/Client area.
            // Adjust this 'top' value if the blend isn't perfect.
            top-[-100px] 
            transform -translate-x-1/2 -translate-y-1/2
            w-[1000px] h-[750px]
            bg-white/10
            blur-[200px]
            mix-blend-screen
            rounded-full
          "
        />

        {/* 2. Ambient Atmosphere (Center of the combined area) */}
        <div
          className="
            absolute left-1/2
            // KEY CHANGE 3: Positioned relative to the middle of the combined Hero/Client area.
            top-[-100px] 
            transform -translate-x-1/2 -translate-y-1/2
            w-[1600px] h-[1400px]
            bg-white/1 
            blur-[300px]
            mix-blend-screen
            rounded-full
          "
        />


        {/* 3. Organic Focused Blue Blob (Animated Layer - Adjusted Position) */}
        <motion.div
          className="
            // KEY CHANGE 4: Moving the animated blob far up to sit near the Hero/Client join point.
            absolute top-[-200px] left-1/4 
            w-[600px] h-[400px] 
            bg-[#113CFC]/15 
            blur-[150px] 
            mix-blend-screen
            rounded-[40%_60%_50%_70%/60%_40%_70%_50%]
            transform -translate-x-1/2
          "
          variants={glowVariant} // Applying the animation variant
          animate="animate"
        />

        {/* 4. Organic Large Subtle Spread (The bottom-weighted layer) */}
        <div
          className="
            // Keeping this one low to serve as the bottom anchor of the Client section.
            absolute top-[700px] left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-[900px] h-[700px] 
            bg-white/3 
            blur-[250px] 
            mix-blend-screen
            rounded-full 
          "
        />

      </div>
      
      {/* ==================================================
        CLIENTS CONTENT SECTION (z-20 to sit above ambient glows)
        ==================================================
      */}
      <div className="relative z-20 w-full overflow-hidden pb-20 pt-20 bg-none">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative"> 
            
            {/* Heading */}
            <motion.div
              className="text-center mb-8 relative z-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300 text-[17px] mb-2">
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

              {/* Edge Glows: Using the BLUE/Blur-3xl glow */}
              <div 
                className="
                  absolute inset-y-0 left-0 w-32 h-full 
                  bg-[#113CFC]/10 blur-3xl rounded-full 
                  pointer-events-none z-10
                " 
              />
              
              <div 
                className="
                  absolute inset-y-0 right-0 w-32 h-full 
                  bg-[#113CFC]/10 blur-3xl rounded-full 
                  pointer-events-none z-10
                " 
              />
              
              <motion.div
                    className={`flex flex-nowrap whitespace-nowrap ${trackWidth} relative z-20`}
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

                {/* FADE OVERLAYS: Blend logos into the background at the edges (z-30) */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030C32] to-transparent pointer-events-none z-30" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030C32] to-transparent pointer-events-none z-30" />

            </div>

            {/* BOTTOM DIVIDER */}
            <div className="mt-5 border-t border-[#ffffff22]"></div>

        </div>
      </div>
    </div>
  );
}