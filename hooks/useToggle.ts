import React from 'react';

const useToggle = () => {
  const [isToggleOpen, setIsToggleOpen] = React.useState(false);

  const handleToggle = () => {
    setIsToggleOpen((prev) => !prev);
  };

  return { isToggleOpen, handleToggle };
};

export default useToggle;
