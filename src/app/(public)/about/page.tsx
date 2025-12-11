"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// --- Icons for About Page (React Icons) ---
import { FaGraduationCap, FaBriefcase, FaIndustry, FaGlobe, FaCheckCircle, FaLock, FaWifi, FaUserCheck, FaMapMarkerAlt, FaChartLine, FaCalendarCheck } from 'react-icons/fa';
import { MdOutlineSecurity, MdSync, MdVpnKey, MdSchool, MdPeople, MdAccessTimeFilled, MdEventAvailable } from 'react-icons/md';
import { IoIosCheckmark, IoIosPeople, IoMdInfinite } from 'react-icons/io';
import { BiSolidUserBadge, BiDotsHorizontalRounded, BiSolidInstitution } from 'react-icons/bi';
import { FaShareAlt } from 'react-icons/fa';
import { BiScan } from 'react-icons/bi';
import { FaCreditCard } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { PiTreeStructureLight } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { TiFlash } from "react-icons/ti";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { RiUserFill } from "react-icons/ri";
import { BsCalendarFill } from "react-icons/bs";

// ==================================================================
// --- Mock Button Component (Reused for running the code) ---
// ==================================================================
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

// --- Animation Variants (Reused from previous response) ---
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

// --- Data for Vision Section ---
const visionItems = [
    {
        icon: FaShieldAlt,
        title: "Secure",
        description: "Your information stays protected with enterprise-grade security and encryption.",
    },
    {
        icon: FiRefreshCw,
        title: "Updated",
        description: "Real-time synchronization keeps your identity and permissions current",
    },
    {
        icon: PiTreeStructureLight,
        title: "Organized",
        description: "All your connections and access points managed in one unified system",
    },
];

// --- Data for Core Modules Section (What SYNC Does) ---
const coreModules = [
    {
        icon: FaHandshake,
        title: "Connect",
        description: "Share your profile, contacts, and social links instantly.",
    },
    {
        icon: FaKey,
        title: "Access",
        description: "Enter buildings, labs, offices, and events securely.",
    },
    {
        icon: IoIosCheckmarkCircle,
        title: "Verify",
        description: "Confirm identity for exams, attendance, and campus services.",
    },
];

// --- Data for Real Impact Section ---
const impactIndustries = [
    {
        icon: RiUserFill,
        title: "For Individuals",
        description: "A smarter way to network. One card to share everything. Clear and trackable connections",
        color: "text-[#16A34A]",
    },
    {
        icon: FaBriefcase,
        title: "For Businesses",
        description: "Simple employee management, attendance tracking and secure access to all workspaces",
        color: "text-[#0066FF]",
    },
    {
        icon: BsCalendarFill,
        title: "For Events",
        description: "Faster registration, clean identity verification, and better lead capture fororganizaers",
        color: "text-[#9333EA]",
    },
    {
        icon: BiSolidInstitution,
        title: "For Institutions",
        description: "A single system  that powers ID, attendance, access and verification across campus.",
        color: "text-[#EA580C]",
    },
];

// --- Data for University Benefits Section ---
const universityBenefits = {
    universities: [
        "Simplify attendance, administration, and verification in one place.",
        "Triple-layer security (certificate-based ID, biometrics, PIN).",
        "A faster ROI on campus security spend.",
        "A safer, more secure, and modern campus identity.",
    ],
    students: [
        "Secure entry to classes and facilities.",
        "Use ID for campus payments and transit.",
        "Access to digital profiles for networking.",
        "A future-proof identity that stays valid after graduation.",
    ],
};


// ==================================================================
// --- ABOUT SYNC PAGE COMPONENT ---
// ==================================================================

