import SearchResultCard from "@/components/events/search-event/SearchResultCard";

interface PastEventsCarouselProps {
  events: any[];
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
