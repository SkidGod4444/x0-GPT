import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/theme.provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { RoutesContext } from "@/context/routes.context";
import { Toaster } from "@/components/ui/sonner";

const inter = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "x0-GPT - AI-Powered Personal Assistant GPT",
  description:
    "Explore and interact with any WEBPAGE, PDF, CSV, TXT and many more effortlessly using x0-GPT, the free AI-powered tool designed for everyone.",
  keywords: [
    "Saidev Dhal",
    "Upstash rag chat",
    "Upstash sdk",
    "Chat with pdf",
    "Chat with website",
    "Chat with csv",
    "Acternity UI",
    "x0 gpt",
    "x0-gpt",
    "Ai",
    "Gpt",
    "Personal assistant",
    "Chat with ai",
    "Chat with gpt",
    "Chat with x0-gpt",
    "Chat with x0 gpt",
  ],
  authors: [
    {
      name: "Saidev Dhal",
      url: "https://devwtf.in",
    },
  ],
  creator: "Saidev Dhal",
  openGraph: {
    images: [
      {
        url: "https://i.imgur.com/ffeIgzW.png",
        width: 1200,
        height: 627,
        alt: "x0-GPT - AI-Powered Personal Assistant GPT",
      },
    ],
  },
  metadataBase: {
    host: "https://x0-gpt.devwtf.in",
    href: "/",
    origin: "https://x0-gpt.devwtf.in",
    password: "x0-gpt",
    hash: "x0-gpt",
    pathname: "/",
    search: "",
    username: "devwtf",
    hostname: "x0-gpt.devwtf.in",
    port: "",
    protocol: "https:",
    searchParams: new URLSearchParams(""),
    toString: () => "https://x0-gpt.devwtf.in/",
    toJSON: () => "https://x0-gpt.devwtf.in/",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://x0-gpt.devwtf.in",
    creator: "https://x0-gpt.devwtf.in",
    title: "x0-GPT - AI-Powered Personal Assistant GPT",
    description:
      "Explore and interact with any WEBPAGE, PDF, CSV, TXT and many more effortlessly using x0-GPT, the free AI-powered tool designed for everyone.",
    images: [
      {
        url: "https://i.imgur.com/ffeIgzW.png",
        width: 1200,
        height: 627,
        alt: "x0-GPT - AI-Powered Personal Assistant GPT",
      },
    ],
  },
};

const protectedRoutes = ["/chat", "/memories", "/c", "/spaces"];
const publicRoutes = ["/", "/gatway"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RoutesContext
          protectedRoutes={protectedRoutes}
          publicRoutes={publicRoutes}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </RoutesContext>
        <Toaster />
        {/* vercel analytics and speed insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
