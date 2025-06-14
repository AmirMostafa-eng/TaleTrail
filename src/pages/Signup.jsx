import Box from "@mui/material/Box";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Button,
  Link,
  Card,
  CardMedia,
  Typography,
  Container,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router";
import axios from "../api/axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Signup({ users }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
  });

  // Single state object for errors
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    emailExists: false,
  });

  const validationPatterns = {
    firstName: /^[A-Za-z]{3,15}$/,
    lastName: /^[A-Za-z]{3,15}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
  };

  const helperTexts = {
    firstName:
      "Please enter a valid name (3-15 letters, no numbers/special chars)",
    lastName:
      "Please enter a valid name (3-15 letters, no numbers/special chars)",
    email: "Please enter a valid email address",
    password:
      "Password must be 8-20 chars with at least one letter and one number",
  };

  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, emailExists: false }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false, emailExists: false }));
    }
  };

  const handleClickShowPassword = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (validationPatterns[key]) {
        if (!validationPatterns[key].test(formData[key])) {
          newErrors[key] = true;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Form is valid
      const dataToSend = {
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`,
      };
      if (users.filter((u) => u.email == dataToSend.email)[0]) {
        setErrors((preValue) => ({ ...preValue, emailExists: true }));
        return;
      }
      // Calling API
      console.log(dataToSend);
      await axios.post('http://localhost:3001/users', dataToSend);
      navigate('/login');
    }
  };

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
          {/* {first name} */}
          <TextField
            fullWidth
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            helperText={
              (errors.firstName || !formData.firstName) && helperTexts.firstName
            }
            sx={{ marginTop: "20px" }}
          />
          {/* last name */}
          <TextField
            fullWidth
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            helperText={
              (errors.lastName || !formData.lastName) && helperTexts.lastName
            }
            sx={{ marginY: "20px" }}
          />
          {/* email */}
          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            helperText={(errors.email || !formData.email) && helperTexts.email}
            sx={{ marginBottom: "20px" }}
          />
          {/* password */}
          <FormControl fullWidth variant="outlined" error={errors.password}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={formData.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText>
              {errors.password
                ? helperTexts.password
                : formData.password.length < 8
                ? "Please enter a strong password"
                : null}
            </FormHelperText>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: "20px",
              backgroundColor: "var(--soft-red)",
              color: "var(--off-white)",
            }}
          >
            SignUp
          </Button>
          <FormHelperText sx={{ textAlign: "center" }} error>
            {errors.emailExists ? "Email Already Exists" : null}
          </FormHelperText>
          <Typography textAlign="center" marginTop={3}>
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
