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
  FormHelperText,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function Signup() {
  const nameRegex = /^[A-Za-z]{3,15}$/ ;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    

  }

  return (
    <Container maxWidth="md" sx={{ marginTop: "20px" }}>
      <Card sx={{ display: "flex" }}>
        <Box
          maxWidth="sm"
          margin="auto"
          component="form"
          noValidate
          autoComplete="off"
          padding={3}
          onSubmit={handleSubmit}
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
            SignUp to TaleTrail
          </Typography>
          <TextField
            fullWidth
            id="outlined-name-input"
            label="First Name"
            type="text"
            sx={{ marginTop: "20px" }}
            helperText="please enter a valid name (3-15 chars)"
          />
          <TextField
            fullWidth
            id="outlined-name-input"
            label="Last Name"
            type="text"
            sx={{ marginY: "20px" }}
            helperText="please enter a valid name (3-15 chars)"
          />
          <TextField
            fullWidth
            id="outlined-email-input"
            label="Email"
            type="email"
            sx={{ marginBottom: "20px" }}
            helperText="please enter a vaild email"
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              
              aria-describedby="pass"
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
            <FormHelperText id="pass">please enter a strong password (8-15 chars)</FormHelperText>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginY: "20px",
              backgroundColor: "var(--soft-red)",
              color: "var(--off-white)",
            }}
          >
            SignUp
          </Button>
          <Typography textAlign="center">
            <Link href="/login" color="#374151">
              Already have an account?
            </Link>
          </Typography>
        </Box>
        <CardMedia
          component="img"
          // sx={{ width: 400 }}
          sx={{
            width: "45%",
            display: { xs: "none", md: "block" },
          }}
          image="./src/assets/TaleTrail Logo with Seamless Sketch Integration.png"
          alt="Live from space album cover"
        />
      </Card>
    </Container>
  );
}
