import { useEffect } from "react";

const body = document.querySelector("body");

const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      body.style.overflow = "hidden";
    }
    if (!isLocked) {
      body.style.overflow = "";
    }
    return () => (body.style.overflow = "");
  }, [isLocked]);
};

export default useBodyScrollLock;
