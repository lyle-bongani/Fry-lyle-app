import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { ChevronLeft } from 'lucide-react';

interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    };
}

type StatColors = {
    [key: string]: string;  // Add index signature
};

type TypeColors = {
    [key: string]: {
        background: string;
        text: string;
        lighter: string;
    };
};

export default function PokemonDetail() {
    const { id } = useParams();
    const [pokemon, setPokemon] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    const typeColors: TypeColors = {
        normal: { background: 'bg-gray-100', text: 'text-gray-800', lighter: 'bg-gray-50' },
        fire: { background: 'bg-orange-100', text: 'text-orange-800', lighter: 'bg-orange-50' },
        water: { background: 'bg-blue-100', text: 'text-blue-800', lighter: 'bg-blue-50' },
        electric: { background: 'bg-yellow-100', text: 'text-yellow-800', lighter: 'bg-yellow-50' },
        grass: { background: 'bg-green-100', text: 'text-green-800', lighter: 'bg-green-50' },
        ice: { background: 'bg-cyan-100', text: 'text-cyan-800', lighter: 'bg-cyan-50' },
        fighting: { background: 'bg-red-100', text: 'text-red-800', lighter: 'bg-red-50' },
        poison: { background: 'bg-purple-100', text: 'text-purple-800', lighter: 'bg-purple-50' },
        ground: { background: 'bg-amber-100', text: 'text-amber-800', lighter: 'bg-amber-50' },
        flying: { background: 'bg-indigo-100', text: 'text-indigo-800', lighter: 'bg-indigo-50' },
        psychic: { background: 'bg-pink-100', text: 'text-pink-800', lighter: 'bg-pink-50' },
        bug: { background: 'bg-lime-100', text: 'text-lime-800', lighter: 'bg-lime-50' },
        rock: { background: 'bg-stone-100', text: 'text-stone-800', lighter: 'bg-stone-50' },
        ghost: { background: 'bg-violet-100', text: 'text-violet-800', lighter: 'bg-violet-50' },
        dragon: { background: 'bg-indigo-100', text: 'text-indigo-800', lighter: 'bg-indigo-50' },
        dark: { background: 'bg-neutral-100', text: 'text-neutral-800', lighter: 'bg-neutral-50' },
        steel: { background: 'bg-zinc-100', text: 'text-zinc-800', lighter: 'bg-zinc-50' },
        fairy: { background: 'bg-rose-100', text: 'text-rose-800', lighter: 'bg-rose-50' }
    };

    React.useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(data => {
                setPokemon(data);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <PageLayout showBackButton>
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                </div>
            </PageLayout>
        );
    }

    const primaryType = pokemon.types[0].type.name;
    const typeColor = typeColors[primaryType];

    return (
        <div className={`min-h-screen ${typeColor.background}`}>
            {/* Back Button */}
            <div className="sticky top-0 z-10 p-4">
                <Link
                    to="/pokemon"
                    className={`inline-flex items-center ${typeColor.text} hover:opacity-75 transition-opacity`}
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to List</span>
                </Link>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className={`${typeColor.lighter} rounded-3xl shadow-lg overflow-hidden`}>
                    {/* Pokemon Header */}
                    <div className="p-8 text-center">
                        <img
                            src={pokemon.sprites.other['official-artwork'].front_default}
                            alt={pokemon.name}
                            className="w-48 h-48 mx-auto mb-6"
                        />
                        <h1 className={`text-4xl font-bold capitalize mb-2 ${typeColor.text}`}>
                            {pokemon.name}
                        </h1>
                        <div className="text-xl text-gray-500 mb-4">#{pokemon.id.toString().padStart(3, '0')}</div>
                        <div className="flex justify-center gap-2">
                            {pokemon.types.map((type: any) => (
                                <span
                                    key={type.type.name}
                                    className={`px-4 py-1 rounded-full text-sm font-medium ${typeColors[type.type.name].background} ${typeColors[type.type.name].text}`}
                                >
                                    {type.type.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className={`${typeColor.background} p-8`}>
                        <h2 className={`text-2xl font-bold mb-6 ${typeColor.text}`}>Base Stats</h2>
                        <div className="grid gap-4 max-w-md mx-auto">
                            {pokemon.stats.map((stat: PokemonStat) => (
                                <div key={stat.stat.name}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className={`capitalize font-medium ${typeColor.text}`}>
                                            {stat.stat.name.replace('-', ' ')}
                                        </span>
                                        <span className={typeColor.text}>{stat.base_stat}</span>
                                    </div>
                                    <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${typeColors[primaryType].background} opacity-75`}
                                            style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Characteristics */}
                    <div className="p-8">
                        <h2 className={`text-2xl font-bold mb-6 ${typeColor.text}`}>Characteristics</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Height</p>
                                <p className={`text-lg font-medium ${typeColor.text}`}>{pokemon.height / 10} m</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Weight</p>
                                <p className={`text-lg font-medium ${typeColor.text}`}>{pokemon.weight / 10} kg</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Base Experience</p>
                                <p className={`text-lg font-medium ${typeColor.text}`}>{pokemon.base_experience}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 