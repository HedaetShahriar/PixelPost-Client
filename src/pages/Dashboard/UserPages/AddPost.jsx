import React from 'react';

const AddPost = () => {
    return (
        <div>
            <h1>Add New Post</h1>
            <form>
                <div>
                    <label>Title:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddPost;