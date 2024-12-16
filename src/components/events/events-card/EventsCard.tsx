import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Event } from "@/types/eventsSchema";
import { formatDistanceToNow, isFuture } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from "next-view-transitions";
import Image from "next/image";

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

  return (
    <Card className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full p-4">
        {/* Image and Timing Section */}
        <div className="md:col-span-1 relative">
          <Image
            src={event.eventImageUrl || "https://via.placeholder.com/500x300"}
            alt={event.title}
            width={500}
            height={300}
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Start and End Time */}
          <div className="absolute bottom-0 left-0 bg-white p-3 rounded-lg shadow-lg m-4">
            <p className="text-sm">
              <strong>Start:</strong>{" "}
              {formatDistanceToNow(startTime, { addSuffix: true })}
            </p>
            <p className="text-sm">
              <strong>End:</strong>{" "}
              {formatDistanceToNow(endTime, { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="md:col-span-2 p-4 grid grid-rows-[1fr_auto] h-full gap-4">
          <div>
            <h4 className="text-2xl font-semibold mb-3">{event.title}</h4>
            <p className="text-base text-gray-700">{event.summary}</p>
          </div>

          {/* Collapsible Details Section */}
          <Collapsible
            open={expanded}
            onOpenChange={() => toggleEventDetails(event._id)}
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="mt-4">
                {expanded ? "Hide Details" : "View Details"}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <CardContent className="pt-4">
                {/* Description */}
                <div dangerouslySetInnerHTML={{ __html: event.description }} />

                {/* Speakers Section */}
                {event.speakers && event.speakers.length > 0 ? (
                  <div className="mt-4">
                    <h5 className="text-lg font-semibold">Main Speakers:</h5>
                    <ul className="list-disc ml-5 mt-2">
                      {event.speakers.map((speaker, index) => (
                        <li key={index}>
                          <Link
                            href={`/members/${speaker.memberId._id}`}
                            className="text-sm text-secondary ml-2"
                          >
                            {speaker.memberId?.user_id?.first_name ||
                              "Unknown Speaker"}
                          </Link>{" "}
                          - {speaker.speakerRole || "No Role Specified"}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mt-4">
                    <h5 className="text-lg font-semibold">Main Speakers:</h5>
                    <p>No speakers available for this event.</p>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>

          {/* Footer Section */}
          <CardFooter className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Attendees Count */}
            <div className="text-sm">
              <strong>{event.attendees.length + 50}</strong> already registered
            </div>

            {/* Registration Deadline Badge */}
            {isFuture(registrationDeadline) ? (
              <div className="text-xs">
                Register before:{" "}
                <span className="text-destructive">
                  {formatDistanceToNow(registrationDeadline, {
                    addSuffix: true,
                  })}
                </span>
              </div>
            ) : (
              <div className="text-xs text-muted">Registration closed</div>
            )}

            {/* Enroll Button */}
            {new Date(event.registrationDeadline).getTime() > Date.now() ? (
              <Button onClick={() => handleEnrollClick(event)}>
                Enroll Now
              </Button>
            ) : (
              <Button disabled>Registration Closed</Button>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
