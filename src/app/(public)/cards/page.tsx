"use client";

import React, { useState } from 'react';
import { 
    Minus, 
    Plus, 
    ArrowLeft,
    RotateCw,
    Check,
} from 'lucide-react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

const PaystackButton = dynamic(
  () => import('react-paystack').then((mod) => mod.PaystackButton),
  { ssr: false }
);
import { CardType, OrderItem, purchaseCards } from '@/lib/api';
import { toast } from 'react-hot-toast';

// --- TypeScript Interfaces ---
interface CardTemplate {
    id: number;
    name: string;
    type: CardType;
    price: number;
    theme: string;
    color: string;
    tagline: string;
    description: string;
    features: string[];
    frontImage: string;
    backImage: string;
}

interface ContactDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryMethod: 'single' | 'multiple';
    recipientEmails: string[];
    recipientAddresses: string[];
}

// --- Configuration Data ---
const CARD_TEMPLATES: CardTemplate[] = [
    
    {
        id: 1,
        name: 'Auric',
        price: 60000,
        theme: 'bg-neutral-900',
        color: '#171717',
        tagline: 'Engineered prestige.',
        description: 'The {name} Card is built from precision-cut steel, offering unmatched luxury, durability, and presence. A statement piece for those who value excellence.',
        features: ['Premium stainless-steel construction with a polished metallic finish', 'Ultra-durable, scratch-resistant, and prestige-grade', 'High-performance NFC core for instant authentication', 'Executive feel that commands attention'],
        frontImage: '/landing/auric-card-front-v.svg',
        backImage: '/landing/auric-card-back-v.svg',
        type: CardType.NOVA
    },
     {
         id: 2,
         name: 'Maple',
         price: 50000,
         theme: 'bg-[#E3CAA5]',
         color: '#D4B99F',
         tagline: 'Natural. Sustainable. Unique.',
         description: 'Nature meets technology. The {name} Card is crafted from polished premium wood, delivering a warm, sophisticated aesthetic fused with modern smart identity capabilities.',
         features: ['Hand-crafted wooden body with a refined natural texture', 'Embedded NFC chip for seamless smart interactions', 'Eco-friendly, sustainable material choice', 'Each card carries a unique natural grain pattern'],
         frontImage: '/landing/maple-card-front-v.svg',
         backImage: '/landing/maple-card-back-v.svg',
         type: CardType.MARBLE
     },
    {
        id: 3,
        name: 'Nova',
        price: 35000,
        theme: 'bg-blue-600',
        color: '#2563EB',
        tagline: 'Sleek. Modern. High-performance.',
        description: 'The {name} Card delivers advanced smart identity technology in a refined, durable plastic design. Perfect for everyday use with a premium feel.',
        features: ['Smooth, lightweight finish engineered for daily carry', 'NFC-enabled for instant identity verification and smart access', 'Resistant to bending, wear, and environmental exposure', 'Customizable surface for institutional branding'],
        frontImage: '/landing/nova-card-front-v.svg',
        backImage: '/landing/nova-card-back-v.svg',
        type: CardType.NOVA
    },
   
    
];

