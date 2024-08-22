"use client";

import React from "react";
import { Button } from "../ui/button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { createClient } from "@/db/supabase/client";

export default function SignInBtn() {
  const handleSignIn = async () => {
    const origin = process.env.NEXT_PUBLIC_URL;
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/api/oauth`,
      },
    });
  };
  return (
    <Button variant="secondary" size="lg" onClick={handleSignIn}>
      <IconBrandGoogleFilled className="h-5 w-5 mr-2" /> Continue with Google
    </Button>
  );
}
