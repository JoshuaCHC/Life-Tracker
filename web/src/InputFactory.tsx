import { TextField } from "@mui/material";
import { ControllerRenderProps } from "react-hook-form";
import { EventTask } from "./models/tasks";
import { LocalizationProvider, DateTimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type inputFactoryProps = {
  field: ControllerRenderProps<EventTask, keyof EventTask>;
  label: string;
  type: string;
};
export const InputFactory = ({ field, label, type }: inputFactoryProps) => {
  switch (type) {
    case "number":
      return (
        <TextField
          {...field}
          variant="outlined"
          label={label}
          type={"number"}
        />
      );

    case "text":
      return (
        <TextField
          {...field}
          variant="outlined"
          label={label}
          type={"text"}
        />
      );

    case "date":
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimeField
            {...field}
            variant="outlined"
            defaultValue={field.value}
          />
        </LocalizationProvider>
      );
    default:
      return null;
  }
};
