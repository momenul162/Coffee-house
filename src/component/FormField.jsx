import { TextField } from "@mui/material";

const FormField = ({ label = "", defaultValue = "", type, onChange, ...props }) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        type={type}
        label={label}
        defaultValue={defaultValue}
        onChange={onChange}
        variant="outlined"
        size="small"
        {...props}
      />
    </>
  );
};

export default FormField;
