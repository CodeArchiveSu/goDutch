import { v2 as cloudinary } from "cloudinary";

export const imageUpload = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folder,
    });
    return {
      public_id: result.public_id,
      url: result.secure_url,
    }; //public_id 추가하기
  } catch (e) {
    console.log(e);
  }
};

export const deleteImageFromCloud = async (public_id) => {
  const deleteImage = public_id;

  try {
    const result = await cloudinary.uploader.destroy(deleteImage);
    if (result.result === "ok") {
      console.log("Image deleted successfully:", result);
    } else {
      console.error("Error deleting image:", result);
    }
  } catch (error) {
    console.log("Error deleting image:", error);
  }
};
