"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Button from "@/components/custom/button";
// --------------------------------------------------------------------------

// 🔑 TypeScript Interface for Client Data
interface Client {
  name: string;
  logo: string;
}

// Client data (Kept for context, but not rendered in this component)
const clients: Client[] = [
  // Add actual client data if needed elsewhere
];

// Reusable Logo Component (Kept for context)
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

// --- NEW VARIANT FOR FEATURE CARDS (REQUIRED FOR THE SECTION) ---
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


export default function FeaturesSection() {
  // State, effects, and unused variants are kept for structure, but minimal.
  const itemsPerView = 3; 
  const duplicatedClients = []; 
  const SCROLL_DURATION = "0s"; 
  const trackWidth = "w-full"; 
  const isImageVisible = false; 

  const textVariant: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const }, }, };
  const buttonVariant: Variants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.5 }, }, };
  const imageVariant: Variants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" as const }, }, };

  return (
    // The main container structure is kept to provide the necessary context for the cards
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: '#030C32',
      }}
    >

      {/* ==================================================
        FEATURE CARDS SECTION - UNIFORM HEIGHTS
        ==================================================
      */}
      <div className="relative z-20 w-full pt-0 lg:pt-10 pb-5 font-[inter]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
                // Use a main 3-column grid (lg:grid-cols-3)
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* CARD 1: Powerful Features (1/3 width) - UNIFORM HEIGHT */}
                <motion.div
                    className="p-8 rounded-xl bg-[#030C32] border border-white/10 shadow-2xl h-full lg:h-[300px] col-span-1 md:col-span-2 lg:col-span-1 overflow-hidden flex flex-col"
                    variants={cardVariant}
                    custom={0} // Stagger index 0
                >
                    <div className="flex flex-col space-y-4 justify-center items-center h-full flex-grow">
                        <h3 className="text-4xl font-medium text-white text-center gap-2">Powerful <br /> Features</h3>
                        <Image
                            src="/landing/call-icon.svg"
                            className="object-contain text-center"
                            alt="Company Logo"
                            width={60}
                            height={60}
                        />
                    </div>
                </motion.div>
                
                {/* CARD 2: Seamless Onboarding (2/3 width) 
                    - Image is clipped on Desktop (lg:h-[400px] + overflow-hidden)
                    - Image is contained on Mobile 
                */}
                <motion.div
                    className="relative p-8 lg:p-[50px] rounded-xl bg-[#030C32] border border-white/10 shadow-2xl h-auto lg:h-[300px] col-span-1 md:col-span-2 lg:col-span-2 overflow-hidden flex flex-col justify-between"
                    variants={cardVariant}
                    custom={1} // Stagger index 1
                >
                    {/* TOP RIGHT CORNER GLOW (White) */}
                    <div 
                        className="absolute hidden lg:block -top-32 -right-32 w-64 h-64  bg-white/10  blur-[150px] rounded-full z-0"
                    ></div>

                   
                    {/* Content on the left, Image on the right (internal flex) */}
                    <div className="flex flex-col lg:flex-row justify-between h-[600px] gap-4 lg:h-[400px]">
                        
                        {/* TEXT CONTENT (Left side) */}
                        <div className="lg:w-1/2 mb-6 lg:mb-0 pt-4 relative z-30 flex flex-col justify-center text-center lg:text-left">
                            <h3 className="text-4xl font-medium text-white mb-4">Seamless  onboarding</h3>
                            <span className="text-base text-gray-300  text-justify w-full">
                             Get started using a completely digital on-boarding process, and activate your OneCard in less than 5 minutes.
                            </span>
                        </div>
                        
                        {/* IMAGE CONTAINER (Right side) */}
                        <div className="lg:w-1/2 flex justify-center items-center relative z-10 w-full h-full">
                            
                            {/* Desktop Phone Image: ABSOLUTE/CLIPPED (Hidden on Mobile) */}
                            <Image
                                src="/landing/iphone-feature2.png"
                                alt="Seamless onboarding sign-up screen"
                                width={350} 
                                height={700}
                                // CRUCIAL: Centering the large image vertically to make it spill out on both top and bottom edges
                                // className="object-cover absolute lg:top-[120px] lg:right-[20px]  lg:-translate-y-1/2 lg:right-[-40px] lg:w-[350px] lg:h-[250px]  lg:block hidden z-10" 
                                className="object-cover absolute lg:top-[230px] lg:right-[20px]  lg:-translate-y-1/2 lg:right-[-40px] lg:w-[350px] lg:h-[full]  lg:block hidden z-10 " 
                            />
                            
                            {/* Mobile Phone Image: RESPONSIVE/FULLY VISIBLE (Hidden on Desktop) */}
                           {/* Mobile Phone Image: RESPONSIVE/FULLY VISIBLE (Hidden on Desktop) */}
                            <Image
                                 src="/landing/iphone-feature4.svg"
                                alt="Seamless onboarding sign-up screen"
                                width={180} // Smaller base dimensions for mobile
                                height={360}
                                objectFit="cover"
                                objectPosition="top" 
                                // CRUCIAL: Contained on mobile
                                // className="object-cover block lg:hidden mt-8 mx-auto w-full max-w-fit max-h-fit"
                                className="object-cover  absolute  h-[700px] md:h-fit md-p-3  w-[600px] block -top-[10px] md:-top-[70px] mx-auto lg:hidden"
                            />
                        </div>
                    </div>
                </motion.div>

            


                {/* CARD 3: Networking (Full width, spanning 3 columns) - UNIFORM HEIGHT */}
<motion.div
    // className="relative p-8 lg:p-0 rounded-xl bg-[#030C32] border border-white/10 shadow-2xl h-full lg:h-[300px] col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden"
    className="relative p-8 lg:p-0 rounded-xl bg-[#030C32] border border-white/10 shadow-2xl h-full lg:h-[300px] col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden"
    variants={cardVariant}
    custom={2} // Stagger index 2
>
    <div className="flex flex-col lg:flex-row justify-between items-center h-full ">
        
        {/* LEFT TEXT SECTION */}
        {/* <div className="lg:w-1/2 lg:px-8 px-0"> */}
        <div className="lg:w-1/2 lg:px-[70px] px-0 text-center lg:text-left">
            <h3 className="text-4xl font-medium text-white mb-4">Networking</h3>
            <p className="text-base text-gray-300 max-w-lg text-justify">
                Share SYNC with new people. They get their own co-branded OneCard with separate offers while you keep track and control.
            </p>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0 relative">

            {/* DESKTOP IMAGE (large screens only) */}
            <Image
                src="/landing/networking-card-new.svg"
                alt="Stacked OneCard designs desktop"
                width={350}
                height={350}
                // className="object-contain hidden lg:block"
                // className="object-cover absolute lg:top-0   lg:-translate-y-1/2 lg:-right-2.5 lg:w-[500px] lg:h-[410px]  lg:block hidden z-10" 
                className="object-cover absolute    lg:block hidden z-10" 
            />

            {/* MOBILE IMAGE (visible only on small screens) */}
            <Image
                src="/landing/networking-card-new.svg"
                alt="Stacked OneCard designs mobile"
                width={280}
                height={280}
                className="object-contain block lg:hidden"
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