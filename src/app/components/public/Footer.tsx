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
    { title: 'Home', href: '#' },
    { title: 'About', href: '#' },
    { title: 'Cards', href: '#' },
    { title: 'Services', href: '#' },
    { title: 'Contact', href: '#' },
];

const ServicesLinks = [
    { title: 'Smart Scheduling', href: '#' },
    { title: 'Client Management', 'href': '#' },
    { title: 'Secure Payments', href: '#' },
    { title: 'Team Sync', href: '#' },
    { title: 'Business Analytics', href: '#' },
];

const SocialMediaLinks = [
    { icon: FaInstagram, title: 'Instagram', href: '#' },
    { icon: FaLinkedinIn, title: 'LinkedIn', href: '#' },
    { icon: FaFacebookF, title: 'Facebook', href: '#' },
    { icon: FaXing, title: 'X', href: '#' }, // FaXing is often used as a stand-in for the 'X' (Twitter) logo
    { icon: FaTiktok, title: 'Tiktok', href: '#' },
];

// --- Animation Variants ---

const footerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.1 // Stagger links slightly for effect
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
        // Apply the dark background color found in your screenshots
        <motion.footer
            className="bg-[#0b0f2c] text-white pt-20 pb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={footerVariants}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* Top Section: Logo, Description, and Link Columns */}
                <div 
                    // ⭐ CLEANED UP GRID: 1 column default, 4 columns on desktop (md:)
                    // The mobile layout is controlled by the children's flex/grid classes
                    className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16"
                >
                    
                    {/* Column 1: Logo and Description (Full width, centered on mobile) */}
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
                        
                        <motion.p variants={linkItemVariants} className="text-gray-400 text-sm max-w-xs leading-relaxed mx-auto md:mx-0">
                            We build readymade websites, mobile applications, and elaborate online business services.
                        </motion.p>
                    </div>

                    {/* Quick Links & Services Wrapper (FOR 50/50 MOBILE SPLIT) */}
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


                    {/* Column 4: Social Media (Full width on mobile, left-aligned) */}
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

                {/* Bottom Section: Copyright */}
                <motion.div 
                    className="pt-8 text-center" 
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