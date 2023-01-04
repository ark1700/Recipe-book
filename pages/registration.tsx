import MainLayout from '../layouts/MainLayout';
import { Button, Container, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useFormik } from "formik";
import { registerValidate } from '../lib/validate';
import axios from 'axios';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url'

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { req } = context;
    const { origin } = absoluteUrl(req)
    return {
      props: {
        host: origin,
      }
    };
  } catch (e) {
    console.error(e)
    return {
      props: {},
    }
  }
}

export default function Register({host}: {host: string}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const router = useRouter()
  const onSubmit = async (values: any) => {
    try {
      const {username, email, password} = values
      axios.post(`${host}/api/auth/signup`, {
        username,
        email,
        password,
      }).then((res) => {
        const data = res.data
        if (data) {
          router.push('/')
        }
      })
    } catch(err) {
      console.error(err)
    }
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });
  const { errors, touched, getFieldProps } = formik;
  return (
    <MainLayout>
      <Container maxWidth="sm">
        <form onSubmit={formik.handleSubmit}>
          <Box
            component={Paper}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              padding: {
                xs: 2,
                sm: 5,
              },
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" component="p">
              Register your account
            </Typography>
            <TextField
              fullWidth
              autoComplete="username"
              type="text"
              label="Username"
              {...getFieldProps("username")}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
            <TextField
              fullWidth
              autoComplete="email"
              type="email"
              label="Email Address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <VisibilityIcon/>
                      ) : (
                        <VisibilityOffIcon/>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              type={showCPassword ? "text" : "password"}
              label="Confirm password"
              {...getFieldProps("cpassword")}
              error={Boolean(touched.cpassword && errors.cpassword)}
              helperText={touched.cpassword && errors.cpassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <VisibilityIcon/>
                      ) : (
                        <VisibilityOffIcon/>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type='submit'
              variant="contained">
              Sign up
            </Button>
          </Box>
        </form>
      </Container>
    </MainLayout>
  )
}
