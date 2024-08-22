import { createClient } from "@/db/supabase/client";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js"; // Import the User type
import { setUserCurrenChat, storeUser } from "@/db/func";
import { GenChatUUID } from "@/lib/func";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null); // Set the type for the user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      // Fetch the user first
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Wait for 2.5 seconds before setting the user state
      setTimeout(async () => {
        if (user) {
          await storeUser(user);
          const slug = await GenChatUUID(user.id);
          if (slug) {
            await setUserCurrenChat(user.id, slug);
          }
        }
        setUser(user ?? null);
        setLoading(false);
      }, 2500);
    };

    fetchUser();

    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Wait for 2.5 seconds before setting the user state
      setTimeout(() => {
        setUser(session?.user ?? null);
        setLoading(false);
      }, 2500);
    });

    // Unsubscribe on cleanup
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { user, loading };
};
