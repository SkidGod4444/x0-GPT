"use client";

import React, { useEffect, useRef } from "react";
import { type Message as TMsg } from "ai/react";
import Message from "./message";

interface MsgsProps {
  msgs: TMsg[];
}

export default function MsgsWrapper({ msgs }: MsgsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [msgs]);

  return (
    <div
      ref={containerRef}
      className="flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col overflow-y-auto"
    >
      {msgs.map((message, i) => (
        <Message
          key={i}
          content={message.content}
          isUser={message.role === "user"}
        />
      ))}
    </div>
  );
}
