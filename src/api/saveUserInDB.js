import axios from "axios";

export const getCloudinaryUrl = async (data, folder = 'users') => {
    const imageFile = data.photoURL[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("folder", `PixelPost/${folder}`);
    if (folder === 'users') {
        formData.append("public_id", `${data.name}_profile`);
    } else {
        formData.append("public_id", `${data.name}_${Date.now()}`);
    }
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    const { data: cloudinaryData } = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData);

    return cloudinaryData?.secure_url;
};

export const saveUserInDB = async (userData) => {
     await axios.post(`${import.meta.env.VITE_API_URL}/user`, userData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    // console.log("User saved in DB:", data);
};
