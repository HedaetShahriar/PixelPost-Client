// Pages/Home/TagsSection.jsx
import React from 'react';

// Placeholder tags - will be fetched from API
const tags = ['tech', 'lifestyle', 'health', 'programming', 'design', 'art', 'science', 'travel'];

const TagsSection = () => {
    return (
        <div className="py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Explore Topics by Tag</h2>
            <div className="flex flex-wrap justify-center gap-2">
                {tags.map(tag => (
                    <button key={tag} className="btn btn-outline btn-primary btn-sm capitalize">
                        #{tag}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TagsSection;
