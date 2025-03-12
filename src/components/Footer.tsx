import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, FileText, ArrowUp } from 'lucide-react';

export default function Footer() {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto hidden md:block">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">FryLyle</h3>
                        <p className="text-gray-600 mb-4">
                            Delivering happiness to your doorstep, one meal at a time.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-orange-500">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-orange-500">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-orange-500">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-orange-500">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-gray-600 hover:text-orange-500">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="text-gray-600 hover:text-orange-500">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-gray-600 hover:text-orange-500 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    <span>Blog</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/partner" className="text-gray-600 hover:text-orange-500">
                                    Become a Partner
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/help" className="text-gray-600 hover:text-orange-500">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-gray-600 hover:text-orange-500">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-gray-600 hover:text-orange-500">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-600 hover:text-orange-500">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-600">
                                <Mail className="w-5 h-5 mr-2" />
                                <a href="mailto:support@frylyle.com" className="hover:text-orange-500">
                                    support@frylyle.com
                                </a>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Phone className="w-5 h-5 mr-2" />
                                <a href="tel:1-800-123-4567" className="hover:text-orange-500">
                                    1-800-123-4567
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-600 text-sm">
                            © {new Date().getFullYear()} FryLyle. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link to="/privacy" className="text-gray-600 hover:text-orange-500 text-sm">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-600 hover:text-orange-500 text-sm">
                                Terms of Service
                            </Link>
                            <Link to="/cookies" className="text-gray-600 hover:text-orange-500 text-sm">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Back to Top Button */}
                {showBackToTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors z-50"
                        aria-label="Back to top"
                    >
                        <ArrowUp className="w-6 h-6" />
                    </button>
                )}
            </div>
        </footer>
    );
} 