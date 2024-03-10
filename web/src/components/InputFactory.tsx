import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  LocalizationProvider,
  DesktopDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type SelectData = {
  value: string;
  label: string;
};

type InputFactoryProps = {
  field: any;
  label: string;
  type: string;
  data?: SelectData[];
  disabled?: boolean;
  isReadOnly?: boolean;
};

export const InputFactory = ({
  field,
  label,
  type,
  data = [],
  disabled = false,
  isReadOnly = false,
}: InputFactoryProps) => {
  switch (type) {
    case 'number':
      return (
        <TextField
          {...field}
          variant="outlined"
          label={label}
          type="number"
          InputProps={{
            readOnly: !!isReadOnly,
          }}
          disabled={disabled}
        />
      );

    case 'text':
      return (
        <TextField
          {...field}
          variant="outlined"
          label={label}
          type="text"
          InputProps={{
            readOnly: !!isReadOnly,
          }}
        />
      );

    case 'date':
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDateTimePicker
            {...field}
            label={label}
            variant="outlined"
            defaultValue={field.value}
            disabled={disabled}
            format="DD/MM/YYYY hh:mm A"
            InputProps={{
              readOnly: !!isReadOnly,
            }}
          />
        </LocalizationProvider>
      );
    case 'select':
      return (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            {...field}
            defaultValue={field.value}
            disabled={disabled}
            label={label}
          >
            {data.map((value) => (
              <MenuItem value={value.value}>{value.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    case 'checkbox':
      return (
        <FormControlLabel
          control={<Checkbox {...field} defaultChecked={!!field.value} />}
          label={label}
        />
      );

    default:
      return null;
  }
};
