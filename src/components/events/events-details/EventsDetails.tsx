import { Button } from "@/components/ui/button";

interface EventDetailsModalProps {
  open: boolean;
  event: any;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
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

export default EventDetailsModal;
