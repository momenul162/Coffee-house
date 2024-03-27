import { TextField } from "@mui/material";

const FormField = ({ label, type, onChange, ...props }) => {
  return (
    <TextField
      id="outlined-basic"
      type={type}
      label={label}
      onChange={onChange}
      variant="outlined"
      size="small"
      {...props}
    />
  );
};

export default FormField;
