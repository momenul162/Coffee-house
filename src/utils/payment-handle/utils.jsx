export const Result = ({ children }) => <div className="result">{children}</div>;

export const ErrorResult = ({ children }) => <div className="error">{children}</div>;

export const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};
