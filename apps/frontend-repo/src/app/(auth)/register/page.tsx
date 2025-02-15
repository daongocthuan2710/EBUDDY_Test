"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";

import {
  TextField,
  Button,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const onSignIn = () => {
    redirect("/login");
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
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
      >
        Register
      </Typography>

      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

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

      <Button
        fullWidth
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        // onClick={handleLogin}
      >
        Sign up
      </Button>
      <Typography
        component="span"
        sx={{ color: "blue", cursor: "pointer" }}
        onClick={onSignIn}
      >
        Sign in
      </Typography>
    </Container>
  );
}
