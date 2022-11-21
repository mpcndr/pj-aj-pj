import * as React from "react";
import "./App.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Datafrom from "./components/component/dataA";
import BasicTable from "./components/component/table";
import AddData from "./components/form/addData";
import Home from "./components/home/home";
// import Login from "./components/login/login";
import Create from "./components/form/Create";
import Update from "./components/form/Update";
import Read from "./components/form/Read";
import ResultData from "./components/result/result-data";
import { createBrowserHistory } from "react-location";

const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table-form" element={<BasicTable />} />
        <Route path="/result-data" element={<ResultData />} />
        <Route path="/creat-form" element={<Create />} />
        <Route path="/read" element={<Read />} />
        <Route path="/update-form" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
