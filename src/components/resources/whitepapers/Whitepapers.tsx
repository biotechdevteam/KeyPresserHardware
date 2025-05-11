"use client";

import {
  Download,
  FileText,
  ExternalLink,
  Search,
  Calendar,
  Filter,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "usehooks-ts";
import { About } from "@/types/aboutSchema";
import { format } from "date-fns";
import { useTransitionRouter } from "next-view-transitions";
import { slideFadeInOut } from "@/lib/utils/pageTransitions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface WhitePapersProps {
  aboutData?: About;
}

type SortOption = "newest" | "oldest" | "a-z" | "z-a";

const WhitePapers: React.FC<WhitePapersProps> = ({ aboutData }) => {
  const router = useTransitionRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState<
    Array<{
      url: string;
      description?: string;
      title?: string;
      category?: string;
      date?: string;
      dateObj?: Date;
    }>
  >([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Extract and enhance documents from aboutData if available
  useEffect(() => {
    if (aboutData?.documents && aboutData.documents.length > 0) {
      // Transform documents to include more metadata
      const enhancedDocs = aboutData.documents.map((doc, index) => {
        // Extract title from URL if not provided
        const urlParts = doc.url.split("/");
        const filename = urlParts[urlParts.length - 1];
        const fileTitle = filename
          .split(".")[0]
          .replace(/-/g, " ")
          .replace(/_/g, " ");

        // Infer category from filename or description
        let category = "Research";
        if (doc.description) {
          if (
            doc.description.toLowerCase().includes("industry") ||
            doc.description.toLowerCase().includes("market")
          ) {
            category = "Industry";
          } else if (
            doc.description.toLowerCase().includes("case study") ||
            doc.description.toLowerCase().includes("project")
          ) {
            category = "Case Study";
          } else if (
            doc.description.toLowerCase().includes("guide") ||
            doc.description.toLowerCase().includes("how to")
          ) {
            category = "Guide";
          }
        }

        // Generate a fake date (in a real app this would come from metadata)
        const today = new Date();
        const randomDaysAgo = Math.floor(Math.random() * 365);
        const date = new Date(today);
        date.setDate(today.getDate() - randomDaysAgo);

        return {
          ...doc,
          title: doc.description?.split(".")[0] || fileTitle,
          category,
          date: format(date, "MMM dd, yyyy"),
          dateObj: date, // Store date object for sorting
        };
      });

      setDocuments(enhancedDocs);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(enhancedDocs.map((doc) => doc.category))
      ).filter(Boolean) as string[];

      setCategories(uniqueCategories);
    } else {
      setDocuments([]);
      setCategories([]);
    }
  }, [aboutData]);

  // Apply filters and sort
  const filteredAndSortedDocuments = React.useMemo(() => {
    let filtered = documents.filter(
      (doc) =>
        (searchQuery === "" ||
          doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.category?.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedCategories.length === 0 ||
          (doc.category && selectedCategories.includes(doc.category)))
    );

    // Apply date range filter if set
    if (dateRange.start || dateRange.end) {
      filtered = filtered.filter((doc) => {
        if (!doc.dateObj) return true;

        if (dateRange.start && dateRange.end) {
          return doc.dateObj >= dateRange.start && doc.dateObj <= dateRange.end;
        } else if (dateRange.start) {
          return doc.dateObj >= dateRange.start;
        } else if (dateRange.end) {
          return doc.dateObj <= dateRange.end;
        }

        return true;
      });
    }

    // Sort documents
    return filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return (b.dateObj?.getTime() || 0) - (a.dateObj?.getTime() || 0);
      } else if (sortBy === "oldest") {
        return (a.dateObj?.getTime() || 0) - (b.dateObj?.getTime() || 0);
      } else if (sortBy === "a-z") {
        return (a.title || "").localeCompare(b.title || "");
      } else if (sortBy === "z-a") {
        return (b.title || "").localeCompare(a.title || "");
      }
      return 0;
    });
  }, [documents, searchQuery, selectedCategories, sortBy, dateRange]);

  // Check if any filters are active
  useEffect(() => {
    setIsFilterActive(
      selectedCategories.length > 0 ||
        sortBy !== "newest" ||
        dateRange.start !== null ||
        dateRange.end !== null
    );
  }, [selectedCategories, sortBy, dateRange]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSortBy("newest");
    setDateRange({ start: null, end: null });
  };

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 mx-auto max-w-5xl">
      <motion.header
        className="text-center mb-10 space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Whitepapers & Research
        </h1>
        <p className="text-base sm:text-lg mt-4 max-w-2xl mx-auto">
          Download our authoritative whitepapers to gain valuable insights into
          the latest research, innovations, and trends shaping the future of
          biotechnology.
        </p>
      </motion.header>

      <motion.div
        className="mb-8 flex flex-col md:flex-row gap-4 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-input h-4 w-4" />
          <Input
            type="text"
            placeholder="Search whitepapers..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isDesktop && (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex items-center gap-1",
                    selectedCategories.length > 0 &&
                      "border-primary text-primary"
                  )}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  {selectedCategories.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedCategories.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2 font-medium">Categories</div>
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
                {selectedCategories.length > 0 && (
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => setSelectedCategories([])}
                    >
                      Clear categories
                    </Button>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex items-center gap-1",
                    sortBy !== "newest" && "border-primary text-primary"
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  <span>
                    {sortBy === "newest"
                      ? "Recent"
                      : sortBy === "oldest"
                      ? "Oldest"
                      : sortBy === "a-z"
                      ? "A-Z"
                      : "Z-A"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52" align="end">
                <div className="space-y-2">
                  <div className="font-medium mb-2">Sort by</div>
                  {[
                    { label: "Newest", value: "newest" },
                    { label: "Oldest", value: "oldest" },
                    { label: "Title (A-Z)", value: "a-z" },
                    { label: "Title (Z-A)", value: "z-a" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={sortBy === option.value ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSortBy(option.value as SortOption)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {isFilterActive && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                <span>Reset</span>
              </Button>
            )}
          </div>
        )}
      </motion.div>

      {isFilterActive && (
        <motion.div
          className="mb-4 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="flex items-center gap-1"
            >
              {category}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleCategory(category)}
              />
            </Badge>
          ))}
          {sortBy !== "newest" && (
            <Badge variant="outline" className="flex items-center gap-1">
              Sort:{" "}
              {sortBy === "oldest"
                ? "Oldest first"
                : sortBy === "a-z"
                ? "A-Z"
                : "Z-A"}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSortBy("newest")}
              />
            </Badge>
          )}
        </motion.div>
      )}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredAndSortedDocuments.length > 0 ? (
          filteredAndSortedDocuments.map((doc, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {doc.category}
                      </Badge>
                      <h3 className="text-xl font-semibold">{doc.title}</h3>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {doc.date}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p>{doc.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-2 border-t">
                  <div className="text-xs text-gray-500">PDF Document</div>
                  <div className="flex gap-2">
                    <Link
                      href={doc.url}
                      target="_blank"
                      className="flex items-center gap-1 text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Preview</span>
                    </Link>

                    <Button
                      variant="default"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => router.push(doc.url)}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 py-10 text-center text-gray-500 dark:text-gray-400">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>
              No whitepapers found{" "}
              {searchQuery && <span>matching "{searchQuery}"</span>}{" "}
              {selectedCategories.length > 0 && (
                <span>in selected categories</span>
              )}
            </p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery("");
                resetFilters();
              }}
              className="mt-2"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </motion.div>

      <Separator className="my-12" />

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">
          Can't find what you're looking for?
        </h2>
        <p className="mb-6 max-w-lg mx-auto">
          We're constantly publishing new research. Contact us for custom
          reports or specific information.
        </p>
        <Button
          variant="outline"
          onClick={() =>
            router.push("/contact", { onTransitionReady: slideFadeInOut })
          }
        >
          Request a Whitepaper
        </Button>
      </motion.div>
    </div>
  );
};

export default WhitePapers;
