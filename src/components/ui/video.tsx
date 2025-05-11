import { useState, useEffect, forwardRef, Suspense } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Variants for the video container
const videoVariants = cva("relative overflow-hidden", {
  variants: {
    variant: {
      default: "rounded-md border border-border",
      clean: "",
    },
    size: {
      xs: "aspect-video w-full max-w-xs",
      sm: "aspect-video w-full max-w-sm",
      md: "aspect-video w-full max-w-md",
      lg: "aspect-video w-full max-w-lg",
      xl: "aspect-video w-full max-w-xl",
      "2xl": "aspect-video w-full max-w-2xl",
      full: "aspect-video w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// Skeleton component for loading state
const VideoSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full h-full bg-muted/30 animate-pulse rounded-md flex items-center justify-center",
        className
      )}
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-muted-foreground animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Interface for the video props
export interface YouTubeVideoProps extends VariantProps<typeof videoVariants> {
  videoId: string;
  className?: string;
  title?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  startAt?: number; // Start time in seconds
  overlay?: React.ReactNode;
  showFallback?: boolean; // Force showing the fallback for testing
  quality?:
    | "default"
    | "small"
    | "medium"
    | "large"
    | "hd720"
    | "hd1080"
    | "highres";
  onLoad?: () => void;
  onError?: (error: Error) => void;
  lazyLoad?: boolean;
  playbackRate?: 1 | 0.75 | 1.25 | 1.5 | 2;
}

// Inner video component that handles the actual loading
const VideoInner = forwardRef<HTMLDivElement, YouTubeVideoProps>(
  (
    {
      videoId,
      className,
      variant,
      size,
      title = "YouTube video player",
      autoPlay = false,
      muted = false,
      loop = false,
      controls = true,
      startAt = 0,
      overlay,
      showFallback = false,
      quality = "default",
      onLoad,
      onError,
      lazyLoad = true,
      playbackRate = 1,
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Build YouTube URL with parameters
    const generateYouTubeUrl = () => {
      const params = new URLSearchParams({
        autoplay: autoPlay ? "1" : "0",
        mute: muted ? "1" : "0",
        loop: loop ? "1" : "0",
        controls: controls ? "1" : "0",
        start: startAt.toString(),
        playsinline: "1",
        rel: "0",
        modestbranding: "1",
        enablejsapi: "1",
      });

      if (loop) {
        params.append("playlist", videoId);
      }

      return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    };

    // Handle iframe load event
    const handleIframeLoad = () => {
      setIsLoading(false);
      if (onLoad) onLoad();

      // Set playback rate if iframe is loaded successfully and not default rate
      if (playbackRate !== 1) {
        try {
          const iframe = document.getElementById(
            `youtube-player-${videoId}`
          ) as HTMLIFrameElement;
          if (iframe && iframe.contentWindow) {
            // This postMessage approach attempts to set the playback rate
            // Note: This may not work due to cross-origin restrictions
            iframe.contentWindow.postMessage(
              JSON.stringify({
                event: "command",
                func: "setPlaybackRate",
                args: [playbackRate],
              }),
              "https://www.youtube.com"
            );
          }
        } catch (e) {
          console.warn("Failed to set playback rate:", e);
        }
      }
    };

    // Handle iframe error
    const handleIframeError = () => {
      const error = new Error("Failed to load YouTube video");
      setError(error);
      if (onError) onError(error);
    };

    // Simulate error for testing if needed
    useEffect(() => {
      if (showFallback) {
        setIsLoading(true);
      }
    }, [showFallback]);

    if (error) return <VideoSkeleton className={className} />;

    return (
      <div
        ref={ref}
        className={cn(videoVariants({ variant, size }), className)}
      >
        {isLoading && <VideoSkeleton className="absolute inset-0" />}

        <iframe
          id={`youtube-player-${videoId}`}
          src={generateYouTubeUrl()}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={cn(
            "w-full h-full border-0",
            isLoading
              ? "opacity-0"
              : "opacity-100 transition-opacity duration-300"
          )}
          loading={lazyLoad ? "lazy" : "eager"}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />

        {overlay && <div className="absolute inset-0 z-10">{overlay}</div>}
      </div>
    );
  }
);

VideoInner.displayName = "VideoInner";

// Main video component with Suspense wrapper
const YouTubeVideo = forwardRef<HTMLDivElement, YouTubeVideoProps>(
  (props, ref) => {
    return (
      <Suspense
        fallback={
          <VideoSkeleton
            className={videoVariants({
              variant: props.variant,
              size: props.size,
            })}
          />
        }
      >
        <VideoInner ref={ref} {...props} />
      </Suspense>
    );
  }
);

YouTubeVideo.displayName = "YouTubeVideo";

export { YouTubeVideo, VideoSkeleton };
