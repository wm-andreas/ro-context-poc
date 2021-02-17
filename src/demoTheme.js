import { createMuiTheme } from "@material-ui/core/styles"

const baseTheme = createMuiTheme({});

const theme = createMuiTheme({
    props: {
        MuiTextField: {
            variant: "outlined"
        }
    },
    overrides: {
        MuiCard: {
        //    root: {background: "red"}
        },
        MuiDivider: {
            root: {
                margin: baseTheme.spacing(4),
                marginLeft: 0,
                marginRight: 0
            }
        },
        MuiCardContent: {
            root: {
                "&:last-child": {
                    paddingBottom: baseTheme.spacing(2),
                }
            }
        }
    },
    typography: {
        h4: {
            marginBottom: "22px"
        }
    }
})

export default theme;