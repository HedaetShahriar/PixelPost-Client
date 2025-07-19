// Pages/Home/AnnouncementsSection.jsx
import React from 'react';
import { Megaphone } from 'lucide-react';

// Placeholder announcements - will be fetched from API
const announcements = [
    { id: 1, title: 'New Feature: Post Reactions!', description: 'You can now react to posts with emojis.' },
    { id: 2, title: 'Community Guidelines Update', description: 'We have updated our community guidelines. Please review them.' },
];

const AnnouncementsSection = () => {
    // In the final version, this component will not render if announcements.length is 0
    if (announcements.length === 0) {
        return null;
    }

    return (
        <div className="bg-base-200 border-l-4 border-primary p-4 rounded-md my-12" role="alert">
            <div className="flex">
                <div className="py-1">
                    <Megaphone className="h-6 w-6 text-secondary mr-4" />
                </div>
                <div>
                    <p className="font-bold">Announcements ({announcements.length})</p>
                    <ul className="list-disc pl-5 mt-2">
                        {announcements.map(ann => (
                           <li key={ann.id} className="text-sm">{ann.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementsSection;
