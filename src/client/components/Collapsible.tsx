import React, { useState } from 'react';
import './Collapsible.scss';

type Props = {
  defaultOpen?: boolean;
  heading?: ((isOpen: boolean) => JSX.Element | String) | JSX.Element | string;
  headingTop?: boolean;
};

const Collapsible: React.FC<Props> = ({
  defaultOpen,
  heading,
  children,
  headingTop,
}) => {
  const [isOpen, setOpen] = useState(defaultOpen);

  const renderHeadingContent = () => {
    if (!heading)
      return (
        <div className="default-heading">
          <ion-icon
            name={isOpen ? 'chevron-up-outline' : 'ellipsis-horizontal-outline'}
          />
        </div>
      );
    return typeof heading === 'function' ? heading(isOpen) : heading;
  };

  const renderHeading = () => (
    <div className="collapsible-heading" onClick={() => setOpen(!isOpen)}>
      {renderHeadingContent()}
    </div>
  );
  return (
    <div className="collapsible">
      {headingTop && renderHeading()}
      <div className={`collapsible-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
      {headingTop || renderHeading()}
    </div>
  );
};
export default Collapsible;
