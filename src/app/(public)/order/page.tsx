"use client";

import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, User, Zap, Wifi, ShoppingBag,ArrowRightIcon, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { div } from 'framer-motion/client';

// --- TypeScript Interfaces ---
interface CardTemplate {
    id: number;
    name: string;
    price: number;
    theme: string;
    color: string;
    subtext: string;
}

interface FormData {
    templateId: number;
    selectedTemplate: CardTemplate;
    cardHolderName: string;
}

interface MockCardProps {
    template: CardTemplate | undefined;
    details: FormData;
    isSelected: boolean;
    isVertical?: boolean;
    previewName?: string;
}

interface StageProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    nextStage: () => void;
    prevStage: () => void;
}

// --- Configuration Data ---
const CARD_TEMPLATES: CardTemplate[] = [
    { id: 1, name: 'Nova', price: 30000, theme: 'bg-blue-600', color: '#2563EB', subtext: 'Bold and Modern' },
    { id: 2, name: 'Maple', price: 40000, theme: 'bg-yellow-800', color: '#D4B99F', subtext: 'Natural Wood Grain' },
    { id: 3, name: 'Auric', price: 50000, theme: 'bg-gray-900', color: '#282828', subtext: 'Sleek and Minimal' },
];

// --- Mock Card Component for Preview ---
const MockCard: React.FC<MockCardProps> = ({ template, details, isSelected, isVertical = true, previewName }) => {
    const defaultColor = template?.color || '#2563EB';
    const cardHolderText = details.cardHolderName || previewName || 'YOUR NAME HERE';

    return (
        <div
            className={`w-full h-full rounded-xl p-4 shadow-xl transition-all duration-300
            ${isSelected ? 'ring-4 ring-blue-500/80 scale-[1.02]' : 'ring-1 ring-white/10'}
            `}
            style={{
                background: template?.theme || 'bg-gray-700',
                backgroundImage: `linear-gradient(135deg, ${defaultColor}, ${defaultColor}DD)`,
                position: 'relative',
                overflow: 'hidden',
                // Define aspect ratio based on orientation
                aspectRatio: isVertical ? '1 / 1.58' : '1.58 / 1',
            }}
        >
            {/* Subtle background texture/pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 100% 100%, #ffffff 0%, transparent 50%)' }} />

            {/* Card Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-4">
                
                {/* Contactless Icon (Top Right) */}
                <div className={`text-white ${isVertical ? 'absolute bottom-4 right-4 -rotate-90' : 'flex justify-end'}`}>
                    <Wifi className="h-5 w-5 transform -rotate-90" />
                </div>

                {/* Logo Placeholder - Central, Large (Vertical layout) */}
                {isVertical && (
                    <div className="flex-grow flex items-center justify-center pt-8 rotate-90 gap-3">
                        {/* <Zap className="h-10 w-10 text-white" /> */}
                        <Image
                            src="/landing/sync-shape.svg"
                            className="object-contain text-green-400"
                            alt="Company Logo"
                            width={40}
                            height={40}
                            />
                            <span className='font-medium text-2xl' >Sync</span>
                    </div>
                )}
                
                {/* Logo Placeholder - Small (Horizontal layout) */}
                {!isVertical && (
                    <div className="flex justify-center gap-1">
                        {/* <Zap className="h-7 w-7 text-white" /> */}
                         <Image
                            src="/landing/sync-shape.svg"
                            className="object-contain text-green-400"
                            alt="Company Logo"
                            width={20}
                            height={20}
                            />
                            <span className='font-medium text-md' >Sync</span>
                    </div>
                )}

                {/* Details (bottom) */}
                <div className="text-white font-mono pt-4">
                    <p className="text-xs opacity-70 mb-1">Card Holder</p>
                    <p className="text-sm font-bold truncate">
                        {cardHolderText}
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- Stepper Component ---
const Stepper: React.FC<{ currentStage: number }> = ({ currentStage }) => {
    const steps = [
        { id: 1, name: 'Template' },
        { id: 2, name: 'Details' },
        { id: 3, name: 'Payment' },
        { id: 4, name: 'Complete' },
    ];

    return (
        <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-16 max-w-xl mx-auto">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    {/* Step Icon & Name */}
                    <div className="flex gap-3 items-center">
                        <div
                            className={`w-10 h-10 p-3  rounded-full flex items-center justify-center transition-colors duration-300 ${
                                currentStage > step.id
                                    ? 'bg-blue-600' // Completed
                                    : currentStage === step.id
                                    ? 'bg-blue-600' // Active
                                    // : 'bg-gray-700 border-2 border-gray-600' // Inactive
                                    : 'bg-[#E5E7EB] border-2 border-gray-600' // Inactive
                            }`}
                        >
                            {currentStage >= step.id ? (
                                <Check className="w-6 h-6 text-white " />
                            ) : (
                                // <span className={`text-sm font-semibold ${currentStage === step.id ? 'text-white' : 'text-gray-400'}`}>
                                <span className={`text-sm font-semibold ${currentStage === step.id ? 'text-white' : 'text-black'}`}>
                                    {step.id}
                                </span>
                            )}
                        </div>
                        <p
                            className={`mt-2 text-xs md:text-sm font-medium transition-colors duration-300 ${
                                currentStage >= step.id ? 'text-white' : 'text-gray-400'
                            }`}
                        >
                            Step {step.id}
                            <span className="hidden md:inline"> {step.name}</span>
                        </p>
                    </div>

                    {/* Separator Line */}
                    {index < steps.length - 1 && (
                        <div
                            className={`h-0.5 w-12 transition-colors duration-300 ${
                                currentStage > step.id ? 'bg-blue-600' : 'bg-gray-700'
                            }`}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

// --- Stage 1: Template Selection ---
const Stage1TemplateSelection: React.FC<Omit<StageProps, 'prevStage'>> = ({ formData, setFormData, nextStage }) => {
    const selectedId = formData.templateId;

    const handleSelect = (templateId: number) => {
        const template = CARD_TEMPLATES.find(t => t.id === templateId);
        if (template) {
            setFormData(prev => ({ ...prev, templateId, selectedTemplate: template }));
        }
    };

    const isNextDisabled = !selectedId;

    return (
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Choose Your Card Template</h2>
            <p className="text-gray-400 mb-12">Pick a style that fits your personality. You can customize your details next.</p>

            <div className="flex flex-col items-center md:flex-row justify-center gap-8 mb-16">
                {CARD_TEMPLATES.map((template) => (
                    <div
                        key={template.id}
                        className={` bg-white p-6 rounded-2xl w-full max-w-[300px] shadow-2xl transition-all duration-300 border-2 cursor-pointer ${
                            selectedId === template.id ? 'border-blue-500 transform scale-[1.03]' : 'border-gray-700 hover:border-grey-800'
                        }`}
                        onClick={() => handleSelect(template.id)}
                    >
                        {/* Card Visual Mock (Vertical and smaller for selection) */}
                        <div className="mb-6 mx-auto w-60 h-96 rounded-lg overflow-hidden relative">
                           <MockCard 
                                template={template} 
                                details={formData} 
                                isSelected={selectedId === template.id} 
                                previewName={template.name}
                            />
                        </div>
                        
                        <h3 className="text-xl font-bold text-black">{template.name}</h3>
                        <p className="text-black text-sm mt-1 mb-4">₦{template.price.toLocaleString('en-US')}</p>
                        
                        <button
                            onClick={(e) => { e.stopPropagation(); handleSelect(template.id); }} // Prevent parent click from firing twice
                            className={`w-full py-2 rounded-lg font-semibold transition-colors duration-200 ${
                                selectedId === template.id 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                                    : 'bg-[#E5E7EB] text-[#374151] hover:bg-gray-600'
                            }`}
                        >
                            {selectedId === template.id ? 'Template Selected' : 'Select Template'}
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={nextStage}
                disabled={isNextDisabled}
                className={`flex items-center justify-center mx-auto px-10 py-3 rounded-xl font-bold transition-all duration-300 ${
                    isNextDisabled
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/40'
                }`}
            >
                Next <ChevronRight className="w-5 h-5 ml-2" />
            </button>
        </div>
    );
};

// --- Stage 2: Details Input ---
const Stage2Details: React.FC<StageProps> = ({ formData, setFormData, nextStage, prevStage }) => {
    const template = formData.selectedTemplate || CARD_TEMPLATES[0];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Allows only letters and spaces, converts to uppercase
        const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
        setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    };

    // Simple validation check: Name must be present and at least 3 characters
    const isNextDisabled = !formData.cardHolderName || formData.cardHolderName.length < 3;

    return (
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Card Customization</h2>
            <p className="text-gray-400 mb-12">Enter the name you want displayed on your selected &apos;{template.name}&apos; card.</p>
            
            <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Left Column: Card Preview */}
                <div className="flex justify-center md:justify-end items-center pt-4">
                    <div className="w-60 h-96 "> {/* Responsive container for preview */}
                        <MockCard template={template} details={formData} isSelected={true} />
                    </div>
                </div>

                {/* Right Column: Form Fields */}
                <div className="space-y-6 text-left flex flex-col justify-center">
                    {/* Card Holder Name */}
                    <div>
                        <label htmlFor="cardHolderName" className="text-gray-300 text-sm font-medium mb-2 flex items-center">
                            <User className="w-4 h-4 mr-2" /> Name on Card
                        </label>
                        <input
                            type="text"
                            id="cardHolderName"
                            name="cardHolderName"
                            value={formData.cardHolderName || ''}
                            onChange={handleChange}
                            maxLength={26}
                            placeholder="E.G., SAMUEL BLESSING D."
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition duration-150 uppercase"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Max 26 characters (Letters and spaces only).
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4">
                <button
                    onClick={prevStage}
                    className="flex items-center px-6 py-3 rounded-xl font-bold bg-gray-700 text-white hover:bg-gray-600 transition duration-300"
                >
                    <ChevronLeft className="w-5 h-5 mr-2" /> Back
                </button>
                <button
                    onClick={nextStage}
                    disabled={isNextDisabled}
                    className={`flex items-center px-10 py-3 rounded-xl font-bold transition-all duration-300 ${
                        isNextDisabled
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/40'
                    }`}
                >
                    Next <ChevronRight className="w-5 h-5 ml-2" />
                </button>
            </div>
        </div>
    );
};

// --- Stage 3: Payment ---
const Stage3Payment: React.FC<StageProps> = ({ formData, nextStage, prevStage }) => {
    const template = formData.selectedTemplate || CARD_TEMPLATES[0];
    const [paymentMethod, setPaymentMethod] = useState<string>('');

    const isBuyDisabled = !paymentMethod;

    const displayPrice = template.price || 50000;

    return (
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Card Summary & Payment</h2>
            <p className="text-gray-400 mb-12">Secure payment powered by Paystack. Your card activates instantly after payment.</p>
            
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 mb-12 p-4 md:p-8 bg-gray-800/60 rounded-xl border border-gray-700">
                
                {/* Left Section: Card Summary & Price */}
                <div className="w-full md:w-1/3 flex flex-col items-center md:items-start space-y-4">
                    {/* Price/Title Section */}
                    <div className='w-full'>
                        <h3 className="text-xl font-semibold text-white md:text-left text-center hidden md:block">{template.name} Digital Card</h3>
                        <h3 className="text-xl font-semibold text-white md:text-left text-center block md:hidden">Card Summary</h3>
                        <p className="text-4xl md:text-5xl font-extrabold text-blue-400 mt-2">
                            ₦{displayPrice.toLocaleString('en-US')}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">One-time template fee.</p>
                    </div>
                    
                    {/* Mock Card Preview (Horizontal view, slightly tilted) */}
                    <div className="mt-4 w-48 h-32 relative transform rotate-[-8deg] translate-x-4 md:-translate-x-4">
                        <MockCard 
                            template={template} 
                            details={formData} 
                            isSelected={false} 
                            isVertical={false}
                        />
                    </div>
                </div>

                {/* Vertical Separator (Hidden on mobile) */}
                <div className="hidden md:block w-px h-64 bg-gray-700" />
                
                {/* Right Section: Payment Options */}
                <div className="w-full md:w-2/3 space-y-6 text-left">
                    <h3 className="text-2xl font-bold text-white mb-4">Payment Options</h3>
                    
                    {/* Payment Select Dropdown */}
                    <div>
                        <label htmlFor="paymentMethod" className="sr-only">Select Payment Method</label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-blue-500 focus:border-blue-500 transition duration-150 appearance-none text-lg"
                        >
                            <option value="" disabled className="bg-gray-800">Select Payment Method</option>
                            <option value="bankTransfer" className="bg-gray-800">Bank Transfer</option>
                            <option value="card" className="bg-gray-800">Debit/Credit Card</option>
                            <option value="ussd" className="bg-gray-800">USSD</option>
                        </select>
                    </div>

                    {/* Buy Card Button */}
                    <button
                        onClick={nextStage}
                        disabled={isBuyDisabled}
                        className={`w-full flex items-center justify-center px-10 py-4 rounded-xl font-bold transition-all duration-300 text-lg ${
                            isBuyDisabled
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/40'
                        }`}
                    >
                        <ShoppingBag className="w-5 h-5 mr-2" /> Buy Card
                    </button>
                    
                    <p className="text-xs text-gray-500 text-center pt-2">
                        Secure payment powered by Paystack. Your card activates instantly after payment.
                        {/* By proceeding, you agree to our Terms and Conditions. */}
                    </p>
                </div>
            </div>

            {/* Navigation Buttons (Back only) */}
            <div className="flex justify-center space-x-4">
                <button
                    onClick={prevStage}
                    className="flex items-center px-6 py-3 rounded-xl font-bold bg-gray-700 text-white hover:bg-gray-600 transition duration-300"
                >
                    <ChevronLeft className="w-5 h-5 mr-2" /> Back to Details
                </button>
            </div>
        </div>
    );
};


// --- Stage 4: Complete ---
const Stage4Complete: React.FC<Omit<StageProps, 'formData' | 'setFormData' | 'prevStage'>> = ({ nextStage }) => (
    <div>
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Card Summary & Payment</h2>
            <p className="text-gray-400 mb-12">Secure payment powered by Paystack. Your card activates instantly after payment.</p>
            <Image
                    src="/landing/payment-successful.svg"
                    className="object-contain text-green-400 mx-auto"
                    alt="Company Logo"
                    width={250}
                    height={250}
                    />
            <button
                onClick={nextStage}
                className="flex my-10 items-center justify-center mx-auto px-10 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/40 transition duration-300"
            >
                Next <ArrowRight className="w-5 h-5 ml-2" />
            </button>
        </div>
    </div>
);


// --- Main Application Component (Exported for Next.js) ---
export const CardForm = () => {
    // Initialize selectedTemplate with the first item to ensure a default is always selected
    const initialTemplate = CARD_TEMPLATES[0];

    const [currentStage, setCurrentStage] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({
        templateId: initialTemplate.id,
        selectedTemplate: initialTemplate,
        cardHolderName: '',
    });

    const nextStage = () => {
        if (currentStage < 4) {
            setCurrentStage(prev => prev + 1);
        }
    };

    const prevStage = () => {
        if (currentStage > 1) {
            setCurrentStage(prev => prev - 1);
        }
    };

    const stageProps = { formData, setFormData, nextStage, prevStage };

    const renderStage = () => {
        switch (currentStage) {
            case 1:
                return <Stage1TemplateSelection {...stageProps} />;
            case 2:
                return <Stage2Details {...stageProps} />;
            case 3:
                return <Stage3Payment {...stageProps} />;
            case 4:
                return <Stage4Complete nextStage={() => setCurrentStage(1)} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#030C32] text-white font-sans relative overflow-hidden">
            {/* Background Grid and Glow Effect for the visual aesthetic */}
            <div className="absolute inset-0 z-0 opacity-10" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, #1f2937 0px, #1f2937 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, #1f2937 0px, #1f2937 1px, transparent 1px, transparent 50px)',
                backgroundSize: '50px 50px',
            }} />
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] z-0" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] z-0" />


            {/* --- Main Form Content --- */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <Stepper currentStage={currentStage} />
                <div className="p-4 md:p-8 bg-gray-900/50 rounded-2xl shadow-2xl backdrop-blur-md border border-gray-700/50">
                    {renderStage()}
                </div>
            </main>

            {/* --- Footer Placeholder (Bottom) ---
            <footer className="relative z-10 mt-20 p-4 border-t border-gray-800/50 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Sync Card. All rights reserved.
            </footer> */}
        </div>
    );
};

export default CardForm;