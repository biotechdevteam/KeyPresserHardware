import React, { useState, ReactNode } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Generic filter option type
export type FilterOption<T extends string = string> = {
  value: T;
  label: string;
  icon?: ReactNode;
};

// Filter group configuration
export type FilterGroupConfig<T extends string = string> = {
  id: string;
  label: string;
  options: FilterOption<T>[];
  defaultValue?: T;
  multiple?: boolean;
};

// Props for the filter component
interface UniversalFilterProps {
  filterGroups: FilterGroupConfig[];
  onFilterChange: (filters: Record<string, string | string[]>) => void;
  className?: string;
  variant?: "minimal" | "pill" | "button";
  showFilterButton?: boolean;
}

const UniversalFilter: React.FC<UniversalFilterProps> = ({
  filterGroups,
  onFilterChange,
  className,
  variant = "pill",
  showFilterButton = true,
}) => {
  // Initialize state from filter groups
  const [filters, setFilters] = useState<Record<string, string | string[]>>(
    () => {
      const initialFilters: Record<string, string | string[]> = {};
      filterGroups.forEach((group) => {
        initialFilters[group.id] = group.multiple
          ? ([group.defaultValue || group.options[0]?.value].filter(
              Boolean
            ) as string[])
          : group.defaultValue || group.options[0]?.value;
      });
      return initialFilters;
    }
  );

  // Count active filters
  const activeFilterCount = Object.values(filters).reduce(
    (count, value) =>
      count +
      (Array.isArray(value) ? (value.length > 0 ? 1 : 0) : value ? 1 : 0),
    0
  );

  // Handle single select filter change
  const handleSingleFilterChange = (groupId: string, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [groupId]: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle multi-select filter change
  const handleMultiFilterChange = (groupId: string, value: string) => {
    setFilters((prev) => {
      const currentValues = (prev[groupId] as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      const newFilters = { ...prev, [groupId]: newValues };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    const defaultFilters: Record<string, string | string[]> = {};
    filterGroups.forEach((group) => {
      defaultFilters[group.id] = group.multiple ? [] : "";
    });
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  // Helper to get label for display
  const getDisplayLabel = (groupId: string) => {
    const group = filterGroups.find((g) => g.id === groupId);
    if (!group) return "";

    const value = filters[groupId];

    if (Array.isArray(value) && value.length > 0) {
      if (value.length === 1) {
        const option = group.options.find((o) => o.value === value[0]);
        return option?.label || "";
      }
      return `${value.length} selected`;
    } else if (typeof value === "string" && value) {
      const option = group.options.find((o) => o.value === value);
      return option?.label || "";
    }

    return group.label;
  };

  // Render based on variant
  const renderFilterControls = () => {
    switch (variant) {
      case "minimal":
        return (
          <div className="flex items-center gap-2 flex-wrap">
            {filterGroups.map((group) => (
              <Popover key={group.id}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "text-sm font-normal border-none hover:bg-transparent hover:underline p-1",
                      filters[group.id] &&
                        typeof filters[group.id] === "string" &&
                        filters[group.id] !== ""
                        ? "text-primary font-medium"
                        : Array.isArray(filters[group.id]) &&
                          (filters[group.id] as string[]).length > 0
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {getDisplayLabel(group.id)}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-1">
                  <div className="space-y-1">
                    {group.options.map((option) => (
                      <Button
                        key={option.value}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start h-8 px-2 font-normal"
                        onClick={() =>
                          group.multiple
                            ? handleMultiFilterChange(group.id, option.value)
                            : handleSingleFilterChange(group.id, option.value)
                        }
                      >
                        <div className="flex items-center w-full">
                          <span className="mr-1">{option.icon}</span>
                          <span className="flex-grow">{option.label}</span>
                          {group.multiple &&
                            Array.isArray(filters[group.id]) &&
                            (filters[group.id] as string[]).includes(
                              option.value
                            ) && <Check className="h-4 w-4 text-primary" />}
                          {!group.multiple &&
                            filters[group.id] === option.value && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        );

      case "pill":
        return (
          <div className="flex items-center gap-2 flex-wrap">
            {filterGroups.map((group) => (
              <Popover key={group.id}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "rounded-full border text-sm px-3 py-1 h-8",
                      filters[group.id] &&
                        typeof filters[group.id] === "string" &&
                        filters[group.id] !== ""
                        ? "bg-primaryF border-primary text-primary-foreground"
                        : Array.isArray(filters[group.id]) &&
                          (filters[group.id] as string[]).length > 0
                        ? "bg-primaryF border-primary text-primary-foreground"
                        : "bg-background"
                    )}
                  >
                    {getDisplayLabel(group.id)}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-1">
                  <div className="space-y-1">
                    {group.options.map((option) => (
                      <Button
                        key={option.value}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start h-8 px-2 font-normal"
                        onClick={() =>
                          group.multiple
                            ? handleMultiFilterChange(group.id, option.value)
                            : handleSingleFilterChange(group.id, option.value)
                        }
                      >
                        <div className="flex items-center w-full">
                          {option.icon && (
                            <span className="mr-2">{option.icon}</span>
                          )}
                          <span className="flex-grow">{option.label}</span>
                          {group.multiple &&
                            Array.isArray(filters[group.id]) &&
                            (filters[group.id] as string[]).includes(
                              option.value
                            ) && <Check className="h-4 w-4 text-primary" />}
                          {!group.multiple &&
                            filters[group.id] === option.value && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        );

      default:
        return (
          <div className="flex items-center gap-2 flex-wrap">
            {filterGroups.map((group) => (
              <Popover key={group.id}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "text-sm font-normal",
                      filters[group.id] &&
                        typeof filters[group.id] === "string" &&
                        filters[group.id] !== ""
                        ? "bg-primaryF border-primary text-primary-foreground-foreground"
                        : Array.isArray(filters[group.id]) &&
                          (filters[group.id] as string[]).length > 0
                        ? "bg-primaryF border-primary text-primary-foreground-foreground"
                        : ""
                    )}
                  >
                    {group.label}: {getDisplayLabel(group.id)}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-1">
                  <div className="space-y-1">
                    {group.options.map((option) => (
                      <Button
                        key={option.value}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start h-8 px-2 font-normal"
                        onClick={() =>
                          group.multiple
                            ? handleMultiFilterChange(group.id, option.value)
                            : handleSingleFilterChange(group.id, option.value)
                        }
                      >
                        <div className="flex items-center w-full">
                          {option.icon && (
                            <span className="mr-2">{option.icon}</span>
                          )}
                          <span className="flex-grow">{option.label}</span>
                          {group.multiple &&
                            Array.isArray(filters[group.id]) &&
                            (filters[group.id] as string[]).includes(
                              option.value
                            ) && <Check className="h-4 w-4 text-primary" />}
                          {!group.multiple &&
                            filters[group.id] === option.value && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        );
    }
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {showFilterButton && (
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 rounded-full bg-primary text-primary-foreground w-5 h-5 text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Filters</h3>
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 text-xs"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                {filterGroups.map((group) => (
                  <div key={group.id}>
                    <h4 className="text-sm font-medium mb-1">{group.label}</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {group.options.map((option) => (
                        <Button
                          key={option.value}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "justify-start h-8 px-2 font-normal",
                            group.multiple &&
                              Array.isArray(filters[group.id]) &&
                              (filters[group.id] as string[]).includes(
                                option.value
                              )
                              ? "bg-primary/10Frder-primary  text-primary-foreground"
                              : !group.multiple &&
                                filters[group.id] === option.value
                              ? "bg-primary/10Frder-primary  text-primary-foreground"
                              : ""
                          )}
                          onClick={() =>
                            group.multiple
                              ? handleMultiFilterChange(group.id, option.value)
                              : handleSingleFilterChange(group.id, option.value)
                          }
                        >
                          <div className="flex items-center text-xs">
                            {option.icon && (
                              <span className="mr-1">{option.icon}</span>
                            )}
                            <span className="truncate">{option.label}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="flex flex-wrap gap-2"
        >
          {renderFilterControls()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default UniversalFilter;
