import { useState } from 'react';

export const useDialogControl = () => {
  const [open, setOpen] = useState(false);

  const handleChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return { open, handleChange };
};
