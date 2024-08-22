"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Rtypes = [
  {
    value: "txt",
    label: "It's a note.",
  },
  {
    value: "html",
    label: "It's a webpage",
  },
  {
    value: "pdf",
    label: "It's a PDF.",
  },
  {
    value: "csv",
    label: "It's a CSV",
  },
];

interface AddresInt {
  onRtypeSelect?: (selectedRtype: string | null) => void;
}
export function ResourceType({ onRtypeSelect }: AddresInt) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (onRtypeSelect) {
      onRtypeSelect(value);
    }
  }, [value, onRtypeSelect]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-full bg-transparent text-muted-foreground justify-between rounded-xl"
        >
          {value
            ? Rtypes.find((framework) => framework.value === value)?.label
            : "Select content type."}
          <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 rounded-2xl ml-2">
        <Command className="bg-[#171717] rounded-2xl">
          {/* <CommandInput placeholder="Search framework..." /> */}
          <CommandList>
            {/* <CommandEmpty>No framework found.</CommandEmpty> */}
            <CommandGroup>
              {Rtypes.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="rounded-xl cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
