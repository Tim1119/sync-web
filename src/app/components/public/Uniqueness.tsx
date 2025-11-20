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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        
        {/* Title */}
        <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">
            Our Uniqueness
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Honest Pricing, No Unseen Charges.
          </h2>
        </motion.div>

        {/* ==================================================
            MOBILE: SINGLE-COLUMN GRID LAYOUT FOR FEATURE BOXES (Visible on mobile, hidden on MD+)
        ================================================== */}
        <div 
            className="mb-8 grid grid-cols-1 gap-3 md:hidden"
        >
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    className="p-4 rounded-xl bg-[#030C32] border border-white/10 shadow-lg " 
                    initial="hidden"
                    whileInView="visible"
                    variants={mobileFeatureVariant}
                    custom={index}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h3 className="text-base font-medium text-white flex items-center gap-2">
                         <Image
                        src="/landing/credit-card-cancelled.svg"
                        className="object-contain"
                        alt="Company Logo"
                        width={30}
                        height={30}
                        />
                        {/* <span className="inline-block mr-2 text-[#113CFC] text-lg">{feature.icon}</span>  */}
                        {feature.text}
                    </h3>
                </motion.div>
            ))}
        </div>


        {/* ==================================================
            CENTRAL CARD AND GLOW CONTAINER (pt-0 for mobile, pt-64 for MD+)
        ================================================== */}
        <div className="relative w-full pt-0 md:pt-64 flex justify-center"> 
            
            {/* GLOW LAYERS: Centered vertically around the card */}

            {/* FIRST (LARGER, SOFTER) WHITE GLOW LAYER 
                🚀 MODIFIED: Hidden on mobile (hidden) and shown on desktop (md:block) */}
            <div
                className="absolute hidden md:block w-[500px] h-[750px] bg-white/30 blur-3xl md:blur-[150px] rounded-full z-10"
                style={{ 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                }}
            />

            {/* SECOND (SMALLER, MORE INTENSE) WHITE GLOW LAYER 
                🚀 MODIFIED: Reduced size and blur for mobile, reverted for desktop (md:...) */}
            {/* <div
                className="absolute w-[150px] h-[100px] bg-white/40  bg-red-400 blur-md md:w-[350px] md:h-[400px] md:blur-lg rounded-full z-10"
                style={{ 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -30%)', 
                }}
            /> */}

            {/* --- CENTRAL CARD --- */}
            <motion.div
                className="relative z-30 "
                initial="hidden"
                whileInView="visible"
                variants={cardShow}
                viewport={{ once: true, amount: 0.5 }}
            >
                <Image
                    // src="/sync-card-2.svg"
                    src="/glowing-card.svg"
                    alt="Sync Card"
                    width={450} 
                    height={750} 
                    className="object-contain"
                />
            </motion.div>
            
            {/* ==================================================
                DESKTOP: FLOATING FEATURE BOXES (Hidden on mobile, Visible on MD+)
            ================================================== */}
            
            {/* BOX 1: Top Left Corner */}
            <motion.div
                className="absolute -left-[-310px] top-[40%] hidden md:block p-4 rounded-xl bg-[#030C32] border border-white/10 shadow-2xl z-40 "
                // style={{ top: '0', left: '0' }} 
                initial="hidden"
                whileInView="visible"
                variants={featureBoxVariant}
                custom={0}
                viewport={{ once: true, amount: 0.5 }}
            >
                <h3 className="text-sm  font-medium text-white bg-[#030C32] w-[100px]">
                    {/* <span className="inline-block mr-2 text-[#113CFC]">🗎</span> No Annual Fees. */}
                     <Image
                        src="/landing/credit-card-cancelled.svg"
                        className="object-contain"
                        alt="Company Logo"
                        width={30}
                        height={30}
                        />
                    
                    No Annual Fees.
                </h3>
            </motion.div>

            {/* BOX 2: Bottom Left Corner */}
            <motion.div
                className="absolute -left-[-310px] top-[68%] hidden md:block p-4 rounded-xl bg-[#030C32] border border-white/10 shadow-2xl z-40 w-[130px]"
                initial="hidden"
                whileInView="visible"
                variants={featureBoxVariant}
                custom={1}
                viewport={{ once: true, amount: 0.5 }}
            >
                <h3 className="text-sm font-medium text-white mb-2">
                    <Image
                        src="/landing/wallet-cancelled.svg"
                        className="object-contain"
                        alt="Company Logo"
                        width={30}
                        height={30}
                        />
                    No Joining Fees.
                </h3>
            </motion.div>

            {/* BOX 3: Top Right Corner */}
            <motion.div
                className="absolute -left-[-770px] top-[55%] hidden md:block p-4 rounded-xl bg-[#030C32] border border-white/10 shadow-2xl z-40 w-[130px]"
                // style={{ top: '0', right: '0' }} 
                initial="hidden"
                whileInView="visible"
                variants={featureBoxVariant}
                custom={2}
                viewport={{ once: true, amount: 0.5 }}
            >
                <h3 className="text-sm font-medium text-white mb-2"> 
                    <Image
                        src="/landing/credit-card-cancelled.svg"
                        className="object-contain"
                        alt="Company Logo"
                        width={30}
                        height={30}
                        />
                        No Rewards Redemption Fees.
                </h3>
            </motion.div>
        </div>
      </div>
    </div>
  );
}