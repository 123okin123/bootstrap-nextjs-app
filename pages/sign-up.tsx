import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik, FormikHelpers } from 'formik';
import React, { ReactElement, useState } from 'react';
import * as Yup from 'yup';
import Copyright from '../components/copyright';
import { ApiContainer } from '../hooks/useApi';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  successText: {
    color: theme.palette.success.main,
    margin: theme.spacing(3, 0, 2),
  },
}));

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUp(): ReactElement {
  const classes = useStyles();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { authService } = ApiContainer.useContainer();

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ): Promise<void> => {
    try {
      await authService.signUp(values);
      setSubmitSuccess(true);
    } catch {}
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {submitSuccess ? (
          <Typography className={classes.successText}>Success</Typography>
        ) : (
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
            validationSchema={Yup.object({
              firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
              lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
              email: Yup.string().email('Invalid email address').required('Required'),
              password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            })}
            onSubmit={onSubmit}>
            {(formik) => (
              <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...formik.getFieldProps('firstName')}
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      error={!!formik.errors.firstName}
                      helperText={formik.errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...formik.getFieldProps('lastName')}
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      error={!!formik.errors.lastName}
                      helperText={formik.errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...formik.getFieldProps('email')}
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error={!!formik.errors.email}
                      helperText={formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...formik.getFieldProps('password')}
                      variant="outlined"
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
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        )}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
