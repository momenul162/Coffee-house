import React from "react";
import { StyledTableCell, StyledTableRow } from "../UI/mui-table/table-styoe";
import { IconButton } from "@mui/joy";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CustomTableRow = ({ item, getDeleteData }) => {
  const handleRemove = (item) => {
    getDeleteData(item);
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <img width={100} src={item?.image} alt="" />
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {item?.name}
      </StyledTableCell>
      <StyledTableCell align="left">{item?.category.name}</StyledTableCell>
      <StyledTableCell align="right">{item?.price}</StyledTableCell>

      <StyledTableCell align="right">
        <Link to={`/dashboard/products/${item?._id}`}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton onClick={() => handleRemove(item)}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CustomTableRow;
