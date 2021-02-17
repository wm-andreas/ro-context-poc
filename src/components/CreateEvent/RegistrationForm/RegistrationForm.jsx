import React from "react";
import makeStyles from "@material-ui/styles/makeStyles"
import {eventInfoContext} from "../CreateEventBase";
import { Card, CardContent, Typography, Avatar, CardHeader, IconButton } from "@material-ui/core";
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
}));
const RegistrationForm = (props) => {
    const classes = useStyles();
    // const eventInfo = React.useContext(eventInfoContext);
    return (
        <Card className={classes.root}>
            <CardHeader
              title="Registration Form"
              subheader="This doesn't really do anything right now."
            />
            <CardContent>
                <Typography><code>// TODO: Add stuffs</code></Typography>
            </CardContent>
        </Card>
    )
}

export default RegistrationForm;