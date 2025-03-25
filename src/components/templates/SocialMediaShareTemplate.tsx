"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Copy,
  Check,
  Image as ImageIcon,
  Edit,
  Smile,
} from "lucide-react";

type SocialPlatform = "twitter" | "facebook" | "linkedin" | "instagram";

interface SocialMediaTemplateProps {
  donorName?: string;
  amount?: number;
  isMonthly?: boolean;
}

const SocialMediaShareTemplate: React.FC<SocialMediaTemplateProps> = ({
  donorName = "",
  amount = 0,
  isMonthly = false,
}) => {
  const [selectedPlatform, setSelectedPlatform] =
    useState<SocialPlatform>("twitter");
  const [copied, setCopied] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

  // Default templates for each platform
  const getDefaultTemplate = (platform: SocialPlatform): string => {
    const baseMessage = `I just ${
      isMonthly ? "became a monthly supporter" : "donated"
    } ${
      amount ? `$${amount}` : ""
    } to support groundbreaking research in biotechnology! Join me in making a difference! #SupportScience #Biotechnology #BioTecUniverse #BTverse`;

    switch (platform) {
      case "twitter":
        return `${baseMessage} ${websiteUrl}/donate`;
      case "facebook":
        return `I'm proud to announce that I ${
          isMonthly ? "became a monthly supporter" : "donated"
        } ${
          amount ? `$${amount}` : ""
        } to help drive innovation in biotechnology research.\n\nEvery contribution helps fund important projects and educational programs that will shape our future.\n\nJoin me in supporting this important cause! #SupportScience #BioTecUniverse #BTverse\n\n${websiteUrl}/donate`;
      case "linkedin":
        return `I'm pleased to share that I've ${
          isMonthly ? "become a monthly supporter" : "made a donation"
        } to an organization advancing biotechnology research and education.\n\nInvesting in science and innovation is something I'm passionate about, and I encourage my network to consider supporting this cause as well.\n\n#SupportScience #Innovation #Biotechnology #BioTecUniverse #BTverse\n\n${websiteUrl}/donate`;
      case "instagram":
        return `I just ${
          isMonthly ? "became a monthly supporter" : "donated"
        } to help advance biotechnology research and education! 🧬🔬\n\nEvery contribution helps fund important projects that will shape our future.\n\n#SupportScience #Biotechnology #Innovation #Research #Science #MakingADifference #BioTecUniverse #BTverse`;
      default:
        return baseMessage;
    }
  };

  const [templates, setTemplates] = useState({
    twitter: getDefaultTemplate("twitter"),
    facebook: getDefaultTemplate("facebook"),
    linkedin: getDefaultTemplate("linkedin"),
    instagram: getDefaultTemplate("instagram"),
  });

  // Initialize custom message when platform changes
  React.useEffect(() => {
    setCustomMessage(templates[selectedPlatform]);
  }, [selectedPlatform, templates]);

  // Function to copy text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(customMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to share directly if Web Share API is available
  const shareContent = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "I just donated to support biotechnology research!",
          text: customMessage,
          url: `${websiteUrl}/donate`,
        })
        .catch(console.error);
    } else {
      // Fallback - open in new window
      const url = getPlatformUrl();
      if (url) window.open(url, "_blank");
    }
  };

  // Get sharing URL for each platform
  const getPlatformUrl = (): string | null => {
    const encodedText = encodeURIComponent(customMessage);
    const encodedUrl = encodeURIComponent(`${websiteUrl}/donate`);

    switch (selectedPlatform) {
      case "twitter":
        return `https://twitter.com/intent/tweet?text=${encodedText}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      case "instagram":
        // Instagram doesn't support direct sharing via URL
        return null;
      default:
        return null;
    }
  };

  // Function to save edited template
  const saveTemplate = () => {
    setTemplates((prev) => ({
      ...prev,
      [selectedPlatform]: customMessage,
    }));
    setEditMode(false);
  };

  // Platform-specific UI elements
  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "facebook":
        return <Facebook className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      case "instagram":
        return <Instagram className="h-5 w-5" />;
    }
  };

  const getPlatformColor = (platform: SocialPlatform) => {
    switch (platform) {
      case "twitter":
        return "bg-[#1DA1F2] hover:bg-[#1a94e2]";
      case "facebook":
        return "bg-[#4267B2] hover:bg-[#3b5d9f]";
      case "linkedin":
        return "bg-[#0A66C2] hover:bg-[#0959af]";
      case "instagram":
        return "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-90";
    }
  };

  const getPlatformName = (platform: SocialPlatform) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  // Preview component for social media posts
  const SocialPreview = () => {
    return (
      <div className="border rounded-xl overflow-hidden max-w-md mx-auto">
        <div className="flex items-center gap-3 p-3 border-b bg-muted/90">
          {getPlatformIcon(selectedPlatform)}
          <span className="font-medium">
            {getPlatformName(selectedPlatform)}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="font-bold text-indigo-600">
                {donorName ? donorName.charAt(0).toUpperCase() : "Y"}
              </span>
            </div>
            <div>
              <div className="font-medium">{donorName || "You"}</div>
              <div className="text-xs text-gray-500">Just now</div>
            </div>
          </div>
          <div className="whitespace-pre-wrap text-sm">{customMessage}</div>
          {selectedPlatform === "facebook" ||
          selectedPlatform === "linkedin" ||
          selectedPlatform === "instagram" ? (
            <div className="mt-3 rounded-lg overflow-hidden border bg-muted/90">
              <div className="aspect-video bg-indigo-100 flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-indigo-300" />
              </div>
              <div className="p-3">
                <div className="font-medium text-sm">Support BTverse</div>
                <div className="text-xs text-gray-500 mt-1">
                  www.biotecuniverse.com
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="mt-6 px-6 py-2 flex items-center gap-2 mx-auto hover:bg-opacity-90"
        >
          <Share2 className="h-4 w-4" />
          Share on Social Media
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl font-bold">
            Share Your Donation
          </DialogTitle>
          <DialogDescription>
            Let your network know about your contribution and inspire others to
            join the cause.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="twitter"
          value={selectedPlatform}
          onValueChange={(value) =>
            setSelectedPlatform(value as SocialPlatform)
          }
        >
          <div className="px-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="twitter" className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                <span className="hidden sm:inline">Twitter</span>
              </TabsTrigger>
              <TabsTrigger value="facebook" className="flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                <span className="hidden sm:inline">Facebook</span>
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </TabsTrigger>
              <TabsTrigger
                value="instagram"
                className="flex items-center gap-2"
              >
                <Instagram className="h-4 w-4" />
                <span className="hidden sm:inline">Instagram</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="px-6 py-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between">
                      <span>Your Message</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() =>
                          editMode ? saveTemplate() : setEditMode(true)
                        }
                      >
                        {editMode ? (
                          <>
                            <Check className="h-3.5 w-3.5 mr-1" />
                            Save
                          </>
                        ) : (
                          <>
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </>
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editMode ? (
                      <Textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        className="min-h-[180px] text-sm"
                      />
                    ) : (
                      <div className="border rounded-md p-3 min-h-[180px] text-sm whitespace-pre-wrap">
                        {customMessage}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCustomMessage(getDefaultTemplate(selectedPlatform))
                      }
                    >
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      className="flex gap-1"
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" /> Copy
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>

                <div className="flex items-center flex-wrap gap-2 mt-4">
                  <Button
                    className={`${getPlatformColor(
                      selectedPlatform
                    )} text-white`}
                    onClick={shareContent}
                  >
                    {getPlatformIcon(selectedPlatform)}
                    <span className="ml-2">
                      Share on {getPlatformName(selectedPlatform)}
                    </span>
                  </Button>

                  {!editMode && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditMode(true)}
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Preview</h3>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={selectedPlatform}
                  transition={{ duration: 0.2 }}
                >
                  <SocialPreview />
                </motion.div>
              </div>
            </div>
          </div>
        </Tabs>

        <DialogFooter className="p-4 bg-muted/90">
          <DialogClose asChild>
            <Button variant="outline">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SocialMediaShareTemplate;
