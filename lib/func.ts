async function GenChatUUID(userId: string): Promise<string> {
  const totalLength = 40; // Total length of the resulting string
  const userIdLength = userId.length;
  const halfUserIdLength = Math.floor(userIdLength / 2);
  const slugLength = totalLength - halfUserIdLength - 2;

  // Generate a UUID-like string with the specified length
  const remainingUUID = Array.from({ length: slugLength }, (_, i) => {
    const c = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"[i];
    if (c === "-" || c === "4") return c;
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  }).join("");

  // Slice the user ID to get the first half
  const halfUserId = userId.slice(0, halfUserIdLength);

  return `${halfUserId}--${remainingUUID}`;
}

export { GenChatUUID };
