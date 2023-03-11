import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Typography } from "@mui/material";
import { connect } from "react-redux";
import { addSelectGroup } from "../../reducers/user/action";
import { serachAPI } from "../../services/api-helper";
import { useState } from "react";

function BasicList({ dataSetCount, dispatch, selectSet, select }) {
  let [data, setData] = useState(0);

  const handleClick = (e) => {
    setData(e);
    dispatch(addSelectGroup(e));
    selectSet(e);
  };

  useState(() => {
    console.log(data);
  }, [data]);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClick(1);
              }}
              selected={select === 1 ? true : false}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText
                primary={"การคมนาคมขนส่ง (" + dataSetCount.logistic + ")"}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClick(2);
              }}
              selected={select === 2 ? true : false}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  "การเผาในที่โล่ง (" + dataSetCount.fireInOpenArea + ")"
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClick(3);
              }}
              selected={select === 3 ? true : false}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText
                primary={"ภาคอุตสาหกรรม (" + dataSetCount.industry + ")"}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClick(4);
              }}
              selected={select === 4 ? true : false}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText
                primary={"การก่อสร้าง (" + dataSetCount.construct + ")"}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClick(5);
              }}
              selected={select === 5 ? true : false}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText
                primary={"หมอกควันข้ามแดน (" + dataSetCount.pollution + ")"}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  keyword: state.search.keyword,
  meta: state.search.metaDataGroup,
  select: state.search.selectDataSetGroup,
  dataSetCount: state?.list?.dataSetCount,
});

const BasicListWithConnect = connect(mapStateToProps)(BasicList);
export default BasicListWithConnect;
