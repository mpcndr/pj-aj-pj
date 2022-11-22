import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PersistentDrawerLeft from "./navbar";
import {
  Grid,
  Box,
  IconButton,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  MenuItem,
} from "@mui/material";
import BasicList from "./tab";
import InfoIcon from "@mui/icons-material/Info";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import { connect } from "react-redux";
import { addList } from "../../reducers/list/action";
import { useNavigate } from "react-router-dom";
import {
  downloadFile,
  getFileNameByMetaDataIdView,
  serachAPI,
} from "../../services/api-helper";
import { addFies } from "../../reducers/files/action";
import DescriptionIcon from "@mui/icons-material/Description";
import FilesDataWithConnect from "./files-data";
import files from "../../reducers/files/reducer";
import axios from "axios";
import fileDownload from "js-file-download";
import { useState } from "react";
import { addMetaData, addSelectGroup } from "../../reducers/user/action";

const data = [
  {
    key: 0,
    name: "ทั้งหมด",
  },
  {
    key: 1,
    name: "PM2.5",
  },
  {
    key: 2,
    name: "PM10",
  },
];

function BasicTable({ metaData, dispatch, filesData, keyword, meta, select }) {
  // const data = JSON.parse(localStorage.getItem("metaData"));
  // console.log(data);
  const navigate = useNavigate();
  const [swapSection, setSwapSection] = React.useState(false);
  let temp = { key: 0, name: "" };
  const [filter, setFiler] = React.useState(temp);
  const [selectData, setSelectData] = React.useState(0);
  const [search, setSearch] = useState(keyword);
  const [dataMeta, setDataMeta] = useState(0);

  const handleFilter = (e, i) => {
    // console.log(e);
    setFiler({ key: e, name: i });
    dispatch(addMetaData(e));
    // CallAPIsearchMetaData(search, e, select);
  };
  const handleSwap = () => {
    setSwapSection(true);
  };
  const handleNotSwap = () => {
    setSwapSection(false);
  };

  // const onChangeData = ()=>{

  // }

  let [dataFiles, setDataFiles] = React.useState([]);

  async function CallAPIsearchMetaData(keyword, meta, select) {
    let resAPI = await serachAPI(keyword, meta, select);
    console.log(resAPI);
    if (resAPI) {
      if (resAPI.statusCode === 0) {
        console.log("OK");
        // navigate("/result-data");
        console.log(resAPI.data);
        dispatch(addList(resAPI.data));
        // navigate("/table-form");
      } else {
        alert("error");
      }
    } else {
      alert("network error");
    }
  }
  async function CallAPIMetaDataIdView(meta) {
    let resAPI = await getFileNameByMetaDataIdView(meta);
    console.log(resAPI);
    if (resAPI) {
      if (resAPI.statusCode) {
        console.log("OK => ", resAPI.data);
        setDataFiles(resAPI.data.files);
      } else {
        alert("error");
      }
    } else {
      alert("network error");
    }
  }

  const exportData = (filteredRows) => {
    let filename = filteredRows;
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
      var a;
      if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
        a = document.createElement("a");
        a.href = window.URL.createObjectURL(xmlHttpRequest.response);
        a.download = filename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
      }
    };
    xmlHttpRequest.open("POST", "http://146.190.81.72:8000/api/downloadFile");
    xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
    xmlHttpRequest.responseType = "blob";
    xmlHttpRequest.send(
      JSON.stringify({
        filePath: filteredRows,
      })
    );
  };

  const handleClick = (e, metaData) => {
    CallAPIMetaDataIdView(metaData);
    handleSwap();
  };

  React.useEffect(() => {
    console.log(metaData);
  }, [metaData]);

  React.useEffect(() => {
    CallAPIsearchMetaData(keyword, meta, select);
  }, [keyword, meta, select]);

  const Left = () => {
    return (
      <Box
        sx={{
          backgroundColor: "#FFF",
          boxShadow: "-10px 0px 30px rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            height: "51.38%",
            paddingX: "3rem",
            justifyContent: "center",
            textAlign: "center",
            paddingTop: "1rem",
          }}
        >
          <BasicList selectSet={setSelectData} />
        </Box>
      </Box>
    );
  };

  // const Right = () => {
  //   return (

  //   )
  // };

  return (
    <>
      <PersistentDrawerLeft />
      <Box
        sx={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#E8E1D9",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            border: "0px solid",
            display: "grid",
            gridTemplateColumns: "1fr 80%",
            top: "100px",
          }}
        >
          <Left />
          <Box
            sx={{
              width: "auto",
              height: "auto",
              overflow: "hidden",
              // paddingTop: 5,
              border: "0px solid",
              margin: 6,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#FCD66A",
                height: "78vh",
                padding: 4,
                textAlign: "center",
                overflow: "scroll",
                maxHeight: "78vh",
                borderRadius: 4,
              }}
            >
              {!swapSection ? (
                <>
                  <Typography
                    sx={{
                      fontSize: "2rem",
                    }}
                  >
                    Select filter
                  </Typography>
                  <TextField
                    id="outlined-select-currency"
                    select
                    value={data[meta].name}
                    fullWidth
                    // onChange={(e) => handleFilter(e)}
                    // onChange={(e) => onChangeData(e)}
                  >
                    {data.map((option) => (
                      <MenuItem
                        key={option.key}
                        value={option.name}
                        onClick={(e) => handleFilter(option.key, option.name)}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontSize: "1.75rem" }}>
                            Data Name
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontSize: "1.75rem" }}
                          >
                            Description
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontSize: "1.75rem" }}
                          >
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
                            <TableCell
                              sx={{ fontSize: "1.5rem" }}
                              align="center"
                            >
                              {row.description}
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "1.5rem" }}
                              align="center"
                            >
                              <IconButton
                                onClick={(e) => {
                                  handleClick(e, row.metadataId);
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
                </>
              ) : (
                <Box
                  id="files-result"
                  sx={{
                    backgroundColor: "#FFF",
                    boxShadow: "-10px 0px 30px rgba(0,0,0,0.05)",
                    textAlign: "center",
                    height: "100%",
                    alignContent: "center",
                  }}
                  overflow="scroll"
                >
                  <Box
                    sx={{
                      textAlign: "start",
                      padding: "1rem",
                      marginBottom: 5,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="info"
                      sx={{ textAlign: "start" }}
                      onClick={handleNotSwap}
                    >
                      <Typography fontSize={"1.75rem"}>ย้อนกลับ</Typography>
                    </Button>
                  </Box>

                  <Grid
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    textAlign={"start"}
                  >
                    {dataFiles.map((val) => (
                      <List key={val.id}>
                        <ListItem onClick={() => exportData(val.file)}>
                          <ListItemButton>
                            <ListItemIcon>
                              <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText>{val.file}</ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </List>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const mapStateToProps = (state) => ({
  metaData: state?.list?.metaData,
  dataSetCount: state?.list?.dataSetCount,
  filesData: state?.files.data,
  keyword: state.search.keyword,
  meta: state.search.metaDataGroup,
  select: state.search.selectDataSetGroup,
});

const BasicTableWithConnect = connect(mapStateToProps)(BasicTable);
export default BasicTableWithConnect;
