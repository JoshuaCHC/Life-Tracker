import { useState } from "react"

export const useDialogControl = () => {
  const [open, setOpen] = useState(false)

  const handleChange = (open: boolean) => {
    setOpen(open)
  }

  return { open, handleChange }
}