import React from 'react';

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">About Fly Foods</h1>
            <div className="prose prose-orange max-w-none">
                <p className="text-gray-600 mb-6">
                    Fly Foods is your premier food delivery platform, connecting hungry customers with the best local restaurants.
                    Founded in 2024, we've been on a mission to transform the way people experience food delivery.
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                    To deliver not just food, but moments of joy and satisfaction to every customer, while supporting local restaurants and creating opportunities for delivery partners.
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Values</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Customer First: Your satisfaction is our top priority</li>
                    <li>Quality: We partner with only the best restaurants</li>
                    <li>Speed: Quick and reliable delivery</li>
                    <li>Community: Supporting local businesses</li>
                </ul>
            </div>
        </div>
    );
} 