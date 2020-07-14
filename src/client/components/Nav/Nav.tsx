import React, { useState, useContext, useRef } from 'react';
import CircleMenu from './CircleMenu';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';
import { AuthContext } from '../Auth';

import './Nav.scss';

export interface Link {
  onClick: (e?: React.MouseEvent) => void;
  label: string;
}
interface Props {
  links?: Link[];
}

const Nav: React.FC<Props> = ({ links = [] }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navStatus = isNavOpen ? ' open' : '';
  const { current: refs } = useRef({});
  useBodyScrollLock(isNavOpen);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') refs[0].focus();
    if (e.key === 'Escape') setIsNavOpen(false);
  };

  const onLinkKeyDown = (e, i) => {
    switch (e.key) {
      case 'Escape':
        setIsNavOpen(false);
        break;
      case 'ArrowDown':
        if (i === links.length - 1) {
          refs[0].focus();
        } else {
          refs[i + 1].focus();
        }
        break;
      case 'ArrowUp':
        if (i === 0) {
          refs[links.length - 1].focus();
        } else {
          refs[i - 1].focus();
        }
        break;
      default:
      // no default
    }
  };
  return (
    <div>
      <div>
        <CircleMenu
          isOpen={isNavOpen}
          onClick={() => setIsNavOpen(!isNavOpen)}
          onKeyDown={onKeyDown}
        />
      </div>
      <nav>
        <div
          className={`nav-container${navStatus}`}
          onClick={() => setIsNavOpen(false)}
          onKeyPress={(e) => {
            console.log('test');
            if (e.key === 'Enter') setIsNavOpen(false);
          }}
          role="none"
        >
          <div className={`nav-slider${navStatus}`}>
            {links.map(({ onClick, label }, i) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                ref={(ref) => {
                  refs[i] = ref;
                }}
                onKeyDown={(e) => onLinkKeyDown(e, i)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
