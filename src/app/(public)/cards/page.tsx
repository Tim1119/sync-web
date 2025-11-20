"use client";

import React, { useState } from 'react';
import { 
    Wifi, 
    Minus, 
    Plus, 
    CreditCard, 
    ArrowLeft,
    RotateCw, // Icon for the flip button
} from 'lucide-react';
import Image from 'next/image';

// --- TypeScript Interfaces ---
interface CardTemplate {
    id: number;
    name: string;
    price: number;
    theme: string;
    color: string;
    tagline: string;
    description: string;
    features: string[];
}

interface ContactDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryMethod: 'single' | 'multiple';
    recipientEmails: string[];
}

// --- Configuration Data ---
const CARD_TEMPLATES: CardTemplate[] = [
    { 
        id: 1, 
        name: 'Nova', 
        price: 30000, 
        theme: 'bg-blue-600', 
        color: '#2563EB', 
        tagline: 'Sleek. Modern. High-performance.',
        description: 'The {name} Card delivers advanced smart identity technology in a refined, durable plastic design. Perfect for everyday use with a premium feel.',
        features: ['Smooth, lightweight finish engineered for daily carry', 'NFC-enabled for instant identity verification and smart access', 'Resistant to bending, wear, and environmental exposure','Customizable surface for institutional branding'] 
    },
    { 
        id: 2, 
        name: 'Maple', 
        price: 40000, 
        theme: 'bg-[#E3CAA5]', 
        color: '#D4B99F', 
        tagline: 'Natural. Sustainable. Unique.',
        description: 'Nature meets technology. The {name} Card is crafted from polished premium wood, delivering a warm, sophisticated aesthetic fused with modern smart identity capabilities.',
        features: ['Hand-crafted wooden body with a refined natural texture', 'Embedded NFC chip for seamless smart interactions', 'Eco-friendly, sustainable material choice','Each card carries a unique natural grain pattern'] 
    },
    { 
        id: 3, 
        name: 'Auric', 
        price: 50000, 
        theme: 'bg-neutral-900', 
        color: '#171717', 
        tagline: 'Engineered prestige.',
        description: 'The {name} Card is built from precision-cut steel, offering unmatched luxury, durability, and presence. A statement piece for those who value excellence.',
        features: ['Premium stainless-steel construction with a polished metallic finish', 'Ultra-durable, scratch-resistant, and prestige-grade', 'High-performance NFC core for instant authentication','Executive feel that commands attention'] 
    },
];

// --- Mock Card Back Component ---
const MockCardBack = ({ template }: { template: CardTemplate }) => {
    // Standard placeholder QR code image (using a public domain example for demonstration)
    const QR_CODE_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg';

    return (
        <div 
            className="absolute inset-0 w-full aspect-[1/1.58] rounded-xl overflow-hidden shadow-2xl backface-hidden "
            style={{
                background: template.theme,
                backgroundImage: `linear-gradient(135deg, ${template.color}, ${template.color}EE)`,
            }}
        >
            <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-between text-white " >
                
                {/* 1. Magnetic Stripe Area (Top) */}
                <div className="w-full h-8 md:h-10 bg-neutral-800/80 mt-2 rounded-sm" />

                <div className="flex-grow flex flex-col justify-between">
                    
                    {/* 2. QR Code Image (Top Right) */}
                    <div className="flex justify-end pt-3">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded flex items-center justify-center p-1 shadow-md">
                            <Image
                                src={QR_CODE_IMAGE_URL}
                                alt="QR Code"
                                width={64} // Set size to match container
                                height={64}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Empty space in middle */}
                    <div className="flex-grow"></div> 

                    {/* 3. Sync Logo (Bottom Left) */}
                    <div className="flex items-end justify-between pb-1">
                        <div className="flex items-center gap-1 opacity-90">
                            <div className="relative w-[18px] h-[18px]" >
                                <Image
                                    src="/landing/sync-shape.svg"
                                    fill
                                    alt="Company Logo"
                                    loading="eager"
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-sm tracking-widest">Sync</span>
                        </div>

                        {/* Security Text (Bottom Right) */}
                        <div className="font-mono text-[8px] tracking-wide text-gray-400 opacity-70">
                            Digital Identity | SYNC-NET
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Mock Card Front/Flip Container Component ---
const MockCard = ({ template, isSelected, isFlipped }: { template: CardTemplate, isSelected?: boolean, isFlipped?: boolean }) => {
    return (
        // Flip Container
        <div 
            className={`relative w-full aspect-[1/1.58] rounded-xl transition-all duration-700 preserve-3d
            ${isFlipped ? 'rotate-y-180' : ''}
            ${isSelected ? 'ring-2 ring-white/50' : 'opacity-90 hover:opacity-100'}`}
        >
            {/* Card Front (Backface Hidden) */}
            <div 
                className="absolute inset-0 w-full aspect-[1/1.58] rounded-xl overflow-hidden shadow-2xl backface-hidden"
                style={{
                    background: template.theme,
                    backgroundImage: `linear-gradient(135deg, ${template.color}, ${template.color}EE)`,
                }}
            >
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.8),transparent)]" />
                
                <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-between text-white">
                     {/* Logo Vertical */}
                     <div className="flex-grow flex items-center justify-center gap-2 rotate-90 opacity-90">
                         <div className="relative w-[30px] h-[30px]" >
                                <Image
                                    src="/landing/sync-shape.svg"
                                    fill
                                    alt="Company Logo"
                                    loading="eager"
                                    className="object-contain"
                                />
                            </div>
                        
                       
                        <span className="font-bold text-xl tracking-widest">Sync</span>
                    </div>

                    {/* Bottom Details */}
                    <div className="flex justify-end">
                        <Wifi className="w-5 h-5 rotate-90 opacity-80" />
                    </div>
                </div>
            </div>

            {/* Card Back (Rotated 180deg) */}
            <div className="absolute inset-0 rotate-y-180 backface-hidden">
                <MockCardBack template={template} />
            </div>
        </div>
    );
};

