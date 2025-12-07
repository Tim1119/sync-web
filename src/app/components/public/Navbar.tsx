"use client";

import { useState, FC, MouseEventHandler, ReactNode, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { 
  Menu, X, 
  Home, Info, CreditCard, Wrench, User, ArrowLeft,
  LucideIcon
} from "lucide-react"; 

// --- TYPE DEFINITIONS ---

interface NavigationItem {
    title: string;
    url: string;
    icon: LucideIcon;
}

interface ButtonProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

// --- UTILITY COMPONENTS ---

// Mock Button component
const Button: FC<ButtonProps> = ({ children, className = "", style, onClick }) => (
    <button 
        className={`p-2 rounded-lg font-medium transition-all ${className}`} 
        style={style} 
        onClick={onClick}
    >
        {children}
    </button>
);

// --- NAVIGATION DATA ---

const navigationItems: NavigationItem[] = [
  { title: "Home", url: "/", icon: Home },
  { title: "About", url: "/about", icon: Info },
  { title: "Cards", url: "/cards", icon: CreditCard },
  { title: "Services", url: "/services", icon: Wrench },
  { title: "Contact", url: "/contact", icon: User },
];

// --- MAIN COMPONENT: NAVBAR (With Waves Image Included) ---

const Navbar: FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true); // State to track scroll for wave image

  // Effect to manage body scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Handle scroll for wave visibility
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        // Hide image after scrolling past the hero section (e.g., scrollY > 50)
        if (window.scrollY > 50) { 
          setIsImageVisible(false); 
        } else { 
          setIsImageVisible(true); 
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
    }
    
    return () => {
      document.body.classList.remove('no-scroll');
      if (typeof window !== 'undefined') {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [mobileMenuOpen]); 

  return (
    // Navbar base is z-50
    <nav className="bg-[#030C32] font-[inter] fixed top-0 left-0 right-0 z-50 w-full shadow-lg border-b border-b-gray-200/20">
      
      {/* 🌟 1. GLOBAL CENTRALIZED GLOW SYSTEM 🌟 
          z-[55] - Behind the waves and the content.
      */}
     


      {/* 🌊 2. WAVES IMAGE (The Picture) 🌊
          z-[57] - This ensures the waves are on top of the fixed z-50 navbar and z-55 glow.
          The opacity transition helps it fade out smoothly on scroll.
      */}
      {isImageVisible && (
        <div
          className={`
            fixed -top-[120px] -left-[155px] w-[650px] h-[1000px] opacity-40
            sm:h-[1000px] sm:w-[1000px] sm:-top-30 sm:-left-80
            lg:w-[900px] lg:h-[900px] lg:-top-40 lg:-left-70
            2xl:-top-70 2xl:-left-100 2xl:w-[1300px] 2xl:h-[1300px]
            pointer-events-none transition-opacity duration-500
            z-[57]
          `}
        >
          <Image
            src="/landing/waves.svg"
            alt="Decorative background waves"
            width={800}
            height={800}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      )}


      {/* 3. Navbar Content Wrapper (Logo, Links, Button)
          z-[58] - This must be the highest z-index so the links/logo are clickable and visible over the waves.
      */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-[58]">
        <div className="relative flex items-center h-20">
          
          {/* Logo Left */}
          <div className="flex-shrink-0">
            <Link href="/">
                <div className="relative w-[100px] h-10">
                    <Image
                      src="/landing/sync-logo.svg"
                      alt="Company Logo"
                      fill
                      priority 
                      className="object-contain"
                    />
                </div>
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={`text-sm font-medium transition-colors relative group font-[inter] ${
                  pathname === item.url
                    ? "text-[#113CFC]"
                    : "text-white hover:text-[#113CFC]"
                }`}
              >
                {item.title}
                {/* Underline span */}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#113CFC] group-hover:w-full transition-all duration-300 ${
                    pathname === item.url ? "w-full" : ""
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Right Button */}
          <div className="ml-auto hidden lg:flex">
            <Link href="/cards" className="py-2"> 
              <Button style={{ width: "123.03px", height: "45px" }} className=" text-sm bg-[#113CFC]  hover:bg-[#0E33E0]  text-white shadow-lg transition-all duration-300 w-fit ">
                Buy Card
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-auto cursor-pointer">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-[#1A1F4B] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Menu (z-50) */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-screen w-64 bg-[#030C32] shadow-2xl transform transition-transform duration-300 z-50 rounded-l-xl border-l border-[#1A1F4B]
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 space-y-2 h-full flex flex-col pt-24">
          
          {/* Close button */}
          <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 left-6 p-2 rounded-lg text-white hover:bg-[#1A1F4B] transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-6 w-6" />
          </button>

          {navigationItems.map((item) => {
            const Icon = item.icon; 
            const isActive = pathname === item.url; 
            return (
              <Link
                key={item.title}
                href={item.url}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 py-3 px-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "text-[#113CFC] bg-[#113CFC]/10" 
                    : "text-gray-300 hover:text-white hover:bg-[#1A1F4B]" 
                }`}
              >
                {/* Icon */}
                {Icon && (
                    <Icon className={`h-5 w-5 ${isActive ? 'text-[#113CFC]' : 'text-gray-400 group-hover:text-white'}`} />
                )}
                {/* Title */}
                <span className={`text-base font-medium ${isActive ? 'text-[#113CFC]' : 'text-white'}`}>
                    {item.title}
                </span>
              </Link>
            );
          })}
          <div className="mt-auto pt-8">
            <Link href="/cards" onClick={() => setMobileMenuOpen(false)}>
              <Button 
                className="w-full bg-[#113CFC] hover:bg-[#0E33E0] text-white shadow-lg transition-all duration-300 h-12 rounded-lg"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop (z-40) */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 z-40" 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;