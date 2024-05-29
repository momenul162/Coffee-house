import { KeyboardArrowDown } from "@mui/icons-material";
import { MenuItem, Select, selectClasses } from "@mui/joy";
import React from "react";

const SortSelect = ({ value, getLimit }) => {
  const handleLimit = (e) => {
    getLimit(e?.target?.value);
  };

  return (
    <Select
      placeholder="Sort"
      value={value}
      onChange={handleLimit}
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 100,
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
        "&:hover": {
          color: "blue",
        },
      }}
    >
      <MenuItem value={6}>6</MenuItem>
      <MenuItem value={12}>12</MenuItem>
      <MenuItem value={24}>24</MenuItem>
    </Select>
  );
};

export default SortSelect;
