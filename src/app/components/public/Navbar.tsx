"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import colors from "@/styles/colors";


const navigationItems = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
  { title: "Cards", url: "/cards" },
  { title: "Services", url: "/services" },
  { title: "Contact", url: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#030C32] font-[inter] ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative flex items-center h-20">
          {/* Logo Left */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/sync-logo.webp"
                className="object-contain"
                alt="Company Logo"
                width={100}
                height={40}
              />
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
                    : "text-white hover:[#030C32]"
                }`}
              >
                {item.title}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                    pathname === item.url ? "w-full" : ""
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Right Button */}
          <div className="ml-auto hidden lg:flex">
            <Link href="/contact" className="py-2">
              <Button style={{ width: "103.03px", height: "45px" }} className=" bg-[#113CFC]  hover:bg-[#0E33E0]  text-white shadow-lg transition-all duration-300 ">
                Get Started
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

      {/* Mobile Slide-in Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="px-6 py-8 space-y-4 h-full flex flex-col">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-base font-medium ${
                pathname === item.url ? "text-cyan-600" : "text-slate-600 hover:text-cyan-600"
              }`}
            >
              {item.title}
            </Link>
          ))}
          <div className="mt-auto">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 mt-4">
                Start Your Project
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}
