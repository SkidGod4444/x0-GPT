import { OAuthProvider } from "appwrite";
import { AppwriteUser } from "./init";

async function GoogleSignIn() {
  try {
    AppwriteUser.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:3000/chat", // success
    );    
  } catch (error) {
    console.error("ERROR OCCURED WHILE LOGGING IN:", error);
  }
}


export { GoogleSignIn };
