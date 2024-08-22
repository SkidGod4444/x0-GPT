import * as React from "react";
import { useAuth } from "@/context/auth.context";
import Link from "next/link";
import { deleteChat, getChatsByUserId } from "@/db/func";
import { toast } from "sonner";
import { History, MoreHorizontal } from "lucide-react";
import { isToday, isYesterday, isWithinInterval, subDays } from "date-fns";
import { createClient } from "@/db/supabase/client";
import { Badge } from "@/components/ui/badge";
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
import { IconTrash } from "@tabler/icons-react";

interface HistInt {
  name: string;
  slug: string;
  created: string;
}

interface Props {
  slug: string;
}

export function HistoryViewer({ slug }: Props) {
  const [history, setHistory] = React.useState<HistInt[]>([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hoveredChat, setHoveredChat] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleChatDel = async (id: string) => {
    await deleteChat(id);
    toast.success("Chat deleted successfully");
  };

  React.useEffect(() => {
    const fetchAllHistory = async () => {
      if (user && history.length === 0) {
        setIsLoading(true);
        try {
          const historyData = await getChatsByUserId(user.id);
          if (historyData) {
            const formattedHist = historyData.map((chat: any) => ({
              slug: chat.slug,
              name: chat.title,
              created: chat.created_at,
            }));

            setHistory(formattedHist);
          }
        } catch (error) {
          console.error("Error fetching history list:", error);
          toast.error("Failed to fetch history list. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        if (!user) {
          setHistory([]);
        }
      }
    };

    fetchAllHistory();

    // Set up real-time subscription to listen for changes in the chats table
    const supabase = createClient();
    const subscription = supabase
      .channel("chats-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "CHATS",
          filter: `user_id=eq.${user?.id!}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newChat = {
              slug: payload.new.slug,
              name: payload.new.title,
              created: payload.new.created_at,
            };

            setHistory((prevHistory) =>
              [newChat, ...prevHistory].sort(
                (a, b) =>
                  new Date(b.created).getTime() - new Date(a.created).getTime(),
              ),
            );
          } else if (payload.eventType === "UPDATE") {
            const updatedChat = {
              slug: payload.new.slug,
              name: payload.new.title,
              created: payload.new.created_at,
            };
            setHistory((prevHistory) =>
              prevHistory
                .map((chat) =>
                  chat.slug === updatedChat.slug ? updatedChat : chat,
                )
                .sort(
                  (a, b) =>
                    new Date(b.created).getTime() -
                    new Date(a.created).getTime(),
                ),
            );
          } else if (payload.eventType === "DELETE") {
            setHistory((prevHistory) =>
              prevHistory.filter((chat) => chat.slug !== payload.old.slug),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user, history.length]);

  // Filter and sort history into groups
  const todayChats = history
    .filter((chat) => isToday(new Date(chat.created)))
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    );

  const yesterdayChats = history
    .filter((chat) => isYesterday(new Date(chat.created)))
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    );

  const previous7DaysChats = history
    .filter((chat) =>
      isWithinInterval(new Date(chat.created), {
        start: subDays(new Date(), 7),
        end: subDays(new Date(), 2),
      }),
    )
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    );

  const noHistory =
    todayChats.length === 0 &&
    yesterdayChats.length === 0 &&
    previous7DaysChats.length === 0;

  return (
    <div className="w-full min-h-[50vh]">
      <div className="p-4">
        {isLoading ? (
          <span className="flex w-full items-center justify-center my-5 text-muted-foreground">
            <History className="size-6 mr-2 animate-spin-counterclockwise" />
            Loading...
          </span>
        ) : noHistory ? (
          <span className="flex w-full items-center justify-center my-5 text-muted-foreground">
            <History className="size-6 mr-2" />
            No history found.
          </span>
        ) : (
          <>
            {todayChats.length > 0 && (
              <>
                <h4 className="mb-4 text-sm font-medium leading-none">Today</h4>
                {todayChats.map((chat) => (
                  <div
                    key={chat.slug}
                    className={`relative text-sm my-2 rounded-xl text-muted-foreground hover:text-white hover:bg-muted p-2 cursor-pointer ${slug === chat.slug ? "bg-muted text-white" : ""}`}
                    onMouseEnter={() => setHoveredChat(chat.slug)}
                    onMouseLeave={() => setHoveredChat(null)}
                  >
                    <Link href={`/c/${chat.slug}`} passHref>
                      {chat.name.length > 20
                        ? `${chat.name.slice(0, 25)}...`
                        : chat.name}
                    </Link>
                    {(slug === chat.slug || hoveredChat === chat.slug) && (
                      <Badge
                        onClick={() => handleChatDel(chat.slug)}
                        className="absolute h-5 right-2 bg-muted hover:bg-muted shadow-none top-1/2 transform -translate-y-1/2 cursor-pointer"
                      >
                        <IconTrash className="cursor-pointer text-muted-foreground hover:text-red-600 size-4" />
                      </Badge>
                    )}
                  </div>
                ))}
              </>
            )}
            {yesterdayChats.length > 0 && (
              <>
                <h4 className="mb-4 text-sm font-medium leading-none mt-2">
                  Yesterday
                </h4>
                {yesterdayChats.map((chat) => (
                  <div
                    key={chat.slug}
                    className={`relative text-sm my-2 rounded-xl text-muted-foreground hover:text-white hover:bg-muted p-2 cursor-pointer ${slug === chat.slug ? "bg-muted text-white" : ""}`}
                    onMouseEnter={() => setHoveredChat(chat.slug)}
                    onMouseLeave={() => setHoveredChat(null)}
                  >
                    <Link href={`/c/${chat.slug}`} passHref>
                      {chat.name.length > 20
                        ? `${chat.name.slice(0, 20)}...`
                        : chat.name}
                    </Link>
                    {(slug === chat.slug || hoveredChat === chat.slug) && (
                      <Badge
                        onClick={() => handleChatDel(chat.slug)}
                        className="absolute h-5 right-2 bg-muted hover:bg-muted shadow-none top-1/2 transform -translate-y-1/2 cursor-pointer"
                      >
                        <IconTrash className="cursor-pointer text-muted-foreground hover:text-red-600 size-4" />
                      </Badge>
                    )}
                  </div>
                ))}
              </>
            )}

            {previous7DaysChats.length > 0 && (
              <>
                <h4 className="mb-4 text-sm font-medium leading-none mt-2">
                  Previous 7 Days
                </h4>
                {previous7DaysChats.map((chat) => (
                  <div
                    key={chat.slug}
                    className={`relative text-sm my-2 rounded-xl text-muted-foreground hover:text-white hover:bg-muted p-2 cursor-pointer ${slug === chat.slug ? "bg-muted text-white" : ""}`}
                    onMouseEnter={() => setHoveredChat(chat.slug)}
                    onMouseLeave={() => setHoveredChat(null)}
                  >
                    <Link href={`/c/${chat.slug}`} passHref>
                      {chat.name.length > 20
                        ? `${chat.name.slice(0, 20)}...`
                        : chat.name}
                    </Link>
                    {(slug === chat.slug || hoveredChat === chat.slug) && (
                      <Badge
                        onClick={() => handleChatDel(chat.slug)}
                        className="absolute h-5 right-2 bg-muted hover:bg-muted shadow-none top-1/2 transform -translate-y-1/2 cursor-pointer"
                      >
                        <IconTrash className="cursor-pointer text-muted-foreground hover:text-red-600 size-4" />
                      </Badge>
                    )}
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
