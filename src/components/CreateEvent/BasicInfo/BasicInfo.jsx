import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { useFormik } from "formik";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Context, actionTypes } from "../../../Stores/EventInfoStore";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
  },
}));

const BasicInfo = (...props) => {
  const classes = useStyles();
  const [eventInfo, dispatch] = React.useContext(Context);

  const formik = useFormik({
    initialValues: {
      name: eventInfo.basicInfo.name,
      email: eventInfo.basicInfo.email,
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      }
      const hasErrors = Object.keys(errors).length;

      eventInfo.isValid = !hasErrors;
      return errors;
    },
    onSubmit: (values) => {
      // handle the submit
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({type: actionTypes.basicInfo_set, payload: { name, value }});
    formik.handleChange(event);
  };

  // eventInfo.submitHandler = (payload) => dispatch({type: "SET_BASICINFO", payload });

  // const changeHandler = useFormikChangeHandler(
  //   formik,
  //   "basicInfo",
  //   eventInfo.onChange
  // );

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Basic information"
        subheader="Add Basic information about your event"
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Firstname"
              value={formik.values.name}
              onChange={handleChange}
              required
              helperText={formik.errors.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email address"
              value={formik.values.email}
              onChange={handleChange}
              required
              helperText={formik.errors.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              onBlur={formik.handleBlur}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BasicInfo;
