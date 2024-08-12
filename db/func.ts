import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { firebase } from "./init";

async function GoogleSignIn() {
  const provider = new GoogleAuthProvider();
  const user = getAuth(firebase);
  try {
    signInWithRedirect(user, provider)
      .then((result: any) => {
        // Handle sign-in result
        const User = result.user;
        return User;
      })
      .catch((error) => {
        // Handle sign-in error
        console.error("INTERNAL ERROR OCCURED:", error);
      });
  } catch (error) {
    console.error("ERROR OCCURED WHILE LOGGING IN:", error);
  }
}

async function GoogleSignOut() {
  const user = getAuth();
    try {
      signOut(user)
      .then(() => {
        // Sign-out successful.
        return true;
      }).catch((error) => {
        // An error happened.
        console.error("INTERNAL ERROR OCCURED:", error);
      });
    } catch (error) {
      console.error("ERROR OCCURED WHILE LOGGING IN:", error);
    }
  }

export { GoogleSignIn, GoogleSignOut };
