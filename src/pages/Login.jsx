import "tailwindcss";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Button,
  Link,
  Card,
  Typography,
  Container,
  CardMedia,
} from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [errorData, setErrorData] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{8,}$/;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleDataChange = (event) => {
    if (event.target.name == "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const emailCheck = () => {
    // client-side check
    setErrorMessage("please enter a valid email");
    emailRegex.test(email) ? setEmailError(false) : setEmailError(true);
    // console.log(errorMessage);
  };

  const checkData = (event) => {
    event.preventDefault();
    //email check
    emailCheck();
    if (!emailRegex.test(email)) return;
    //pass check
    //client-side check for password if it's empty
    if (!passwordRegex.test(password.trim())) {
      setErrorData(true);
      return;
    }

    //back-end check (on Submit)
    console.log("pass");
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "100px" }}>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{
            width: "45%",
            display: { xs: "none", sm: "block" },
          }}
          image="./src/assets/TaleTrail Logo with Seamless Sketch Integration.png"
          alt="Live from space album cover"
        />
        <Box
          maxWidth="sm"
          component="form"
          autoComplete="off"
          onSubmit={checkData}
          padding={4}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="var(--black-color)"
            textAlign="center"
            fontWeight="500"
            fontSize={32}
          >
            LogIn to TaleTrail
          </Typography>
          <TextField
            fullWidth
            value={email}
            onChange={handleDataChange}
            onBlur={emailCheck}
            name="email"
            error={emailError}
            id="outlined-error-helper-text"
            label="Email"
            type="email"
            sx={{ marginY: "20px" }}
            helperText={emailError ? errorMessage : null}
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              value={password}
              onChange={handleDataChange}
              name="password"
              id="outlined-error-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              sx={{ marginBottom: 4 }}
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginBottom: "1rem",
              backgroundColor: "var(--soft-red)",
              color: "var(--off-white)",
            }}
          >
            LogIn
          </Button>
          {errorData && (
            <Typography
              component="p"
              color="red"
              textAlign="center"
              marginBottom={2}
            >
              Invalid Data
            </Typography>
          )}
          <Typography textAlign="center">
            <Link href="/signup" color="#374151">
              create an account?
            </Link>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