// --- Mock Card Front/Flip Container Component ---
const MockCard = ({ template, isSelected, isFlipped }: { template: CardTemplate, isSelected?: boolean, isFlipped?: boolean }) => {
    return (
        <div 
            className={`relative w-full aspect-[1/1.58] rounded-xl transition-all duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        >
            {/* Card Front (Backface Hidden) */}
            <div className="absolute inset-0 w-full aspect-[1/1.58] rounded-xl overflow-hidden shadow-2xl backface-hidden">
                <Image
                    src={template.frontImage}
                    fill
                    alt={`${template.name} Card Front`}
                    loading="eager"
                    className="object-cover rotate-180"
                />
            </div>

            {/* Card Back (Rotated 180deg) */}
            <div className="absolute inset-0 rotate-y-180 backface-hidden">
                <div className="w-full aspect-[1/1.58] rounded-xl overflow-hidden shadow-2xl">
                    <Image
                        src={template.backImage}
                        fill
                        alt={`${template.name} Card Back`}
                        loading="eager"
                        className="object-cover "
                    />
                </div>
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

// --- Duplicate Email Modal Component ---
const DuplicateEmailModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    duplicateGroups 
}: { 
    isOpen: boolean; 
    onClose: () => void; 
    onConfirm: () => void;
    duplicateGroups: Array<{ email: string; cards: string[] }>;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-[#0B1739] border border-blue-500/30 rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-b border-yellow-500/20 px-6 py-4">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Duplicate Email Detected</h3>
                            <p className="text-sm text-gray-300">Multiple cards will be sent to the same recipient</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 py-5 max-h-[50vh] overflow-y-auto">
                    <p className="text-gray-300 text-sm mb-4">
                        You&apos;ve entered the same email address for multiple cards. Please review below:
                    </p>

                    <div className="space-y-4">
                        {duplicateGroups.map((group, idx) => (
                            <div key={idx} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <p className="text-blue-400 font-mono text-sm break-all">{group.email}</p>
                                </div>
                                <div className="space-y-2 pl-4">
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Will receive:</p>
                                    {group.cards.map((card, cardIdx) => (
                                        <div key={cardIdx} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                                            <span className="text-white text-sm">{card}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all font-medium"
                    >
                        Go Back & Edit
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all font-bold shadow-lg"
                    >
                        Continue Anyway
                    </button>
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
    const [isFlipped, setIsFlipped] = useState(false); 
    const [isSuccess, setIsSuccess] = useState(false);

    const [contact, setContact] = useState<ContactDetails>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        deliveryMethod: 'single',
        recipientEmails: [],
        recipientAddresses: []
    });
    const [deliveryEmail, setDeliveryEmail] = useState('');
    const [deliveryName, setDeliveryName] = useState('');
    const [recipientNames, setRecipientNames] = useState<string[]>([]);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);

    const totalQuantity = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalAmount = CARD_TEMPLATES.reduce((sum, card) => sum + (card.price * (cart[card.id] || 0)), 0);

    // Validation function for email fields
    const isValidEmail = (email: string) => {
        return email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const hasDuplicateEmails = () => {
        if (contact.deliveryMethod === 'multiple' && totalQuantity > 1) {
            const emails = contact.recipientEmails.filter(email => email.trim() !== '');
            const uniqueEmails = new Set(emails.map(e => e.toLowerCase().trim()));
            return emails.length !== uniqueEmails.size;
        }
        return false;
    };

    const getDuplicateEmailGroups = () => {
        if (contact.deliveryMethod !== 'multiple' || totalQuantity <= 1) return [];

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

        const emailMap: Record<string, number[]> = {};
        contact.recipientEmails.forEach((email, idx) => {
            const normalizedEmail = email.toLowerCase().trim();
            if (normalizedEmail) {
                if (!emailMap[normalizedEmail]) {
                    emailMap[normalizedEmail] = [];
                }
                emailMap[normalizedEmail].push(idx);
            }
        });

        return Object.entries(emailMap)
            .filter(([_, indices]) => indices.length > 1)
            .map(([email, indices]) => ({
                email,
                cards: indices.map(idx => recipientLabels[idx])
            }));
    };

    const canProceedToPayment = () => {
    // Buyer details must be valid
    if (!contact.firstName.trim() || !contact.lastName.trim() || !isValidEmail(contact.email)) {
        return false;
    }

    if (contact.deliveryMethod === 'single' || totalQuantity <= 1) {
        // Single delivery requires recipient name & email
        return isValidEmail(deliveryEmail) && deliveryName.trim() !== '';
    } else {
        // Multiple delivery requires:
        // 1. All recipient emails filled & valid
        // 2. All recipient names filled
        // 3. All recipient addresses filled
        return contact.recipientEmails.length === totalQuantity &&
               contact.recipientEmails.every(email => isValidEmail(email)) &&
               recipientNames.length === totalQuantity &&
               recipientNames.every(name => name.trim() !== '') &&
               contact.recipientAddresses.length === totalQuantity &&
               contact.recipientAddresses.every(addr => addr.trim() !== '');
    }
};


    const handleProceedToPayment = () => {
        if (hasDuplicateEmails()) {
            setShowDuplicateModal(true);
        } else {
            setStep(s => s + 1);
        }
    };

    const confirmProceedWithDuplicates = () => {
        setShowDuplicateModal(false);
        setStep(s => s + 1);
    };

    const updateQuantity = (id: number, delta: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setExpandedCardId(id);

    setCart(prev => {
        const currentQty = prev[id] || 0;
        const newQty = Math.max(0, currentQty + delta);
        const newCart = { ...prev, [id]: newQty };
        const newTotalQuantity = Object.values(newCart).reduce((a, b) => a + b, 0);

        // Update recipient arrays
        setContact(prevContact => {
            let newEmails = [...prevContact.recipientEmails];
            let newAddresses = [...prevContact.recipientAddresses];

            if (newTotalQuantity > newEmails.length) {
                const diff = newTotalQuantity - newEmails.length;
                newEmails = [...newEmails, ...new Array(diff).fill('')];
                newAddresses = [...newAddresses, ...new Array(diff).fill('')];
            } else if (newTotalQuantity < newEmails.length) {
                newEmails = newEmails.slice(0, newTotalQuantity);
                newAddresses = newAddresses.slice(0, newTotalQuantity);
            }

            // --- Automatically switch delivery method ---
            const newDeliveryMethod = newTotalQuantity > 1 ? 'multiple' : 'single';

            return {
                ...prevContact,
                recipientEmails: newEmails,
                recipientAddresses: newAddresses,
                deliveryMethod: newDeliveryMethod
            };
        });

        // Update recipient names array
        setRecipientNames(prevNames => {
            let newNames = [...prevNames];
            if (newTotalQuantity > prevNames.length) {
                const diff = newTotalQuantity - prevNames.length;
                newNames = [...newNames, ...new Array(diff).fill('')];
            } else if (newTotalQuantity < prevNames.length) {
                newNames = newNames.slice(0, newTotalQuantity);
            }
            return newNames;
        });

        return newCart;
    });
};


    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact(prev => ({ ...prev, [name]: value }));
    };

    const handleRecipientAddressChange = (index: number, value: string) => {
        const newAddresses = [...contact.recipientAddresses];
        newAddresses[index] = value;
        setContact(prev => ({ ...prev, recipientAddresses: newAddresses }));
    };


    const handleRecipientEmailChange = (index: number, value: string) => {
        const newEmails = [...contact.recipientEmails];
        newEmails[index] = value;
        setContact(prev => ({ ...prev, recipientEmails: newEmails }));
    };

    const handleRecipientNameChange = (index: number, value: string) => {
        const newNames = [...recipientNames];
        newNames[index] = value;
        setRecipientNames(newNames);
    };

    const purchaseMutation = useMutation({
        mutationFn: purchaseCards,
        onSuccess: () => {
          setIsSuccess(true);
          setStep(4); // Move to success step
          toast.success('Payment successful! Cards generated.');
        },
        onError: (error) => {
          console.error('Purchase failed', error);
          toast.error('Purchase failed. Please try again.');
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePaystackSuccess = (reference: any) => {
        // Extract payment reference from Paystack response
        // Paystack returns { reference: 'xxx', ... } or just the reference string
        const paymentRef = reference?.reference || reference;
        
        if (!paymentRef) {
            console.error('No payment reference received from Paystack');
            toast.error('Payment successful but reference missing. Please contact support.');
            return;
        }

        // Construct OrderItems from cart and contact
        const items: OrderItem[] = [];
        let recipientIndex = 0;

        Object.entries(cart).forEach(([id, qty]) => {
            const template = CARD_TEMPLATES.find(t => t.id === Number(id));
            if (template && qty > 0) {
                for (let i = 0; i < qty; i++) {
                    let email: string;
                    let name: string;
                    
                    if (contact.deliveryMethod === 'single' || totalQuantity <= 1) {
                        // Single delivery - use delivery email and name
                        email = deliveryEmail;
                        name = deliveryName;
                    } else {
                        // Multiple delivery - use recipient email and name
                        email = contact.recipientEmails[recipientIndex] || '';
                        name = recipientNames[recipientIndex] || '';
                    }
                    
                    items.push({
                        type: template.type,
                        name: name,
                        email: email
                    });
                    recipientIndex++;
                }
            }
        });

        // Include buyer information
        const buyerName = `${contact.firstName} ${contact.lastName}`.trim();
        purchaseMutation.mutate({
            items,
            buyerEmail: contact.email,
            buyerName: buyerName || undefined,
            paymentReference: paymentRef, // Backend will verify this with Paystack
        });
    };

    const handlePaystackClose = () => {
        console.log('Payment closed');
    };

    const paystackConfig = {
        reference: (new Date()).getTime().toString(),
        email: contact.email,
        amount: totalAmount * 100, // Paystack expects kobo
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    };


    // --- Stage 1: Choose Card ---
    const renderStage1 = () => (
        <div className="animate-fadeIn px-4 lg:px-0 pt-10">
            <div className="text-center mb-8 md:mb-10 px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Choose Your Card</h1>
                <p className="text-gray-400 max-w-xl mx-auto">Pick a style that fits your personality. You can customize your details next.</p>
            </div>

             <div className="relative mb-8">
                 <div 
                    className="flex overflow-x-auto snap-x snap-mandatory md:flex md:justify-center md:flex-wrap md:gap-6 px-4 no-scrollbar pb-4 md:pb-0  gap-3 "
                    style={{ maskImage: 'linear-gradient(to right, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)' }}
                >
                    {CARD_TEMPLATES.map(template => (
                        <div 
                            key={template.id} 
                            className={`
                                flex-none w-[42%] md:w-64 snap-start cursor-pointer transition-all duration-300
                                bg-[#061454] rounded-2xl p-4 border flex flex-col items-center justify-between group
                                ${expandedCardId === template.id ? 'border-blue-500' : 'border-white/5 hover:border-white/20'}
                            `}
                            onClick={() => setExpandedCardId(template.id)}
                        >
                            <div className="w-full max-w-[160px] mb-4">
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
                <div className="lg:col-span-8 space-y-4">
                    {CARD_TEMPLATES.map(template => {
                        const isExpanded = expandedCardId === template.id;
                        return (
                            <div 
                                key={template.id} 
                                onClick={() => setExpandedCardId(template.id)}
                                className={`cursor-pointer rounded-xl transition-all duration-300 border 
                                ${isExpanded 
                                    ? 'bg-[#061454] border-blue-500/50' 
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
    // --- Stage 2: Details (Simplified) ---
    const renderStage2 = () => {
        // Build labels for each card
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

        const isMultiple = totalQuantity > 1;

        return (
            <div className="animate-fadeIn">
                <div className="text-center mb-8 md:mb-10 px-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Card Customization</h1>
                    <p className="text-gray-400 max-w-xl mx-auto">Enter details for your cards below.</p>
                </div>

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
                                <div key={id} className="flex-none w-[40%] md:w-[200px] snap-center bg-[#061454] rounded-xl p-4 border border-white/10 flex flex-col items-center">
                                    <div className="w-full mb-3 relative">
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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 px-4">
                    <div className="lg:col-span-6">
                        <div className="space-y-6">
                            {/* Buyer Info */}
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

                            {/* Recipient Info */}
                            <div className="space-y-4 pt-2 animate-fadeIn">
                                {isMultiple ? (
                                    <>
                                        <p className="text-sm text-blue-400">Enter full name, email, and address for each card:</p>
                                        {Array.from({ length: totalQuantity }).map((_, idx) => (
                                            <div key={idx} className="space-y-3 p-4 border border-white/10 rounded-lg bg-white/5">
                                                <div className="space-y-1">
                                                    <label className="text-xs text-gray-500 uppercase">{recipientLabels[idx]} Recipient</label>
                                                    <input 
                                                        type="text" 
                                                        value={recipientNames[idx] || ''}
                                                        onChange={(e) => handleRecipientNameChange(idx, e.target.value)}
                                                        placeholder={`Full name for ${recipientLabels[idx]}`}
                                                        className="w-full bg-[#6D7289] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition placeholder-gray-300" 
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <input 
                                                        type="email" 
                                                        value={contact.recipientEmails[idx] || ''}
                                                        onChange={(e) => handleRecipientEmailChange(idx, e.target.value)}
                                                        placeholder={`Email for ${recipientLabels[idx]}`}
                                                        className="w-full bg-[#6D7289] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition placeholder-gray-300" 
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <input 
                                                        type="text" 
                                                        value={contact.recipientAddresses[idx] || ''}
                                                        onChange={(e) => handleRecipientAddressChange(idx, e.target.value)}
                                                        placeholder={`Delivery address for ${recipientLabels[idx]}`}
                                                        className="w-full bg-[#6D7289] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition placeholder-gray-300"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-400 uppercase">Recipient Full Name</label>
                                            <input 
                                                type="text"
                                                value={deliveryName}
                                                onChange={(e) => setDeliveryName(e.target.value)}
                                                placeholder="Full name of the recipient" 
                                                className="w-full bg-[#6D7289] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition placeholder-gray-300" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-400 uppercase">Delivery Email</label>
                                            <input 
                                                type="email"
                                                value={deliveryEmail}
                                                onChange={(e) => setDeliveryEmail(e.target.value)}
                                                placeholder="Where should we send the cards?" 
                                                className="w-full bg-[#6D7289] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition placeholder-gray-300" 
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-8 space-y-6">
                            <OrderSummary cart={cart} total={totalAmount} />
                            <button 
                                onClick={handleProceedToPayment} 
                                disabled={!canProceedToPayment()}
                                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all
                                    ${canProceedToPayment() 
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/20' 
                                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'}
                                `}
                            >
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

            <div className="w-full max-w-md">
                <PaystackButton 
                    {...paystackConfig} 
                    text={purchaseMutation.isPending ? "Processing..." : "Pay Now"}
                    onSuccess={handlePaystackSuccess}
                    onClose={handlePaystackClose}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-900/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                />
            </div>
        </div>
    );

    // --- Stage 4: Success ---
    const renderStage4 = () => (
        <div className="animate-fadeIn flex flex-col items-center pt-16 px-4 text-center">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8">
                <Check className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Payment Successful!</h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-12 text-lg">
                Your cards have been successfully generated. Please check your email for access details and next steps.
            </p>
            <button 
                onClick={() => {
                    setStep(1);
                    setCart({ 1: 1, 2: 0, 3: 0 });
                    setContact({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        deliveryMethod: 'single',
                        recipientEmails: [],
                        recipientAddresses: []
                    });
                    setDeliveryEmail('');
                    setDeliveryName('');
                    setRecipientNames([]);
                    setIsSuccess(false);
                }}
                className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
                Purchase More Cards
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#030C32] relative overflow-x-hidden font-sans selection:bg-blue-500 selection:text-white pb-20">
             <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
            
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
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-in;
                }
            `}</style>

            <main className="relative z-10 max-w-7xl mx-auto md:px-8 py-4">
                <div className="flex items-center justify-between mb-8 px-4">
                    <div className="w-20">
                        {step > 1 && step < 4 && (
                            <button onClick={() => setStep(s => s - 1)} className="flex items-center text-gray-400 hover:text-white transition">
                                <ArrowLeft className="mr-2" size={20} /> 
                                <span className="hidden md:inline">Back</span>
                            </button>
                        )}
                    </div>
                    <div className="flex-grow flex justify-center">
                         {step < 4 && <ProgressBar step={step} />}
                    </div>
                    <div className="w-20" />
                </div>

                {step === 1 && renderStage1()}
                {step === 2 && renderStage2()}
                {step === 3 && renderStage3()}
                {step === 4 && renderStage4()}
            </main>

            <DuplicateEmailModal 
                isOpen={showDuplicateModal}
                onClose={() => setShowDuplicateModal(false)}
                onConfirm={confirmProceedWithDuplicates}
                duplicateGroups={getDuplicateEmailGroups()}
            />
        </div>
    );
}