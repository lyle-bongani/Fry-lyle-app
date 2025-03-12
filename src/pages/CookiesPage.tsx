import React from 'react';

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
      <div className="prose prose-orange max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: March 15, 2024
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies</h2>
          <p className="text-gray-600 mb-4">
            Cookies are small text files that are stored on your device when you visit our website.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>To remember your preferences</li>
            <li>To keep you signed in</li>
            <li>To understand how you use our service</li>
            <li>To improve your experience</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
