"use client"
import React from "react";
import { Camera, AlertCircle, Home, CircleChevronLeft } from "lucide-react";
import { ReportForm } from "@/components/ReportForm";
import { loginAnonymously } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import  { useEffect} from 'react'
import Link from "next/link";
const AddReport = () => {

 useEffect(() =>{
  loginAnonymously()
 },[])
  return (
    <div className="w-95/100 md:border-x-2 border-gray-500 p-5 min-h-screen mx-auto max-w-6xl md:w-9/10">

    <div>
      <Link href="/">
          {" "}
          <div className='flex gap-2'>
              <CircleChevronLeft />
              <p>Back</p>
          </div>
        </Link>
        
      <h2 className="text-3xl font-semibold mb-5 mt-7 ">Create Report</h2>

      <div>
        <ReportForm />{" "}
      </div>
    </div>
    </div>
  );
};

export default AddReport;
