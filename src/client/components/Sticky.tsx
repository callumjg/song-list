import React, { useState, useEffect, useRef } from "react";
import "./Sticky.scss";

const Sticky: React.FC = props => {
  const [stuck, setStuck] = useState("");
  const [offset, setOffset] = useState(0);
  const element = useRef(null);

  useEffect(() => {
    setOffset(element.current.offsetHeight);
  }, []);

  useEffect(() => {
    function handleScroll() {
      window.scrollY > offset ? setStuck(" stuck") : setStuck("");
    }
    if (offset) {
      document.addEventListener("scroll", handleScroll);
    }
    return () => document.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return (
    <>
      <div className={`sticky${stuck}`} ref={element}>
        {typeof props.children === "function"
          ? props.children(stuck)
          : props.children}
      </div>
      {stuck && <div style={{ height: offset }} />}
    </>
  );
};

export default Sticky;
