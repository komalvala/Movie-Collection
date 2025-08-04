import axios from "axios";

export const uploadImage = async (uploadFile) => {
  if (!uploadFile) throw new Error("No file selected");

  const cloudName = "dbfdzih1i";
  const uploadPreset = "wjaninbj"; 

  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error("Image Upload Error:", error.response?.data || error.message);
    throw new Error("Image upload failed");
  }
};
