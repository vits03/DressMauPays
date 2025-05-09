// ReportForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { useRef } from "react"
import { Textarea } from "@/components/ui/textarea";
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
      image: undefined! as FileList, // Type assertion for initialization
    },
  });
  function onSubmit(data: ReportFormValues) {
    console.log(data);
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(data, null, 2));
  }

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
                  <Input className="border-2 border-gray-400"  placeholder="Broken streetlight..." {...field} />
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
                  <Textarea className="border-2 border-gray-400" placeholder="Describe the issue..." {...field} />
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
                          "w-[200px] justify-between",
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
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search locality..." />
                      <CommandList>
                        <CommandEmpty>No locality found.</CommandEmpty>
                        <CommandGroup>
                          {villages.map((village) => (
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
                          ))}
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
                  <Input className="border-2 border-gray-400"  placeholder="Royal Road ,..." {...field} />
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
                        <RadioGroupItem className="border-2  border-gray-400" value="low" />
                      </FormControl>
                      <FormLabel className="font-normal  bg-green-700 text-white rounded-2xl py-2 px-3 ">Low</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem className="border-2 border-gray-400" value="medium" />
                      </FormControl>
                      <FormLabel className="font-normal  bg-orange-600 text-white rounded-2xl py-2 px-3">Medium </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem className="border-2 border-gray-400" value="high" />
                      </FormControl>
                      <FormLabel className="font-normal bg-red-600 text-white rounded-2xl py-2 px-3 ">High</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Image Upload (Required) */}
          <FormField
            control={form.control}
            name="gps"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Use my Current GPS position{" "}
                  </FormLabel>
                  <FormDescription>
                    exact gps coordinates of the reported issues makes it easier
                    to locate.{" "}
                  </FormDescription>
                </div>
                <FormControl>
  <Switch
    checked={field.value}
    onCheckedChange={async (checked) => {
      if (checked) {
        const granted = await getLocation();
        if (granted) {
          field.onChange(true);
        } else {
          // User denied location; reset switch to false
          field.onChange(false);
          setLocation({ latitude: 0, longitude: 0 });
        }
      } else {
        field.onChange(false);
        setLocation({ latitude: 0, longitude: 0 });
      }
    }}
  />
</FormControl>

              </FormItem>
            )}
          />
        <FormField
  control={form.control}
  name="image"
  render={({ field }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <FormItem>
        <FormLabel>Images (max 2)*</FormLabel>
        <FormControl>
          <Input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="py-1 border-2 border-gray px-5 md:w-2/3 w-full"
            onChange={(e) => {
              const files = e.target.files;
              const fileArray = files ? Array.from(files) : [];

              if (fileArray.length > 2) {
                alert("Please select only up to 2 images.");
                if (inputRef.current) {
                  inputRef.current.value = ""; // Clear the input
                }
                field.onChange([]); // Clear field value
                return;
              }

              field.onChange(fileArray);
            }}
          />
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
