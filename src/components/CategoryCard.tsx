import React from 'react';
import { Category } from '../data/categories';

interface CategoryCardProps {
    category: Category;
    isActive: boolean;
    onClick: () => void;
}

export default function CategoryCard({ category, isActive, onClick }: CategoryCardProps) {
    const Icon = category.icon;

    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 ${isActive
                ? 'bg-orange-50 shadow-md scale-105'
                : 'bg-white hover:bg-orange-50 hover:shadow-sm'
                }`}
        >
            <div className={`${category.color} p-3 rounded-full mb-2 text-white`}>
                <Icon className="w-6 h-6" />
            </div>
            <span className={`text-sm font-medium ${isActive ? 'text-orange-500' : 'text-gray-700'}`}>
                {category.name}
            </span>
            {isActive && (
                <span className="text-xs text-orange-500 mt-1">{category.description}</span>
            )}
        </button>
    );
} 