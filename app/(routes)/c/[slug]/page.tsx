"use client";

import { useEffect, useState } from "react";
import ErrorPage from "next/error";
import { ChatComp } from "@/components/custom/chat/chat-comp";
import { getChatBySlug } from "@/db/func";
import { Message } from "ai/react";
import LoadingScreen from "@/components/custom/loading-screen";
import { createClient } from "@/db/supabase/client";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ChatsPage({ params }: PageProps) {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [history, setHistory] = useState<Message[]>([]);
  const chatID = params.slug.replace(/^\//, "");
  const router = useRouter();

  useEffect(() => {
    async function handleSlug() {
      setLoading(true); // Set loading to true at the start
      const isChat = await getChatBySlug(chatID);
      if (isChat) {
        try {
          const response = await fetch("/api/history", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ chatID }),
          });

          if (response.ok) {
            const chatHistory = await response.json();
            setHistory(chatHistory);
            setOk(true);
          } else {
            console.error("Failed to fetch chat history");
            setOk(false);
          }
        } catch (error) {
          console.error("Error fetching chat history:", error);
          setOk(false);
        }
      } else {
        setOk(false);
      }
      setLoading(false);
    }

    handleSlug();
  }, [params.slug, chatID]);

  useEffect(() => {
    const supabase = createClient();
    const subscription = supabase
      .channel("chats-channel")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "CHATS",
          filter: `slug=eq.${chatID}`,
        },
        (payload) => {
          if (payload.eventType === "DELETE" && chatID) {
            router.replace("/chat");
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [router, chatID]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!ok) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <ChatComp chatId={chatID} history={history} />
    </div>
  );
}
