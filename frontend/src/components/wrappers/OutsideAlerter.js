import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const useOutsideAlerter = (ref, onClickOutside) => {
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside();
      event.stopPropagation();
    }
    return null;
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
};

// Component that alerts if you click outside of it
const OutsideAlerter = props => {
  const { children, onClickOutside, id } = props;

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClickOutside);

  return (
    <div key={id} ref={wrapperRef}>
      {children}
    </div>
  );
};

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default OutsideAlerter;
