import React, { forwardRef } from "react";
import { Input } from "@mui/joy";

const UpdateFormField = forwardRef(
  ({ type, placeholder, defaultValue = "", onChange, ...props }, ref) => {
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
          value={props.value}
          defaultValue={defaultValue}
          onChange={onChange}
          {...props}
        />
      </>
    );
  }
);

export default UpdateFormField;