// --- Components ---

const ProgressBar = ({ step }: { step: number }) => (
    <div className="w-full max-w-md mb-8 px-4">
        <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
            <span>Step {step} of 3</span>
        </div>
        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div 
                className="h-full bg-blue-600 transition-all duration-500 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
            />
        </div>
    </div>
);

const OrderSummary = ({ cart, total }: { cart: Record<number, number>, total: number }) => {
    return (
        <div className="bg-transparent md:pl-8 pt-8 md:pt-0">
            <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6 border-b border-gray-800 pb-6">
                {CARD_TEMPLATES.map(card => {
                    const qty = cart[card.id] || 0;
                    if (qty === 0 && card.id !== 1) return null;
                    
                    return (
                        <div key={card.id} className="flex justify-between text-sm">
                            <div className="text-white font-medium">
                                {card.name} 
                                <span className={`text-xs block ${qty > 0 ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {qty} card{qty !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <div className={`${qty > 0 ? 'text-white' : 'text-gray-600'}`}>
                                {qty > 0 ? `₦${(card.price * qty).toLocaleString()}` : '₦0'}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400"><span>Fee</span><span>₦0</span></div>
                <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>₦{total.toLocaleString()}</span></div>
                <div className="flex justify-between text-white font-bold text-lg pt-4 border-t border-gray-800">
                    <span>Total</span><span>₦{total.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};

// --- Main Form Component ---
export default function CardForm() {
    const [step, setStep] = useState(1);
    const [cart, setCart] = useState<Record<number, number>>({ 1: 1, 2: 0, 3: 0 });
    const [expandedCardId, setExpandedCardId] = useState<number>(1); 
    // NEW STATE: Control the flip animation for Stage 2
    const [isFlipped, setIsFlipped] = useState(false); 

    const [contact, setContact] = useState<ContactDetails>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        deliveryMethod: 'single',
        recipientEmails: []
    });

    const totalQuantity = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalAmount = CARD_TEMPLATES.reduce((sum, card) => sum + (card.price * (cart[card.id] || 0)), 0);

    const updateQuantity = (id: number, delta: number, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        
        // Ensure card details are expanded when quantity is changed
        setExpandedCardId(id); 

        setCart(prev => {
            const currentQty = prev[id] || 0;
            const newQty = Math.max(0, currentQty + delta);
            const newCart = { ...prev, [id]: newQty };
            const newTotalQuantity = Object.values(newCart).reduce((a, b) => a + b, 0);

            setContact(prevContact => {
                const currentEmails = prevContact.recipientEmails;
                let newEmails = [...currentEmails];

                if (newTotalQuantity > currentEmails.length) {
                    const diff = newTotalQuantity - currentEmails.length;
                    newEmails = [...newEmails, ...new Array(diff).fill('')];
                } else if (newTotalQuantity < currentEmails.length) {
                    newEmails = newEmails.slice(0, newTotalQuantity);
                }

                return { ...prevContact, recipientEmails: newEmails };
            });

            return newCart;
        });
    };

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact(prev => ({ ...prev, [name]: value }));
    };

    const handleRecipientEmailChange = (index: number, value: string) => {
        const newEmails = [...contact.recipientEmails];
        newEmails[index] = value;
        setContact(prev => ({ ...prev, recipientEmails: newEmails }));
    };

    // --- Stage 1: Choose Card ---
    const renderStage1 = () => (
        <div className="animate-fadeIn">
            {/* HEADER: Centered */}
            <div className="text-center mb-8 md:mb-10 px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Choose Your Card</h1>
                <p className="text-gray-400 max-w-xl mx-auto">Pick a style that fits your personality. You can customize your details next.</p>
            </div>

             {/* VISUAL ROW: 
                - Mobile: Horizontal Scroll
                - Desktop: Flex + Justify Center + Gap (Tightly packed)
             */}
             <div className="relative mb-8">
                 <div 
                    className="flex overflow-x-auto snap-x snap-mandatory md:flex md:justify-center md:flex-wrap md:gap-6 px-4 no-scrollbar pb-4 md:pb-0"
                    style={{ maskImage: 'linear-gradient(to right, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)' }}
                >
                    {CARD_TEMPLATES.map(template => (
                        <div 
                            key={template.id} 
                            className={`
                                flex-none w-[42%] md:w-64 snap-start cursor-pointer transition-all duration-300
                                bg-[#0B1739] rounded-2xl p-4 border flex flex-col items-center justify-between group
                                ${expandedCardId === template.id ? 'border-blue-500 shadow-[0_0_30px_-10px_rgba(37,99,235,0.3)]' : 'border-white/5 hover:border-white/20'}
                            `}
                            onClick={() => setExpandedCardId(template.id)}
                        >
                            <div className="w-full max-w-[160px] mb-4">
                                {/* Use MockCard in Stage 1, without flip */}
                                <MockCard template={template} isSelected={expandedCardId === template.id} isFlipped={false} />
                            </div>
                            <span className={`font-bold text-sm md:text-base ${expandedCardId === template.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                {template.name}
                            </span>
                        </div>
                    ))}
                    <div className="flex-none w-4 md:hidden"></div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#030C32] to-transparent pointer-events-none md:hidden" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 px-4">
                {/* Left Column: Selection List with Accordion */}
                <div className="lg:col-span-8 space-y-4">
                    
                    {CARD_TEMPLATES.map(template => {
                        const isExpanded = expandedCardId === template.id;
                        return (
                            <div 
                                key={template.id} 
                                onClick={() => setExpandedCardId(template.id)}
                                className={`cursor-pointer rounded-xl transition-all duration-300 border 
                                ${isExpanded 
                                    ? 'bg-[#0B1739] border-blue-500/50' 
                                    : 'bg-transparent border-transparent hover:bg-white/5'}`}
                            >
                                <div className="flex flex-col md:flex-row justify-between p-4 items-center gap-4">
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className={`w-10 h-10 rounded-full ${template.theme} flex items-center justify-center text-white font-bold shadow-lg`}>
                                            {template.name[0]}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg">{template.name}</h3>
                                            <p className="text-blue-400 font-mono text-sm">₦{template.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center bg-gray-900 rounded-full border border-gray-700 p-1 ml-auto">
                                        <button onClick={(e) => updateQuantity(template.id, -1, e)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-white">
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-8 text-center text-white font-medium">{cart[template.id] || 0}</span>
                                        <button onClick={(e) => updateQuantity(template.id, 1, e)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-white">
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden px-4 md:pl-20 md:pr-6">
                                        <p className="text-white font-semibold mb-2 text-sm">{template.tagline}</p>
                                        {/* <p className="text-white text-sm mb-3 leading-relaxed">{template.description}</p> */}
                                        <p className="text-white text-sm mb-3 leading-relaxed">
                                            {template.description.split('{name}').map((part, idx, arr) => (
                                                <React.Fragment key={idx}>
                                                {part}
                                                {idx !== arr.length - 1 && (
                                                    <span className="text-blue-400 font-semibold">{template.name}</span>
                                                )}
                                                </React.Fragment>
                                            ))}
                                        </p>

                                        <ul className="space-y-1">
                                            {template.features.map((f, i) => (
                                                <li key={i} className="flex items-center gap-2 text-xs text-white">
                                                    <div className="w-1 h-1 rounded-full bg-blue-500" /> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right Column: Summary */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-8 space-y-6">
                        <OrderSummary cart={cart} total={totalAmount} />
                        <button 
                            onClick={() => setStep(s => s + 1)}
                            disabled={totalAmount === 0}
                            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all
                                ${totalAmount > 0 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/20' 
                                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'}
                            `}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // --- Stage 2: Details ---
    const renderStage2 = () => {
        
        // --- LOGIC TO GENERATE DESCRIPTIVE LABELS ---
        const recipientLabels: string[] = [];
        const orderedCardIds = Object.keys(cart).map(Number).sort((a, b) => a - b);
        
        for (const id of orderedCardIds) {
            const qty = cart[id] || 0;
            const template = CARD_TEMPLATES.find(t => t.id === id);

            if (qty > 0 && template) {
                for (let i = 1; i <= qty; i++) {
                    recipientLabels.push(`${template.name} Card #${i}`);
                }
            }
        }
        // ---------------------------------------------

        return (
            <div className="animate-fadeIn">
                {/* HEADER: Centered */}
                <div className="text-center mb-8 md:mb-10 px-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Card Customization</h1>
                    <p className="text-gray-400 max-w-xl mx-auto">Enter details for your cards below.</p>
                </div>

                 {/* Mock Cards Scroll - Centered on Desktop */}
                 <div className="mb-10 px-4 relative">
                     <h2 className="text-white text-center text-sm uppercase tracking-wider text-gray-500 mb-4">Selected Cards</h2>
                     
                     <div className="flex justify-center mb-6">
                        <button
                            onClick={() => setIsFlipped(f => !f)}
                            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition p-2 rounded-full border border-blue-600/50 hover:bg-blue-900/20"
                        >
                            <RotateCw size={14} className={isFlipped ? 'animate-spin-reverse' : ''}/> 
                            {isFlipped ? 'Show Front' : 'Show Back'}
                        </button>
                     </div>

                     <div 
                        className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 no-scrollbar md:justify-center"
                        style={{ maskImage: 'linear-gradient(to right, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)' }}
                     >
                        {Object.entries(cart).map(([id, qty]) => {
                            if (qty === 0) return null;
                            const template = CARD_TEMPLATES.find(t => t.id === Number(id))!;
                            return (
                                 <div key={id} className="flex-none w-[40%] md:w-[200px] snap-center bg-[#0B1739] rounded-xl p-4 border border-white/10 flex flex-col items-center">
                                    <div className="w-full mb-3 relative">
                                        {/* Pass isFlipped state to MockCard */}
                                        <MockCard template={template} isFlipped={isFlipped} /> 
                                        <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#0B1739]">
                                            {qty}
                                        </div>
                                    </div>
                                    <span className="text-gray-300 text-sm font-medium">{template.name}</span>
                                </div>
                            );
                        })}
                        <div className="flex-none w-4 md:hidden"></div>
                     </div>
                 </div>

                {/* Main Grid: Form (Left) and Summary (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 px-4">
                    
                    {/* Left Column: Form Inputs */}
                    <div className="lg:col-span-6">
                        <div className="space-y-6">
                            {/* Stacked Inputs (Vertical) */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-400 uppercase">First name</label>
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        value={contact.firstName} 
                                        onChange={handleContactChange} 
                                        placeholder="First name" 
                                        className="w-full bg-[#6D7289] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition placeholder-gray-300" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-400 uppercase">Last name</label>
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        value={contact.lastName} 
                                        onChange={handleContactChange} 
                                        placeholder="Last name" 
                                        className="w-full bg-[#6D7289] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition placeholder-gray-300" 
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs text-gray-400 uppercase">Your Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={contact.email} 
                                    onChange={handleContactChange} 
                                    placeholder="buyer@example.com" 
                                    className="w-full bg-[#6D7289] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition placeholder-gray-300" 
                                />
                            </div>

                            {totalQuantity > 1 && (
                                <div className="border-t border-gray-800 pt-6 space-y-3">
                                    <label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border transition-all ${contact.deliveryMethod === 'single' ? 'bg-white/5 border-blue-500' : 'border-transparent hover:bg-white/5'}`}>
                                        <input type="radio" name="deliveryMethod" value="single" checked={contact.deliveryMethod === 'single'} onChange={handleContactChange} className="accent-blue-500 w-5 h-5" />
                                        <span className="text-sm text-gray-300">Send all card details to <b>one email</b></span>
                                    </label>
                                    
                                    <label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border transition-all ${contact.deliveryMethod === 'multiple' ? 'bg-white/5 border-blue-500' : 'border-transparent hover:bg-white/5'}`}>
                                        <input type="radio" name="deliveryMethod" value="multiple" checked={contact.deliveryMethod === 'multiple'} onChange={handleContactChange} className="accent-blue-500 w-5 h-5" />
                                        <span className="text-sm text-gray-300">Send each card to a <b>different email</b></span>
                                    </label>
                                </div>
                            )}

                            <div className="space-y-3 pt-2">
                                {contact.deliveryMethod === 'single' || totalQuantity <= 1 ? (
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 uppercase">Delivery Email</label>
                                        <input 
                                            type="email" 
                                            placeholder="Where should we send the cards?" 
                                            className="w-full bg-[#6D7289] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition placeholder-gray-300" 
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-4 animate-fadeIn">
                                        <p className="text-sm text-blue-400">Please enter an email for each card:</p>
                                        {Array.from({ length: totalQuantity }).map((_, idx) => (
                                            <div key={idx} className="space-y-1">
                                                <label className="text-xs text-gray-500 uppercase">{recipientLabels[idx]} Recipient</label>
                                                <input 
                                                    type="email" 
                                                    value={contact.recipientEmails[idx] || ''}
                                                    onChange={(e) => handleRecipientEmailChange(idx, e.target.value)}
                                                    placeholder={`Email for ${recipientLabels[idx]}`}
                                                    className="w-full bg-[#6D7289] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition placeholder-gray-300" 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                     {/* Right Column: Summary */}
                     <div className="lg:col-span-4 relative">
                        <div className="sticky top-8 space-y-6">
                            <OrderSummary cart={cart} total={totalAmount} />
                            <button onClick={() => setStep(s => s + 1)} className="w-full bg-blue-600 text-white hover:bg-blue-700 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 transition-all">
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // --- Stage 3: Payment ---
    const renderStage3 = () => (
        <div className="animate-fadeIn flex flex-col items-center pt-8 px-4">
            <h2 className="text-gray-400 text-lg mb-2">Total amount</h2>
            <div className="text-5xl md:text-6xl font-bold text-white mb-12">
                ₦{totalAmount.toLocaleString()}
            </div>

            <div className="w-full max-w-md space-y-3 mb-8">
                <label className="text-sm font-semibold text-gray-300 ml-1">Payment method</label>
                
                <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-blue-500 hover:bg-white/10 transition">
                    <div className="w-12 h-10 bg-white rounded flex items-center justify-center shrink-0">
                        <CreditCard className="text-blue-900" size={24} />
                    </div>
                    <div className="flex-grow min-w-0">
                        <p className="text-white font-semibold text-lg truncate">Paystack</p>
                        <p className="text-xs text-gray-400 truncate">Pay with Paystack</p>
                    </div>
                    <div className="ml-auto shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-md">
                <button onClick={() => alert('Payment Processing...')} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-900/30 transition-all transform hover:-translate-y-1">
                    Pay Now
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#030C32] relative overflow-x-hidden font-sans selection:bg-blue-500 selection:text-white pb-20">
             <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
            
            {/* Added style to enable 3D perspective for flip */}
            <style jsx global>{`
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-spin-reverse {
                    animation: spin-reverse 1s linear infinite;
                }
            `}</style>

            <main className="relative z-10 max-w-7xl mx-auto md:px-8 py-4">
                <div className="flex items-center justify-between mb-8 px-4">
                    <div className="w-20">
                        {step > 1 && (
                            <button onClick={() => setStep(s => s - 1)} className="flex items-center text-gray-400 hover:text-white transition">
                                <ArrowLeft className="mr-2" size={20} /> 
                                <span className="hidden md:inline">Back</span>
                            </button>
                        )}
                    </div>
                    <div className="flex-grow flex justify-center">
                         <ProgressBar step={step} />
                    </div>
                    <div className="w-20" />
                </div>

                {step === 1 && renderStage1()}
                {step === 2 && renderStage2()}
                {step === 3 && renderStage3()}
            </main>
        </div>
    );
}