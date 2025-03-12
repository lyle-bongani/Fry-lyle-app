import React from 'react'

export default function FAQPage() {
    const faqs = [
        {
            question: "How do I place an order?",
            answer: "Simply browse restaurants, select your items, add them to cart, and checkout. You can track your order in real-time."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and digital wallets like Apple Pay and Google Pay."
        },
        {
            question: "What if there's an issue with my order?",
            answer: "Contact our 24/7 support team through the app or website. We're here to help resolve any issues."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
