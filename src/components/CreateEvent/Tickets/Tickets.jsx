import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { eventInfoContext } from "../CreateEventBase";
import CardHeader from "@material-ui/core/CardHeader";
import { Divider, TextField } from "@material-ui/core";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
  },
}));
const Tickets = (props) => {
  const classes = useStyles();
  const eventInfo = React.useContext(eventInfoContext);
  const [isValid, setIsValid] = React.useState(false);

  const handleSubmit = (values) => {
    const newTickets = [...eventInfo.tickets.list];
    newTickets.push(values);
    setIsValid(true);
    eventInfo.onChange("tickets", "list", newTickets);
  };

  eventInfo.isValid = isValid;
  return (
    <Card className={classes.root}>
      <CardHeader title="Tickets" subheader="Add tickets to your event" />
      <CardContent>
        <Typography>
          This step is valid when: At least one ticket is added, and there are no errors in the form ({isValid ? "Valid": "Invalid"}).
        </Typography>
        <Divider />
        <Typography variant="h6">Existing tickets</Typography>
        {eventInfo.tickets.list.map((ticket, index) => (
          <Typography key={index} variant="body2">Name: {ticket.name}, Price: {ticket.price}</Typography>)
        )}
        <Divider/>
        <TicketForm handleSubmit={handleSubmit} />
      </CardContent>
    </Card>
  );
};

const TicketForm = ({ handleSubmit }, ...props) => {
  const formik = useFormik({
    initialValues: { name: "", price: "" },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Please enter a ticket name";
      }
      if (!values.price) {
        errors.price = "Price is required";
      }
      return errors;
    },
    onSubmit: handleSubmit,
  });
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" color="initial">
          Add a ticket
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="name"
          name="name"
          label="Ticket name"
          value={formik.values.name}
          required
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.errors.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="price"
          name="price"
          label="price"
          value={formik.values.price}
          required
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.errors.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={formik.submitForm}>Add ticket</Button>
      </Grid>
    </Grid>
  );
};

export default Tickets;
