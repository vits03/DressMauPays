// ReportForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/utils/uploadImage";
import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { redirect, usePathname } from "next/navigation";

import { reportSchema } from "./schema";
import { ReportFormValues } from "./schema";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, ChevronsUpDown } from "lucide-react";
import villages from "./villages";
import { cn } from "@/lib/utils";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import StatusModal from "@/components/loadingModal";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export function ReportForm() {
  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(
    null
  );

  type Location = {
    latitude: number;
    longitude: number;
  };
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    console.log(location);
  }, [location]);
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: "",
      description: "",
      locality: undefined,
      address: "",
      urgency: "medium",
      gps:false,
      image: undefined! as FileList, // Type assertion for initialization
    },
  });
  const onSubmit = async (data: ReportFormValues) => {
    setStatus("loading");
    console.log(data);
    try {
      const files: FileList = data.image;

      // Upload both images
      const uploadPromises = Array.from(files).map((file) =>
        uploadImage(file, `reports/${Date.now()}-${file.name}`)
      );

      const imageURLs = await Promise.all(uploadPromises);

      const auth = getAuth();
      const user = auth.currentUser;
      console.log(user);
      const reportData = {
        userId: user?.uid,
        title: data.title,
        description: data.description,
        locality: data.locality,
        urgency: data.urgency,
        address: data.address,
        gps: location,
        isApproved: false,
        isResolved: false,
        resolutionRequest: false,
        resolvedImageUrl: "",
        resolvedAt: "",
        imageURLs, // array of uploaded image URLs
        createdAt: serverTimestamp(),
      };

      console.log(reportData);
      await addDoc(collection(db, "reports"), reportData);
      setStatus("success");
      setTimeout(() => {
        setStatus(null);
        redirect("/");
      }, 5000);

      console.log("Report uploaded successfully!");
    } catch (error) {
      setStatus("error");
      setTimeout(() => {
        setStatus(null);
      }, 2000);
    }
  };

  const getLocation = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.warn("Geolocation not supported");
        resolve(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          resolve(true);
        },
        (error) => {
          console.warn("Geolocation error:", error);
          resolve(false);
        }
      );
    });
  };

  return (
    <>
      <Form {...form}>
        <StatusModal onClose={() => setStatus(null)} status={status} />{" "}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:w-2/3 mt-8 space-y-8"
        >
          {/* Title (Required) */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problem Title*</FormLabel>
                <FormControl>
                  <Input
                    className="border-1 border-primary"
                    placeholder="Broken streetlight..."
                    {...field}
                  />
                </FormControl>
                <FormMessage /> {/* Shows Zod error */}
              </FormItem>
            )}
          />

          {/* Description (Required) */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description*</FormLabel>
                <FormControl>
                  <Textarea
                    className="border-1 border-primary"
                    placeholder="Describe the issue..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="locality"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Locality</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "min-w-[200px] justify-between hover:bg-primary hover:text-primary-foreground overflow-hidden",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? villages.find(
                              (village) => village.value === field.value
                            )?.label
                          : "Select locality..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search locality..." />
                      <CommandList>
                        <CommandEmpty>No locality found.</CommandEmpty>
                        <CommandGroup>
                          {villages.map((village) => {
                            if (village.value === "selectAll") return null;

                            return (
                              <CommandItem
                                key={village.value}
                                value={village.value}
                                onSelect={() => {
                                  form.setValue("locality", village.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === village.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {village.label}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address*</FormLabel>
                <FormControl>
                  <Input
                    className="border-1 border-primary focus:border-primary"
                    placeholder="Royal Road ,..."
                    {...field}
                  />
                </FormControl>
                <FormMessage /> {/* Shows Zod error */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>How Urgent is this issue?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          className="border-2  border-gray-400"
                          value="low"
                        />
                      </FormControl>
                      <FormLabel className="font-normal  bg-green-600 text-white rounded-2xl py-2 px-3 ">
                        Low
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          className="border-2 border-gray-400"
                          value="medium"
                        />
                      </FormControl>
                      <FormLabel className="font-normal  bg-yellow-600 text-white rounded-2xl py-2 px-3">
                        Medium{" "}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          className="border-2 border-gray-400"
                          value="high"
                        />
                      </FormControl>
                      <FormLabel className="font-normal bg-red-600 text-white rounded-2xl py-2 px-3 ">
                        High
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
  control={form.control}
  name="gps"
  render={({ field }) => {
    const [isChecked, setIsChecked] = useState(!!field.value); // Force boolean

    useEffect(() => {
      setIsChecked(!!field.value);
    }, [field.value]);

    const handleToggle = async (checked: boolean) => {
      setIsChecked(checked); // immediately reflect UI change

      if (checked) {
        const granted = await getLocation().catch(() => false);
        if (granted) {
          field.onChange(true);
        } else {
          setIsChecked(false); // revert if denied
          field.onChange(false);
          setLocation({ latitude: 0, longitude: 0 });
        }
      } else {
        field.onChange(false);
        setLocation({ latitude: 0, longitude: 0 });
      }
    };

    return (
      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <FormLabel className="text-base">Use my Current GPS position</FormLabel>
          <FormDescription>
            Exact GPS coordinates of the reported issues make it easier to locate.
          </FormDescription>
        </div>
        <FormControl>
          <Switch
            checked={isChecked}           // ✅ always boolean
            onCheckedChange={handleToggle}
          />
        </FormControl>
      </FormItem>
    );
  }}
/>

             
          <FormField
  control={form.control}
  name="image"
  render={({ field }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      const fileArray = files ? Array.from(files) : [];

      if (fileArray.length > 2) {
        alert("Please select only up to 2 images.");
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        field.onChange([]);
        setPreviews([]);
        return;
      }

      field.onChange(fileArray);

      // Generate image previews
      const urls = fileArray.map(file => URL.createObjectURL(file));
      setPreviews(urls);
    };

    return (
      <FormItem>
        <FormLabel>Images (max 2)*</FormLabel>
        <FormControl>
<div className="space-y-4">
  {/* File Input Container */}
  <div className="relative">
    <label className="block">
      <span className="sr-only">Choose images</span>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="block w-fit text-sm text-gray-500 border-2 p-2 rounded-full  border-gray-500
          file:mr-4 file:py-2 file:px-3
          file:rounded-full file:border-0
          file:text-xs file:font-semibold
          file:bg-primary file:text-primary-foreground
          hover:file:opacity-80
          focus:outline-none focus:ring-2 "
      />
    </label>
  </div>

  {/* Image Previews */}
  {previews.length > 0 && (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Selected Images ({previews.length})
      </h3>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
        {previews.map((src, idx) => (
          <div key={idx} className="relative aspect-square">
            <img
              src={src}
              alt={`preview-${idx}`}
              className="w-full h-full object-cover rounded-lg border border-gray-200 shadow-sm"
            />
          </div>
        ))}
      </div>
    </div>
  )}
</div>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>

      


          <Button type="submit">Submit Report</Button>
        </form>
      </Form>
    </>
  );
}
