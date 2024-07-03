import { TextField } from "@mui/material";
import { forwardRef } from "react";

const FormField = forwardRef(({ label = "", type, onChange, ...props }, ref) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        type={type}
        label={label}
        ref={ref}
        value={props.name}
        onChange={onChange}
        variant="outlined"
        size="small"
        {...props}
      />
    </>
  );
});

export default FormField;
