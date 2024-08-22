import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  IconCopy,
  IconDots,
  IconFileTypeCsv,
  IconFileTypePdf,
  IconFileTypeTxt,
  IconStack2,
  IconWorld,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";
import {
  deleteResource,
  getSpacesByUserId,
  updateResourceSpaces,
} from "@/db/func";
import { useAuth } from "@/context/auth.context";
import { toast } from "sonner";

interface MemoCardProps {
  id: string;
  title: string;
  type: string;
  content: string;
  space?: string;
}
interface SpacesInt {
  value: string;
  label: string;
}
export default function MemoCard({
  title,
  type,
  content,
  space,
  id,
}: MemoCardProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [spaces, setSpaces] = useState<SpacesInt[]>([]);

  const handleMemoDelete = async (id: string) => {
    await deleteResource(id);
    toast.success("Memory deleted successfully");
  };

  const handleCopyContent = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Content copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy content");
    }
  };

  const handleSpaceAdd = async (resId: string, spaceId: string) => {
    await updateResourceSpaces(resId, spaceId);
    toast.success("Added to space successfully");
  };

  const handleSpaceRemove = async (resId: string) => {
    await updateResourceSpaces(resId, null);
    toast.warning("Removed from space successfully");
  };

  useEffect(() => {
    const fetchSpaces = async () => {
      if (user) {
        const spaces = await getSpacesByUserId(user?.id!);
        if (spaces) {
          const formattedSpaces = spaces.map((space: any) => ({
            value: space.id,
            label: space.name,
          }));
          setSpaces(formattedSpaces);
        }
      }
    };
    if (space || open) {
      fetchSpaces();
    }
  }, [open, user, space]);

  const getIconForType = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <IconFileTypePdf className="size-6" />;
      case "csv":
        return <IconFileTypeCsv className="size-6" />;
      case "txt":
        return <IconFileTypeTxt className="size-6" />;
      case "web":
        return <IconWorld className="size-6" />;
      default:
        return <IconFileTypeTxt className="size-6" />;
    }
  };

  const spaceLabel = space && spaces.find((s) => s.value === space)?.label;

  return (
    <Card className="flex flex-col h-[30vh] overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-primary-foreground p-3 pb-2 flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          {getIconForType(type)}
          <h2 className="text-lg font-bold text-white truncate">{title}</h2>
        </div>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <IconDots className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[200px] rounded-xl cursor-pointer bg-primary-foreground"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="rounded-xl cursor-pointer"
                onClick={() => handleCopyContent(content)}
              >
                <IconCopy className="size-5 mr-2" /> Copy content
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {space ? (
                <DropdownMenuItem
                  className="rounded-xl cursor-pointer"
                  onClick={() => handleSpaceRemove(id)}
                >
                  Remove from space
                </DropdownMenuItem>
              ) : (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="rounded-xl cursor-pointer">
                    Add to space
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="p-0 rounded-xl bg-primary-foreground">
                    <Command>
                      <CommandInput
                        placeholder="Filter space..."
                        autoFocus={true}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No space found.</CommandEmpty>
                        <CommandGroup>
                          {spaces.map((space) => (
                            <CommandItem
                              key={space.value}
                              value={space.value}
                              onSelect={(value) => {
                                handleSpaceAdd(id, value);
                                setOpen(false);
                              }}
                              className="rounded-xl cursor-pointer"
                            >
                              <IconStack2 className="size-6 mr-2" />
                              {space.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 hover:text-red-600 rounded-xl cursor-pointer"
                onClick={() => handleMemoDelete(id)}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="bg-white p-3 flex-1 overflow-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="truncate text-sm text-gray-700">{content}</p>
            </TooltipTrigger>
            <TooltipContent
              className="flex flex-row bg-muted text-sm text-white cursor-pointer"
              onClick={() => handleCopyContent(content)}
            >
              <IconCopy className="size-5 mr-2" /> Copy content
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
      <CardFooter className="bg-gray-100 p-2">
        <p className="text-xs text-gray-500 truncate w-full">
          {spaceLabel ? `In Space: ${spaceLabel}` : "Not in any space"}
        </p>
      </CardFooter>
    </Card>
  );
}
