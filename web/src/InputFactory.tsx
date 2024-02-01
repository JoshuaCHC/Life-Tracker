import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { ControllerRenderProps, FieldValue } from "react-hook-form";
import { LocalizationProvider, DateTimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type inputFactoryProps = {
  field: any;
  label: string;
  type: string;
  disabled?: boolean;
};
export const InputFactory = ({
  field,
  label,
  type,
  disabled = false,
}: inputFactoryProps) => {
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
            label={label}
            variant="outlined"
            defaultValue={field.value}
            disabled={disabled}
          />
        </LocalizationProvider>
      );

    case "checkbox":
      return (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              defaultChecked={!!field.value}
            />
          }
          label={label}
        />
      );
      
    default:
      return null;
  }
};
