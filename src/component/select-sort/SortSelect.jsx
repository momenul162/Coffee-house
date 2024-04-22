import { KeyboardArrowDown } from "@mui/icons-material";
import { MenuItem, Select, selectClasses } from "@mui/joy";
import React from "react";

const SortSelect = ({ value, getLimit }) => {
  const handleLimit = (e) => {
    getLimit(e?.target?.value);
  };

  return (
    <Select
      placeholder="Sorting by number"
      value={value}
      onChange={handleLimit}
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 240,
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
    >
      <MenuItem value={6}>Six</MenuItem>
      <MenuItem value={12}>Twelve</MenuItem>
      <MenuItem value={24}>Twenty Four</MenuItem>
    </Select>
  );
};

export default SortSelect;
