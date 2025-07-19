import z from "zod"

export const schoolSchema = z.object({
  name: z
    .string({ message: "School name must be a string" })
    .min(3, { message: "School name must be at least 3 characters long" })
    .max(100, { message: "School name can't exceed 100 characters" }),

  email: z
    .string({ message: "Email must be a string" })
    .email({ message: "Invalid email format" }),

  password: z
    .string({ message: "Password must be a string" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password is too long" }),

  address: z
    .string({ message: "Address must be a string" })
    .min(10, { message: "Address must be at least 10 characters" }),

  phoneNumbers: z
    .array(
      z
        .string({ message: "Phone number must be a string" })
        .regex(/^\+?\d{7,15}$/, {
          message: "Phone number must be a valid international number",
        })
    )
    .nonempty({ message: "At least one phone number is required" }),
})
