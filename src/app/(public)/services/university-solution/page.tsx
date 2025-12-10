"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { PiTreeStructure } from "react-icons/pi";
import { BiSolidUserBadge } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";



const textVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const perpetualGlowVariant: Variants = {
  animate: {
    opacity: [0.3, 0.5, 0.3],
    scale: [0.9, 1.1, 0.9],
    rotate: [0, 360],
    transition: {
      duration: 15,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const universityModules = [
    {
        icon: BiSolidUserBadge ,
        title: "A Smart ID That Does More",
        description: "Digital-first ID with contact sharing, campus payments, and instant recognition.",
        imageUrl: "/landing/university-solution-1.svg",
        colorClass: "bg-[#395dfc]", 
        iconColor: "text-white",
    },
    {
        icon:FaChartLine, 
        title: "Manage Students & Access Effortlessly",
        description: "Complete access control, card issuance, and analytics dashboard.",
        imageUrl: "/landing/university-solution-2.svg",
        colorClass: "bg-[#3C5BFF]",
        iconColor: "text-white", 
    },
    {
        icon: PiTreeStructure ,
        title: "Scale Across Institutions",
        description: "Institution onboarding, pricing management, and compliance monitoring.",
        imageUrl: "/landing/university-solution-3.svg",
        colorClass: "bg-[#07D41B]",
        iconColor: "text-white", 
    },
    {
        icon: FaMobileAlt, 
        title: "Verify Students Anytime, Anywhere",
        description: "Offline-ready ID checks for exams, voting, and campus events.",
        imageUrl: "/landing/university-solution-4.svg",
        colorClass: "bg-[#f9d251]",
        iconColor: "text-white", 
    },
];


export default function UniversitySolutionPage() {
  return (
    <div
      className="relative w-full overflow-hidden min-h-screen p-10 font-[inter]"
      style={{
        background: '#030C32', 
      }}
    >
      
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute -top-40 left-[15%] w-[600px] h-[500px] bg-[#113CFC]/20 blur-[200px] rounded-full mix-blend-screen"
          variants={perpetualGlowVariant}
          initial={{ opacity: 0.3, scale: 0.9 }}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-[-100px] right-[-100px] w-[800px] h-[700px] bg-white/5 blur-[250px] rounded-full mix-blend-screen"
          variants={perpetualGlowVariant}
          initial={{ opacity: 0.1, scale: 1 }}
          animate="animate"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto lg:px-8 py-20 md:py-32">

       
        <motion.header
          className="text-center mb-20 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariant}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[abhaya] text-white leading-tight">
            Complete University <span className="text-[#113CFC]">Access Solution</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto">
            Four powerful modules working together seamlessly
          </p>
        </motion.header>

        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariant}
        >
          {universityModules.map((module, index) => {
            
            const IconComponent = module.icon;
            
            return (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl border border-white/10 bg-[#08154F]/50 shadow-2xl
                             ring-1 ring-[#113CFC]/30 transition-all duration-300
                             flex flex-col space-y-4 overflow-hidden"
                  variants={itemVariant}
                >
                  {/* *** MODIFICATION: Responsive layout for icon/title alignment *** */}
                  <div className="flex flex-col items-center mb-5 
                                  md:flex-row md:items-center md:space-x-3 
                                  text-center md:text-left">
                    {/* Icon Container (center on mobile, fixed position) */}
                    <div className={`p-2 rounded-lg flex items-center justify-center ${module.colorClass} flex-shrink-0 mb-3 md:mb-0`}>
                        <IconComponent className={`w-6 h-6 ${module.iconColor}`} />
                    </div>
                    {/* Title (centered on mobile, takes remaining width) */}
                    <h3 className="text-xl font-bold text-white flex-grow leading-snug">
                      {module.title}
                    </h3>
                  </div>
                 

                  <p className="text-gray-300 text-base text-center md:text-left">
                    {module.description}
                  </p>

                 
                  <div className="w-full h-48 mt-4">
                    <Image
                      src={module.imageUrl}
                      alt={module.title}
                      width={500}
                      height={200}
                      className="w-full h-full object-cover rounded-lg shadow-xl border border-white/10"
                    />
                  </div>
                </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  );
}