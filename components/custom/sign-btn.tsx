"use client";

import React from "react";
import { Button } from "../ui/button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { createClient } from "@/db/supabase/client";

export default function SignInBtn() {
  const handleSignIn = async () => {
    let origin = "";
    const isLocalEnv = process.env.NODE_ENV === "development";
    if(isLocalEnv){
      origin = "http://localhost:3000"
    } else {
      origin = "https://x0-gpt.devwtf.in" 
    }
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
