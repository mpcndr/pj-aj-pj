import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PersistentDrawerLeft from "./navbar";
import { Grid, Box, IconButton, Button } from "@mui/material";
import BasicList from "./tab";
import InfoIcon from "@mui/icons-material/Info";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import { connect } from "react-redux";
import { addList } from "../../reducers/list/action";
import { useNavigate } from "react-router-dom";
import { serachAPI } from "../../services/api-helper";

function BasicTable({ metaData, dispatch }) {
  // const data = JSON.parse(localStorage.getItem("metaData"));
  // console.log(data);
  const navigate = useNavigate();

  async function CallAPIsearchMetaData(key, group, meta) {
    let resAPI = await serachAPI(key, group, meta);
    console.log(resAPI);
    if (resAPI) {
      if (resAPI.statusCode === 0) {
        console.log("OK");
        navigate("/result-data");
        // dispatch(addList(resAPI.data));
        // navigate("/table-form");
      } else {
        alert("error");
      }
    } else {
      alert("network error");
    }
  }

  const handleClick = (e, metaData) => {
    CallAPIsearchMetaData("", 0, metaData + 1);
  };

  return (
    <>
      <Box
        sx={{
          // backgroundColor: "#FCD66A",
          height: "auto",
          padding: 4,
          textAlign: "center",
          overflow: "scroll",
          maxHeight: "78vh",
          // borderRadius: 4,
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1.75rem" }}>dataName</TableCell>
                <TableCell align="center" sx={{ fontSize: "1.75rem" }}>
                  description
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "1.75rem" }}>
                  <IconButton disabled>
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metaData.map((row, index) => (
                <TableRow
                  key={row.metadataId}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{ fontSize: "1.5rem" }}
                    component="th"
                    scope="row"
                  >
                    {row.dataName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }} align="center">
                    {row.description}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }} align="center">
                    <IconButton
                      onClick={(e) => {
                        handleClick(e, index);
                      }}
                    >
                      <PlagiarismIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

const mapStateToProps = (state) => ({
  metaData: state?.list?.metaData,
  dataSetCount: state?.list?.dataSetCount,
});

const ResultDataTable = connect(mapStateToProps)(BasicTable);
export default ResultDataTable;
