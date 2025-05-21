import imageCompression from "browser-image-compression";

export const resizeAndCompressImage = async (file: File): Promise<File> => {
  const options = {
    maxWidthOrHeight: 800,
    maxSizeMB: 0.5,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(compressedFile);
      
      img.onload = async () => {
        // Define our minimum target width (302px instead of exactly 300px)
        const MIN_TARGET_WIDTH = 302;
        
        if (img.width >= MIN_TARGET_WIDTH) {
          URL.revokeObjectURL(url);
          resolve(compressedFile);
          return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          URL.revokeObjectURL(url);
          resolve(compressedFile);
          return;
        }

        // Calculate padding to make width slightly more than 300px
        const paddingEachSide = Math.ceil((MIN_TARGET_WIDTH - img.width) / 2);
        canvas.width = img.width + (paddingEachSide * 2);
        canvas.height = img.height;
        
        // Fill with white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw original image centered
        ctx.drawImage(img, paddingEachSide, 0, img.width, img.height);
        
        canvas.toBlob(async (blob) => {
          URL.revokeObjectURL(url);
          if (!blob) {
            resolve(compressedFile);
            return;
          }
          
          const paddedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          
          resolve(paddedFile);
        }, file.type);
      };
      
      img.src = url;
    });
    
  } catch (error) {
    console.error("Image processing failed:", error);
    throw error;
  }
};