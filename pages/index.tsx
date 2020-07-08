import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
import { getSortedPostsData } from '../lib/posts';
import { GetStaticProps } from 'next';
import Layout from '../components/layout';
import {
  Button,
  makeStyles,
  Grid,
  CssBaseline,
  Paper,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from '../components/link';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { ApiContainer } from '../hooks/useApi';
import Alert from '@material-ui/lab/Alert';

interface Props {
  allPostsData: {
    title: string;
    date: string;
    id: string;
  }[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function Home({ allPostsData }: Props): ReactElement {
  const classes = useStyles();
  const { authService } = ApiContainer.useContainer();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ): Promise<void> => {
    try {
      await authService.login(values.email, values.password);
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
    setSubmitting(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{ email: '', password: '', remember: true }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Required'),
              password: Yup.string().required('Required'),
            })}
            onSubmit={onSubmit}>
            {(formik) => (
              <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <TextField
                  {...formik.getFieldProps('email')}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={!!formik.errors.email}
                  helperText={formik.errors.email}
                />
                <TextField
                  {...formik.getFieldProps('password')}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!formik.errors.password}
                  helperText={formik.errors.password}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      {...formik.getFieldProps('remember')}
                      name="remember"
                      value="remember"
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                {!!errorMessage && <Alert severity="error">{errorMessage}</Alert>}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                  Sign In
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/sign-up" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}></Box>
              </form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
