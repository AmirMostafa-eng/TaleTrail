import Box from "@mui/material/Box";
import React from "react";
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
} from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: "100px" }}>
      <Card sx={{ padding: "30px" }}>
        <Box maxWidth="sm" component="form" noValidate autoComplete="off">
          <Typography gutterBottom variant="h5" component="div">
            LogIn to TaleTrail
          </Typography>
          <TextField
            fullWidth
            id="outlined-email-input"
            label="Email"
            type="email"
            sx={{ marginY: "20px" }}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
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
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember Me"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginBottom: "1rem" }}
          >
            LogIn
          </Button>
          <Typography>
            <Link display="block" textAlign="center">
              Forgot Password ?
            </Link>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
