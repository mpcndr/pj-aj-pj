import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { Select } from "@mui/material";
import styled from "@emotion/styled";

export const Selections = styled(Select)((props) => ({
  fontSize: props.fontSize,
  boxSizing: "border-box",
  boxShadow: "0px 0px 3px #AAAAA9",
  textAlign: "start",
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    border: "0px",
  },
  color: "#333",
  ".MuiOutlinedInput-input": {
    padding: props.padding,
  },
}));
