import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command";
  import villages from "./villages";
  import { cn } from "@/lib/utils";
  
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
// Schema
const FilterSchema = z.object({
  urgency: z.enum(["low", "medium", "high", "all"]),
  sortOrder: z.enum(["ascending", "descending"]),
  locality: z.string(),
});

type FilterFormValues = z.infer<typeof FilterSchema>;
type Filters = {
  village: string | null;
  urgency: string | null;
  order: string | null;
};

type FilterSidebarProps = {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

type MobileFilter = {
  setIsMobileFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FilterFormProps = FilterSidebarProps & MobileFilter;
export default function FilterForm({ setFilters, setIsMobileFilterOpen }: FilterFormProps) {
const form = useForm<FilterFormValues>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      urgency: "all",
      sortOrder: "descending",
      locality:"selectAll"
    },
  });


  const onSubmit = (data: FilterFormValues) => {
    console.log("Filters:", data);
    // Call your filter logic here
    setFilters({
      village: data.locality,
      urgency: data.urgency,
      order: data.sortOrder,
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
                    control={form.control}
                    name="locality"
                    render={({ field }) => (
                      <FormItem className="flex space-y-2 flex-col">
                        <FormLabel>Locality</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                              
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-[200px] justify-between bg-white hover:bg-primary hover:text-primary-foreground ",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? villages.find(
                                      (village) => village.value === field.value
                                    )?.label
                                  : "Select a Locality"}
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
                                          "mr-2 h-4 w-4 text-primary-foreground",
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
        {/* Urgency */}
        <FormField
          control={form.control}
          name="urgency"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Urgency</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        className="border-2 border-gray-400"
                        value="low"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Low</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        className="border-2 border-gray-400"
                        value="medium"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Medium </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        className="border-2 border-gray-400"
                        value="high"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">High</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        className="border-2 border-gray-400"
                        value="all"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">All</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sortOrder"
          render={({ field }) => (



            
            <FormItem className="space-y-3">
              <FormLabel>sort Order</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        className="border-2 border-gray-400"
                        value="ascending"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Ascending</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        className="border-2 border-gray-400"
                        value="descending"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Descending</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" onClick={() => setIsMobileFilterOpen(false)}>Apply Filters</Button>
      </form>
    </Form>
  );
}
