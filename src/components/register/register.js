import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { registerUserView, registerAgencyUploadView } from "../../services/api-helper";
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

export default function Register({ open, handleClose, isAgency }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [agencyName, setAgencyName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function CallAPIRegisterUser(email, password, firstnameUserRequest, lastnameUserRequest, agencyNameRequest) {
    if (true) {
      let resAPI = await registerUserView(
        email,
        password,
        firstnameUserRequest,
        lastnameUserRequest,
        agencyNameRequest,
      );

      console.log(resAPI);

      if (resAPI) {
        if (resAPI.statusCode === 0) {
          alert("register");

          navigate("/");
        } else {
          alert("error?");
        }
      } else {
        alert("Network error");
      }
    }
  }

  async function CallAPIRegisterAgency(email, password, agencyname, usernameagency) {
    if (true) {
      let resAPI = await registerAgencyUploadView(
        email,
        password,
        agencyname,
        usernameagency,
      );

      console.log(resAPI);

      if (resAPI) {
        if (resAPI.statusCode === 0) {
          alert("register");

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
          Register
        </Typography>
        {isAgency ? (
          <>
            <TextField
              sx={{
                my: 2,
              }}
              fullWidth
              label="email"
              id="fullWidth"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="password"
              id="fullWidth"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              sx={{
                my: 2,
              }}
              fullWidth
              label="agency Name"
              id="fullWidth"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
            />
            <TextField
              fullWidth
              label="username Agency"
              id="fullWidth"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </>
        ) : (<>
          <TextField
            sx={{
              my: 2,
            }}
            fullWidth
            label="First Name"
            id="fullWidth"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Last Name"
            id="fullWidth"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            sx={{
              my: 2,
            }}
            fullWidth
            label="Agency Name"
            id="fullWidth"
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            id="fullWidth"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{
              my: 2,
            }}
            fullWidth
            type={"password"}
            label="Password"
            id="fullWidth"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>)}

        <Button
          variant="contained"
          onClick={() => {

            if (isAgency) {
              CallAPIRegisterAgency(email, password, agencyName, firstName)
            }
            else {
              CallAPIRegisterUser(email, password, firstName, lastName, agencyName);
            }

          }}
        >
          Sign Up
        </Button>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            ml: 2,
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
