import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming you have a Select component in shadcn
import { Button } from "@/components/ui/button"; // Importing the Button component from shadcn

interface BlogFiltersProps {
  onFilter: (filterCriteria: {
    category?: string;
    author?: string;
    dateRange?: string;
    sortOrder?: string;
  }) => void;
}

const BlogFilters: React.FC<BlogFiltersProps> = ({ onFilter }) => {
  // Default state values
  const [category, setCategory] = useState<string>("all");
  const [author, setAuthor] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("new-to-old"); // Default to "new-to-old"

  const handleFilterClick = () => {
    onFilter({
      category: category === "all" ? undefined : category,
      author: author === "all" ? undefined : author,
      dateRange: dateRange === "all" ? undefined : dateRange,
      sortOrder, // Pass the sort order directly
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {/* Category Filter */}
      <Select onValueChange={setCategory} value={category}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Tech">Tech</SelectItem>
          <SelectItem value="Lifestyle">Lifestyle</SelectItem>
          <SelectItem value="Business">Business</SelectItem>
        </SelectContent>
      </Select>

      {/* Author Filter */}
      <Select onValueChange={setAuthor} value={author}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Author" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Authors</SelectItem>
          <SelectItem value="Author1">Author 1</SelectItem>
          <SelectItem value="Author2">Author 2</SelectItem>
        </SelectContent>
      </Select>

      {/* Date Range Filter */}
      <Select onValueChange={setDateRange} value={dateRange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Date Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Dates</SelectItem>
          <SelectItem value="7d">Last 7 Days</SelectItem>
          <SelectItem value="30d">Last 30 Days</SelectItem>
          <SelectItem value="6m">Last 6 Months</SelectItem>
          <SelectItem value="1y">Last 1 Year</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort By Filter */}
      <Select onValueChange={setSortOrder} value={sortOrder}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new-to-old">Newest to Oldest</SelectItem>
          <SelectItem value="old-to-new">Oldest to Newest</SelectItem>
        </SelectContent>
      </Select>

      {/* Apply Filters Button */}
      <Button
        onClick={handleFilterClick}
        variant="default"
        className="w-full sm:col-span-2 md:col-span-1"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default BlogFilters;
