import { MenuItem } from '../types';

export const menuItems: { [key: string]: MenuItem[] } = {
    'burger-palace': [
        {
            id: 'classic-burger',
            name: 'Classic Burger',
            description: 'Fresh beef patty with lettuce, tomato, onions, and our special sauce',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
            category: 'Burgers',
            popular: true,
            spicy: false,
            vegetarian: false,
            allergens: ['gluten', 'dairy']
        },
        {
            id: 'double-cheese-burger',
            name: 'Double Cheese Burger',
            description: 'Two beef patties with double cheese, pickles, and burger sauce',
            price: 15.99,
            image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b',
            category: 'Burgers',
            popular: true,
            spicy: false,
            vegetarian: false,
            allergens: ['gluten', 'dairy']
        },
        {
            id: 'veggie-burger',
            name: 'Veggie Supreme',
            description: 'Plant-based patty with avocado, roasted peppers, and vegan mayo',
            price: 13.99,
            image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707',
            category: 'Burgers',
            popular: false,
            spicy: false,
            vegetarian: true,
            allergens: ['gluten']
        }
    ],
    'sushi-master': [
        {
            id: 'california-roll',
            name: 'California Roll',
            description: 'Crab meat, avocado, cucumber wrapped in sushi rice and seaweed',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
            category: 'Rolls',
            popular: true,
            spicy: false,
            vegetarian: false,
            allergens: ['shellfish']
        },
        {
            id: 'spicy-tuna',
            name: 'Spicy Tuna Roll',
            description: 'Fresh tuna with spicy mayo and cucumber',
            price: 16.99,
            image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351',
            category: 'Rolls',
            popular: true,
            spicy: true,
            vegetarian: false,
            allergens: ['fish']
        }
    ]
}; 