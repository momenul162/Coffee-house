import { KeyboardArrowDown } from "@mui/icons-material";
import { MenuItem, Select, selectClasses } from "@mui/joy";
import React from "react";

const SortSelect = ({ value, getLimit }) => {
  return (
    <Select
      placeholder="Sort"
      value={value || ""}
      onChange={(e) => getLimit(e?.target?.value)}
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 140,
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
    >
      <MenuItem value={4}>4</MenuItem>
      <MenuItem value={6}>6</MenuItem>
      <MenuItem value={12}>12</MenuItem>
      <MenuItem value={24}>24</MenuItem>
    </Select>
  );
};

export default SortSelect;
