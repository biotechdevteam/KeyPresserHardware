import { z } from "zod";

export const SettingsSchema = z.object({
  user_id: z.string().min(1, "User ID is required"),
  setting_key: z.enum(["theme", "language", "notifications"], {
    errorMap: () => ({ message: "Invalid setting key" }),
  }),
  setting_value: z.string().min(1, "Setting value is required"),
  notification_preferences: z.boolean(),
});

export type Settings = z.infer<typeof SettingsSchema>;
