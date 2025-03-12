import React from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, FileQuestion } from 'lucide-react';

export default function HelpCenter() {
    const faqs = [
        {
            question: "How do I track my order?",
            answer: "You can track your order in real-time by clicking on 'Orders' in your profile and selecting the active order."
        },
        {
            question: "What if I need to cancel my order?",
            answer: "You can cancel your order within 5 minutes of placing it. Go to 'Orders' and click the cancel button on your active order."
        },
        {
            question: "How do I get a refund?",
            answer: "If you're eligible for a refund, it will be processed automatically to your original payment method within 5-7 business days."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Help Center</h1>

            {/* Contact Options */}
            <div className="grid gap-6 md:grid-cols-3 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <Phone className="w-8 h-8 text-orange-500 mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                    <p className="text-gray-600 mb-4">Available 24/7</p>
                    <a href="tel:1-800-123-4567" className="text-orange-500 hover:text-orange-600">
                        1-800-123-4567
                    </a>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <MessageCircle className="w-8 h-8 text-orange-500 mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                    <p className="text-gray-600 mb-4">Chat with our support team</p>
                    <button className="text-orange-500 hover:text-orange-600">
                        Start Chat
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <Mail className="w-8 h-8 text-orange-500 mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                    <p className="text-gray-600 mb-4">Get help via email</p>
                    <a href="mailto:support@frylyle.com" className="text-orange-500 hover:text-orange-600">
                        support@frylyle.com
                    </a>
                </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                            <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 