import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      <div className="prose prose-orange max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: March 15, 2024
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mb-4">
            By accessing and using Fly Foods' services, you agree to be bound by these Terms of Service.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Service</h2>
          <p className="text-gray-600 mb-4">
            You agree to use the service only for lawful purposes and in accordance with these Terms.
          </p>
        </section>
      </div>
    </div>
  );
} 