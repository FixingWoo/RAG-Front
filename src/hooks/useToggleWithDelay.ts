import { useState } from 'react';

export const useToggleWithDelay = (initialState = false, delay = 1000) => {
  const [state, setState] = useState(initialState);

  const toggle = () => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, delay);
  };

  return [state, toggle] as const;
};
