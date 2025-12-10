"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { BiSolidUserBadge } from "react-icons/bi";
import { FaChartLine, FaMobileAlt, FaUsers, FaLockOpen, FaHandshake } from "react-icons/fa";
import { MdOutlineIntegrationInstructions, MdAccessTimeFilled, MdAnalytics } from "react-icons/md";

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

const organizationModules = [
    {
        icon: FaChartLine, 
        title: "Lead Generation & Tracking",
        description: "Capture, qualify, and track leads instantly with a single NFC tap, moving beyond paper business cards.",
        imageUrl: "/landing/leads.jpg",
        colorClass: "bg-[#395dfc]", // Blue
        iconColor: "text-white",
        features: [
            { icon: FaHandshake, text: "Smart Networking: Digital profiles and contact exchange." },
            { icon: MdOutlineIntegrationInstructions, text: "CRM Integration: Sync contacts directly for faster follow-up." },
            { icon: MdAnalytics, text: "Real-time Lead Analytics." },
        ]
    },
    {
        icon: FaLockOpen, 
        title: "Unified Access & Operations",
        description: "Secure entry to offices, labs, and warehouses while streamlining staff attendance and activity tracking.",
        imageUrl: "/landing/secure-entry.jpg",
        colorClass: "bg-[#07D41B]", // Green
        iconColor: "text-white", 
        features: [
            { icon: MdAccessTimeFilled, text: "Staff Management: Seamless clock-ins, clock-outs, and attendance." },
            { icon: FaUsers, text: "Smoother Onboarding & Offboarding." },
            { icon: FaMobileAlt, text: "Real-Time Visibility via central dashboard." },
        ]
    },
];


const valuePropositions = [
    { 
        icon: BiSolidUserBadge, 
        text: "One unified card for identity, access, and networking.",
        colorClass: "text-blue-400" 
    },
    { 
        icon: FaChartLine, 
        text: "Better lead capture and measurable marketing ROI.",
        colorClass: "text-red-400" 
    },
    { 
        icon: MdAccessTimeFilled, 
        text: "Smoother onboarding and workforce management.",
        colorClass: "text-green-400" 
    },
    { 
        icon: FaLockOpen, 
        text: "Secure, trackable, and efficient operations.",
        colorClass: "text-yellow-400" 
    },
];


export default function OrganizationSolutionPage() {
  return (
    <div
      className="relative w-full overflow-hidden min-h-screen font-[inter] pt-10"
      style={{
        background: '#030C32', 
      }}
    >
      {/* GLOBAL BACKGROUND GLOW SYSTEM */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-32">

        {/* -------------------------------------------------- */}
        {/* ## Hero/Header Section */}
        {/* -------------------------------------------------- */}
        <motion.header
          className="text-center mb-20 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariant}
        >
          <p className="text-lg font-semibold text-[#113CFC] uppercase tracking-widest">
            Organization Use Case
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[abhaya] text-white leading-tight">
            SYNC: <span className="text-[#113CFC]">Smart Identity</span> for Modern Teams
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto">
            SYNC gives organizations a unified identity and access solution built for efficiency and growth.
          </p>
        </motion.header>
        
        <hr className="border-t border-white/10 my-16" />

        {/* -------------------------------------------------- */}
        {/* ## Solution Modules Grid (Marketing & Operations) */}
        {/* -------------------------------------------------- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariant}
        >
          {organizationModules.map((module, index) => {
            const IconComponent = module.icon;
            
            return (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl border border-white/10 bg-[#08154F]/50 shadow-2xl
                             ring-1 ring-[#113CFC]/30 transition-all duration-300
                             flex flex-col space-y-4 overflow-hidden h-full"
                  variants={itemVariant}
                >
                   
                    <div className="flex flex-col items-center mb-2 
                                    md:flex-row md:items-start md:space-x-3 
                                    text-center md:text-left">
                        
                        <div className={`p-2 rounded-lg flex items-center justify-center ${module.colorClass} shrink-0 mb-3 md:mb-0`}>
                            <IconComponent className={`w-6 h-6 ${module.iconColor}`} />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white grow leading-snug">
                            {module.title}
                        </h3>
                    </div>

                    <p className="text-gray-300 text-base text-center md:text-left">
                        {module.description}
                    </p>

                    <motion.div
                        className="space-y-3 pt-3 grow" 
                        variants={containerVariant}
                    >
                        {module.features.map((feature, idx) => {
                            const FeatureIcon = feature.icon;
                            return (
                                <motion.div key={idx} className="flex items-start space-x-2 text-left" variants={itemVariant}>
                                    <FeatureIcon className={`w-5 h-5 mt-1 ${module.iconColor} shrink-0`} />
                                    <p className="text-sm text-gray-400">{feature.text}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>

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

        <hr className="border-t border-white/10 my-16" />

        <motion.section
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariant}
        >
            <motion.h2 className="text-4xl font-bold text-white mb-12" variants={itemVariant}>
                Why Organizations Love SYNC
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {valuePropositions.map((prop, index) => {
                    const PropIcon = prop.icon;
                    return (
                        <motion.div
                            key={index}
                            className="p-6 rounded-xl border border-white/10 bg-[#08154F]/50 shadow-2xl
                                       ring-1 ring-[#113CFC]/30 transition-all duration-300 hover:ring-[#113CFC]/60 hover:shadow-[0_0_30px_rgba(17,60,252,0.3)]
                                       flex flex-col items-center text-center space-y-3 h-full"
                            variants={itemVariant}
                            whileHover={{ y: -5 }}
                        >
                            
                            <PropIcon className={`text-4xl mb-2 ${prop.colorClass}`} />
                            <p className="text-lg text-gray-300 font-medium">{prop.text}</p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
      </div>
    </div>
  );
}