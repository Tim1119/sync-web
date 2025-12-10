"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const textVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
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


const networkingFeatures = [
    { title: "Share Instantly", text: "One tap to exchange contact details, portfolio, and social links.", icon: "🔗" },
    { title: "Track & Follow-Up", text: "Get real-time lead generation and analytics, and sync data to your CRM.", icon: "📈" },
    { title: "Two-Way Exchange", text: "Facilitate instant, mutual contact sharing that's always up-to-date.", icon: "🔄" },
];

const accessFeatures = [
    { title: "Universal Access Control", text: "Instantly unlock doors, enter offices, or verify entry at events with an effortless tap.", icon: "🔑" },
    { title: "Digital Verification", text: "Secure, real-time identity verification for exams, restricted areas, or clocking in/out.", icon: "✅" },
    { title: "Simplified Management", text: "Streamline employee, member, or student tracking and access rights digitally.", icon: "⚙️" },
];


const UNSPLASH_IMAGE_URLS = {
    UNIFIED_IDENTITY: "/landing/honest-pricing.svg",
    NETWORKING_IMAGE: "/landing/contactless-card.jpg",
    ACCESS_CONTROL_IMAGE: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
};




export default function AboutUsPage() {
  return (
    <div
      className="relative w-full overflow-hidden min-h-screen p-10"
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-white/5 blur-[220px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-32">

       
        <motion.section
          className="text-center mb-24 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariant}
        >
          <p className="text-lg font-semibold text-[#113CFC] uppercase tracking-widest">
            The Future of Unified Identity
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold font-[abhaya] text-white leading-tight">
            SYNC: <span className="text-[#113CFC]">One Card.</span> Endless Possibilities.
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-[inter]">
            It’s time to replace plastic with purpose. Transform how you connect, access, and operate with <b>SYNC</b>, the next-generation NFC-enabled platform for the modern world.
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
             SYNC is more than a card; it&apos;s your digital passport for life and work.
          </p>
          
          <motion.div className="pt-8 flex justify-center" variants={imageVariant}>
            <Image
                src={UNSPLASH_IMAGE_URLS.UNIFIED_IDENTITY}
                alt="SYNC unified identity concept showing a card and digital connection"
                width={400}
                height={450}
                className="rounded-xl shadow-2xl object-cover border border-[#113CFC]/20"
            />
          </motion.div>
        </motion.section>

        <hr className="border-t border-white/10 my-16" />

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Text Content */}
            <motion.div
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={textVariant}
            >
                <h2 className="text-4xl font-bold text-white">Seamless Networking & Lead Capture</h2>
                <p className="text-xl text-[#113CFC] font-semibold">
                    We’re redefining identity for the connected world.
                </p>
                <p className="text-gray-300">
                    Professionals hand out over a million business cards in a lifetime, and most are wasted. SYNC is an integrated solution that replaces fragmented tools for networking.
                </p>

                <motion.div
                    className="space-y-4 pt-4"
                    variants={containerVariant}
                >
                    {networkingFeatures.map((feature, index) => (
                        <motion.div key={index} className="flex items-start space-x-3" variants={itemVariant}>
                            <span className="text-2xl text-[#113CFC] min-w-[24px]">{feature.icon}</span>
                            <div>
                                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                                <p className="text-sm text-gray-400">{feature.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
                className="lg:pl-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={imageVariant}
            >
                <Image
                    src={UNSPLASH_IMAGE_URLS.NETWORKING_IMAGE}
                    alt="Seamless business card exchange via NFC tap"
                    width={600}
                    height={400}
                    className="rounded-xl shadow-2xl object-cover border border-[#113CFC]/20"
                />
            </motion.div>
        </div>

        <hr className="border-t border-white/10 my-16" />

      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Image (Order swapped for visual diversity) */}
            <motion.div
                className="lg:pr-8 hidden lg:block"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={imageVariant}
            >
                <Image
                    src={UNSPLASH_IMAGE_URLS.ACCESS_CONTROL_IMAGE}
                    alt="Contactless access control using a smart card"
                    width={600}
                    height={400}
                    className="rounded-xl shadow-2xl object-cover border border-[#113CFC]/20"
                />
            </motion.div>

            {/* Text Content */}
            <motion.div
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={textVariant}
            >
                <h2 className="text-4xl font-bold text-white">Smart Access & Verification</h2>
                <p className="text-xl text-[#113CFC] font-semibold">
                    Move through your world effortlessly.
                </p>
                <p className="text-gray-300">
                    SYNC provides secure, contactless access and identity verification for any environment, replacing traditional key cards and paper IDs.
                </p>

                <motion.div
                    className="space-y-4 pt-4"
                    variants={containerVariant}
                >
                    {accessFeatures.map((feature, index) => (
                        <motion.div key={index} className="flex items-start space-x-3" variants={itemVariant}>
                            <span className="text-2xl text-[#113CFC] min-w-[24px]">{feature.icon}</span>
                            <div>
                                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                                <p className="text-sm text-gray-400">{feature.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

             {/* Image (Visible on smaller screens) */}
             <motion.div
                className="lg:pr-8 lg:hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={imageVariant}
            >
                <Image
                    src={UNSPLASH_IMAGE_URLS.ACCESS_CONTROL_IMAGE}
                    alt="Contactless access control using a smart card"
                    width={600}
                    height={400}
                    className="rounded-xl shadow-2xl object-cover border border-[#113CFC]/20"
                />
            </motion.div>
        </div>

        <hr className="border-t border-white/10 my-16" />

       
        <motion.section
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariant}
        >
            <motion.h2 className="text-4xl sm:text-5xl font-bold text-white mb-16" variants={itemVariant}>
                Real-World Transformation
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: "For Individuals", text: "Reinvent networking with a smart business card that captures leads and shares your full profile in a single tap.", icon: "👤" },
                    { title: "For Businesses & Teams", text: "Streamlined employee management for attendance, clocking in/out, and secure access to all restricted areas.", icon: "🏢" },
                    { title: "For Events & Conferences", text: "Instant registration, access control, and trackable lead generation for organizers.", icon: "🎫" },
                    { title: "For Institutions", text: "Simplify campus life by consolidating ID, attendance tracking, and access to all facilities onto one smart card.", icon: "🎓" },
                ].map((scenario, index) => (
                    <motion.div
                        key={index}
                        className="p-6 rounded-xl border border-white/10 bg-[#08154F]/50 shadow-2xl
                                   ring-1 ring-[#113CFC]/30 transition-all duration-300 hover:ring-[#113CFC]/60 hover:shadow-[0_0_30px_rgba(17,60,252,0.3)]
                                   flex flex-col items-center text-center space-y-3 h-full"
                        variants={itemVariant}
                        whileHover={{ y: -5 }}
                    >
                        <span className="text-4xl mb-2 text-[#113CFC]">{scenario.icon}</span>
                        <h3 className="text-xl font-semibold text-white">{scenario.title}</h3>
                        <p className="text-sm text-gray-300">{scenario.text}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
      </div>
    </div>
  );
}