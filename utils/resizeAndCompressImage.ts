import imageCompression from "browser-image-compression";

export const resizeAndCompressImage = async (file: File): Promise<File> => {
  const options = {
    maxWidthOrHeight: 800,
    maxSizeMB: 0.5,
    useWebWorker: true,
    fileType: "image/webp",  // Convert to WebP
    initialQuality: 0.8,     // optional: adjust quality (0-1)
  };

  try {
    const compressedFile = await imageCompression(file, options);

    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(compressedFile);

      img.onload = async () => {
        const MIN_TARGET_WIDTH = 302;

        if (img.width >= MIN_TARGET_WIDTH) {
          URL.revokeObjectURL(url);
          resolve(compressedFile);
          return;
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          URL.revokeObjectURL(url);
          resolve(compressedFile);
          return;
        }

        const paddingEachSide = Math.ceil((MIN_TARGET_WIDTH - img.width) / 2);
        canvas.width = img.width + paddingEachSide * 2;
        canvas.height = img.height;

        // Fill with white background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw original image centered
        ctx.drawImage(img, paddingEachSide, 0, img.width, img.height);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (!blob) {
              resolve(compressedFile);
              return;
            }

            const paddedFile = new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
              type: "image/webp",  // Update type to webp
              lastModified: Date.now(),
            });

            resolve(paddedFile);
          },
          "image/webp", // Output format WebP
          0.8 // quality 0-1 (optional)
        );
      };

      img.src = url;
    });
  } catch (error) {
    console.error("Image processing failed:", error);
    throw error;
  }
};
