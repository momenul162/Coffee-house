import React from "react";
import { StyledTableCell, StyledTableRow } from "../UI/mui-table/table-styoe";
import { IconButton } from "@mui/joy";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Aos from "aos";

const CustomTableRow = ({ item, getDeleteData }) => {
  const handleRemove = (item) => {
    getDeleteData(item);
  };

  Aos.init({
    duration: 1200,
  });

  return (
    <StyledTableRow data-aos="fade-down">
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
