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

  // Filter options based on query
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (option: Option) => {
    if (selectedOptions.find((selected) => selected.id === option.id)) {
      setSelectedOptions((prev) =>
        prev.filter((selected) => selected.id !== option.id)
      );
    } else {
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  const handleRemove = (id: number) => {
    setSelectedOptions((prev) => prev.filter((option) => option.id !== id));
  };

  return (
    <div className="relative w-full max-w-md">
      <Combobox
        as="div"
        value={selectedOptions}
        onChange={handleSelect}
        multiple
      >
        <Combobox.Button className="w-full flex items-center border border-gray-300 rounded-lg bg-white px-3 py-2 text-left shadow-sm transition-all focus:border-primary focus:outline-none focus:ring focus:ring-primary/50">
          <div className="flex flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <span
                key={option.id}
                className="bg-primary text-white rounded-full px-2 py-0.5 flex items-center text-sm"
              >
                {option.label}
                <button
                  type="button"
                  onClick={() => handleRemove(option.id)}
                  className="ml-1 rounded-full hover:bg-primary-light focus:outline-none"
                >
                  <XIcon className="h-3 w-3" />
                  <span className="sr-only">Remove {option.label}</span>
                </button>
              </span>
            ))}
          </div>
          <ChevronDownIcon className="ml-auto h-5 w-5 text-gray-400" />
        </Combobox.Button>

        <Combobox.Input
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border-none px-3 py-2 text-sm focus:outline-none"
          placeholder={selectedOptions.length === 0 ? placeholder : ""}
        />

        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {filteredOptions.map((option) => (
            <Combobox.Option
              key={option.id}
              value={option}
              className={({ active }) =>
                cn(
                  "relative cursor-pointer select-none py-2 pl-3 pr-9",
                  active ? "bg-primary text-white" : "text-gray-900"
                )
              }
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={cn(
                      "block truncate",
                      selected && "font-semibold"
                    )}
                  >
                    {option.label}
                  </span>
                  {selected && (
                    <span
                      className={cn(
                        "absolute inset-y-0 right-0 flex items-center pr-4",
                        active ? "text-white" : "text-primary"
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default MultipleSelect;
