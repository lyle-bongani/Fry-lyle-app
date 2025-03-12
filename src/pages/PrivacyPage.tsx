import React from 'react';

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <div className="prose prose-orange max-w-none">
                <p className="text-gray-600 mb-6">
                    Last updated: March 15, 2024
                </p>
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                    <p className="text-gray-600 mb-4">
                        We collect information that you provide directly to us, including when you create an account,
                        place an order, or contact us for support.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li>To process and deliver your orders</li>
                        <li>To provide customer support</li>
                        <li>To send you important updates about our service</li>
                        <li>To improve our services</li>
                    </ul>
                </section>
            </div>
        </div>
    );
} 