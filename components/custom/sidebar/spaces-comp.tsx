"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  deleteSpace,
  getSpaceByName,
  getSpacesByUserId,
  storeSpace,
} from "@/db/func";
import { useAuth } from "@/context/auth.context";
import { toast } from "sonner";
import { IconStack2, IconTrash } from "@tabler/icons-react";

interface SpacesInt {
  value: string;
  label: string;
}

interface SpaceCompProps {
  placeHolder?: string;
  onSpaceSelect?: (selectedSpaceId: string | null) => void;
}

export function SpaceComp({ placeHolder, onSpaceSelect }: SpaceCompProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const { user } = useAuth();
  const [spaces, setSpaces] = React.useState<SpacesInt[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSpace = async () => {
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;

    try {
      // Store space and update state
      await storeSpace(user?.id!, trimmedSearch);
      const newSpace = await getSpaceByName(trimmedSearch, user?.id!);
      if (newSpace) {
        const formattedSpace = {
          value: newSpace.id,
          label: newSpace.name,
        };
        setSpaces((prevSpaces) => [...prevSpaces, formattedSpace]);
        setValue(newSpace.id);
        setOpen(false);
        setSearch("");

        const currentDate = new Date().toLocaleString();
        toast.success(`Space "${trimmedSearch}" has been created`, {
          description: currentDate,
          action: {
            label: "Undo",
            onClick: async () => await handleDeleteSpace(newSpace.id),
          },
        });
      }
    } catch (error) {
      console.error("Error creating space:", error);
      toast.error("Failed to create space. Please try again.");
    }
  };

  const handleDeleteSpace = async (spaceId: string) => {
    try {
      await deleteSpace(spaceId);
      setSpaces((prev) => prev.filter((space) => space.value !== spaceId));
      if (value === spaceId) {
        setValue(null);
      }
      const currentDate = new Date().toLocaleString();
      toast.warning(`Space has been deleted`, { description: currentDate });
    } catch (error) {
      console.error("Error deleting space:", error);
      toast.error("Failed to delete space. Please try again.");
    }
  };

  React.useEffect(() => {
    if (!open) {
      setSearch("");
      return;
    }

    if (user && open) {
      setIsLoading(true);
      const fetchSpaces = async () => {
        try {
          const spacesData = await getSpacesByUserId(user.id);
          if (spacesData) {
            const formattedSpaces = spacesData.map((space: any) => ({
              value: space.id,
              label: space.name,
            }));
            setSpaces(formattedSpaces);
          }
        } catch (error) {
          console.error("Error fetching spaces:", error);
          toast.error("Failed to fetch spaces. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchSpaces();
    }
  }, [user, open]);

  React.useEffect(() => {
    if (onSpaceSelect) {
      onSpaceSelect(value);
    }
  }, [value, onSpaceSelect]);

  const filteredSpaces = spaces.filter((space) =>
    space.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-full bg-transparent text-muted-foreground justify-between rounded-xl"
        >
          {value !== null && spaces.find((space) => space.value === value)
            ? spaces.find((space) => space.value === value)?.label
            : open
              ? "Right click space to delete"
              : placeHolder || "Select space..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 rounded-2xl ml-2">
        <Command className="bg-[#171717] rounded-2xl">
          <CommandInput
            value={search}
            onValueChange={(txt) => setSearch(txt)}
            placeholder="Search or create space..."
            className="h-9"
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>Syncing...</CommandEmpty>
            ) : (
              <>
                {filteredSpaces.length > 0 ? (
                  <CommandGroup>
                    {filteredSpaces.map((space) => (
                      <ContextMenu key={space.value}>
                        <ContextMenuTrigger>
                          <CommandItem
                            key={space.value}
                            value={space.label}
                            onSelect={() => {
                              if (value === space.value) {
                                setValue(null);
                              } else {
                                setValue(space.value);
                              }
                              setOpen(false);
                              setSearch("");
                            }}
                            className="rounded-xl cursor-pointer"
                          >
                            <IconStack2 className="size-6 mr-2" />
                            {space.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                value === space.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="rounded-xl bg-[#171717]">
                          <ContextMenuItem
                            className="rounded-xl cursor-pointer text-red-600 hover:text-red-600"
                            onClick={() => handleDeleteSpace(space.value)}
                          >
                            <IconTrash className="size-5 mr-2" /> Delete space
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    ))}
                  </CommandGroup>
                ) : search.trim() === "" ? (
                  <CommandEmpty>Type to create space</CommandEmpty>
                ) : (
                  <CommandEmpty>
                    <span
                      className="underline cursor-pointer"
                      onClick={handleSpace}
                    >
                      Create space - &quot;{search}&quot;
                    </span>
                  </CommandEmpty>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
