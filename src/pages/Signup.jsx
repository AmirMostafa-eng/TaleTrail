import Box from "@mui/material/Box";
import React from "react";
import TextField from "@mui/material/TextField";
// import { useTheme } from "@mui/material/styles";
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
  CardMedia,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function Signup() {
  // const theme = useTheme();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "100px" }}>
      <Card sx={{ display: "flex" }}>
        <Box
          maxWidth="sm"
          component="form"
          noValidate
          autoComplete="off"
          margin={3}
        >
          <Typography gutterBottom variant="h5" component="div">
            SignUp to TaleTrail
          </Typography>
          <TextField
            fullWidth
            id="outlined-name-input"
            label="Name"
            type="text"
            sx={{ marginY: "20px" }}
          />
          <TextField
            fullWidth
            id="outlined-email-input"
            label="Email"
            type="email"
            sx={{ marginBottom: "20px" }}
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
            SignUp
          </Button>
          <Typography>
            <Link display="block" textAlign="center">
              Forgot Password ?
            </Link>
          </Typography>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 400 }}
          image="./src/assets/TaleTrail Logo with Seamless Sketch Integration.png"
          alt="Live from space album cover"
        />
      </Card>
    </Container>
  );
}
