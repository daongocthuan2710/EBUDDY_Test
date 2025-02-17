"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";

// Services
import { register as signUp } from "@/services/Auth";

// Constants
import { HTTP_STATUS } from "@/constants";

interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Confirm password is incorrect",
        });
        return;
      }

      const result = await signUp(data);
      if (result.code === HTTP_STATUS.CREATED.text) {
        enqueueSnackbar("Registration successful!", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 2000,
        });
        setTimeout(() => {
          router.push("/login");
        }, 500);
      } else {
        enqueueSnackbar(result.message || "Register failed!", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("Register failed!", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 2000,
      });
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

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
        Sign up
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
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

        <TextField
          fullWidth
          label="Confirm Password"
          variant="outlined"
          margin="normal"
          type={showConfirmPassword ? "text" : "password"}
          {...register("confirmPassword", {
            required: "Confirm Password is required",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="error"
          sx={{
            cursor: "pointer",
            mt: 2,
            backgroundColor: "#33a3dc",
            color: "white",
            "&:hover": {
              backgroundColor: "#5abee8",
            },
          }}
          type="submit"
          disabled={isSubmitting}
        >
          Sign up
          {isSubmitting && <CircularProgress className="ml-2" size={20} />}
        </Button>
      </form>

      <Divider sx={{ my: 2 }} />

      <Typography textAlign="center" sx={{ fontSize: 14 }}>
        Already have an account?{" "}
        <Typography
          component="span"
          sx={{ color: "#1877f2", cursor: "pointer", fontSize: 14 }}
          onClick={onSignIn}
        >
          Sign in
        </Typography>
      </Typography>
    </Container>
  );
}
