import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import {
  Box,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
} from "@material-ui/core";
import BasicInfo from "./BasicInfo/BasicInfo";
import Tickets from "./Tickets/Tickets";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import DebugStateModal from "./DebugStateModal";
import EventInfoStore from "../../Stores/EventInfoStore";

const useStyles = makeStyles((theme) => ({
  root: {},
  stepContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  step: {
    margin: "auto",
    padding: 24,
  },
  buttonsGrid: {
    margin: "auto",
    flex: 1,
    alignItems: "flex-end",
    paddingBottom: 0,
  },
}));

const CreateEventBase = () => {
  const classes = useStyles();

  const stepper = useStepper([
    {
      title: "Basic Info",
      component: <BasicInfo />,
    },
    {
      title: "Tickets",
      component: <Tickets />,
    },
    {
      title: "Registration Form",
      component: <RegistrationForm />,
    },
  ]);
  
  return (
    <React.Fragment>
      <EventInfoStore>
        <React.Fragment>
          {stepper.render()}
          <DebugStateModal />
        </React.Fragment>
      </EventInfoStore>

      <Grid container>
        <Grid item xs={8} className={classes.buttonsGrid}>
          <Card>
            <CardContent>
              <Box alignContent="flex-end">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={stepper.moveBack}
                  disabled={!stepper.canMoveBack}
                >
                  Back
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    stepper.moveNext();
                  }}
                  disabled={!(stepper.canMoveNext)}
                >
                  Next
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const useStepper = (steps) => {
  const classes = useStyles();
  const [current, setCurrent] = React.useState(0);
  const [canMoveNext, setCanMoveNext] = React.useState(false);
  const [canMoveBack, setCanMoveBack] = React.useState(false);
  const count = steps.length;

  React.useEffect(() => {
    setCanMoveNext(current < count - 1);
    setCanMoveBack(current >= 1);
  }, [current, count]);

  const moveNext = () => {
    canMoveNext && setCurrent((prev) => prev + 1);
  };
  const moveBack = () => {
    canMoveBack && setCurrent((prev) => prev - 1);
  };
  const render = () => {
    return (
      <React.Fragment>
        <Stepper activeStep={current}>
          {steps.map((step, index) => {
            const { title } = step;
            return (
              <Step key={index}>
                <StepLabel key={title}>{title}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Grid container spacing={2} className={classes.stepContainer}>
          <Grid className={classes.step} item xs={8}>
            {steps[current].component}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };
  return {
    current,
    moveNext,
    moveBack,
    canMoveNext,
    canMoveBack,
    count,
    render,
  };
};

export default CreateEventBase;
