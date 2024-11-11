"use client";

import * as React from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils/utils";

type Option = {
  id: number;
  label: string;
};

type MultipleSelectProps = {
  options: Option[];
  selectedOptions: Option[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  placeholder?: string;
};

const MultipleSelect = ({
  options,
  selectedOptions,
  setSelectedOptions,
  placeholder = "Search and select...",
}: MultipleSelectProps) => {
  const [query, setQuery] = React.useState("");
  const [dynamicOptions, setDynamicOptions] = React.useState<Option[]>([]);

  // Combine predefined options and dynamic options
  const allOptions = [...options, ...dynamicOptions];

  // Filter options based on query
  const filteredOptions =
    query === ""
      ? allOptions
      : allOptions.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  // Handle selecting options, including custom options
  const handleSelect = (option: Option) => {
    if (selectedOptions.find((selected) => selected.id === option.id)) {
      setSelectedOptions((prev) =>
        prev.filter((selected) => selected.id !== option.id)
      );
    } else {
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  // Handle removing selected options
  const handleRemove = (id: number) => {
    setSelectedOptions((prev) => prev.filter((option) => option.id !== id));
  };

  // Handle creating a custom option when the user types a comma or space
  const handleCustomOption = (input: string) => {
    if (input.trim() === "") return;

    const newOption = {
      id: Date.now(),
      label: input.trim(),
    };
    setDynamicOptions((prev) => [...prev, newOption]);
    setSelectedOptions((prev) => [...prev, newOption]);
    setQuery("");
  };

  // Detect comma or space key press to create custom options
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " || event.key === ",") {
      event.preventDefault();
      handleCustomOption(query);
    }
  };

  return (
    <div className="relative w-full max-w-md border border-muted rounded-md">
      <Combobox
        as="div"
        value={selectedOptions}
        onChange={
          (selected) => handleSelect(selected as Option) // Cast to handle individual option selection
        }
        multiple
      >
        <Combobox.Button className="w-full flex items-center border border-muted rounded-lg bg-card hover:bg-card focus:bg-card px-3 py-2 text-left shadow-sm transition-all focus:outline-none">
          <div className="flex flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <span
                key={option.id}
                className="bg-input text-muted-foreground border rounded-full p-1 flex items-center text-sm"
              >
                {option.label}
                <button
                  type="button"
                  onClick={() => handleRemove(option.id)}
                  className="ml-1 p-1 rounded-full bg-muted hover:bg-input focus:outline-none"
                >
                  <XIcon className="h-3 w-3" />
                  <span className="sr-only">Remove {option.label}</span>
                </button>
              </span>
            ))}
          </div>
          <ChevronDownIcon className="ml-auto h-5 w-5 text-border" />
        </Combobox.Button>

        <Combobox.Input
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          value={query}
          className="w-full border-none px-3 py-2 text-sm bg-card focus:outline-none"
          placeholder={selectedOptions.length === 0 ? placeholder : ""}
        />

        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-card py-1 text-base shadow-lg ring-1 ring-muted focus:outline-none">
          {filteredOptions.map((option) => (
            <Combobox.Option
              key={option.id}
              value={option}
              className={({ active }) =>
                cn(
                  "relative cursor-pointer select-none py-2 pl-3 pr-9 text-base",
                  active && "bg-muted"
                )
              }
              onClick={() => handleSelect(option)}
            >
              {({ active }) => (
                <>
                  <span
                    className={cn(
                      "block truncate",
                      selectedOptions.find(
                        (selected) => selected.id === option.id
                      ) && "font-semibold"
                    )}
                  >
                    {option.label}
                  </span>
                  {selectedOptions.find(
                    (selected) => selected.id === option.id
                  ) && (
                    <span
                      className={cn(
                        "absolute inset-y-0 right-0 flex items-center pr-4 text-base"
                      )}
                    >
                      <CheckIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
          {filteredOptions.length === 0 && query && (
            <div
              onClick={() => handleCustomOption(query)}
              className="cursor-pointer select-none py-2 pl-3 pr-9 text-base hover:bg-muted"
            >
              Create "{query}"
            </div>
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default MultipleSelect;
