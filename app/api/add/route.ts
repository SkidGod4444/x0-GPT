import { NextRequest, NextResponse } from "next/server";
import {
  AddCSVContext,
  AddPDFContext,
  AddTXTContext,
  AddWEBContext,
} from "../../../lib/rag";

export const POST = async (req: NextRequest) => {
  try {
    const { type, content, namespace } = await req.json();

    // Check the type and call the corresponding function
    if (type === "pdf") {
      await AddPDFContext(namespace, content);
    } else if (type === "csv") {
      await AddCSVContext(namespace, content);
    } else if (type === "html") {
      await AddWEBContext(namespace, content);
    } else if (type === "txt") {
      await AddTXTContext(namespace, content);
    } else {
      return NextResponse.json(
        { success: false, message: "Unsupported type" },
        { status: 400 },
      );
    }

    // Return true as the response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 },
    );
  }
};