export default function AboutSyncPage() {
  return (
    <div
      className="relative w-full overflow-hidden min-h-screen pt-20 px-4 font-[inter]"
      style={{
        background: '#030C32', // Main background color
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

      {/* Main Content Wrapper - NO max-w-7xl here */}
      <div className="relative z-10 py-10 md:py-20"> 

        {/* -------------------------------------------------- */}
        {/* ## 1. Hero/Introduction Section (Full Width, Content Centered) */}
        {/* -------------------------------------------------- */}
        <motion.div
          className="bg-[#113CFC] p-10 md:p-16 text-center mb-20 space-y-4 max-w-7xl mx-auto rounded-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[inter] text-white">
            About SYNC
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Built for a world where identity, access, and connection work together. More than a smart card, a unified platform that makes everyday interactions faster, smarter, and more secure.
          </p>
        </motion.div>

        {/* Constrained Content Wrapper - Applies max-w-7xl to remaining sections */}
        <div className="max-w-7xl lg:max-w-6xl mx-auto px-6 lg:px-8"> 

            {/* One Card. One Tap. Every Function. (Visibility Fixed) */}
            <motion.section
                className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" 
                initial="visible" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariant}
            >
                {/* Text Content */}
                <motion.div className="text-center lg:text-left" variants={itemVariant}>
                    <h2 className="text-2xl font-bold text-white mb-6">
                        One Card. One Tap. Endless possibilities
                    </h2>
                    <p className="text-lg text-gray-300 mb-4">
                        It’s time to replace plastic with purpose. Transform how you connect, access, and operate with SYNC, the next-generation NFC-enabled platform for the modern world. SYNC is more than a card; it&apos;s your digital passport for life and work.
                    </p>
                    
                    <div className="flex items-center text-white gap-2">
                        <div className="flex items-center justify-center rounded-full text-gray-400 w-8 h-8 bg-[#0166ff]">
                            <FaCreditCard  className="w-5 h-5 text-white " />
                        </div>
                        <span>Physical meets digital identity</span>
                    </div>
                </motion.div>

                {/* Mockup Card Image */}
                <motion.div className="mt-8 lg:mt-0 flex justify-center lg:justify-end" variants={itemVariant}>
                    <div className="inline-block relative">
                        <Image
                            src="/landing/maple-card-horizontal.png" // Mock path based on the image provided
                            alt="SYNC Digital Card Mockup"
                            width={400}
                            height={250}
                            className="rounded-xl shadow-2xl border border-white/10"
                        />
                    </div>
                </motion.div>
            </motion.section>

            <hr className="border-t border-white/10 my-16" />

            {/* -------------------------------------------------- */}
            {/* ## 2. Our Vision Section (Cards now left-aligned) */}
            {/* -------------------------------------------------- */}
            <motion.section
                className="text-center mb-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariant}
            >
                <motion.h2 className="text-3xl font-bold text-white mb-10 font-[inter]" variants={itemVariant}>
                    Our Vision
                </motion.h2>
                <p className="text-lg text-gray-400 max-w-4xl mx-auto mb-12">
                    We believe the future of identity should feel effortless. No plastic clutter. No outdated cards. No manual processes. SYNC brings everything together into a single NFC-enabled solution.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {visionItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={index}
                                className="p-6 rounded-xl border border-[#113CFC]/20 bg-[#08154F]/50 shadow-lg h-full transition-all duration-300 hover:ring-2 hover:ring-[#113CFC] text-left hover:cursor-pointer flex flex-col gap-2" 
                                variants={itemVariant}
                            >
                              <div className="flex items-center justify-center rounded-full text-gray-400 w-12 h-12 bg-[#030C32] mb-4">
                                <IconComponent className="w-6 h-6 text-[#113CFC]" /> 
                              </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-400">{item.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            <hr className="border-t border-white/10 my-16" />

            {/* -------------------------------------------------- */}
            {/* ## 3. What SYNC Does (Core Modules) */}
            {/* -------------------------------------------------- */}
            <motion.section
                className="text-center mb-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariant}
            >
                <motion.h2 className="text-3xl font-bold text-white mb-10" variants={itemVariant}>
                    What SYNC Does
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {coreModules.map((module, index) => {
                        const IconComponent = module.icon;
                        return (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center text-center p-6"
                                variants={itemVariant}
                            >
                                <div className="p-4 rounded-full bg-[#061454] mb-4">
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                                <p className="text-sm text-white max-w-xs">{module.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            {/* <hr className="border-t border-white/10 my-16" /> */}

            {/* -------------------------------------------------- */}
            {/* ## 4. Seamless Networking Section */}
            {/* -------------------------------------------------- */}
            <motion.section
                className="grid grid-cols-1 lg:grid-cols-2 gap-12  mb-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariant}
            >
               
                <motion.div variants={itemVariant}>
                    <Image
                        src="/landing/seamless-networking-about.png" 
                        alt="Seamless Networking Image"
                        width={600}
                        height={400}
                        className="w-full"
                    />
                </motion.div>
                 <motion.div className="space-y-3" variants={itemVariant}>
                    <h2 className="text-2xl font-bold text-[#F3F5FF] leading-tight">
                        Seamless Networking
                    </h2>
                    <p className="text-lg text-gray-300 text-justify">
                        Traditional business cards get lost or ignored. SYNC turns one tap into a complete, trackable exchange. Share your profile instantly, capture leads in real time, and keep your contact list organized.
                    </p>
                    <ul className="space-y-3 pt-3 text-[#E5E7EB]">
                        <li className="flex items-start space-x-3 ">
                            <TiFlash className="w-5 h-5 mt-1 text-[#0066FF] shrink-0" />
                            <span>Instant profile sharing</span>
                        </li>
                        <li className="flex items-start space-x-3 ">
                            <FaChartLine className="w-5 h-5 mt-1 text-[#0066FF] shrink-0" />
                            <span>Real-time lead capture</span>
                        </li>
                        <li className="flex items-start space-x-3 ">
                            <IoIosPeople className="w-5 h-5 mt-1 text-[#0066FF] shrink-0" />
                            <span>Organized contact management</span>
                        </li>
                    </ul>
                </motion.div>
            </motion.section>

           
            <motion.section
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariant}
            >
                <motion.div className="order-1 lg:order-2" variants={itemVariant}>
                    <Image
                        src="/landing/smart-access-verification-about.png" 
                        alt="Smart Access & Verification Image"
                        width={600}
                        height={400}
                         className="w-full"
                    />
                </motion.div>
                <motion.div className="space-y-6 order-2 lg:order-1" variants={itemVariant}>
                    <h2 className="text-2xl font-bold text-white leading-tight">
                        Smart Access & Verification
                    </h2>
                    <p className=" text-[#F3F5FF] text-[18px]">
                        SYNC replaces multiple access cards with one secure tool. Offices, universities, event centers, and restricted areas can all run on the same system. Permissions update instantly.
                    </p>
                    
                    {/* Feature Boxes Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-3 font-[inter]">
                        <div className="p-3 rounded-lg  bg-[#030C32] border border-gray-700">
                            <HiMiniBuildingOffice className="w-6 h-6 text-[#0066FF] mx-start mb-1" />
                            <span className="text-xs text-[#F3F5FF] font-medium">Office Access</span>
                        </div>
                        <div className="p-3 rounded-lg  bg-[#030C32] border border-gray-700">
                            <FaGraduationCap className="w-6 h-6 text-[#0066FF] mx-start mb-1" />
                            <span className="text-xs text-[#F3F5FF] font-medium">Campus Entry</span>
                        </div>
                        <div className="p-3 rounded-lg  bg-[#030C32] border border-gray-700">
                            <FaCalendarCheck className="w-6 h-6 text-[#0066FF] mx-start mb-1" />
                            <span className="text-xs text-[#F3F5FF] font-medium">Event Check-in</span>
                        </div>
                        <div className="p-3 rounded-lg  bg-[#030C32] border border-gray-700">
                            <FaLock className="w-6 h-6 text-[#0066FF] mx-start mb-1" />
                            <span className="text-xs text-[#F3F5FF] font-medium">Secure Areas</span>
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            <hr className="border-t border-white/10 my-16" />

           
            <motion.section
                className="text-center mb-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariant}
            >
                <motion.h2 className="text-4xl font-bold text-white mb-10" variants={itemVariant}>
                    Real Impact Across Industries
                </motion.h2>

                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {impactIndustries.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={index}
                                className="p-6 rounded-xl border border-white/10 bg-[#08154F]/50 shadow-xl h-full"
                                variants={itemVariant}
                            >
                                <IconComponent className={`w-8 h-8 mb-4 mx-auto ${item.color}`} />
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-400">{item.description}</p>
                            </motion.div>
                        );
                    })}
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {impactIndustries.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={index}
                                className="p-6 rounded-xl border border-[#113CFC]/20 bg-[#08154F]/50 shadow-lg h-full transition-all duration-300 hover:ring-2 hover:ring-[#113CFC] text-left hover:cursor-pointer flex flex-col gap-2" 
                                variants={itemVariant}
                            >
                              <div className="flex items-center justify-center rounded-full text-gray-400 w-12 h-12 bg-[#030C32] mb-4">
                                {/* <IconComponent className="w-6 h-6 text-[#113CFC]" />  */}
                                <IconComponent className={`w-8 h-8 mb-4 mx-auto ${item.color}`} />
                              </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-base text-[#F3F5FF] wrap-break-word">{item.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            <hr className="border-t border-white/10 my-16" />

          
            <motion.section
                className="mb-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariant}
            >
                <motion.h2 className="text-4xl font-bold text-white text-center mb-4" variants={itemVariant}>
                    SYNC for Universities: A Smarter Campus
                </motion.h2>
                
                {/* Descriptive Paragraph */}
                <motion.p className="text-lg text-gray-400 text-center max-w-5xl mx-auto mb-10" variants={itemVariant}>
                    The SYNC Campus Card brings attendance, access control, and exam verification together in one place. Students tap to record attendance, enter labs or libraries, or confirm their identity before tests.
                </motion.p>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
                    
                    {/* Universities Benefit Column */}
                    <motion.div variants={itemVariant}>
                        <h3 className="text-2xl font-semibold text-[#F3F5FF] mb-4">
                            Universities benefit from:
                        </h3>
                        <ul className="space-y-3">
                            {universityBenefits.universities.map((benefit, index) => (
                                <li key={index} className="flex items-start space-x-3 text-gray-300">
                                    <IoIosCheckmark className="w-5 h-5 mt-1 text-[#0066FF] shrink-0" />
                                    <span className="text-sm">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Students Benefit Column */}
                    <motion.div variants={itemVariant}>
                        <h3 className="text-2xl font-semibold text-[#F3F5FF] mb-4">
                            Students benefit from:
                        </h3>
                        <ul className="space-y-3">
                            {universityBenefits.students.map((benefit, index) => (
                                <li key={index} className="flex items-start space-x-3 text-gray-300">
                                    <IoIosCheckmark className="w-5 h-5 mt-1 text-[#16A34A] shrink-0" />
                                    <span className="text-sm">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </motion.section>

           
            <motion.section
                className="text-center p-10 rounded-xl bg-[#113CFC] shadow-2xl space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={textVariant}
            >
                <h2 className="text-2xl font-bold text-white">
                    Ready to Transform Your Identity Management?
                </h2>
                <p className="text-lg text-white/90">
                    Join thousands of organizations already using SYNC to streamline their operations and identity management.
                </p>
                {/* <div className="flex-col md:flex justify-center space-x-4 pt-4">
                    <Link href="/demo">
                        <Button 
                            className="bg-white hover:bg-gray-100 text-[#113CFC] h-12 rounded-lg text-lg px-8 transition-all duration-300"
                        >
                            Get Started Today
                        </Button>
                    </Link>
                    <Link href="/learn-more">
                        <Button 
                            className="border border-white/50 hover:border-white text-white h-12 rounded-lg text-lg px-8 transition-all duration-300"
                            style={{ background: 'transparent' }}
                        >
                            Schedule Demo
                        </Button>
                    </Link>
                </div> */}

                <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 pt-4">
                  <Link href="/demo">
                      <Button 
                          className="bg-white hover:bg-gray-100 text-[#113CFC] h-12 rounded-lg text-lg px-8 transition-all duration-300"
                      >
                          Get Started Today
                      </Button>
                  </Link>

                  <Link href="/learn-more">
                      <Button 
                          className="border border-white/50 hover:border-white text-white h-12 rounded-lg text-lg px-8 transition-all duration-300"
                          style={{ background: 'transparent' }}
                      >
                          Schedule Demo
                      </Button>
                  </Link>
              </div>

            </motion.section>
        </div>
      </div>
    </div>
  );
}