import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PokemonCardProps {
    id: number;
    name: string;
    image: string;
    types: string[];
}

export default function PokemonCard({ id, name, image, types }: PokemonCardProps) {
    const navigate = useNavigate();

    const getTypeColor = (type: string): string => {
        const colors: { [key: string]: string } = {
            normal: 'bg-gray-400',
            fire: 'bg-red-500',
            water: 'bg-blue-500',
            electric: 'bg-yellow-400',
            grass: 'bg-green-500',
            ice: 'bg-blue-300',
            fighting: 'bg-red-600',
            poison: 'bg-purple-500',
            ground: 'bg-yellow-600',
            flying: 'bg-indigo-400',
            psychic: 'bg-pink-500',
            bug: 'bg-lime-500',
            rock: 'bg-yellow-800',
            ghost: 'bg-purple-700',
            dragon: 'bg-indigo-600',
            dark: 'bg-gray-800',
            steel: 'bg-gray-500',
            fairy: 'bg-pink-400',
        };
        return colors[type] || 'bg-gray-400';
    };

    return (
        <div
            onClick={() => navigate(`/pokemon/${id}`)}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-105"
        >
            <div className="relative aspect-square p-4">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                />
            </div>
            <div className="p-4 border-t">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {name}
                    </h3>
                    <span className="text-sm text-gray-500">#{id.toString().padStart(3, '0')}</span>
                </div>
                <div className="flex gap-2">
                    {types.map((type) => (
                        <span
                            key={type}
                            className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(type)}`}
                        >
                            {type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
} 