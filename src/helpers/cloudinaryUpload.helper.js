/** @format */
export const uploadToCloudinary = async (fileOrFiles) => {
  try {
    const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];

    const cloudinaryUploads = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "shafiq");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Cloudinary upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.secure_url;
      })
    );

    return cloudinaryUploads.length === 1
      ? cloudinaryUploads[0]
      : cloudinaryUploads;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};
