import { GetServerSideProps } from 'next'
import MainLayout from '../layouts/MainLayout';
import { Button, Container, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useFormik } from "formik";
import GoogleIcon from '@mui/icons-material/Google';
import { getSession, signIn } from "next-auth/react"
import { loginValidate } from '../lib/validate';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}
interface ILoginValues {
  email: string,
  password: string,
}

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (values: ILoginValues) => {
    const {email, password} = values
    const status = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: `/`,
    })
    if (status?.ok) {
      router.push(status?.url ?? '/')
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validate: loginValidate,
    onSubmit,
  });
  const { errors, touched, getFieldProps } = formik;
  const googleSignInHandle = async () =>{
    signIn('google', {
      callbackUrl: window.location.origin
    })
  }
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
              Login to your account
            </Typography>
            <Button
              variant="contained"
              endIcon={<GoogleIcon />}
              onClick={googleSignInHandle}>
              Sign In with Google
            </Button>
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
            <Button
              type='submit'
              variant="contained">
              Login
            </Button>
            <Typography
              align="center"
            >
              Don’t have an account?{" "}
              <Link href="/registration">
                Sign up
              </Link>
            </Typography>
          </Box>
        </form>
      </Container>
    </MainLayout>
  )
}
