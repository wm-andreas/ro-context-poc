import React from "react";
import makeStyles from "@material-ui/styles/makeStyles"
import { Card, CardContent, Typography, CardHeader } from "@material-ui/core";

const useStyles = makeStyles(() => ({
}));

const RegistrationForm = () => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader
              title="Registration Form"
              subheader="This doesn't really do anything right now."
            />
            <CardContent>
                <Typography><code>TODO: Add stuffs</code></Typography>
            </CardContent>
        </Card>
    )
}

export default RegistrationForm;