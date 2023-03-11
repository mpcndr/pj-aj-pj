import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const Update = () => {
  const [id, setId] = useState(0);
  const [name, setAgencyname] = useState("");
  const [filename, setFilename] = useState("");
  const [dataname, setDataname] = useState("");
  const [province, setProvince] = useState("");
  const [description, setDescription] = useState("");
  const [datagroup, setDatagroup] = useState("");
  const [matadata, setMetadata] = useState("");

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt) {
      return;
    } else {
      alert("กรุณาเข้าสู่ระบบก่อน");
      window.location.href = "/";
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setAgencyname(localStorage.getItem("name"));
    setFilename(localStorage.getItem("filename"));
    setProvince(localStorage.getItem("province"));
    setDescription(localStorage.getItem("description"));
    setDatagroup(localStorage.getItem("datagroup"));
    setMetadata(localStorage.getItem("matadata"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Id...", id);
    axios
      // mockAPI
      .put(`https://62a59821b9b74f766a3c09a4.mockapi.io/crud-youtube/${id}`, {
        name: name,
        filename: filename,
        dataname: dataname,
        province: province,
        description: description,
        datagroup: datagroup,
        matadata: matadata,
      })
      .then(() => {
        navigate("/read");
      });
  };

  return (
    <>
      <h2>Update</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Agency Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setAgencyname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">File Name</label>
          <input
            type="filename"
            className="form-control"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data Name</label>
          <input
            type="dataname"
            className="form-control"
            value={dataname}
            onChange={(e) => setDataname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Province</label>
          <input
            type="province"
            className="form-control"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data Group</label>
          <input
            type="datagroup"
            className="form-control"
            value={datagroup}
            onChange={(e) => setDatagroup(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">matadata</label>
          <input
            type="metadata"
            className="form-control"
            value={matadata}
            onChange={(e) => setMetadata(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mx-2"
          onClick={handleUpdate}
        >
          Update
        </button>
        <Link to="/read">
          <button className="btn btn-secondary mx-2"> Back </button>
        </Link>
      </form>
    </>
  );
};

export default Update;
