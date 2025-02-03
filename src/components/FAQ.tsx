'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is your delivery timeframe?",
    answer: "We typically deliver within 3-7 business days for domestic orders and 7-14 business days for international orders. Premium delivery options are available at checkout."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can calculate shipping costs at checkout."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unused items in their original packaging. Custom orders are non-returnable. Contact our customer service for return authorization."
  },
  {
    question: "Are your furniture items customizable?",
    answer: "Yes, many of our furniture pieces can be customized in terms of fabric, color, and size. Contact our design team for customization options."
  },
  {
    question: "Do you offer assembly services?",
    answer: "Yes, we offer professional assembly services for an additional fee. You can select this option during checkout."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. Payment plans are available through Klarna."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order through your account on our website."
  },
  {
    question: "Do you offer warranty on your products?",
    answer: "Yes, all our furniture comes with a 1-year warranty against manufacturing defects. Some items have extended warranty options available."
  }
];

const FAQComponent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-16">
      <h1 style={{ fontFamily: 'ClashDisplay' }} className="text-3xl font-normal text-[#2A254B] mb-12 text-center">
        Frequently Asked Questions
      </h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:gap-8">
        {faqData.map((faq, index) => (
          <div 
            key={index}
            className="border border-[#2A254B] rounded-lg overflow-hidden transition-all duration-300"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-[#2A254B]">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-[#2A254B]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#2A254B]" />
              )}
            </button>
            
            <div 
              className={`px-6 transition-all duration-300 ${
                openIndex === index 
                  ? 'max-h-[500px] py-4 opacity-100' 
                  : 'max-h-0 py-0 opacity-0'
              }`}
            >
              <p className="text-[#505977]">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQComponent;
