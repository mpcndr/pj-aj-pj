import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";
import Login from "../login/login";
import Register from "../register/register";
import { Grid, Link } from "@mui/material";
import { useNavigate } from "react-location";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalRegis, setOpenModalRegis] = React.useState(false);
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  // const navigate = useNavigate();

  function checkPage(path) {
    if (jwt) {
      window.location.href = path;
    } else {
      // alert("กรุณา login ก่อน");
      handleOpenModal();
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModalRegis = () => {
    setOpenModalRegis(true);
  };
  const handleCloseModalRegis = () => {
    setOpenModalRegis(false);
  };

  const handleClick = () => {
    console.log("เข้า");
    window.location.href = "/";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" open={open}>
        <Toolbar>
          <Grid container justifyContent={"start"}>
            <Button onClick={() => handleClick()}>
              <Typography fontSize={"2.7rem"} color="#FFF">
                Air Pollution Data Center
              </Typography>
            </Button>
          </Grid>

          {/* <Typography
            variant="h4"
            fontSize={"3rem"}
            noWrap
            component="span"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigator("/");
            }}
          >
            Air Pollution Data Center
          </Typography> */}
          {!jwt ? (
            <Grid container justifyContent={"end"}>
              <Button
                sx={{ fontSize: "1.5rem", mx: 1.5 }}
                color="inherit"
                onClick={handleOpenModal}
              >
                เข้าสู่ระบบ
              </Button>
              <Button
                sx={{ fontSize: "1.5rem", mx: 1.5 }}
                color="inherit"
                onClick={handleOpenModalRegis}
              >
                ลงทะเบียน
              </Button>
            </Grid>
          ) : (
            <Grid container justifyContent={"end"}>
              <Button
                color="inherit"
                sx={{ fontSize: "1.5rem", mx: 1.5 }}
                onClick={() => {
                  localStorage.clear("jwt");
                  checkPage("/");
                }}
              >
                ออกจากระบบ
              </Button>
              <Button
                sx={{ fontSize: "1.5rem", mx: 1.5 }}
                color="inherit"
                onClick={() => checkPage("creat-form")}
              >
                เพิ่มข้อมูล
              </Button>

              {/* <Button
                sx={{ fontSize: "1.5rem", mx: 1.5 }}
                color="inherit"
                onClick={() => checkPage("update-form")}
              >
                อัปเดตข้อมูล
              </Button> */}
            </Grid>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Login open={openModal} handleClose={handleCloseModal} />
      <Register open={openModalRegis} handleClose={handleCloseModalRegis} />
    </Box>
  );
}
