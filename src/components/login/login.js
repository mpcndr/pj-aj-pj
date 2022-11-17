import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { login } from "../../services/api-helper";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Login({ open, handleClose }) {
  const navigate = useNavigate();
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");

  async function CallAPILogin(email, psw) {
    if (true) {
      let resAPI = await login(email, psw);
      console.log(resAPI);

      if (resAPI) {
        if (resAPI.statusCode === 0) {
          alert("Login");
          localStorage.setItem('jwt', JSON.stringify(resAPI.data));
          handleClose();
          navigate("/");
        } else {
          alert("error?");
        }
      } else {
        alert("Network error");
      }
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Login
        </Typography>
        <TextField
          sx={{
            my: 2,
          }}
          fullWidth
          label="Email"
          id="fullWidth"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <TextField
          fullWidth
          type={"password"}
          label="Password"
          id="fullWidth"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <Button
          sx={{
            mt: 2,
          }}
          variant="contained"
          onClick={async () => {
            await CallAPILogin(email, password);
          }}
        >
          Login
        </Button>
        <Button
          onSubmit={(e) => e.preventDefault}
          variant="contained"
          onClick={handleClose}
          sx={{
            mt: 2,
            ml: 2,
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
