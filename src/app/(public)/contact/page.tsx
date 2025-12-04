"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react'; 
import { motion, Variants } from "framer-motion";
import { Mail, Phone, MessageSquare, AlertTriangle } from 'lucide-react'; 

// ==================================================================
// --- Mock Button Component (Reused for running the code) ---
// ==================================================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Button = ({ children, className, style, disabled, ...props }: any) => (
  <button
    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
    style={{ ...style, backgroundColor: disabled ? '#113CFC' : '#113CFC', color: 'white' }} 
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);
// --------------------------------------------------------------------------

// --- Helper component for error display (MOVED OUTSIDE RENDER) ---
const ErrorMessage = ({ message }: { message: string }) => (
    <p className="mt-1 flex items-center text-sm text-red-400">
        <AlertTriangle className="w-4 h-4 mr-1" />
        {message}
    </p>
);

// --- Animation Variants (Reused from previous response) ---
const textVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const perpetualGlowVariant: Variants = {
  animate: {
    opacity: [0.3, 0.5, 0.3],
    scale: [0.9, 1.1, 0.9],
    transition: {
      duration: 15,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const CONTACT_IMAGE_URL = "/landing/contact-us.png"; 

// --- Configurable Image Dimensions ---
const IMAGE_HEIGHT_PX = '600px'; 
const IMAGE_WIDTH_DEFAULT = 600; 
const IMAGE_HEIGHT_DEFAULT = 600; 


// ==================================================================
// --- CONTACT US PAGE COMPONENT (Phone Number Field Added) ---
// ==================================================================

export default function ContactUsPage() {
    
    // Define the single background color
    const unifiedBackground = '#030C32'; 
    // Define the form field background color
    const formInputBackground = '#F3F5FF33'; 

    // State for form data (Phone field added)
    const [formData, setFormData] = useState({
        name: '',
        phone: '', // Added phone state
        email: '',
        message: '',
    });

    // State for validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error as the user types
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    // Validation function (Phone check added)
    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.phone) newErrors.phone = 'Phone Number is required.'; // Phone validation
        // Simple regex check for 7-15 digits (common international range)
        else if (!/^\+?[0-9]{7,15}$/.test(formData.phone.replace(/\s+/g, ''))) newErrors.phone = 'Phone number is invalid.';
        
        if (!formData.email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid.';
        
        if (!formData.message) newErrors.message = 'Message is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validate()) {
            console.log('Form data:', formData);
            // --- Simulate successful submission ---
            setIsSubmitted(true);
            setFormData({ name: '', phone: '', email: '', message: '' }); // Clear form
            setTimeout(() => setIsSubmitted(false), 5000); // Hide success message after 5 seconds
        } else {
            console.log('Validation failed');
        }
    };


  return (
    <div
      className="relative w-full overflow-hidden min-h-screen"
      style={{
        background: unifiedBackground,
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-10 "> {/* Added px-6 lg:px-8 back for padding */}

        {/* --- Contact Content Container --- */}
        <div 
          className="overflow-hidden lg:grid lg:grid-cols-2 lg:rounded-2xl"
          style={{ 
            background: unifiedBackground,
          }}
        >
            
            {/* Left Column: Contact Form & Support Details */}
            <div className="p-8 sm:p-12 lg:p-16 space-y-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={textVariant}
                    className="space-y-2"
                >
                    <h2 className="text-3xl font-bold text-white">Contact Us</h2>
                    <p className="text-gray-300">
                        We&apos;re here to help. Reach out with any questions or feedback.
                    </p>
                </motion.div>

                {/* Success Message */}
                {isSubmitted && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-900/50 border border-green-400 rounded-lg text-green-200"
                    >
                        Thank you! Your message has been sent successfully.
                    </motion.div>
                )}


                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <motion.div variants={textVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.1 }}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-200">Name</label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className={`block w-full px-4 py-3 rounded-lg text-white focus:ring-[#113CFC] focus:border-[#113CFC] outline-none placeholder-gray-500 transition-colors duration-200 ${
                                    errors.name ? 'border-red-500 border' : 'border-transparent'
                                }`}
                                style={{ background: formInputBackground }} 
                            />
                        </div>
                        {errors.name && <ErrorMessage message={errors.name} />}
                    </motion.div>

                    {/* PHONE NUMBER FIELD (NEW) */}
                    <motion.div variants={textVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.2 }}>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-200">Phone Number</label>
                        <div className="mt-1">
                            <input
                                type="tel" // Use type="tel" for phone numbers
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                className={`block w-full px-4 py-3 rounded-lg text-white focus:ring-[#113CFC] focus:border-[#113CFC] outline-none placeholder-gray-500 transition-colors duration-200 ${
                                    errors.phone ? 'border-red-500 border' : 'border-transparent'
                                }`}
                                style={{ background: formInputBackground }}
                            />
                        </div>
                        {errors.phone && <ErrorMessage message={errors.phone} />}
                    </motion.div>
                    
                    {/* Email */}
                    <motion.div variants={textVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.3 }}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email</label>
                        <div className="mt-1">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={`block w-full px-4 py-3 rounded-lg text-white focus:ring-[#113CFC] focus:border-[#113CFC] outline-none placeholder-gray-500 transition-colors duration-200 ${
                                    errors.email ? 'border-red-500 border' : 'border-transparent'
                                }`}
                                style={{ background: formInputBackground }}
                            />
                        </div>
                        {errors.email && <ErrorMessage message={errors.email} />}
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={textVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.4 }}>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-200">Message</label>
                        <div className="mt-1">
                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your message..."
                                className={`block w-full px-4 py-3 rounded-lg text-white focus:ring-[#113CFC] focus:border-[#113CFC] outline-none placeholder-gray-500 transition-colors duration-200 resize-none ${
                                    errors.message ? 'border-red-500 border' : 'border-transparent'
                                }`}
                                style={{ background: formInputBackground }}
                            ></textarea>
                        </div>
                        {errors.message && <ErrorMessage message={errors.message} />}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={textVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.5 }}>
                        <Button type="submit" className="w-full">
                            Get in Touch
                        </Button>
                    </motion.div>
                </form>

                {/* University Admin Support Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={textVariant}
                    transition={{ delay: 0.6 }}
                    className="pt-6 space-y-4"
                >
                    <h3 className="text-xl font-semibold text-white">Sync Admin Support</h3>
                    
                    <div className="flex items-center space-x-3">
                        <Phone className="w-6 h-6 text-[#113CFC]" />
                        <div>
                            <p className="text-sm font-medium text-gray-400">Phone</p>
                            <Link href="/" className="text-white hover:text-[#113CFC] transition-colors duration-200">
                                +234 81 515 70 457
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Mail className="w-6 h-6 text-[#113CFC]" />
                        <div>
                            <p className="text-sm font-medium text-gray-400">Email</p>
                            <Link href="mailto:info@buysync.co" className="text-white hover:text-[#113CFC] transition-colors duration-200">
                                info@buysync.co
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Right Column: Image (Fixed Height and Direct Control) */}
            <div 
                className="hidden lg:flex justify-center items-center overflow-hidden rounded-r-2xl"
                style={{ height: IMAGE_HEIGHT_PX }}
            >
                <div className="relative w-full h-full flex justify-center items-center p-8"> 
                    <Image
                        src={CONTACT_IMAGE_URL}
                        alt="Customer support team assisting clients"
                        width={IMAGE_WIDTH_DEFAULT} 
                        height={IMAGE_HEIGHT_DEFAULT} 
                        objectFit="contain" 
                        className="rounded-xl w-full h-full object-contain" 
                    />
                    
                    {/* The small 'Contact Us' card overlay from the screenshot */}
                    <div className="absolute top-[30%] right-[30%] p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                        <p className="text-white font-bold text-sm">Contact Us</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}