import React, { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerDemo } from "@/components/date-picker/date-picker";
import { Button } from "@/components/ui/button";

// Define the filter schema using Zod
const FilterSchema = z.object({
  search: z.string().default(""),
  category: z.string().default(""),
  status: z.enum(["ongoing", "completed", "paused"]).default("ongoing"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortOption: z.enum(["newest", "popular", "relevant"]).default("newest"),
});

interface ProjectFiltersProps {
  onFilterChange: (filters: z.infer<typeof FilterSchema>) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ onFilterChange }) => {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<"ongoing" | "completed" | "paused">(
    "ongoing"
  );
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [sortOption, setSortOption] = useState<
    "newest" | "popular" | "relevant"
  >("newest");

  const handleApplyFilters = () => {
    onFilterChange({
      search,
      category: category === "all" ? "" : category,
      status,
      startDate,
      endDate,
      sortOption,
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Filter Projects
      </h2>

      {/* Using Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Search Input */}
        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="search" className="text-sm mb-1 block">
            Search Projects
          </label>
          <Input
            id="search"
            placeholder="Enter project name or keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Selector */}
        <div className="col-span-1">
          <label
            htmlFor="category"
            className="text-sm mb-1 block"
          >
            Select Category
          </label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Research">Research</SelectItem>
              <SelectItem value="Development">Development</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Selector */}
        <div className="col-span-1">
          <label htmlFor="status" className="text-sm text-gray-600 mb-1 block">
            Project Status
          </label>
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value as "ongoing" | "completed" | "paused")
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Pickers */}
        <div className="col-span-1">
          <label
            htmlFor="start-date"
            className="text-sm text-gray-600 mb-1 block"
          >
            Start Date
          </label>
          <DatePickerDemo
            value={startDate ? new Date(startDate) : null}
            onValueChange={(date) => setStartDate(date?.toISOString())}
            placeholder="Pick start date"
          />
        </div>
        <div className="col-span-1">
          <label
            htmlFor="end-date"
            className="text-sm text-gray-600 mb-1 block"
          >
            End Date
          </label>
          <DatePickerDemo
            value={endDate ? new Date(endDate) : null}
            onValueChange={(date) => setEndDate(date?.toISOString())}
            placeholder="Pick end date"
          />
        </div>

        {/* Sorting Option */}
        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="sort-option" className="text-sm text-gray-600 mb-1 block">
            Sort By
          </label>
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value as "newest" | "popular" | "relevant")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="relevant">Most Relevant</SelectItem>
            </SelectContent>
          </Select>
          </div>

        {/* Apply Button */}
        <div className="col-span-1 sm:col-span-2">
          <Button
            onClick={handleApplyFilters}
            className="w-full font-semibold py-2"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;
