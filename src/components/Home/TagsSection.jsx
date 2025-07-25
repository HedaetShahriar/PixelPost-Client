// Pages/Home/TagsSection.jsx
import React from 'react';

const TagsSection = ({tags=[], currentTag, setCurrentTag}) => {
    return (
        <div className="py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Explore Topics by Tag</h2>
            <div className="flex flex-wrap justify-center gap-2">
                <button className={`btn btn-outline btn-primary btn-sm capitalize ${currentTag === null ? 'btn-active' : ''}`} onClick={() => setCurrentTag(null)}>
                    All
                </button>
                {tags.map(tag => (
                    <button key={tag} className={`btn btn-outline btn-primary btn-sm capitalize ${currentTag === tag ? 'btn-active' : ''}`} onClick={() => setCurrentTag(tag)}>
                        #{tag}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TagsSection;
