import {
  Box,
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { connect } from "react-redux";
import PersistentDrawerLeft from "../component/navbar";
import InboxIcon from "@mui/icons-material/Inbox";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ResultDataTable from "../component/result-data-table";

function resultData() {

  return (
    <>
      <PersistentDrawerLeft />
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "#E8E1D9",
          //   overflow: "scroll",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            border: "0px solid",
            display: "grid",
            justifyItems: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFF",
              boxShadow: "-10px 0px 30px rgba(0,0,0,0.05)",
              textAlign: "center",
              height: "60.38%",
              width: "70%",
              marginTop: '-5%'
            }}
          >
            <Typography></Typography>
            {/* <Box
              sx={{
                height: "51.38%",
                paddingX: "3rem",
                justifyContent: "center",
                textAlign: "center",
                paddingTop: "1rem",
              }}
            ></Box> */}
          </Box>
        </Box>
      </Box>
    </>
  );
}

const mapStateToProps = (state) => ({
  metaData: state?.list?.metaData,
  dataSetCount: state?.list?.dataSetCount,
});

const ResultDataWithConnect = connect(mapStateToProps)(resultData);
export default ResultDataWithConnect;
