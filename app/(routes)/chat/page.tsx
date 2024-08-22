"use client";

import { useEffect, useState } from "react";
import { ChatComp } from "@/components/custom/chat/chat-comp";
import { useAuth } from "@/context/auth.context";
import { getUserCurrenChat } from "@/db/func";
import LoadingScreen from "@/components/custom/loading-screen";

export default function Chat() {
  const { user } = useAuth();
  const uid = user?.id!;
  const [chatID, setChatID] = useState<string | null>(null);
  const [isMsg, setMsg] = useState(false);

  useEffect(() => {
    const fetchChatID = async () => {
      const id = await getUserCurrenChat(uid);
      if (!chatID) {
        setChatID(id);
      }
    };

    if (user) {
      fetchChatID();
    }
  }, [user, uid, chatID]);

  useEffect(() => {
    if (chatID && isMsg) {
      window.history.replaceState(null, "", `/c/${chatID}`);
    }
  }, [chatID, isMsg]);

  // Conditional rendering based on chatID
  if (!chatID) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <ChatComp chatId={chatID} onHasMessagesChange={setMsg} />
    </div>
  );
}
