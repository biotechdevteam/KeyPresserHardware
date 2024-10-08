import { Button } from "@/components/ui/button";
import { Event } from "@/types/eventsSchema";

interface EventDetailsProps {
  open: boolean;
  event: Event;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  open,
  event,
  onClose,
}) => {
  return (
    <div className="p-4">
      <h4 className="text-2xl mb-2">{event.title}</h4>
      <p>{event.description}</p>

      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default EventDetails;
