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
import { CardMedia } from "@mui/material";

import bg from "../../assets/Lovepik_com-401110915-city-__building.png";

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
        localStorage.setItem(
          "dataSetCount",
          JSON.stringify(resAPI.dataSetCount)
        );
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
        <Box
          sx={{
            position: "fixed",
            // right: "25%",
            bottom: "-300px",
            zIndex: "-100",
            // left: "25%",
          }}
        >
          <CardMedia component="img" image={bg} />
        </Box>
        <Grid container justifyContent={"center"}>
          <Grid item xs={6} textAlign={"center"}>
            <Typography fontSize={'2.4rem'}>
              Development of Particulate Air Pollution Data Center
            </Typography>
            <FormControl sx={{ m: 1, width: "42ch" }} variant="standard">
              <InputLabel size="normal" htmlFor="standard-adornment-password">
                Search
              </InputLabel>
              <Input
                id="standard-adornment-password"
                value={search}
                sx={{width: '100%'}}
                onChange={(e) => setSearch(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility">
                      <SearchIcon
                        onClick={() => {
                          CallAPIsearchMetaData(search, 0);
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
