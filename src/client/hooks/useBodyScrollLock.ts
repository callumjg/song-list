import { useEffect, useRef } from "react";

const useBodyScrollLock = dependency => {
  const body = useRef(document.querySelector("body")).current;
  useEffect(() => {
    if (dependency) {
      body.style = "overflow:hidden;";
    }
    if (!dependency) {
      body.style = "";
    }
    return () => (body.style = "");
  }, [dependency, body.style]);
};

export default useBodyScrollLock;
