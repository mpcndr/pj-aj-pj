import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./c.css";

const Create = () => {

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

  const [id, setId] = useState(0);
  const [name, setAgencyname] = useState("");
  const [filename, setFilename] = useState("");
  const [dataname, setDataname] = useState("");
  const [province, setProvince,] = useState("");
  const [description, setDescription,] = useState("");
  const [datagroup, setDatagroup,] = useState("");
  const [matadata, setMetadata,] = useState("");

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clciekd");
    axios
      //mockAPI
      .post("https://637788dc5c47776512208130.mockapi.io/crud-youtube", {
        id: id,
        name: name,
        filename: filename,
        dataname: dataname,
        province: province,
        description: description,
        datagroup: datagroup,
        matadata: matadata,
        
      })
      .then(() => {
        history("/read");
      });
  };

  return (
    <>  
      <div className="d-flex justify-content-between m-2">
      <div className="container">
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

        <h2>Create</h2>
        <Link to="/read">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Agency Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setAgencyname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">File Names</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setFilename(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data Name</label>
          <input
            type="text"
            className="form-control"          
            onChange={(e) => setDataname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Province</label>
          <input
            type="text"
            className="form-control"
           
            onChange={(e) => setProvince(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"           
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data group</label>
          <input
            type="text"
            className="form-control"    
            onChange={(e) => setDatagroup(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Metadata</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setMetadata(e.target.value)}
          />
        </div>

        <TextField
            id="outlined-basic"
            type={"file"}
            variant="outlined"
            inputProps={{
            multiple: true,
            }}
          />

      
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Create;