import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/theme.provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthWrapper } from "@/context/auth.context";
import { UserProvider } from "@/context/user.context";

const inter = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "x0-GPT - AI-Powered Personal Assistant GPT",
  description:
    "Explore and interact with any website or PDF effortlessly using x0-GPT, the free AI-powered tool designed for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <UserProvider>
          <AuthWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AuthWrapper>
        </UserProvider>
        {/* vercel analytics and speed insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
