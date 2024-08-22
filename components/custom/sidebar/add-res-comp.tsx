import React, { useEffect, useState } from "react";
import { CirclePlus, SaveAll } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { SpaceComp } from "./spaces-comp";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { ResourceType } from "../res-type";
import { storeResource } from "@/db/func";
import { useAuth } from "@/context/auth.context";
import { toast } from "sonner";

export default function AddResComp() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [space, setSpace] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (user && contentType && content && space) {
      try {
        const response = await fetch("/api/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: contentType,
            content: content,
            namespace: space,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save resource");
        }

        await storeResource(user?.id, title!, contentType!, content!, space!);
        setOpen(false);
        const currentDate = new Date().toLocaleString();
        toast.success(`Resource has been saved!`, {
          description: currentDate,
        });
      } catch (error) {
        console.error("Error saving resource:", error);
        toast.error("Failed to save resource. Please try again.");
      }
    } else {
      toast.error("Please fill all the required fields.");
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "q" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex items-center gap-3 rounded-xl px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer">
          <CirclePlus className="h-5 w-5" />
          <span>Add Resource</span>
          <kbd className="hidden md:relative left-5 pointer-events-none md:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>Q
          </kbd>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-primary-foreground">
        <DialogHeader>
          <DialogTitle>Add your resources!</DialogTitle>
          <DialogDescription>
            Give me anything, I will remember for you.
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="title">Title (Optional)</Label>
        <Input
          id="title"
          placeholder="Enter the title."
          className="border border-muted rounded-xl"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <Label htmlFor="space">Select a space *</Label>
        <SpaceComp
          placeHolder="Add to your space."
          onSpaceSelect={(space) => setSpace(space)}
        />
        <Label htmlFor="resource">Select content type *</Label>
        <ResourceType onRtypeSelect={(rtype) => setContentType(rtype)} />
        <Label htmlFor="message">Your content *</Label>
        <Textarea
          placeholder="Enter your content."
          id="message"
          className="border border-muted rounded-xl"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            <SaveAll className="size-5 mr-2" />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
