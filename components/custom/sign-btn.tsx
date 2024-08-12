"use client";

import React from "react";
import { Button } from "../ui/button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { GoogleSignIn } from "@/db/func";

async function handleSignIn() {
  const res = await GoogleSignIn();
  console.log(res);
}
export default function SignInBtn() {
  return (
    <Button variant="secondary" size="lg" onClick={handleSignIn}>
      <IconBrandGoogleFilled className="h-5 w-5 mr-2" /> Continue with Google
    </Button>
  );
}
