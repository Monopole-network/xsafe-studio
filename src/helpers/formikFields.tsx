import { TextField } from '@mui/material';
import { FormikRoundedCheckBox } from 'src/components/Theme/StyledComponents';

interface FormikInputFieldPropsType {
  label: string;
  name: string;
  value: any;
  error?: string | boolean | string[];
  handleChange?: (e: any) => void;
  handleBlur?: (e: any) => void;
  footer?: React.ReactElement;
  disabled?: boolean;
  className?: string;
}

interface FormikCheckboxPropsType {
  label: string;
  name: string;
  checked: boolean;
  handleChange?: (e: any) => void;
}

export function FormikInputField({
  label,
  name,
  value,
  error,
  handleChange,
  handleBlur,
  footer,
  disabled,
  className,
}: FormikInputFieldPropsType) {
  return (
    <div>
      <div className="input-wrapper">
        <TextField
          variant="outlined"
          label={label}
          id={name}
          value={value}
          name={name}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={error}
          className={className}
          sx={{
            width: '100%',
            transition: 'margin-bottom .5s linear',
            marginBottom: '12px',
            label: {
              marginBottom: 0,
              fontSize: '15px',
              left: '-1px',
            },
            fieldset: {
              transition: 'all .3s linear',
              borderColor: 'rgba(76, 47, 252, 0.23)',
            },
            '&.isError': {
              marginBottom: '14px',
              label: {
                color: '#e51a3e !important',
              },
              fieldset: {
                borderColor: '#e51a3e !important',
              },
              '& .MuiOutlinedInput-root + .MuiFormHelperText-root': {
                color: '#e51a3e !important',
                m: '1px 0 0 4px',
                transition: 'all 2s linear',
              },
              '& .MuiFormHelperText-root:first-letter': {
                textTransform: 'uppercase',
              },
            },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': {
              borderColor: '#4c2ffc',
              borderWidth: '1px',
            },
            '& label.MuiInputLabel-root.Mui-focused': {
              color: '#4c2ffc',
            },
          }}
        />
      </div>
      {footer != null && footer}
    </div>
  );
}

export function FormikCheckbox({
  label,
  name,
  checked,
  handleChange,
}: FormikCheckboxPropsType) {
  return (
    <FormikRoundedCheckBox>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor="upgradeableCheckBox">
        {label}
      </label>
    </FormikRoundedCheckBox>
  );
}
