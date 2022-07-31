import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400
  }
});

export default function FileSystemNavigator() {
  const classes = useStyles();

  const StyledTreeItem = withStyles({
    label: {
      backgroundColor: "green",
      color: "red"
    },
    root: {
      "&.Mui-selected > .MuiTreeItem-content": {
        backgroundColor: "red"
      }
    }
  })(TreeItem);

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
        <StyledTreeItem nodeId="3" label="Chrome" />
        <StyledTreeItem
          nodeId="4"
          label="Webstorm"
          icon={<ChevronRightIcon />}
        />
      </TreeItem>
    </TreeView>
  );
}
