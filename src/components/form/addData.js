import React, { useEffect } from "react";
import "./addData.css";
import { useState } from "react";

function AddData() {
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt) {
      return;
    } else {
      alert("กรุณาเข้าสู่ระบบก่อน");
      window.location.href = "/";
      
    }
  }, []);
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

              {serviceList.length - 1 === index &&
                serviceList.length < 1000000 && (
                  <button
                    type="button"
                    onClick={handleServiceAdd}
                    className="add-btn"
                  >
                    <span>Add a Field</span>
                  </button>
                )}
            </div>
            <div className="second-division">
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="output">
        <h2>Data Mapping </h2>
        {serviceList &&
          serviceList.map((singleService, index) => (
            <ul>
              <select
                id="inputState"
                className="form-select"
                placeholder="Data group"
              >
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
  );
}

export default AddData;
