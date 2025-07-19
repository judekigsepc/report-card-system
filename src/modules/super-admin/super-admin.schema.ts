import z from "zod";

export const superAdminSchema = z.object({
      userName: z.string(),
      password: z.string()
})