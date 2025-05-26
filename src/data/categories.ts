import React from 'react';
import { Sandwich, Pizza, Utensils, Salad, Soup, Soup as Bowl, Apple, IceCream } from 'lucide-react';

export interface Category {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    color: string;
}

export const categories: Category[] = [
    {
        id: 'burgers',
        name: 'Burgers',
        icon: Sandwich,
        description: 'Juicy burgers and sandwiches',
        color: 'bg-orange-500'
    },
    {
        id: 'pizza',
        name: 'Pizza',
        icon: Pizza,
        description: 'Fresh-baked pizzas',
        color: 'bg-red-500'
    },
    {
        id: 'sushi',
        name: 'Sushi',
        icon: Utensils,
        description: 'Fresh sushi and Japanese cuisine',
        color: 'bg-blue-500'
    },
    {
        id: 'salads',
        name: 'Salads',
        icon: Salad,
        description: 'Fresh and healthy salads',
        color: 'bg-green-500'
    },
    {
        id: 'mexican',
        name: 'Mexican',
        icon: Soup,
        description: 'Authentic Mexican dishes',
        color: 'bg-yellow-500'
    },
    {
        id: 'vietnamese',
        name: 'Vietnamese',
        icon: Soup,
        description: 'Traditional Vietnamese cuisine',
        color: 'bg-purple-500'
    },
    {
        id: 'healthy',
        name: 'Healthy',
        icon: Apple,
        description: 'Nutritious and balanced meals',
        color: 'bg-emerald-500'
    },
    {
        id: 'desserts',
        name: 'Desserts',
        icon: IceCream,
        description: 'Sweet treats and desserts',
        color: 'bg-pink-500'
    }
]; 