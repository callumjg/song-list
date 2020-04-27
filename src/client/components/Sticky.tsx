import React, { useState, useEffect, useRef } from 'react';
import './Sticky.scss';

interface Props {
  children: (stuck: boolean) => JSX.Element;
  scrollTarget?: string;
}

const getAbsOffsetTop = (element) => {
  let top: number = 0;
  while (element) {
    top += element.offsetTop || 0;
    element = element.offsetParent;
  }
  return top;
};

const Sticky: React.FC<Props> = ({ children, scrollTarget = '#root' }) => {
  const [stuck, setStuck] = useState(false);
  const stuckClassText = stuck ? ' stuck' : '';
  const element = useRef(null);
  const offsetHeight = element.current ? element.current.offsetHeight : 0;
  const absOffset = getAbsOffsetTop(element.current);

  useEffect(() => {
    const scrollingElement = document.querySelector(scrollTarget);
    function handleScroll() {
      scrollingElement.scrollTop > absOffset ? setStuck(true) : setStuck(false);
    }
    scrollingElement.addEventListener('scroll', handleScroll);

    return () => scrollingElement.removeEventListener('scroll', handleScroll);
  }, [absOffset, scrollTarget]);

  return (
    <>
      <div className={`sticky${stuckClassText}`} ref={element}>
        {typeof children === 'function' ? children(stuck) : children}
      </div>
      {stuck && <div style={{ height: offsetHeight }} />}
    </>
  );
};

export default Sticky;
