import { useState, useEffect } from "react";

function useOnline() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    addEventListener("online", onOnline);
    addEventListener("offline", onOffline);

    function onOnline() {
      setIsOnline(true);
    }

    function onOffline() {
      setIsOnline(false);
    }

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  return isOnline;
}

export default useOnline;
