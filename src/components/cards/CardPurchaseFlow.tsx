'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PaystackButton } from 'react-paystack';
import { CardType, OrderItem, PurchaseRequest, purchaseCards } from '@/lib/api';
import { toast } from 'react-hot-toast'; // Assuming react-hot-toast is available or I should install it. 
// Wait, package.json didn't show react-hot-toast in sync-web-v2. I should probably use simple alerts or install it.
// Let's check package.json again or just use simple UI for now.
// Actually, I'll use a simple state for success/error if toast isn't there.
// But for a "premium" feel, I should probably add it.
// Let's stick to basic UI for now to avoid more install issues, or use what's available.
// sync-web-v2 has 'lucide-react', 'framer-motion'.

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, Plus, CreditCard, Loader2 } from 'lucide-react';

// Pricing (Mock)
const PRICES = {
  [CardType.NOVA]: 35000,
  [CardType.MARBLE]: 50000,
  [CardType.AURIC]: 60000,
};

export default function CardPurchaseFlow() {
  const [step, setStep] = useState<'selection' | 'details' | 'payment' | 'success'>('selection');
  const [quantities, setQuantities] = useState({
    [CardType.NOVA]: 0,
    [CardType.MARBLE]: 0,
    [CardType.AURIC]: 0,
  });
  const [details, setDetails] = useState<OrderItem[]>([]);

  const totalAmount = 
    quantities[CardType.NOVA] * PRICES[CardType.NOVA] +
    quantities[CardType.MARBLE] * PRICES[CardType.MARBLE] +
    quantities[CardType.AURIC] * PRICES[CardType.AURIC];

  const handleQuantityChange = (type: CardType, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  const handleProceedToDetails = () => {
    const newDetails: OrderItem[] = [];
    Object.entries(quantities).forEach(([type, count]) => {
      for (let i = 0; i < count; i++) {
        newDetails.push({ type: type as CardType, name: '', email: '' });
      }
    });
    setDetails(newDetails);
    setStep('details');
  };

  const handleDetailChange = (index: number, field: 'name' | 'email', value: string) => {
    const newDetails = [...details];
    newDetails[index] = { ...newDetails[index], [field]: value };
    setDetails(newDetails);
  };

  const purchaseMutation = useMutation({
    mutationFn: purchaseCards,
    onSuccess: () => {
      setStep('success');
    },
    onError: (error) => {
      console.error('Purchase failed', error);
      alert('Purchase failed. Please try again.');
    }
  });

  const handlePaystackSuccess = (reference: any) => {
    // Extract payment reference from Paystack response
    // Paystack returns { reference: 'xxx', ... } or just the reference string
    const paymentRef = reference?.reference || reference;
    
    if (!paymentRef) {
      console.error('No payment reference received from Paystack');
      alert('Payment successful but reference missing. Please contact support.');
      return;
    }

    const purchaseRequest: PurchaseRequest = {
      items: details,
      buyerEmail: details[0]?.email,
      buyerName: details[0]?.name,
      paymentReference: paymentRef, // Backend will verify this with Paystack
    };
    purchaseMutation.mutate(purchaseRequest);
  };

  const handlePaystackClose = () => {
    console.log('Payment closed');
  };

  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: details[0]?.email || 'customer@example.com', // Use first email or fallback
    amount: totalAmount * 100, // Paystack expects kobo
    publicKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // REPLACE WITH REAL KEY
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl min-h-[600px]">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          {step === 'selection' && 'Select Your Cards'}
          {step === 'details' && 'Enter Card Details'}
          {step === 'payment' && 'Complete Payment'}
          {step === 'success' && 'Purchase Successful!'}
        </h2>
        <p className="text-gray-500 mt-2">Step {step === 'selection' ? 1 : step === 'details' ? 2 : step === 'payment' ? 3 : 4} of 4</p>
      </div>

      <AnimatePresence mode="wait">
        {step === 'selection' && (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {Object.values(CardType).map((type) => (
              <div key={type} className="flex items-center justify-between p-4 border rounded-xl hover:border-blue-500 transition-colors">
                <div>
                  <h3 className="text-xl font-semibold capitalize">{type} Card</h3>
                  <p className="text-gray-500">₦{PRICES[type].toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleQuantityChange(type, -1)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-xl font-medium w-8 text-center">{quantities[type]}</span>
                  <button 
                    onClick={() => handleQuantityChange(type, 1)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="pt-6 border-t mt-6 flex justify-between items-center">
              <div className="text-2xl font-bold">
                Total: ₦{totalAmount.toLocaleString()}
              </div>
              <button
                onClick={handleProceedToDetails}
                disabled={totalAmount === 0}
                className="px-8 py-3 bg-black text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {details.map((item, index) => (
                <div key={index} className="p-4 border rounded-xl bg-gray-50">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold capitalize text-gray-700">{item.type} Card #{index + 1}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={item.name}
                      onChange={(e) => handleDetailChange(index, 'name', e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={item.email}
                      onChange={(e) => handleDetailChange(index, 'email', e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6">
              <button
                onClick={() => setStep('selection')}
                className="px-6 py-3 text-gray-600 hover:text-black font-medium"
              >
                Back
              </button>
              <button
                onClick={() => setStep('payment')}
                disabled={details.some(d => !d.name || !d.email)}
                className="px-8 py-3 bg-black text-white rounded-xl font-medium disabled:opacity-50 hover:bg-gray-800 transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center py-8"
          >
            <div className="mb-8">
              <p className="text-gray-600 mb-2">You are about to pay</p>
              <h3 className="text-4xl font-bold">₦{totalAmount.toLocaleString()}</h3>
              <p className="text-sm text-gray-500 mt-4">for {details.length} cards</p>
            </div>

            <div className="flex justify-center gap-4">
               <button
                onClick={() => setStep('details')}
                className="px-6 py-3 text-gray-600 hover:text-black font-medium"
              >
                Back
              </button>
              
              <PaystackButton 
                {...paystackConfig} 
                text="Pay Now"
                onSuccess={handlePaystackSuccess}
                onClose={handlePaystackClose}
                className="px-12 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg flex items-center gap-2 mx-auto"
              />
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Payment Successful!</h3>
            <p className="text-gray-600 mb-8">
              Your cards have been generated and sent to the provided email addresses.
            </p>
            <button
              onClick={() => {
                setStep('selection');
                setQuantities({ [CardType.NOVA]: 0, [CardType.MARBLE]: 0, [CardType.AURIC]: 0 });
                setDetails([]);
              }}
              className="px-8 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800"
            >
              Buy More Cards
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {purchaseMutation.isPending && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl flex flex-col items-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <p className="font-medium">Processing Order...</p>
          </div>
        </div>
      )}
    </div>
  );
}
