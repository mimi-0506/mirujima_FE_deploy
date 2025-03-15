import React from 'react';

const useToggle = (init: boolean = false) => {
  const [isToggleOpen, setIsToggleOpen] = React.useState(init);

  const handleToggle = () => {
    setIsToggleOpen((prev) => !prev);
  };

  return { isToggleOpen, handleToggle };
};

export default useToggle;
