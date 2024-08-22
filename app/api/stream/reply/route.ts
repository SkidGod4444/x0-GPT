import { ragChat } from "@/lib/rag";
import { NextRequest } from "next/server";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";

export const POST = async (req: NextRequest) => {
  const { messages, chatId, offRag, namespace } = await req.json();
  const lastMsg = messages[messages.length - 1].content;
  const res = await ragChat.chat(lastMsg, {
    namespace: namespace,
    streaming: true,
    sessionId: chatId,
    historyLength: 100,
    historyTTL: 604_800,
    similarityThreshold: 1,
    disableRAG: offRag || false,
  });
  return aiUseChatAdapter(res);
};
