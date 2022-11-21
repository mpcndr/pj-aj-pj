import { Box, Grid, IconButton, Typography } from "@mui/material";
import { connect } from "react-redux";
import DescriptionIcon from "@mui/icons-material/Description";

function filesData({ files }) {
  return (
    <Box
      id="files-result"
      sx={{
        backgroundColor: "#FFF",
        boxShadow: "-10px 0px 30px rgba(0,0,0,0.05)",
        textAlign: "center",
        height: "100%",
        alignContent: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {files.map((val) => {
          return (
            <Grid item xs={3}>
              <IconButton>
                <DescriptionIcon />
              </IconButton>
              <Typography fontSize={"2rem"}>{val.file}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  files: state?.files,
});

const FilesDataWithConnect = connect(mapStateToProps)(filesData);
export default FilesDataWithConnect;
