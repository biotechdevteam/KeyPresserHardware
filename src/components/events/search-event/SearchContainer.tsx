"use client";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Event } from "@/types/eventsSchema";
import { Search, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SearchContainerProps {
  searchTerm: string;
  handleSearchChange: (term: string) => void;
  filteredData: Event[];
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  searchTerm,
  handleSearchChange,
  filteredData,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClear = () => {
    handleSearchChange("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      <div
        className={`
          flex items-center bg-background border rounded-lg transition-all duration-200
          ${isFocused ? "ring-2 ring-primary border-primary" : "border-input"}
          ${searchTerm ? "pr-2" : "pr-4"}
        `}
      >
        <div className="flex items-center px-3 text-muted-foreground">
          <Search className="h-4 w-4" />
        </div>

        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search events by title..."
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-3 h-11 shadow-none"
        />

        <AnimatePresence>
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className="h-8 w-8 rounded-full"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search results count badge */}
      <AnimatePresence>
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-12 mt-1"
          >
            <Badge variant="outline" className="bg-background">
              <Calendar className="h-3 w-3 mr-1" />
              {filteredData.length}{" "}
              {filteredData.length === 1 ? "event" : "events"} found
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchContainer;
