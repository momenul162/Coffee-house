import React, { forwardRef } from "react";
import { Input } from "@mui/joy";

const FormField = forwardRef(
  ({ type, placeholder, defaultValue = false, onChange, ...props }, ref) => {
    return (
      <>
        <Input
          ref={ref}
          sx={{ py: 1 }}
          size="lg"
          variant="outlined"
          placeholder={placeholder}
          required
          type={type}
          value={props?.name}
          onChange={onChange}
          {...props}
        />
      </>
    );
  }
);

export default FormField;
