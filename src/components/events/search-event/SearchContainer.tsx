import { Input } from "@/components/ui/input";
import { Event } from "@/types/eventsSchema";

interface SearchContainerProps {
    searchTerm: string;
    handleSearchChange: (term: string) => void;
    filteredData: Event[];
  }
  
  const SearchContainer: React.FC<SearchContainerProps> = ({ searchTerm, handleSearchChange, filteredData }) => {
    return (
      <div className="mb-4">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search events..."
          className="p-2 border border-border rounded-md"
        />
      </div>
    );
  };
  
  export default SearchContainer;
  