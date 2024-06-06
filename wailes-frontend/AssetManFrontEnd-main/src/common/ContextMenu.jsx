import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

export default function ContextMenu({
  contextState,
  setContextState,
  setTreeView,
}) {
  const handleClose = ({ clearNode = true }) => {
    setContextState((prev) => ({
      isContextOpen: false,
      anchorEle: null,
      currentNode: clearNode ? null : prev.currentNode,
    }));
  };

  const handleContextMenuAction = (action) => {
    if (action === "ADD") {
      setTreeView((treeView) => {
        return treeView.map((view) => {
          const { currentNode } = contextState;
          if (view.name === currentNode.name) {
            const child = {
              id: currentNode.id * 1000 + (view.children.length + 1),
              name: "",
              editable: true,
            };
            const children = [...view.children, child];
            view.children = children;
            return view;
          }
          return view;
        });
      });
      handleClose({ clearNode: false });
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Popper
        open={contextState.isContextOpen}
        anchorEl={contextState.anchorEle}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={contextState.anchorEle}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  <MenuItem onClick={() => handleContextMenuAction("ADD")}>
                    Add Item
                  </MenuItem>
                  <MenuItem onClick={() => handleContextMenuAction("REMOVE")}>
                    Remove Item
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
}
