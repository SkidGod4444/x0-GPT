import { OAuthProvider } from "appwrite";
import { AppwriteUser } from "./init";

async function GoogleSignIn() {
  const isDevelopment = process.env.NODE_ENV === "development";
  try {
    AppwriteUser.createOAuth2Session(
      OAuthProvider.Google,
      isDevelopment
        ? "http://localhost:3000/chat"
        : "https://x0-gpt.devwtf.in"
    );
  } catch (error) {
    console.error("ERROR OCCURED WHILE LOGGING IN:", error);
  }
}

export { GoogleSignIn };
