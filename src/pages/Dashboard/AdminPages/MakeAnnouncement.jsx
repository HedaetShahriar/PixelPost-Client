import React from 'react';

const MakeAnnouncement = () => {
    return (
        <div>
            <h1>Make Announcement</h1>
            <form>
                <div>
                    <label>Title:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea></textarea>
                </div>
                <button type="submit">Send Announcement</button>
            </form>
        </div>
    );
};

export default MakeAnnouncement;