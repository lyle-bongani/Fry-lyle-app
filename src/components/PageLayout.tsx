import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface PageLayoutProps {
    children: React.ReactNode;
    title?: string;
    showBackButton?: boolean;
    className?: string;
    fullWidth?: boolean;
}

export default function PageLayout({
    children,
    title,
    showBackButton,
    className = '',
    fullWidth = false
}: PageLayoutProps) {
    const navigate = useNavigate();

    const containerClass = fullWidth ? 'w-full' : 'container mx-auto';

    return (
        <div className={`min-h-screen bg-gray-50 pt-16 ${className}`}>
            {(title || showBackButton) && (
                <div className="sticky top-16 bg-white border-b border-gray-200 z-30">
                    <div className={`${containerClass} px-4`}>
                        <div className="flex items-center h-14">
                            {showBackButton && (
                                <button
                                    onClick={() => navigate(-1)}
                                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full mr-2"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                            )}
                            {title && <h1 className="text-xl font-bold text-gray-900">{title}</h1>}
                        </div>
                    </div>
                </div>
            )}
            <div className={`${containerClass} px-4 py-6`}>
                {children}
            </div>
        </div>
    );
} 