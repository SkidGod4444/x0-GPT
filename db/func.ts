import { OAuthProvider } from "appwrite";
import { AppwriteUser } from "./init";

async function GoogleSignIn() {
  const urlCallback = process.env.NEXT_PUBLIC_URL!
  try {
    AppwriteUser.createOAuth2Session(
      OAuthProvider.Google,
      `${urlCallback}/chat`, // success
    );    
  } catch (error) {
    console.error("ERROR OCCURED WHILE LOGGING IN:", error);
  }
}


export { GoogleSignIn };
