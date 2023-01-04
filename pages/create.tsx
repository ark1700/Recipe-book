import MainLayout from '../layouts/MainLayout';
import { Box, Container } from '@mui/material';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import TextField from '@mui/material/TextField';
import { Formik, FieldArray, useFormik, useFormikContext, Form, getIn } from 'formik';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Ingredients } from '../styles/recipe';
import * as Yup from "yup";
import Divider from '@mui/material/Divider';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  const { origin } = absoluteUrl(req)
  return {
    props: {
      host: origin
    }
  }
}

export default function Create({host}: any) {
  const router = useRouter()
  const onSubmit = async (values: any) => {
    try {
      const {title} = values
      console.log(values);
      axios.post(`${host}/api/recipes`, values).then((res) => {
        const data = res.data
        if (data) {
          router.push('/')
        }
      })
    } catch(err) {
      console.error(err)
    }
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    descr: Yup.string().required("Description is required"),
    img: Yup.string().url("Img must be a valid URL").required("Img is required"),
    serves: Yup.number().typeError('Serves must be a number').required("Serves is required"),
    ingedients: Yup.array().of(
      Yup.object().shape({
        name: Yup.string(),
        amount: Yup.string(),
      })
    ),
    method: Yup.array().of(
      Yup.object().shape({
        descr: Yup.string(),
        img: Yup.string(),
      })
    ),
    nutrition: Yup.object().shape({
      calories: Yup.number().typeError('Calories must be a number'),
      fat: Yup.number().typeError('Fat must be a number'),
      carbs: Yup.number().typeError('Carbs must be a number'),
      protein: Yup.number().typeError('Protein must be a number'),
    })
  });
  const initialValues = {
    title: "",
    descr: "",
    img: "",
    prepTimeInMinutes: "",
    cookTimeInMinutes: "",
    nutrition: {
      calories: "",
      fat: "",
      carbs: "",
      protein: "",
    },
    serves: "",
    ingredients: [
      {
        name: "",
        amount: "",
      }
    ],
    method: [{
      img: "",
      descr: "",
    }],
  }
  return (
    <MainLayout>
      <Container maxWidth="sm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, touched, errors, handleChange, handleBlur, isValid, getFieldProps }) => (
            <Form noValidate autoComplete="off">
              <Typography
                variant="h4"
                component="p"
                sx={{ mb: 2}}
              >Create recipe</Typography>
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                }}
              >
                <TextField
                  fullWidth
                  type="text"
                  label="Recipe name"
                  required
                  {...getFieldProps("title")}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Description"
                  required
                  multiline
                  minRows="4"
                  {...getFieldProps("descr")}
                  error={Boolean(touched.descr && errors.descr)}
                  helperText={touched.descr && errors.descr}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Img src"
                  {...getFieldProps("img")}
                  error={Boolean(touched.img && errors.img)}
                  helperText={touched.img && errors.img}
                />
                <Box sx={{
                  display: "grid",
                  gridTemplateColumns: {

                  },
                  gap: 2,
                }}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Serves"
                    required
                    {...getFieldProps("serves")}
                    error={Boolean(touched.serves && errors.serves)}
                    helperText={touched.serves && errors.serves}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Prep time"
                    {...getFieldProps("prepTimeInMinutes")}
                    error={Boolean(touched.prepTimeInMinutes && errors.prepTimeInMinutes)}
                    helperText={touched.prepTimeInMinutes && errors.prepTimeInMinutes}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Cook time"
                    {...getFieldProps("cookTimeInMinutes")}
                    error={Boolean(touched.cookTimeInMinutes && errors.cookTimeInMinutes)}
                    helperText={touched.cookTimeInMinutes && errors.cookTimeInMinutes}
                  />
                </Box>
                <span>Nutrition:</span>
                <Box sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: '1fr 1fr',
                    sm: '1fr 1fr 1fr 1fr',
                  },
                  gap: 2,
                }}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Calories"
                    {...getFieldProps("nutrition.calories")}
                    error={Boolean(touched.nutrition?.calories && errors.nutrition?.calories)}
                    helperText={touched.nutrition?.calories && errors.nutrition?.calories}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Fat"
                    {...getFieldProps("nutrition.fat")}
                    error={Boolean(touched.nutrition?.fat && errors.nutrition?.fat)}
                    helperText={touched.nutrition?.fat && errors.nutrition?.fat}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Carbs"
                    {...getFieldProps("nutrition.carbs")}
                    error={Boolean(touched.nutrition?.carbs && errors.nutrition?.carbs)}
                    helperText={touched.nutrition?.carbs && errors.nutrition?.carbs}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Protein"
                    {...getFieldProps("nutrition.protein")}
                    error={Boolean(touched.nutrition?.protein && errors.nutrition?.protein)}
                    helperText={touched.nutrition?.protein && errors.nutrition?.protein}
                  />
                </Box>
                <span>Ingrrdients:</span>
                <FieldArray name="ingredients">
                  {({ push, remove }) => (
                    <Box sx={{
                      display: 'grid',
                      gap: 2,
                    }}>
                      {values.ingredients.map((i, index) => {
                        const ingredientName = `ingredients[${index}].name`;
                        const touchedFirstName = getIn(touched, ingredientName);
                        const errorFirstName = getIn(errors, ingredientName);

                        const amount = `ingredients[${index}].amount`;
                        const touchedLastName = getIn(touched, amount);
                        const errorLastName = getIn(errors, amount);

                        return (
                          <Box key={index}
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: '10fr 5fr 1fr',
                              gap: 1,
                              alignItems: 'flex-start',
                            }}>
                            <TextField
                              variant="outlined"
                              label="Ingredient"
                              name={ingredientName}
                              value={i.name}
                              helperText={
                                touchedFirstName && errorFirstName
                                  ? errorFirstName
                                  : ""
                              }
                              error={Boolean(touchedFirstName && errorFirstName)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <TextField
                              variant="outlined"
                              label="Amount"
                              name={amount}
                              value={i.amount}
                              helperText={
                                touchedLastName && errorLastName
                                  ? errorLastName
                                  : ""
                              }
                              error={Boolean(touchedLastName && errorLastName)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <Button
                              color="secondary"
                              variant="outlined"
                              onClick={() => remove(index)}
                            >
                              x
                            </Button>
                          </Box>
                        );
                      })}
                      <Button
                        type="button"
                        variant="outlined"
                        size='small'
                        sx={{
                          justifySelf: 'flex-start'
                        }}
                        onClick={() =>
                          push({ name: "", amount: "" })
                        }
                      >
                        Add
                      </Button>
                    </Box>
                  )}
                </FieldArray>
                <span>Method:</span>
                <FieldArray name="method">
                  {({ push, remove }) => (
                    <Box sx={{
                      display: 'grid',
                      gap: 2,
                    }}>
                      {values.method.map((m, index) => {
                        const methodDescr = `method[${index}].descr`;
                        const touchedDescr = getIn(touched, methodDescr);
                        const errorDescr = getIn(errors, methodDescr);

                        const img = `method[${index}].img`;
                        const touchedImg = getIn(touched, img);
                        const errorImg = getIn(errors, img);

                        return (
                          <Box key={index} sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2,
                          }}>
                            <Box sx={{
                              display: 'grid',
                              gap: 2,
                              flexGrow: 1,
                            }}>
                              <TextField
                                variant="outlined"
                                label="Descr"
                                name={methodDescr}
                                value={m.descr}
                                multiline
                                minRows="2"
                                helperText={
                                  touchedDescr && errorDescr
                                    ? errorDescr
                                    : ""
                                }
                                error={Boolean(touchedDescr && errorDescr)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <TextField
                                variant="outlined"
                                label="Img"
                                name={img}
                                value={m.img}
                                helperText={
                                  touchedImg && errorImg
                                    ? errorImg
                                    : ""
                                }
                                error={Boolean(touchedImg && errorImg)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Box>
                            <Button
                              color="secondary"
                              variant="outlined"
                              onClick={() => remove(index)}
                            >
                              x
                            </Button>
                          </Box>
                        );
                      })}
                      <Button
                        type="button"
                        variant="outlined"
                        size='small'
                        sx={{
                          justifySelf: 'flex-start'
                        }}
                        onClick={() =>
                          push({ name: "", amount: "" })
                        }
                      >
                        Add
                      </Button>
                    </Box>
                  )}
                </FieldArray>
                <Divider />
                <Button
                  type='submit'
                  variant="contained">
                  Create
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

      </Container>
    </MainLayout>
  )
}
