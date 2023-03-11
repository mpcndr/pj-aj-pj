import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState("");

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt) {
      return;
    } else {
      alert("กรุณาเข้าสู่ระบบก่อน");
      window.location.href = "/";
    }
  }, []);

  function getData() {
    axios
      .get("https://637788dc5c47776512208130.mockapi.io/crud-youtube")
      .then((res) => {
        setData(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`https://637788dc5c47776512208130.mockapi.io/crud-youtube/${id}`)
      .then(() => {
        getData();
      });
  }

  const setToLocalStorage = (
    id,
    name,
    filename,
    dataname,
    province,
    description,
    datagroup,
    matadata
  ) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("filename", filename);
    localStorage.setItem("dataname", dataname);
    localStorage.setItem("province", province);
    localStorage.setItem("description", description);
    localStorage.setItem("datagroup", datagroup);
    localStorage.setItem("matadata", matadata);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => {
            if (tabledark === "table-dark") setTableDark("");
            else setTableDark("table-dark");
          }}
        />
      </div>
      <div className="d-flex justify-content-between m-2">
        <h2>Read Operation</h2>
        <Link to="/creat-form">
          <button className="btn btn-secondary">Create</button>
        </Link>
      </div>
      <table className={`table ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col"># </th>
            <th scope="col">Name </th>
            <th scope="col">filename </th>
            <th scope="col">dataname </th>
            <th scope="col">province </th>
            <th scope="col">description </th>
            <th scope="col">datagroup </th>
            <th scope="col">Metagroup </th>
          </tr>
        </thead>
        {data.map((eachData) => {
          return (
            <>
              <tbody>
                <tr>
                  <th scope="row">{eachData.id}</th>
                  <td>{eachData.name}</td>
                  <td>{eachData.filename}</td>
                  <td>{eachData.dataname}</td>
                  <td>{eachData.province}</td>
                  <td>{eachData.description}</td>
                  <td>{eachData.datagroup}</td>
                  <td>{eachData.matadata}</td>
                  <td>
                    <Link to="/update-form">
                      <button
                        className="btn-success"
                        onClick={() =>
                          setToLocalStorage(
                            eachData.id,
                            eachData.name,
                            eachData.filename,
                            eachData.dataname,
                            eachData.province,
                            eachData.description,
                            eachData.datagroup,
                            eachData.matadata
                          )
                        }
                      >
                        Edit{" "}
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(eachData.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
};

export default Read;
