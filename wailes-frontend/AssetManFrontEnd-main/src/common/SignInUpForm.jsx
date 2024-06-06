import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Grid, Stack } from "@mui/material";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { FormAutocompleteField } from "./FormAutocompleteField";

export const SignInUpForm = (props) => {
  const methods = useForm({
    defaultValues: {
      ...props.defaultValues,
    },
  });

  const saveData = (data) => {
    props.onSubmit(data);
    methods.reset();
  };
  return (
    <div>
      <Box noValidate sx={{ mt: 1 }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(saveData)} method="post">
            <Stack spacing={2}>
              {props.columns.map((inputItem) => {
                return (
                  <React.Fragment key={inputItem.id}>
                    {inputItem.field !== "action" && (
                      <>
                        {(inputItem.type === "text") |
                        (inputItem.type === "email") |
                        (inputItem.type === "number") |
                        (inputItem.type === "password") ? (
                          <TextInput
                            classes={props.classes}
                            type={inputItem.type}
                            required={inputItem.required}
                            label={inputItem?.headerName}
                            value={
                              methods.getValues(inputItem.field)
                                ? methods.getValues(inputItem.field)
                                : null
                            }
                            pattern={inputItem.pattern}
                            variant="outlined"
                            name={inputItem.field}
                            InputProps={inputItem.icon}
                            errorMessage={inputItem.errorMessage}
                          />
                        ) : inputItem.type === "select" ? (
                          <FormAutocompleteField
                            classes={props.classes}
                            label={inputItem.headerName}
                            value={
                              methods.getValues(inputItem.field)
                                ? methods.getValues(inputItem.field)
                                : null
                            }
                            name={inputItem.field}
                            required={inputItem.required}
                            variant="standard"
                            options={inputItem.options}
                            width={inputItem.textFieldWidth}
                          />
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </React.Fragment>
                );
              })}
              <Grid container spacing={2}>
                <Grid
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={24}
                  xs={24}
                  className={props.classes.item}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    className={props.classes.buttonRegister}
                    label={"Register"}
                    disabled={props.isLoading ? true : false}
                  ></Button>
                </Grid>
              </Grid>
            </Stack>
          </form>
        </FormProvider>
      </Box>
    </div>
  );
};
