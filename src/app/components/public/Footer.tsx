"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
// Import Social Media Icons
import {
    FaInstagram,
    FaLinkedinIn,
    FaFacebookF,
    FaTiktok,
    FaXing // Using FaXing as a placeholder for the 'X' icon
} from 'react-icons/fa';
import Link from 'next/link';

// --- Data Structures ---

const QuickLinks = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Cards', href: '/cards' },
    { title: 'Services', href: '/services/university-solution' },
    { title: 'Contact', href: '/contact' },
    { title: 'Privacy', href: '/privacy' },
];

const ServicesLinks = [
    { title: 'University', href: '/services/university-solution' },
    { title: 'Organization', 'href': '#' },
    
];

const SocialMediaLinks = [
    { icon: FaInstagram, title: 'Instagram', href: 'https://www.instagram.com/buysync' },
    { icon: FaLinkedinIn, title: 'LinkedIn', href: 'https://www.linkedin.com/company/sync-innovation' },
    { icon: FaFacebookF, title: 'Facebook', href: '#' },
    { icon: FaXing, title: 'X', href: 'https://x.com/buysync_' }, 
    { icon: FaTiktok, title: 'Tiktok', href: '#' },
];



const footerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.1 
        },
    },
};

const linkItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

// --- Footer Component ---

export default function Footer() {
    return (
      
        <motion.footer
            className="bg-[#0b0f2c] text-white pt-5 pb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={footerVariants}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                
                <div 
                   
                    className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-6"
                >
                    
                    
                    <div 
                        className="col-span-full md:col-span-1 text-center md:text-left"
                    >
                        <motion.div variants={linkItemVariants} className="mb-4">
                          

                            <Link href="/">
                                 <div className="relative w-[100px] h-10" >
                                    <Image
                                        src="/landing/sync-logo.svg"
                                        fill
                                        alt="Company Logo"
                                        loading="eager"
                                        className="object-contain"
                                    />
                                </div>
                            </Link>
                        </motion.div>
                        
                        <motion.p variants={linkItemVariants} className="text-gray-400 text-sm max-w-xs leading-relaxed mx-auto md:mx-0 text-justify">
                            We&apos;re redefining identity for the connected world. SYNC is an integrated solution that replaces fragmented tools for networking, access control, and identity verification.
                        </motion.p>
                    </div>

                    
                    <div 
                        // Col-span-full on mobile, but md:col-span-2 on desktop
                        // On small screens, this wrapper uses FLEX to force 50/50 on its children
                        className="col-span-full md:col-span-2 flex justify-between"
                    >
                        {/* Column 2: Quick Links */}
                        <div 
                            // ⭐ FIX: w-1/2 on all screens except medium (md), where it uses w-full 
                            // as it inherits the 2-column wrapper space.
                            // We need to ensure the gap doesn't cause issues, so we use w-1/2 and add px-6 for internal padding if necessary.
                            className="w-1/2 md:w-full pr-6"
                        >
                            <motion.h3 variants={linkItemVariants} className="text-lg font-bold uppercase mb-4 text-white">
                                Quick Links
                            </motion.h3>
                            <ul className="space-y-3">
                                {QuickLinks.map((link, index) => (
                                    <motion.li key={index} variants={linkItemVariants}>
                                        <a 
                                            href={link.href} 
                                            className="text-gray-400 hover:text-[#113CFC] transition-colors duration-300 text-sm"
                                        >
                                            {link.title}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Column 3: Services */}
                        <div 
                             // ⭐ FIX: w-1/2 on all screens except medium (md), where it uses w-full
                            className="w-1/2 md:w-full pl-6"
                        >
                            <motion.h3 variants={linkItemVariants} className="text-lg font-bold uppercase mb-4 text-white">
                                Services
                            </motion.h3>
                            <ul className="space-y-3">
                                {ServicesLinks.map((link, index) => (
                                    <motion.li key={index} variants={linkItemVariants}>
                                        <a 
                                            href={link.href} 
                                            className="text-gray-400 hover:text-[#113CFC] transition-colors duration-300 text-sm"
                                        >
                                            {link.title}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>


                   
                    <div 
                        className="col-span-full md:col-span-1"
                    >
                        <motion.h3 variants={linkItemVariants} className="text-lg font-bold uppercase mb-4 text-white">
                            Social Media
                        </motion.h3>
                        <ul className="space-y-3">
                            {SocialMediaLinks.map((link, index) => (
                                <motion.li key={index} variants={linkItemVariants}>
                                    <a 
                                        href={link.href} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center text-gray-400 hover:text-[#113CFC] transition-colors duration-300 text-sm"
                                    >
                                        <link.icon className="w-4 h-4 mr-3" />
                                        {link.title}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>

                <motion.div 
                    className="pt-7 text-center" 
                    variants={linkItemVariants}
                >
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Sync. All rights reserved.
                    </p>
                </motion.div>

            </div>
        </motion.footer>
    );
}