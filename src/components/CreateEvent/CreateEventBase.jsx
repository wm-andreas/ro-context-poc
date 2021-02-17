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
import DebugStateModal from "./DebugStateModal"

// Provides context for steps
const eventInfoContext = React.createContext(null);

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

  // handleStepChange will update the eventInfo state
  const handleStepChange = (step, propertyName, value) => {
    setEventInfo((prev) => {
      prev[step][propertyName] = value;
      return { ...prev };
    });
  };

  // create state for all steps
  const [eventInfo, setEventInfo] = React.useState({
    basicInfo: {
      name: "",
      email: "",
    },
    tickets: {
        list: []
    },
    registrationForm: {},
    confirmationEmail: {},
    onChange: handleStepChange,
    submitHandler: (values) => {
      console.log("Base submitHandler", values);
    },
    isValid: false,
  });
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
  React.useEffect(() => {
    console.log("isValid", eventInfo.isValid);
  }, [eventInfo]);
  return (
    <React.Fragment>
      <eventInfoContext.Provider value={eventInfo}>
        {stepper.render()}
      </eventInfoContext.Provider>

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
                    eventInfo.submitHandler();
                    stepper.moveNext();
                  }}
                  disabled={!(stepper.canMoveNext && eventInfo.isValid)}
                >
                  Next
                </Button>
                [Step valid? {eventInfo.isValid ? "Yes!" : "Nah..."}]
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <DebugStateModal eventInfo={eventInfo} />
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
export { eventInfoContext };
