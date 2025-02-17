"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { redirect } from "next/navigation";
import {
  TextField,
  Button,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

interface ILoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (formData) => {
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (!result?.ok) {
        enqueueSnackbar(result?.error || "Login failed!", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 2000,
        });
      } else {
        enqueueSnackbar("Login successful!", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 2000,
        });
        redirect("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      // enqueueSnackbar("Login failed!", {
      //   variant: "error",
      //   anchorOrigin: { vertical: "top", horizontal: "right" },
      //   autoHideDuration: 2000,
      // });
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const onSignup = () => {
    router.push("/register");
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
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
          autoComplete="off"
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
          autoComplete="new-password"
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
        {/* 
        <Typography
          sx={{ textAlign: "right", mt: 1, cursor: "pointer", color: "blue" }}
          onClick={() => console.log("Forgot Password")}
        >
          Forget password?
        </Typography> */}

        <Button
          fullWidth
          variant="contained"
          color="error"
          sx={{
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
          Sign in
          {isSubmitting && <CircularProgress className="ml-2" size={20} />}
        </Button>
      </form>

      {/* <Divider sx={{ my: 2 }}>OR</Divider> */}

      {/* <Button
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
      </Button> */}

      {/* <Button
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
      </Button> */}

      <Typography textAlign="center" sx={{ mt: 2, fontSize: 14 }}>
        I don’t have an account?{" "}
        <Typography
          component="span"
          sx={{ color: "#1877f2", cursor: "pointer", fontSize: 14 }}
          onClick={onSignup}
        >
          Sign up
        </Typography>
      </Typography>
    </Container>
  );
}
