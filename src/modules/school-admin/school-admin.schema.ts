// school-admin validation schema

import z from "zod";

export const schoolAdminSchema = z.object({
    position: z.string({error: "School admin's position is required"})
})