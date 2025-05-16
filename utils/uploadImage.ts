import { storage } from "@/lib/firebase";
import imageCompression from "browser-image-compression";
import { resizeAndCompressImage } from "./resizeAndCompressImage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(file: File, path: string): Promise<string> {
  
  const imageRef = ref(storage, path);
  const compressedFile = await resizeAndCompressImage(file);
  const snapshot = await uploadBytes(imageRef, compressedFile);
  return await getDownloadURL(snapshot.ref)
}
