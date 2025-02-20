import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SortSelect = ({ value, getLimit }) => {
  return (
    <FormControl sx={{ width: 100, height: 100 }}>
      <InputLabel id="demo-simple-select-label">Select number</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        label="Select number"
        id="demo-simple-select"
        placeholder="Sort"
        value={value || ""}
        onChange={(e) => getLimit(e.target.value)}
      >
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={12}>12</MenuItem>
        <MenuItem value={24}>24</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelect;
