import { Button } from "@mui/joy";

export const SubmitButton = ({ processing, error, children, disabled }) => (
  <Button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </Button>
);
