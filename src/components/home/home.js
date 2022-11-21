import React from "react";
import ResponsiveAppBar from "../component/navbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { CardMedia, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { serachAPI } from "../../services/api-helper";
import Background from "../../assets/Lovepik_com-401110915-city-__building.png";
import { addList } from "../../reducers/list/action";
import { connect } from "react-redux";
import { addKeyword, addSearch } from "../../reducers/user/action";
import { useState } from "react";

const Home = ({ dispatch, keyword, meta, select }) => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [dataSearch, setDataSearch] = React.useState([]);

  useState(() => {
    console.log(keyword);
    console.log(meta);
    console.log(select);
  }, [keyword, meta, select]);
  //   let HomeData = {
  //     desc: "Development of Particulate Air Pollution Data Center ",
  //   };
  async function CallAPIsearchMetaData() {
    dispatch(addKeyword(search));
    let resAPI = await serachAPI(keyword, meta, select);
    console.log(resAPI.data);
    if (resAPI) {
      if (resAPI.statusCode === 0) {
        console.log("Hi");
        dispatch(addList(resAPI.data));
        // window.location.href = "/table-form"
        navigate("/table-form");
      } else {
        alert("error");
      }
    } else {
      alert("network error");
    }
  }

  const onChangeSearch = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <Box sx={{ backgroundColor: "#ADD8E626", height: "100vh" }}>
      <ResponsiveAppBar />
      <Box sx={{ position: "fixed", right: "0%", bottom: "-30%", zIndex: -1 }}>
        <CardMedia component="img" image={Background} sx={{ width: "100vw" }} />
      </Box>
      <Box sx={{ flexGrow: 1, mt: 16 }}>
        <Grid container justifyContent={"center"}>
          <Grid item xs={6} textAlign={"center"}>
            <Typography variant="h4">
              Development of Particulate Air Pollution Data Center
            </Typography>
            <TextField
              sx={{
                mt: 3,
                width: "60ch",
                // backgroundColor: "#FFF",
              }}
              variant="filled"
              placeholder="Search"
              onChange={(e) => onChangeSearch(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility">
                      <SearchIcon
                        onClick={() => {
                          CallAPIsearchMetaData();
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            >
              {/* <Input
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
              /> */}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  keyword: state.search.keyword,
  meta: state.search.metaDataGroup,
  select: state.search.selectDataSetGroup,
});

const HomeWithConnect = connect(mapStateToProps)(Home);
export default HomeWithConnect;
