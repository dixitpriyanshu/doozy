import { retrieveData, StorageKeys } from "@/store";
import { useEffect, useState } from "react";

export const useSession = () => {
  const [session, setSession] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const checkSession = async () => {
      const token = await retrieveData(StorageKeys.JWT);
      if (token) setSession(token);
      else setSession(null);
    };
    checkSession();
  }, []);

  return session;
};
