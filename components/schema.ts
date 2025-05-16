import { z } from "zod";

export const reportSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  locality: z.string({
    required_error: "Please select a region.",
  }),
  gps:z.boolean().default(false).optional(),
  address: z.string().min(5),
  urgency: z.enum(["low", "medium", "high"]),
  image: z.custom<FileList>()
    .refine((files) => files?.length > 0, "Choose upto 2 images")
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, "Max 5MB")
});

export type ReportFormValues = z.infer<typeof reportSchema>;