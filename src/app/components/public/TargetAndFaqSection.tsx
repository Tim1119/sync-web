"use client";

import Image from "next/image"; 
import React, { useState, useRef } from "react"; 
import { motion, useInView, Variants } from "framer-motion"; // Ensure Variants is imported

// --- Mock Icon Components (Replace with your actual icons) ---
const IconIndividual = () => <div className="text-4xl bg-white p-2 text-sm rounded-full text-black group-hover:text-gray-900 transition-colors duration-300">
    
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30/Users/ajanitimothy/Downloads/svg.svg" viewBox="0 0 24 24" role="img" aria-labelledby="titleFilledUser">
  <title id="titleFilledUser">User</title>
  <path fill="currentColor" d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7 0 .552.448 1 1 1h12c.552 0 1-.448 1-1 0-3.866-3.134-7-7-7z"/>
</svg>

</div>;
const IconBusiness = () => <div className="text-4xl  bg-white w-[50px] h-[50px] flex justify-center text-sm rounded-full group-hover:text-gray-900 transition-colors duration-300">
    <Image alt="" src={"/businesses.svg"} width={"22"} height={"22"}  />
</div>;
const IconUniversity = () => <div className="text-4xl  bg-white w-[50px] h-[50px] flex justify-center text-sm rounded-full group-hover:text-gray-900 transition-colors duration-300">
    <Image alt="" src={"/graduation-cap.svg"} width={"30"} height={"30"}  /> 
</div>;
const IconPlus = ({ isOpen }: { isOpen: boolean }) => (
  <span className="text-2xl transition-transform duration-300">
    {isOpen ? '—' : '+'}
  </span>
);

// --- 1. ACCORDION COMPONENT ---
interface AccordionItemProps {
  title: string;
  // content: string;
   content: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-gray-800/60 transition-colors duration-200 hover:border-[#1F79F2]/40">
      <button
        className="flex justify-between items-center w-full p-5 text-left text-lg font-semibold text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
       <p className="font-medium"> {title}</p>
        <IconPlus isOpen={isOpen} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-white">
          <p>{content}</p>
        </div>
      </motion.div>
    </div>
  );
};

// --- 2. TARGET (WHO IT'S FOR) SECTION DATA & CARD ---
const targetData = [
  {
    icon: IconIndividual,
    title: "Individuals",
    description: "Build your professional identity and share your profile with one tap.",
  },
  {
    icon: IconBusiness,
    title: "Businesses",
    description: "Equip your team with branded digital cards and unified profiles.",
  },
  {
    icon: IconUniversity,
    title: "Universities",
    description: "Modernize student identity and networking with smart digital cards.",
  },
];

// ⭐ FIX APPLIED HERE: Explicitly type itemVariants as Variants
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const TargetCard = ({ icon: Icon, title, description }: (typeof targetData)[0]) => (
  <motion.div
    variants={itemVariants} 
    className="group bg-[#030C32] p-6 rounded-xl border border-white/10 backdrop-blur-sm shadow-xl flex flex-col items-center text-center h-full transition duration-300 
               hover:bg-white/50 hover:border-gray-200 cursor-pointer"
    whileHover={{ y: -5 }}
  >
    <Icon />
    <h3 className="mt-4 text-xl font-bold text-white group-hover:text-white transition-colors duration-300">{title}</h3>
    <p className="mt-2 text-gray-400 group-hover:text-white transition-colors duration-300">{description}</p>
  </motion.div>
);

// --- 3. MAIN COMPONENT (Combines Target and FAQ) ---
export default function TargetAndFaqSection() {
  const faqItems: AccordionItemProps[] = [
    { title: "Who is SYNC designed for?", content:"SYNC is designed for individuals, universities, government agencies, hospitals, private organizations, security agencies, and membership-based communities." },
    { title: "How secure is SYNC?", content:  <> SYNC is fully secure, with <strong>encrypted NFC communication, multi-level access permissions, secure cloud storage, and audit trails with real-time monitoring.</strong></> },
    { title: "Can SYNC integrate with our existing systems?", content: "Yes. SYNC supports seamless integration with ERPs, student portals, HR systems, hospital management systems, and access control hardware." },
    { title: "What happens if a card is lost or stolen?", content: "The card can be instantly deactivated via the user dashboard, and a replacement can be issued immediately." },
    { title: "Are the cards customizable?", content: <>Yes. Choose from <strong>Nova (plastic), Maple (wood)</strong>, or <strong>Auric (steel)</strong>. Custom branding and personalization are available at a <strong> minimum order quantity (MOQ) of 10 cards.</strong></> },
    { title: "How long does corporate implementation take?", content: <>Implementation time depends on the dynamics of the organization; however, the standard deployment, including setup, data capture, card production, and training, is approximately <strong>4 weeks.</strong></> },
  ];

  // Ref for the "Who It's For" section to trigger animation when in view
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Trigger when 30% of the element is in view

  // Container variants for staggered animation
  const containerVariants: Variants = { // ⭐ Explicitly type containerVariants as Variants
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between children animations
      },
    },
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#030C32]">
      
      {/* 1. "WHO IT'S FOR" SECTION (The image background part) */}
      <section className="relative pb-80 pt-20"> 
        
        {/* Background Image Container (fills the section) */}
        <div className="absolute inset-0 z-10 -top-80">
            <Image
                src="/who-is-it-for-bg.svg" 
                alt="Geometric blue background design"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="pointer-events-none"
            />
        </div>
        
        {/* Content Container (z-20 to stay above the image) */}
        <motion.div
            ref={ref} 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="max-w-6xl mx-auto px-6 lg:px-8 relative z-20"
        >
          
          <header className="text-center mb-16">
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Who It&apos;s For
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-2 text-gray-300 text-lg">
              Designed for modern professionals, teams, and institutions
            </motion.p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {targetData.map((item, index) => (
              <TargetCard key={index} {...item} />
            ))}
          </div>

        </motion.div>
      </section>
      
      {/* 2. FAQ SECTION */}
      <section className="bg-[#030C32] -mt-64 pt-10 pb-20"> 
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-20">
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-12">
            Frequently asked questions
          </h2>

          <div className="mt-8">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} {...item} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}