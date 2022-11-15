import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PersistentDrawerLeft from "./navbar";
import "./dataA.css";


export default function Datafrom() {
  const [files, setFiels] = useState([]);

  const [serviceList, setServiceList] = useState([{ service: "" }]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);

  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  return (
    <>
      <PersistentDrawerLeft />
      <div className = "container"> 
      <form className="App" autoComplete="off">
        <div className="form-field">
          <label htmlFor="service">Name Field</label>
          {serviceList.map((singleService, index) => (
            <div key={index} className="services">
              <div className="first-division">
                <input
                  name="service"
                  type="text"
                  id="service"
                  value={singleService.service}
                  onChange={(e) => handleServiceChange(e, index)}
                  required
                />

                {serviceList.length - 1 === index && serviceList.length < 1000000 && (
                  <button
                    type="button"
                    onClick={handleServiceAdd}
                    className="add-btn">
                    <span>Add a Field</span>
                  </button>
                )}
              </div>
              <div className="second-division">
                {serviceList.length !== 1 && (
                  <button
                    type="button"
                    onClick={() => handleServiceRemove(index)}
                    className="remove-btn">
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="output">
          <h2>Metadata </h2>
          {serviceList &&
            serviceList.map((singleService, index) => (
              <ul>
                <select id="inputState" className="form-select" placeholder="Data group" >
                  <option value="volvo">choose data mapping...</option>
                  <option value="volvo">D_PM10</option>
                  <option value="volvo">D_PM2.5</option>
                  <option value="volvo">D_DATE</option>
                  <option value="volvo">D_TIME</option>
                  <option value="volvo">D_PROVINCE</option>
                </select>
              </ul>
            ))}
        </div>
      </form>
      </div>
              
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "42%",
          marginRight: "-50%",
          transform: "transform(-50%, -50%)",
          flexGrow: 1,
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5">Form Angency Data</Typography>
          <TextField
            sx={{
              my: 1.5,
            }}
            fullWidth
            id="outlined-basic"
            label="Agency Name"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="File name"
            variant="outlined"
          />
          <TextField
            sx={{
              my: 1.5,
            }}
            fullWidth
            id="outlined-basic"
            label="Data name"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Province"
            variant="outlined"
          />
          <TextField
            sx={{
              my: 1.5,
            }}
            fullWidth
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Data group"
            variant="outlined"
          />
          <TextField
            sx={{
              my: 1.5,
            }}
            fullWidth
            id="outlined-basic"
            label="Metadata"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            type={"file"}
            variant="outlined"
            inputProps={{
              multiple: true,
            }}
          />
          <Button
            fullWidth
            variant="contained"
            //   onClick={handleClose}
            sx={{
              mt: 2,
            }}
          >
            Submit
          </Button>
        </Grid>
      </Box>
    </>
  )
};


