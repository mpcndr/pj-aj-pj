import React from "react";
import ResponsiveAppBar from "../component/navbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import { serachAPI } from "../../services/api-helper";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [dataSearch, setDataSearch] = React.useState([]);
  //   let HomeData = {
  //     desc: "Development of Particulate Air Pollution Data Center ",
  //   };
  async function CallAPIsearchMetaData(key, group) {
    let resAPI = await serachAPI(key, group);
    if (resAPI) {
      if (resAPI.statusCode === 0) {
        localStorage.setItem("metaData", JSON.stringify(resAPI.data));
        localStorage.setItem("dataSetCount", JSON.stringify(resAPI.dataSetCount));
        navigate("/table-form");
      } else {
        alert("error?");
      }
    } else {
      alert("network error");
    }
  }

  const Search = () => {
    return (
      <Box sx={{ flexGrow: 1, mt: 16 }}>
        <Grid container justifyContent={"center"}>
          <Grid item xs={6} textAlign={"center"}>
            <Typography>
              Development of Particulate Air Pollution Data Center
            </Typography>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Search
              </InputLabel>
              <Input
                id="standard-adornment-password"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility">
                      <SearchIcon
                        onClick={() => {
                          CallAPIsearchMetaData(search, 0);
                          console.log("434234234");
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <>
      <ResponsiveAppBar />
      <Search />
    </>
  );
};
export default Home;
