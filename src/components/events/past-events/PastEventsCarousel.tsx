import SearchResultCard from "@/components/events/search-event/SearchResultCard";
import { Event } from "@/types/eventsSchema";

interface PastEventsCarouselProps {
  events: Event[];
}

const PastEventsCarousel: React.FC<PastEventsCarouselProps> = ({ events }) => {
  return (
    <div>
      {events.map((event) => (
        <div key={event._id}>
          <SearchResultCard result={event} />
        </div>
      ))}
    </div>
  );
};

export default PastEventsCarousel;
