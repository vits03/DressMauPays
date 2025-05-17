"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginAnonymously } from "@/lib/firebase";
import { uploadImage } from "@/utils/uploadImage";
import StatusModal from "./loadingModal";
import { redirect } from "next/navigation";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { doc} from "firebase/firestore";

import { db } from "@/lib/firebase";

const ReportPageUpload = ({id}:{id:string}) => {
  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(
      null
    );
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const  handleUpload = async () => {
    if (!file) return;
    // Implement upload logic here (e.g., to Firebase or server)
    setStatus("loading");
    console.log("Uploading file:", file);
 await loginAnonymously();
    const imagesUrl= await uploadImage(file, `reports/${Date.now()}-${file.name}`)
     console.log(imagesUrl)
    const updatedData = {
      resolutionRequest: true,
      resolvedAt: serverTimestamp(),
      resolvedImageUrl: imagesUrl,
      
    }  
     //save image url in resolutionUrl
     
     
     // change resolution request to true
     // save date to resolvedAt

     //update document with id {id} with object above.
     try{
        const docRef = doc(db,"reports",id);
       await updateDoc(docRef,updatedData);
       console.log("document updated successfully");
       setStatus("success");
         setTimeout(() => {
               setStatus(null);
               redirect("/");
             }, 5000);
     }
     catch (error)
     {
        setStatus("error");
       console.log("error updating document");
     }
   
     //add a diaglog banner until upload is complete( display success or error msg)
     //refresh the page
     //add logic to show another mesage if resolutionRequest is true.


     
  };

  return (
    <div className="flex flex-col gap-4 md:w-2/3 w-full border border-gray-200 rounded-2xl ">
      <div>
        <Label htmlFor="report-photo"></Label>
        <Input
          id="report-photo"
          type="file"
          accept="image/*"
          className=" border-black py-0 "
          onChange={handleFileChange}
        />
      </div>

      {previewUrl && (
        <div className="mt-2">
          <p className="text-sm text-muted-foreground mb-1">Preview:</p>
          <img
            src={previewUrl}
            alt="Preview"
            className="rounded-xl border w-full max-h-64 object-contain"
          />
        </div>
      )}
<StatusModal onClose={() => setStatus(null)} status={status}/>
      <Button onClick={handleUpload} disabled={!file}>
        Upload Photo
      </Button>
    </div>
  );
};

export default ReportPageUpload;

