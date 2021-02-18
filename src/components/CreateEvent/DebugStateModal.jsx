import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Fab,
  TextField,
  Box,
} from "@material-ui/core";
import { BugReport } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import {Context} from '../../Stores/EventInfoStore';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  dialog: {},
  textField: {
    fontFamily: "monospaced",
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction={"up"} ref={ref} {...props} />;
});
const DebugStateModal = () => {
  const classes = useStyles();
  const [eventInfo] = React.useContext(Context);

  const [state, setState] = React.useState({
    isOpen: false,
  });
  const handleClose = () => {
    setState((prev) => Object.assign({ ...prev }, { isOpen: false }));
  };
  const handleFabClick = () => {
    setState((prev) => Object.assign({ ...prev }, { isOpen: true }));
  };
  return (
    <React.Fragment>
      <Fab className={classes.fab} color="secondary" onClick={handleFabClick}>
        <BugReport />
      </Fab>
      <Dialog
        open={state.isOpen}
        onClose={handleClose}
        className={classes.dialog}
        fullWidth
        maxWidth={"lg"}
        TransitionComponent={Transition}
      >
        <DialogTitle>Debug Create Event State</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the current <code>state</code>.
          </DialogContentText>
          <Box fontFamily="Monospace">
            <TextField
              className={classes.textField}
              multiline
              fullWidth
              rows={20}
              value={JSON.stringify(eventInfo, null, 2)}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default DebugStateModal;
