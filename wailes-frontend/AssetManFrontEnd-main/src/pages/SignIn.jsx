import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Key, Lock, Mail } from "@mui/icons-material";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { makeStyles } from "@mui/styles";
import { Button } from "../common/Button";
import { Dropdown } from "../common/Dropdown";
import { Progressor } from "../common/Progressor";
import { TextInput } from "../common/TextInput";
import { ListGroupPrefix, applicationOption } from "../constants/global";
import useMutationApi from "../hooks/useMutationApi";
import useFetchApi from "../hooks/useFetchApi";
import { FormAutocompleteField } from "../common/FormAutocompleteField";

const useStyles = makeStyles((theme) => ({
  root: {
    [`& fieldset`]: {
      borderRadius: 15,
    },
  },
  label: {
    color: "#212121 !important",
    fontSize: "1.0rem !important",
    fontWeight: "600 !important",
  },
  titleLogin: {
    fontWeight: "700 !important",
    fontSize: "1.8rem !important",
    textAlign: "left !important ",
  },
  labelEmail: {
    color: "#212121 !important",
    fontSize: "1.1rem !important",
    fontWeight: "600 !important",
    marginBottom: "10px",
  },
  labelPassword: {
    color: "#212121 !important",
    fontSize: "1.1rem !important",
    fontWeight: "600 !important",
  },
  buttonRegister: {
    width: "190px !important",
    borderRadius: "18px !important",
    fontWeight: "600 !important",
    textTransform: "capitalize !important",
  },
  buttonLogin: {
    width: "190px !important",
    borderRadius: "18px !important",
    fontWeight: "600 !important",
    textTransform: "capitalize !important",
  },
  card: {
    webkitShapeInside:
      "polygon(65px 200px,65px 800px,350px 800px,350px 80px,160px 80px) !important",
    shapeInside:
      "polygon(65px 200px,65px 450px,350px 450px,350px 80px,160px 80px) !important",
    textAlign: "justify !important",
  },
  cardBox: {
    background: "#f1f1f1 !important",
    position: "relative !important",
    boxShadow: "none !important",
    "&::before": {
      content: '""',
      position: "absolute !important",
      top: "0",
      right: "0",
      borderTop: "80px solid white !important",
      borderLeft: "80px solid #f1f1f1 !important",
      width: "0",
    },
  },
  item: {
    paddingLeft: "0 !important",
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const methods = useForm();

  const tenantKeyWatch = methods.watch("userTenantKey");

  const tenantKey = tenantKeyWatch || localStorage.getItem("X-tenant-id");

  // const handleNavigate = () => {
  //   navigate("/sign-up");
  // };
  
  const { mutateAsync: signInUser, isLoading } = useMutationApi({
    endpoint: `auth/signin`,
    method: "post",
    tenantKey,
    showError: false,
    Menu_id: -1,
  });
  const {
    data: applicationData,
    isFetchedAfterMount: isFetch,
    isFetching: isApplicationDataIsFetching,
    refetch: applicationFetch,
  } = useFetchApi({
    endpoint: `${ListGroupPrefix}/tenant/apps`,
    retrieveOnMount: true,
    Menu_id: 1,
    isApps: true,
  });

  useEffect(() => {
    if (isFetch) {
      applicationFetch();
    }
  }, [applicationFetch, isFetch]);

  const onSubmit = async (data) => {
    localStorage.setItem("X-tenant-id", data?.userTenantKey);

    const payload = {
      username: data.userEmail,
      password: data.userPassword,
      applicationId: data.application?.id,
      application: "Asset Management",
    };

    try {
      const res = await signInUser({ ...payload });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.jwt);
        navigate("/home");
        navigate(0);
      }
    } catch {
      toast.error(
        "Invalid credentials. Please check email, password and tenant key combination"
      );
    }
  };
  const inputs = [
    {
      id: 1,
      field: "userEmail",
      name: "userEmail",
      type: "email",
      placeholder: "Email",
      headerName: "Email",
      errorMessage: "Please enter an email address in a valid format",
      required: true,
      pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      icon: <Mail />,
    },
    {
      id: 2,
      field: "userPassword",
      name: "userPassword",
      type: "password",
      placeholder: "Password",
      headerName: "Password",
      errorMessage: "Please enter a password with at least 8 characters",
      required: true,
      pattern:
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
      icon: <Lock />,
    },
    {
      id: 3,
      field: "userTenantKey",
      name: "Tenant key",
      type: "number",
      placeholder: "Tenant key",
      headerName: "Tenant key",
      errorMessage: "Please enter a Tenant key",
      required: true,
      icon: <Key />,
    },
    {
      id: 4,
      field: "application",
      headerName: "Application",
      type: "select",
      required: true,
      options: applicationData?.map((o) => ({
        label: o.applicationName,
        id: o.applicationId,
      })),
      textFieldWidth: "100%",
    },
  ];

  return (
    <>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ToastContainer />

          {isLoading && <Progressor />}

          <Card className={classes.cardBox}>
            <CardContent sx={{ padding: "24px 30px" }}>
              <Stack spacing={2}>
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.titleLogin}
                  align="left"
                >
                  Login to your account
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <FormProvider {...methods}>
                    <form
                      onSubmit={methods.handleSubmit(onSubmit)}
                      method="post"
                    >
                      <Stack spacing={2}>
                        {inputs.map((inputItem) => {
                          return (
                            <React.Fragment key={inputItem.id}>
                              {inputItem.field !== "action" && (
                                <>
                                  {inputItem.type === "select" ? (
                                    <FormAutocompleteField
                                      classes={classes}
                                      label={inputItem.headerName}
                                      value={methods.getValues(
                                        inputItem.field ? inputItem.field : ""
                                      )}
                                      name={inputItem.field}
                                      required={inputItem.required}
                                      variant="standard"
                                      options={
                                        inputItem.options
                                          ? inputItem.options
                                          : ""
                                      }
                                      width={inputItem.textFieldWidth}
                                    />
                                  ) : (inputItem.type === "email") |
                                    (inputItem.type === "password") ? (
                                    <TextInput
                                      classes={classes}
                                      type={inputItem.type}
                                      required={inputItem.required}
                                      label={inputItem?.headerName}
                                      value={
                                        methods.getValues(inputItem.field)
                                          ? methods.getValues(inputItem.field)
                                          : null
                                      }
                                      variant="outlined"
                                      name={inputItem.field}
                                      InputProps={inputItem.icon}
                                      pattern={inputItem.pattern}
                                      errorMessage={inputItem.errorMessage}
                                      login={true}
                                    />
                                  ) : (
                                    <TextInput
                                      classes={classes}
                                      type={inputItem.type}
                                      required={inputItem.required}
                                      label={inputItem?.headerName}
                                      value={
                                        methods.getValues(inputItem.field)
                                          ? methods.getValues(inputItem.field)
                                          : null
                                      }
                                      variant="outlined"
                                      name={inputItem.field}
                                      InputProps={inputItem.icon}
                                      login={true}
                                    />
                                  )}
                                </>
                              )}
                            </React.Fragment>
                          );
                        })}
                        <Grid container spacing={1} justify="space-between">
                          {/* <Grid
                            item
                            xl={6}
                            lg={6}
                            md={6}
                            sm={12}
                            xs={12}
                            className={classes.item}
                          >
                            <Button
                              variant="outlined"
                              className={classes.buttonRegister}
                              onClick={handleNavigate}
                              label={"Register"}
                              disabled={isLoading ? true : false}
                            ></Button>
                          </Grid> */}
                          <Grid
                            item
                            xl={6}
                            lg={6}
                            md={6}
                            sm={12}
                            xs={12}
                            className={classes.item}
                          >
                            <Button
                              variant="contained"
                              className={classes.buttonLogin}
                              label={"Login"}
                              type="submit"
                              disabled={isLoading ? true : false}
                            ></Button>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          display="flex"
                          justifyContent="flex-start"
                        >
                          <Grid item>
                            <Link href="#" variant="body2">
                              <Typography paddingLeft={1}> Forgot password? </Typography>
                            </Link>
                          </Grid>
                        </Grid>
                      </Stack>
                    </form>
                  </FormProvider>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
