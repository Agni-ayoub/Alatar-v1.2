import { z } from "zod";

export const companySchema = z.object({
    name: z.string()
        .min(3, "Company name must be at least 3 characters")
        .refine(value => value !== "", { message: "Company name cannot be empty" }),

    phone: z
        .union([z.string().optional(), z.null()])
        .refine(
        (value) => !value || /^\+?\d{1,4}([-\s]?\d+)*$/.test(value),
        { message: "Phone must only contain digits, optional: (' + ', spaces, and or ' - ' between digits)" }
        ),

    email: z.string()
        .refine(value => !value || z.string().email().safeParse(value).success, { message: "The email provided is invalid" })
        .nullable(),

    address: z.string().optional().nullable(),
    website: z.string().optional().nullable(),
    long: z.string().optional(),
    lat: z.string().optional(),
    status: z.string().optional(),
});

export const userSchema = z.object({
    
});