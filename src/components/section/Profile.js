import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Typography,
  Button,
  ButtonBase,
  Paper,
} from "@material-ui/core";
import { DataContext } from '../Context';

var sampleAccount = {
  image: "/images/profile.png",
  name: "John Doe",
  adress: "New York",
  password: "password",
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 3,
  },
  paper: {
    padding: theme.spacing(4),
    margin: "auto",
    width: 500,
  },
  image: {
    width: 150,
    height: 150,
  },
  img: {
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
  },
}));

function EditableField({ fieldName, fieldVal = "", disabled = false }) {
  const [temp, setTemp] = useState("");
  return (
    <TextField
      disabled={disabled}
      label={fieldName}
      defaultValue={fieldVal.length > 0 ? fieldVal : null}
      onChange={(e) => setTemp(e.target.value)}
      variant="outlined"
    />
  );
}

function Account({ id }) {
  const classes = useStyles();
  
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid container justify="flex-start">
          <Typography variant="h4">Account Info</Typography>
        </Grid>
        <Grid item xs={5}>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="profile" src={id.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={7} container>
          <Grid item container direction="column" align="start" spacing={1}>
            <Typography gutterBottom variant="h5">
              {id.name}
            </Typography>
            <Typography variant="body1" gutterBottom color="textSecondary">
              Adress: {id.adress}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: {JSON.parse(localStorage.getItem("bookStoreUser")).email}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

function PasswordMgmt({ id }) {
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [correctPassword, setCorrectPassword] = useState(false);
  const [change, setChange] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const classes = useStyles();
  const correctPW = "password";

  function validateNewPassword() {
    var check =
      currPassword === correctPW && newPassword === confirmNewPassword;
    console.log(check);
    setSubmittable(check);
  }

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" spacing={4}>
        <Grid container justify="flex-start">
          <Typography variant="h4">Password Management</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Current Password"
            variant="outlined"
            type="password"
            fullWidth
            onChange={(e) => setCurrPassword(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            disabled={currPassword.length == 0}
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            disabled={currPassword.length == 0}
            onChange={() => validateNewPassword()}
            label="Confirm New Password"
            variant="outlined"
            type="password"
            fullWidth
          />
        </Grid>
        <Grid container justify="flex-end">
          <Button disabled={submittable} variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default function Profile({ id = sampleAccount }) {
  const [profileImg, setprofileImg] = useState(id.image);
  const {email2} = useContext(DataContext)
  console.log(email2)
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [edited, setEdited] = useState(false);
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" spacing={5}>
      <Grid item>
        <Account id={id} />
      </Grid>
      <Grid item>
        <PasswordMgmt id={id} />
      </Grid>
    </Grid>
  );
}
