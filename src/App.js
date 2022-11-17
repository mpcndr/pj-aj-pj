import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Datafrom from "./components/component/dataA";
import BasicTable from "./components/component/table";
import AddData from "./components/form/addData";
import Home from "./components/home/home";
// import Login from "./components/login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} />
        <Route path="/requestForm" element={<RequestForm />} />
        <Route path="/adddata" element={<AddData />} />*/}
        <Route path="/data-form" element={<Datafrom />} />
        <Route path="/table-form" element={<BasicTable />} />
        <Route path="/add-form" element={<AddData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
