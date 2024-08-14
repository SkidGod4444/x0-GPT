"use client";

import React from "react";
import { Button } from "../ui/button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useUser } from "@/context/user.context";

export default function SignInBtn() {
  const {signIn} = useUser();
  const handleSignIn = async () => {
    await signIn();
  }
  return (
    <Button variant="secondary" size="lg" onClick={handleSignIn}>
      <IconBrandGoogleFilled className="h-5 w-5 mr-2" /> Continue with Google
    </Button>
  );
}
