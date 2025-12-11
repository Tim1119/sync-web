"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

// --- Custom Mock Icon Component (replace with your actual icons/components) ---
const IconBox = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex items-center space-x-3 text-white">
    {/* Placeholder for Icon (using a simple circle/box for structure) */}
    <div className="w-6 h-6 rounded-full bg-[#113CFC]/50 flex items-center justify-center text-sm">
      {/* You would place your actual icon component here */}
      <span className="text-white">✓</span>
    </div>
    <p className="text-lg font-medium">{text}</p>
  </div>
);
// --------------------------------------------------------------------------

// --- Animation Variants ---
const cardShow: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 1.0,
            ease: [0.2, 0.6, 0.3, 0.9], // Custom cubic-bezier for smooth bounce
        },
    },
};

const featureBoxVariant: Variants = {
    // Mobile animation: Fade in/up slightly (less aggressive since they stack normally)
    hidden: { opacity: 0, y: 10 }, 
    // Desktop animation (overrides mobile for MD screens): Use original corner stagger
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            delay: 1.0 + i * 0.2, // Stagger after the main card appears
            duration: 0.5,
            ease: "easeOut",
        },
    }),
};


// NEW VARIANT FOR MOBILE STACKING
const mobileFeatureVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.3 + i * 0.1, // Faster stagger for mobile, appearing after title
            duration: 0.4,
            ease: "easeOut",
        },
    }),
}


export default function UniquenessSection() {
  
  const features = [
    { text: "No Rewards Redemption Fees.", icon: "/landing/credit-card-cancelled.svg", custom: 2 },
    { text: "No Annual Fees.", icon: "/landing/credit-card-cancelled.svg", custom: 0 },
    { text: "No Joining Fees.", icon: "/landing/credit-card-cancelled.svg", custom: 1 },
  ];

  return (
    <div
      className="relative w-full overflow-hidden pt-16 pb-[500px] md:pt-20 md:pb-125 lg:pb-90  min-h-[1100px]" 
    >
        {/* BACKGROUND IMAGE CONTAINER (z-0) */}
       <div className="absolute inset-0 z-0 w-full h-full">
            <Image
                // src="/img.png"
                src="/landing/uniqueness.png"
                alt="Dark geometric background with blue lighting"
                layout="fill"
                objectFit="cover" 
                objectPosition="center" 
                quality={100}
                priority
                className="pointer-events-none w-full h-full"
            />
        </div>

      {/* CONTENT CONTAINER (z-20) */}
     {/* hnets oricin no unseen charges */}
    </div>
  );
}