"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
// Assuming this path is correct for your project
// import { Button } from "@/components/custom/button";
import Button from "@/components/custom/button";

export default function HeroComponent() {
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

  // Animation variants
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
        CENTRALIZED GLOW SYSTEM (Background)
        ==================================================
      */}
      <div className="absolute inset-0 pointer-events-none z-10">

        {/* Layer 1: Subtle Center Spotlight */}
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

        {/* Layer 2: Ambient Atmosphere */}
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

        {/* Layer 3: Organic Focused Blob */}
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

        {/* Layer 4: Organic Large Subtle Spread */}
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

              {/* === MOBILE-ONLY IMAGE WITH INTENSE GLOWS === */}
              <div className="relative flex justify-center pt-8 pb-4 lg:hidden">
                {/* GLOWS BEHIND THE CARDS - MORE INTENSE (copied from desktop image's glows) */}
              
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
                  src="/landing/sync-wallet-hero-cards.svg"
                  alt="Cards Graphic"
                  width={900} 
                  height={900} 
                  className="w-full max-w-sm object-contain relative z-10" 
                  priority
                />
              </div>
              {/* ======================================== */}


              <p className="text-xl sm:text-xl text-gray-300 leading-relaxed max-w-md text-center lg:text-left font-[inter]">
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
      
    </div>
  );
}