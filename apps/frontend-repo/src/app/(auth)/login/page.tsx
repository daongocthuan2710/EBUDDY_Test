"use client";

import { redirect } from "next/navigation";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import { loginWithGoogle } from "../../../apis/authApi";
import Image from "next/image";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      console.log("User logged in:", user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onSignup = () => {
    redirect("/register");
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: 3,
        p: 3,
        position: "relative",
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
      >
        Login
      </Typography>

      {/* Email Field */}
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password Field */}
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        margin="normal"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography
        sx={{ textAlign: "right", mt: 1, cursor: "pointer", color: "blue" }}
        onClick={() => console.log("Forgot Password")}
      >
        Forget password?
      </Typography>

      <Button
        fullWidth
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={handleLogin}
      >
        Sign in
      </Button>

      <Divider sx={{ my: 2 }}>OR</Divider>

      <Button
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: "#1877f2",
          color: "white",
          "&:hover": { backgroundColor: "#145dbf" },
        }}
        startIcon={
          <Image
            src="/images/facebook-icon.webp"
            alt="Facebook"
            width={24}
            height={24}
          />
        }
        onClick={() => console.log("Login with Facebook")}
      >
        Continue with Facebook
      </Button>

      <Button
        fullWidth
        variant="outlined"
        sx={{ mt: 1, borderColor: "#ddd", color: "#333" }}
        startIcon={
          <Image
            src="/images/google-icon.png"
            alt="Google"
            width={24}
            height={24}
          />
        }
        onClick={() => console.log("Login with Google")}
      >
        Continue with Google
      </Button>

      <Typography textAlign="center" sx={{ mt: 2, fontSize: 14 }}>
        I don’t have an account?{" "}
        <Typography
          component="span"
          sx={{ color: "blue", cursor: "pointer" }}
          onClick={onSignup}
        >
          Sign up
        </Typography>
      </Typography>
    </Container>
  );
}
