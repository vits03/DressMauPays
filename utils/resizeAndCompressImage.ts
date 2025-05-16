import imageCompression from "browser-image-compression";

export const resizeAndCompressImage = async (file: File): Promise<File> => {
  const options = {
    maxWidthOrHeight: 800,
    maxSizeMB: 0.5, // optional, compress to 1MB max
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Image compression failed:", error);
    throw error;
  }
};
