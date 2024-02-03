import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { LocalizationProvider, DateTimeField, DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type inputFactoryProps = {
  field: any;
  label: string;
  type: string;
  disabled?: boolean;
  isReadOnly?: boolean;
};
export const InputFactory = ({
  field,
  label,
  type,
  disabled = false,
  isReadOnly = false
}: inputFactoryProps) => {
  switch (type) {
    case "number":
      return (
        <TextField
          {...field}
          variant="outlined"
          label={label}
          type={"number"}
          InputProps={{
            readOnly: isReadOnly ? true : false,
          }}
          disabled={disabled}
        />
      );

    case "text":
      return (
        <TextField
          {...field}
          variant="outlined"
          label={label}
          type={"text"}
          InputProps={{
            readOnly: isReadOnly ? true : false,
          }}
        />
      );

    case "date":
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDateTimePicker 
            {...field}
            label={label}
            variant="outlined"
            defaultValue={field.value}
            disabled={disabled}
            format={'DD/MM/YYYY hh:mm A'}
            InputProps={{
              readOnly: isReadOnly ? true : false,
            }}
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
