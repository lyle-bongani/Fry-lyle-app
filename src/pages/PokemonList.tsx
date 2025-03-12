import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import PokemonCard from '../components/PokemonCard';

interface Pokemon {
    id: number;
    name: string;
    types: { type: { name: string } }[];
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
}

export default function PokemonList() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
                const data = await response.json();

                const pokemonDetails = await Promise.all(
                    data.results.map(async (p: { url: string }) => {
                        const res = await fetch(p.url);
                        return res.json();
                    })
                );

                setPokemon(pokemonDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    if (loading) {
        return (
            <PageLayout title="Pokemon">
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout title="Pokemon">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {pokemon.map((p) => (
                    <PokemonCard
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        image={p.sprites.other['official-artwork'].front_default}
                        types={p.types.map(t => t.type.name)}
                    />
                ))}
            </div>
        </PageLayout>
    );
} 