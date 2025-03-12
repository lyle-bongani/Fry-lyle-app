import React from 'react';

export default function BlogPage() {
    const posts = [
        {
            title: "The Future of Food Delivery",
            date: "March 15, 2024",
            excerpt: "Exploring how technology is shaping the future of food delivery services...",
            image: "https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b"
        },
        {
            title: "Top 10 Local Restaurants",
            date: "March 10, 2024",
            excerpt: "Discover the hidden gems in your neighborhood...",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog</h1>
            <div className="grid gap-8 md:grid-cols-2">
                {posts.map((post, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                            <p className="text-gray-500 text-sm mb-3">{post.date}</p>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <button className="text-orange-500 font-medium hover:text-orange-600">
                                Read More →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 