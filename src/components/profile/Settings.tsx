"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import useAuth from "@/lib/useAuth";
import { fetchUserSettings, updateUserSettings } from "@/lib/utils/fetchUtils";
import { Sun, Moon, Globe, Bell, Loader2 } from "lucide-react";

// Form schema for settings
const SettingsFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: z.enum(["en", "fr"]),
  notifications: z.boolean(),
});

type SettingsFormData = z.infer<typeof SettingsFormSchema>;

interface SettingsProps {
  userId: string;
}

const Settings: React.FC<SettingsProps> = ({ userId }) => {
  const { setTheme, theme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Settings");
  const { loading: authLoading } = useAuth();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: {
      theme: (theme as "light" | "dark" | "system") || "system",
      language: (locale as "en" | "fr") || "en",
      notifications: true,
    },
  });

  // Fetch user settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await fetchUserSettings(userId);
        const themeSetting = settings.find((s) => s.setting_key === "theme");
        const languageSetting = settings.find(
          (s) => s.setting_key === "language"
        );
        const notificationSetting = settings.find(
          (s) => s.setting_key === "notifications"
        );

        setValue(
          "theme",
          (themeSetting?.setting_value as "light" | "dark" | "system") ||
            "system"
        );
        setValue(
          "language",
          (languageSetting?.setting_value as "en" | "fr") || "en"
        );
        setValue(
          "notifications",
          notificationSetting?.notification_preferences ?? true
        );
        reset({
          theme:
            (themeSetting?.setting_value as "light" | "dark" | "system") ||
            "system",
          language: (languageSetting?.setting_value as "en" | "fr") || "en",
          notifications: notificationSetting?.notification_preferences ?? true,
        });
      } catch (error) {
        toast.error(t("fetchError"));
      }
    };

    loadSettings();
  }, [userId, setValue, reset, t]);

  // Watch for form changes
  useEffect(() => {
    const subscription = watch(() => setIsFormDirty(true));
    return () => subscription.unsubscribe();
  }, [watch]);

  // Handle form submission
  const onSubmit = async (data: SettingsFormData) => {
    setIsSubmitting(true);
    try {
      // Update theme
      await updateUserSettings({
        user_id: userId,
        setting_key: "theme",
        setting_value: data.theme,
        notification_preferences: data.notifications,
      });
      setTheme(data.theme);

      // Update language
      await updateUserSettings({
        user_id: userId,
        setting_key: "language",
        setting_value: data.language,
        notification_preferences: data.notifications,
      });
      const newPath = pathname.replace(/^\/(en|fr)/, `/${data.language}`);
      router.push(newPath);

      // Update notifications
      await updateUserSettings({
        user_id: userId,
        setting_key: "notifications",
        setting_value: data.notifications ? "enabled" : "disabled",
        notification_preferences: data.notifications,
      });

      toast.success(t("saveSuccess"));
      setIsFormDirty(false);
      reset(data);
    } catch (error) {
      toast.error(t("saveError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Card className="shadow-xl border-border overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-muted/30 to-muted/10">
          <CardTitle className="text-2xl font-bold">
            {t("title")}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="pt-6 space-y-8">
            {/* Appearance Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">{t("appearance")}</h2>
              </div>
              <Separator className="bg-muted/50" />
              <div className="space-y-2">
                <Label htmlFor="theme" className="font-medium text-foreground">
                  {t("theme.label")}
                </Label>
                <Select
                  onValueChange={(value) => {
                    setValue("theme", value as "light" | "dark" | "system");
                    setIsFormDirty(true);
                  }}
                  defaultValue={watch("theme")}
                >
                  <SelectTrigger id="theme" className="w-full sm:w-64">
                    <SelectValue placeholder={t("theme.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        {t("theme.light")}
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        {t("theme.dark")}
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {t("theme.system")}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.theme && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-destructive"
                  >
                    {errors.theme.message}
                  </motion.p>
                )}
              </div>
            </motion.section>

            {/* Language Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">{t("language")}</h2>
              </div>
              <Separator className="bg-muted/50" />
              <div className="space-y-2">
                <Label
                  htmlFor="language"
                  className="font-medium text-foreground"
                >
                  {t("language2.label")}
                </Label>
                <Select
                  onValueChange={(value) => {
                    setValue("language", value as "en" | "fr");
                    setIsFormDirty(true);
                  }}
                  defaultValue={watch("language")}
                >
                  <SelectTrigger id="language" className="w-full sm:w-64">
                    <SelectValue placeholder={t("language2.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">{t("language2.english")}</SelectItem>
                    <SelectItem value="fr">{t("language2.french")}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.language && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-destructive"
                  >
                    {errors.language.message}
                  </motion.p>
                )}
              </div>
            </motion.section>

            {/* Notifications Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">{t("notifications")}</h2>
              </div>
              <Separator className="bg-muted/50" />
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="notifications"
                  className="font-medium text-foreground"
                >
                  {t("notifications2.label")}
                </Label>
                <Switch
                  id="notifications"
                  checked={watch("notifications")}
                  onCheckedChange={(checked) => {
                    setValue("notifications", checked);
                    setIsFormDirty(true);
                  }}
                  aria-label={t("notifications2.label")}
                />
              </div>
              {errors.notifications && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive"
                >
                  {errors.notifications.message}
                </motion.p>
              )}
            </motion.section>
          </CardContent>

          <CardFooter className="flex justify-end gap-2 border-t border-border bg-muted/10 p-4 sm:p-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setIsFormDirty(false);
              }}
              disabled={authLoading || isSubmitting || !isFormDirty}
              className="px-4 sm:px-6"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              disabled={authLoading || isSubmitting || !isFormDirty}
              className="px-4 sm:px-6 flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("save")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Settings;
