import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface EventCardProps {
  event: any;
  expanded: boolean;
  toggleEventDetails: (id: string) => void;
  handleEnrollClick: (event: any) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, expanded, toggleEventDetails, handleEnrollClick }) => {
  return (
    <Card>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
        <div className="md:w-1/3">
          <img src={event.coverPhoto} alt={event.title} className="w-full rounded-lg" />
        </div>

        <div className="md:w-2/3 p-4">
          <h4 className="text-xl font-semibold">{event.title}</h4>
          <p className="text-sm">{event.description}</p>

          <CardFooter className="mt-4">
            <Button variant="outline" onClick={() => toggleEventDetails(event._id)}>
              {expanded ? "Hide Details" : "View Details"}
            </Button>

            {new Date(event.deadline).getTime() > Date.now() ? (
              <Button onClick={() => handleEnrollClick(event)}>
                Enroll Now
              </Button>
            ) : (
              <Button disabled>
                Registration Closed
              </Button>
            )}
          </CardFooter>

          {expanded && (
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: event.content }} />
            </CardContent>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
