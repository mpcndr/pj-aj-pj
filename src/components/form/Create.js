import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./c.css";
import {
  Box,
  Button,
  MenuItem,
  Typography,
  InputLabel,
  Grid,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDropdown, uploadFile } from "../../services/api-helper";
import { addDropdown, addProvince } from "../../reducers/user/action";
import { connect } from "react-redux";
import { Selections } from "./style";
import PersistentDrawerLeft from "../component/navbar";

const Create = ({
  dispatch,
  provinceData,
  metadataGroupData,
  dataSetGroupData,
}) => {
  const dataTemp = { nameField: "", metaData: "" };
  const [nameField, setNameField] = useState([dataTemp]);
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  //useEffect(() => {
  //  const jwt = JSON.parse(localStorage.getItem("jwt"));
  //  if (jwt) {
  //  return;
  // } else {
  //   alert("กรุณาเข้าสู่ระบบก่อน");
  //    window.location.href = "/";
  //  }
  //}, []);

  const addDataField = () => {
    setNameField([...nameField, nameField]);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  const [id, setId] = useState(0);
  const [name, setAgencyname] = useState("");
  const [filename, setFilename] = useState("");
  const [dataname, setDataname] = useState("");
  const [province, setProvince] = useState("");
  const [description, setDescription] = useState("");
  const [datagroup, setDatagroup] = useState("");
  const [matadata, setMetadata] = useState("");
  const [provinceId, setProvinceID] = useState(null);
  const [metaDataId, setMetaDataID] = useState([]);
  const formData = new FormData();

  let [files, setFiles] = useState([]);

  const history = useNavigate();

  const handleChangeDataGroup = (event) => {
    setDatagroup(event.target.value);
    addFormData("dataSetGroupId", event.target.value);
  };

  const handleChangeProvince = (event, name) => {
    setProvince(event.target.value);
    addFormData(name, event.target.value);
  };

  const handleChangemetaDataId = (event, index) => {
    let dummy = [...metaDataId];
    dummy.push({ id: index, value: event.target.value });
    setMetaDataID(dummy);
  };

  async function getDropdownAPI() {
    console.log("dsfksd;lfksd;flksdf;lsdfksdl;fksdf");
    let response = await getDropdown();
    let data = response;
    if (response.statusCode) {
      dispatch(addDropdown(data));
    } else {
      alert("error");
    }
  }

  useEffect(() => {
    getDropdownAPI();
  }, []);

  function handleFileSelected(e) {
    const files = Array.from(e.target.files);
    setFiles(files);
    // formData.append("files", files);
    console.log("files:", files);
  }

  const onChangeData = (e, index) => {
    const updataData = nameField.map((val, i) =>
      index === i
        ? Object.assign(val, { [e.target.name]: e.target.value })
        : val
    );
    setNameField(updataData);
  };

  const removeData = (index) => {
    const filtersData = [...nameField];
    if (filtersData.length !== 1) {
      filtersData.splice(index, 1);
    }
    setNameField(filtersData);
  };

  

  function addFormData(key, val) {
    formData.append(key, val);
  }

  const submitBtn = (e) => {
    nameField.forEach((el) => {
      formData.append("dataMapId", el.metaData);
    });
    nameField.forEach((el) => {
      formData.append("dataMapUser", el.nameField);
    });
    files.forEach((el) => {
      formData.append("files", el);
    });
   
    formData.append("dataSetGroupId", datagroup);
    formData.append("dataName", dataname);
    formData.append("fileName", filename);
    formData.append("provinceId", province);
    formData.append("description", description);
    formData.append("userId", 2);
    // formData.append("files", files);

    let res = axios
      .post("http://146.190.81.72:8000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-date",
        },
      })
      .then((r) => {
        console.log(r);
        alert("upload success");
      })
      .catch((e) => {
        console.log(e);
      });
    return res;
  };

  return (
    <>
      <PersistentDrawerLeft />
      {/* <div>
        <div>
          <input type="file" name="files" onChange={onChangeReq}></input>
        </div>
        <div>
          <button onClick={submitBtn}>Submit</button>
        </div>
      </div> */}

      <Box
        id="form-create"
        component="form"
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
            gridTemplateColumns: "1fr 40%",
            top: "100px",
          }}
        >
          <Box
            sx={{
              width: "auto",
              height: "auto",
              overflow: "hidden",
              paddingTop: 5,
              border: "0px solid",
              justifySelf: "center",
              // margin: 6,
              // paddingLeft: "4rem",
            }}
          >
            <Box
              id="form-name-field"
              sx={{
                backgroundColor: "#FFF",
                height: "auto",
                padding: 4,
                textAlign: "center",
                overflow: "scroll",
                maxHeight: "78vh",
                boxShadow: "-10px 0px 30px rgba(0,0,0,0.10)",
                borderRadius: 4,
                width: "50vw",
              }}
            >
              {nameField.map((val, index) => (
                <Grid
                  container
                  spacing={3}
                  key={index}
                  mb={2}
                  justifyContent="center"
                >
                  <Grid item md={4}>
                    <InputLabel
                      sx={{ textAlign: "start" }}
                      id="standard-label-name-field"
                    >
                      Name Field
                    </InputLabel>
                    <TextField
                      labelId="standard-label-name-field"
                      placeholder="Enter your name field"
                      variant="outlined"
                      value={val.nameField}
                      fullWidth
                      name="nameField"
                      onChange={(e) => onChangeData(e, index)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <InputLabel
                      sx={{ textAlign: "start" }}
                      id="standard-label-name-field"
                    >
                      Meta Data
                    </InputLabel>
                    <TextField
                      id="demo-simple-select-standard"
                      fullWidth
                      name="metaData"
                      value={val.metaData}
                      select
                      onChange={(e) => onChangeData(e, index)}
                    >
                      {metadataGroupData?.map((option) => (
                        <MenuItem
                          key={option.metadataGroupId}
                          value={option.metadataGroupName}
                        >
                          {option.metadataGroupName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    md={1}
                    justifyItems="center"
                    textAlign={"center"}
                    alignSelf="center"
                  >
                    <IconButton
                      size="large"
                      color="error"
                      onClick={() => removeData(index)}
                      disabled={nameField.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="contained"
                color="secondary"
                onClick={addDataField}
                sx={{
                  fontSize: "1.2rem",
                }}
              >
                เพิ่มข้อมูล
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "#FFF",
              boxShadow: "-10px 0px 30px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              sx={{
                height: "51.38%",
                paddingX: "3rem",
                justifyContent: "center",
                textAlign: "center",
                paddingTop: "7rem",
              }}
            >
              <Grid container>
                <Grid item xs={4} ml={3}>
                  <Typography fontSize={"2.3rem"} textAlign="start">
                    Upload ข้อมูล
                  </Typography>
                </Grid>
                {/* <Grid item xs={7} alignSelf="center" textAlign={"end"}>
                  <Button
                    variant="contained"
                    color="warning"
                    className="btn btn-primary"
                    sx={{
                      fontSize: "1.2rem",
                    }}
                    onClick={() => {
                      window.location.href = "/read";
                    }}
                  >
                    ดูข้อมูลทั้งหมด
                  </Button>
                </Grid> */}
              </Grid>

              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "40rem" },
                }}
                noValidate
                autoComplete="off"
                // onSubmit={(event) => {
                //   console.log(description);
                // }}
              >
                <div>
                  <TextField
                    id="outlined-basic"
                    name="agencyName"
                    variant="outlined"
                    placeholder="Agency Name"
                    onChange={(e) => {
                      setAgencyname(e.target.value);
                      addFormData("agencyName", e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    name="fileName"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="File Name"
                    onChange={(e) => {
                      setFilename(e.target.value);
                      addFormData("fileName", e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    name="dataName"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Data Name"
                    onChange={(e) => {
                      setDataname(e.target.value);
                      addFormData("fileName", e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    id="demo-simple-select-standard"
                    fullWidth
                    name="provinceId"
                    select
                    label="Province"
                    value={province}
                    onChange={(e) => {
                      handleChangeProvince(e, name);
                    }}
                  >
                    {provinceData?.map((option) => (
                      <MenuItem
                        key={option.code}
                        value={option.name_th}
                        x
                        onClick={() => {
                          setProvinceID({
                            code: option.code,
                            text: option.text,
                          });
                        }}
                      >
                        {option.name_th}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <TextField
                    name="agency5"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                      addFormData("description", e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-select-currency"
                    name="agency6"
                    select
                    label="Data Group"
                    value={datagroup}
                    onChange={handleChangeDataGroup}
                    helperText="Please select your data group"
                  >
                    {dataSetGroupData?.map((option) => (
                      <MenuItem
                        key={option.dataSetGroupId}
                        value={option.dataSetGroupName}
                      >
                        {option.dataSetGroupName}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <TextField
                    id="myFile"
                    type={"file"}
                    variant="outlined"
                    onChange={handleFileSelected}
                    inputProps={{
                      multiple: true,
                    }}
                  />
                </div>
                <Button
                  onClick={(e) => submitBtn(e)}
                  size="large"
                  variant="contained"
                  color="success"
                  className="btn btn-primary"
                  sx={{ marginTop: 2, fontSize: "1.2rem" }}
                >
                  อัปโหลด
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  provinceData: state?.dropdownlist?.province,
  metadataGroupData: state?.dropdownlist?.metadataGroup,
  dataSetGroupData: state?.dropdownlist?.dataSetGroup,
});

const CreateWithConnect = connect(mapStateToProps)(Create);
export default CreateWithConnect;
