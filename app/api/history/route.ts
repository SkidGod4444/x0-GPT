import { ragChat } from "@/lib/rag";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { chatID } = await req.json();
    const chatHistory = await ragChat.history.getMessages({
      amount: 100,
      sessionId: chatID,
    });

    return NextResponse.json(chatHistory);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return new NextResponse("Failed to fetch chat history", { status: 500 });
  }
};
