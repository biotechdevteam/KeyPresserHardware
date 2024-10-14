import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, BookmarkCheck, Info, MessageCircle, ThumbsUp } from "lucide-react";
import Typewriter from "../type-writer/TypeWriter";

const triggerPhrases = [
  "Love this blog?",
  "Interested in more like this?",
  "Subscribe for updates!",
];

const SubscribeDialog: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showSubscribeButton, setShowSubscribeButton] = useState(false);

  const handleSubscribe = () => {
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  // Callback when Typewriter completes all phrases
  const handleTypewriterComplete = () => {
    setShowSubscribeButton(true);
    setTimeout(() => {
      setShowSubscribeButton(false); // Hide after 10 seconds
    }, 10000);
  };

  return (
    <div>
      {/* Button that opens the dialog, fixed at the bottom right */}
      <div className="fixed top-[14vh] right-4">
        <Dialog>
          <DialogTrigger asChild>
            {showSubscribeButton ? (
              <Button className="px-4 py-2 text-white bg-primary animate-beep">
                <Bell width={30} height={40} />
                Subscribe
              </Button>
            ) : (
              <p className="px-4 py-2 text-white bg-primary flex justify-center items-center gap-3">
                <ThumbsUp width={30} height={40} />
                <Typewriter
                  phrases={triggerPhrases}
                  onComplete={handleTypewriterComplete}
                />
              </p>
            )}
          </DialogTrigger>

          {/* Dialog Content */}
          <DialogContent className="sm:max-w-lg max-w-full mx-auto">
            <DialogHeader>
              <DialogTitle>Subscribe to Our Newsletter</DialogTitle>
              <DialogDescription>
                Get the latest updates and news.
              </DialogDescription>
            </DialogHeader>

            {/* Email input and subscribe button */}
            <div className="mt-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              <Button
                className="w-full mt-4 text-white bg-primary"
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </div>

            {/* Close button */}
            <DialogClose asChild>
              <Button variant="outline" className="w-full mt-4">
                Close
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SubscribeDialog;
