import { Event } from "@/types/eventsSchema";

interface SearchContainerProps {
    searchTerm: string;
    handleSearchChange: (term: string) => void;
    filteredData: Event[];
  }
  
  const SearchContainer: React.FC<SearchContainerProps> = ({ searchTerm, handleSearchChange, filteredData }) => {
    return (
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search events..."
          className="w-full p-2 border border-border rounded-md"
        />
      </div>
    );
  };
  
  export default SearchContainer;
  