"use client";

import { useState, useEffect } from "react";
import { Event } from "@/types/eventsSchema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Share2,
  CalendarPlus,
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import RegisterDialog from "@/components/register-dialog/RegisterDialog";
import EnrollEventForm from "../events-enroll/EnrollForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import EventCard from "../events-card/EventsCard";

interface EventDetailsProps {
  event: Event;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isEnrollFormOpen, setIsEnrollFormOpen] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>(
    {}
  );
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);

  // Calculate event status
  const now = new Date();
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const eventStatus =
    now < startDate ? "upcoming" : now > endDate ? "past" : "ongoing";

  // Fetch related events client-side
  useEffect(() => {
    const fetchRelatedEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/events?exclude=${event._id}`,
          {
            cache: "no-store", // Fresh data for related events
          }
        );
        if (!response.ok) throw new Error("Failed to fetch related events");
        const data = await response.json();
        setRelatedEvents(data.slice(0, 3)); // Limit to 3 related events
      } catch (error) {
        console.error("Error fetching related events:", error);
        setRelatedEvents([]);
      }
    };

    fetchRelatedEvents();
  }, [event._id]);

  const handleAttendClick = () => {
    setIsRegisterDialogOpen(true);
  };

  const handleRegisterComplete = () => {
    setIsRegisterDialogOpen(false);
    setIsEnrollFormOpen(true);
  };

  const toggleEventDetails = (id: string) => {
    setExpandedEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenRegisterDialog = (relatedEvent: Event) => {
    setIsRegisterDialogOpen(true);
  };

  // Share function using Web Share API with clipboard fallback
  const shareEvent = async () => {
    try {
      const websiteUrl =
        process.env.NEXT_PUBLIC_WEBSITE_URL || "https://biotecuniverse.org";
      const shareUrl = `${websiteUrl}/events/${event._id}`;

      if (navigator.share) {
        await navigator.share({
          title: `${event.title} - BioTec Universe`,
          text: `Check out "${
            event.title
          }", an exciting event by BioTec Universe happening on ${format(
            new Date(event.startTime),
            "MMMM d, yyyy"
          )}. Join me there!`,
          url: shareUrl,
        });
        toast({
          title: "Event Shared",
          description: "The event has been shared successfully!",
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied",
          description: "The event URL has been copied to your clipboard.",
          action: (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(shareUrl, "_blank")}
            >
              Open
            </Button>
          ),
        });
      }
    } catch (error) {
      console.error("Error sharing event:", error);
      toast({
        title: "Sharing Failed",
        description:
          "There was an issue sharing the event. The URL has been copied to your clipboard as a fallback.",
        variant: "destructive",
      });
      const shareUrl = `${
        process.env.NEXT_PUBLIC_WEBSITE_URL || "https://biotecuniverse.org"
      }/events/${event._id}`;
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <RegisterDialog
        open={isRegisterDialogOpen}
        onComplete={handleRegisterComplete}
        onCancel={() => setIsRegisterDialogOpen(false)}
      />
      {isEnrollFormOpen && (
        <EnrollEventForm
          eventId={event._id}
          eventTitle={event.title}
          onComplete={() => setIsEnrollFormOpen(false)}
          onCancel={() => setIsEnrollFormOpen(false)}
        />
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="rounded-lg shadow-md p-6"
      >
        <motion.div variants={itemVariants}>
          <div className="flex flex-wrap gap-2 mb-2">
            {eventStatus === "upcoming" && (
              <Badge className="bg-blue-500">Upcoming</Badge>
            )}
            {eventStatus === "ongoing" && (
              <Badge className="bg-green-500">Happening Now</Badge>
            )}
            {eventStatus === "past" && (
              <Badge variant="outline">Past Event</Badge>
            )}
            <Badge variant="outline">{event.eventType}</Badge>
            {event.isRegistrationOpen && (
              <Badge
                variant="outline"
                className="border-green-500 text-green-500"
              >
                Registration Open
              </Badge>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {event.title}
          </h1>
        </motion.div>

        {event.eventImageUrl && (
          <motion.div
            variants={itemVariants}
            className="relative w-full h-64 sm:h-80 mb-8 rounded-xl overflow-hidden"
          >
            <Image
              src={event.eventImageUrl}
              alt={event.title}
              fill
              className="object-cover"
            />
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="attendees">
                  Attendees ({event.attendees?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="speakers">
                  Speakers ({event.speakers?.length || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold mb-2">
                    About this event
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {event.summary}
                  </p>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {event.description}
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Event Type
                  </h3>
                  <p className="text-sm capitalize">{event.eventType}</p>
                </motion.div>

                {event.registrationDeadline && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Registration Deadline
                    </h3>
                    <p className="text-sm">
                      {format(
                        new Date(event.registrationDeadline),
                        "MMMM d, yyyy 'at' h:mm a"
                      )}
                    </p>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="attendees" className="space-y-4">
                <motion.p
                  variants={itemVariants}
                  className="text-sm text-muted-foreground"
                >
                  {`${event.attendees?.length || 0} people attending`}
                </motion.p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                  {event.attendees?.map((attendee) => (
                    <motion.div
                      key={attendee._id}
                      variants={itemVariants}
                      className="flex items-center p-2 rounded-lg hover:bg-accent/50"
                    >
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage
                          src={attendee.userId.profile_photo_url || ""}
                          alt={`${attendee.userId.first_name} ${attendee.userId.last_name}`}
                        />
                        <AvatarFallback>
                          {attendee.userId.first_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">
                          {attendee.userId.first_name}{" "}
                          {attendee.userId.last_name}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {attendee.attendeeStatus}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="speakers" className="space-y-4">
                {event.speakers.length > 0 ? (
                  <div className="space-y-4">
                    {event.speakers.map((speaker) => (
                      <motion.div
                        key={speaker._id}
                        variants={itemVariants}
                        className="flex items-center p-3 bg-accent/30 rounded-lg"
                      >
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage
                            src={
                              speaker.memberId.user_id.profile_photo_url || ""
                            }
                            alt={`${speaker.memberId.first_name} ${speaker.memberId.last_name}`}
                          />
                          <AvatarFallback>
                            {speaker.memberId.first_name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {speaker.memberId.first_name}{" "}
                            {speaker.memberId.last_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {speaker.speakerRole}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.p
                    variants={itemVariants}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No speakers listed for this event
                  </motion.p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-accent/30 rounded-xl p-4 space-y-4">
              <h3 className="font-medium">Event Details</h3>

              <div className="flex items-start gap-3">
                <CalendarIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">
                    {format(new Date(event.startTime), "EEEE, MMMM d, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(event.startTime), "h:mm a")} -{" "}
                    {format(new Date(event.endTime), "h:mm a")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">
                    {formatDuration(
                      new Date(event.startTime),
                      new Date(event.endTime)
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">
                    {`${event.attendees?.length || 0} people attending`}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleAttendClick}
                className={
                  eventStatus === "past"
                    ? "bg-muted text-muted-foreground cursor-not-allowed hover:bg-muted"
                    : "bg-gradient-to-r from-primary to-primary-dark hover:opacity-90"
                }
                disabled={eventStatus === "past" || !event.isRegistrationOpen}
              >
                <CalendarPlus className="mr-2 h-4 w-4" />
                {eventStatus === "past"
                  ? "Event has ended"
                  : !event.isRegistrationOpen
                  ? "Registration closed"
                  : "Attend this event"}
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={shareEvent}
                      className="w-full"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Event
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share this event with friends</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {relatedEvents.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 rounded-lg shadow-md p-6"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Related Events
            </h2>
            <p className="text-muted-foreground">
              Check out other events you might be interested in.
            </p>
          </motion.div>

          <ScrollArea className="max-h-[300px] pr-4">
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {relatedEvents.map((relatedEvent) => (
                <motion.div key={relatedEvent._id} variants={itemVariants}>
                  <EventCard
                    event={relatedEvent}
                    expanded={expandedEvents[relatedEvent._id]}
                    toggleEventDetails={toggleEventDetails}
                    handleEnrollClick={() =>
                      handleOpenRegisterDialog(relatedEvent)
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </motion.div>
      )}
    </div>
  );
};

// Helper function to format duration (unchanged)
const formatDuration = (start: Date, end: Date): string => {
  const durationMs = end.getTime() - start.getTime();
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor(
    (durationMs % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (durationHours === 0) {
    return `${durationMinutes} minute${durationMinutes !== 1 ? "s" : ""}`;
  } else if (durationMinutes === 0) {
    return `${durationHours} hour${durationHours !== 1 ? "s" : ""}`;
  } else {
    return `${durationHours} hour${
      durationHours !== 1 ? "s" : ""
    } ${durationMinutes} minute${durationMinutes !== 1 ? "s" : ""}`;
  }
};

export default EventDetails;
