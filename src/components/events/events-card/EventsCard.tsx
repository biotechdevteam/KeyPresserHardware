import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Event } from "@/types/eventsSchema";
import { formatDistanceToNow, isFuture, format } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: Event;
  expanded: boolean;
  toggleEventDetails: (id: string) => void;
  handleEnrollClick: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  expanded,
  toggleEventDetails,
  handleEnrollClick,
}) => {
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);
  const registrationDeadline = new Date(event.registrationDeadline);
  const isRegistrationOpen = isFuture(registrationDeadline);

  const formatEventDate = (date: Date) => {
    return format(date, "MMM d, yyyy · h:mm a");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-border hover:shadow-md transition-shadow duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Image Section */}
          <div className="md:col-span-1 h-full relative">
            <div className="aspect-[4/3] relative">
              <Image
                src={
                  event.eventImageUrl ||
                  "https://img.freepik.com/premium-photo/low-angle-fish-eye-shot-garden-city-skyscraper-singapore_76964-36271.jpg"
                }
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Registration status badge */}
              <div className="absolute top-3 left-3">
                <Badge
                  className={`${
                    isRegistrationOpen
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {isRegistrationOpen
                    ? "Registration Open"
                    : "Registration Closed"}
                </Badge>
              </div>
            </div>

            {/* Attendee counter with visual indicator */}
            <div className="absolute -bottom-4 left-4 bg-background shadow-lg rounded-full px-3 py-1 flex items-center gap-2 border border-border">
              <Users size={14} className="text-primary" />
              <span className="text-sm font-medium">
                {event.attendees.length + 50}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:col-span-2 p-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              {/* Title and Summary */}
              <div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">
                  {event.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{event.summary}</p>
              </div>

              {/* Event Time Details */}
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span>Starts: {formatEventDate(startTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span>Ends: {formatEventDate(endTime)}</span>
                </div>
                {isRegistrationOpen && (
                  <div className="flex items-center gap-2 text-destructive font-medium mt-1">
                    <span>
                      Register before:{" "}
                      {formatDistanceToNow(registrationDeadline, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Collapsible Details Section */}
              <Collapsible
                open={expanded}
                onOpenChange={() => toggleEventDetails(event._id)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 px-0 hover:bg-transparent hover:text-primary"
                  >
                    {expanded ? (
                      <>
                        <ChevronUp size={16} />
                        <span>Hide Details</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        <span>View Details</span>
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-4 space-y-4"
                  >
                    {/* Description */}
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <div
                        dangerouslySetInnerHTML={{ __html: event.description }}
                      />
                    </div>

                    {/* Speakers Section */}
                    {event.speakers && event.speakers.length > 0 ? (
                      <div className="bg-muted/30 p-4 rounded-md">
                        <h4 className="text-base font-semibold mb-2 flex items-center gap-2">
                          <User size={16} className="text-primary" />
                          Speakers
                        </h4>
                        <ul className="space-y-2">
                          {event.speakers.map((speaker, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Link
                                href={`/members/${speaker.memberId._id}`}
                                className="text-primary hover:underline"
                              >
                                {speaker.memberId?.user_id?.first_name ||
                                  "Unknown Speaker"}
                              </Link>
                              <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                {speaker.speakerRole || "Speaker"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="bg-muted/30 p-4 rounded-md">
                        <h4 className="text-base font-semibold mb-2 flex items-center gap-2">
                          <User size={16} className="text-primary" />
                          Speakers
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          No speakers available for this event.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Enroll Button */}
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                onClick={() => handleEnrollClick(event)}
                disabled={!isRegistrationOpen}
                className="w-full"
                variant={isRegistrationOpen ? "default" : "outline"}
              >
                {isRegistrationOpen ? "Enroll Now" : "Registration Closed"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default EventCard;
