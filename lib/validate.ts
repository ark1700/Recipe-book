import { FormikErrors, FormikValues } from "formik";

interface ILoginValues {
  email: string,
  password: string,
}

interface IRegisterValues {
  email: string,
  username: string,
  password: string,
  cpassword: string,
}

export function loginValidate(values: ILoginValues) {
  const errors: FormikErrors<FormikValues> = {}

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be greater than 6 characters long';
  } else if(values.password.length === 0) {
    errors.password = 'Invalid password';
  }

  return errors;
}

export function registerValidate(values: IRegisterValues) {
  const errors: FormikErrors<FormikValues> = {}

  if (!values.username) {
    errors.username = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be greater than 6 characters long';
  } else if(values.password.length === 0) {
    errors.password = 'Invalid password';
  }

  if (!values.cpassword) {
    errors.cpassword = 'Required';
  } else if (values.cpassword !== values.password) {
    errors.cpassword = 'Password not match';
  }

  return errors;
}
