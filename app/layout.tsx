import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/theme.provider";
import { FloatingNav } from "@/components/custom/floating-nav";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

const inter = Bricolage_Grotesque({ subsets: ["latin"] });

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: (
      <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
];

export const metadata: Metadata = {
  title: "x0-GPT - AI-Powered Personal Assistant GPT",
  description: "Explore and interact with any website or PDF effortlessly using x0-GPT, the free AI-powered tool designed for everyone.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          
      {/* <FloatingNav navItems={navItems} /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
