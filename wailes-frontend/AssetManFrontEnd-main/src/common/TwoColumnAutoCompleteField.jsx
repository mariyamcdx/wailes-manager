import {
    Autocomplete,
    Box,
    Grid,
    Paper,
    TextField,
    Typography,
  } from "@mui/material";
  import { Fragment } from "react";
  import { Controller, useFormContext } from "react-hook-form";
  import "./DateInput.css";
   
  export function TwoColumnAutoCompleteField({
    value,
    sx,
    label,
    labelProps,
    placeholder,
    multiple = false,
    options = [],
    name,
    required = false,
    onChange,
    labelSx,
    renderOption,
    autoFocus,
    width,
    classes,
    code,
    ...muiAutocompleteProps
  }) {
    const { control } = useFormContext();
   
    let optionsArray = Array.from(options);
    const sortedOptions = optionsArray?.sort((a, b) =>
      a.code.localeCompare(b.code)
    );
    const CustomPaper = (props) => (
      <Paper {...props} sx={{ marginTop: "4px", width: "600px" }} />
    );
    return (
      <Fragment>
        <Grid sx={{ margin: "4px" }}>
          {label && (
            <Typography
              className={classes?.label}
              variant="body2"
              mb={0.5}
              sx={{ color: "rgba(0, 0, 0, 0.6)" }}
              {...labelProps}
            >
              {label}
              {required && (
                <Typography component="span" color="error.main">
                  &nbsp;*
                </Typography>
              )}
            </Typography>
          )}
   
          <Controller
            control={control}
            name={name}
            rules={{
              required: {
                value: required,
                message: `${label || name} is required`,
              },
            }}
            render={({
              field: { onChange: rhfOnChangeHandler, value: rhfValue },
              fieldState: { error },
            }) => {
              return (
                <Fragment>
                  <Autocomplete
                    className="customPicker"
                    sx={{
                      ...sx,
                      borderRadius: "15px",
                      width: { width },
                      fontSize: "0.9rem",
                    }}
                    options={sortedOptions}
                    getOptionLabel={(option) => option.desc || ""}
                    isOptionEqualToValue={(option, currentOption) => {
                      return option === currentOption;
                    }}
                    filterOptions={(options, { inputValue }) => {
                      const lowerInputValue = inputValue.toLowerCase();
                      return options.filter(
                        (option) =>
                          option.code.toLowerCase().includes(lowerInputValue) ||
                          option.desc.toLowerCase().includes(lowerInputValue)
                      );
                    }}
                    value={rhfValue}
                    multiple={multiple}
                    filterSelectedOptions
                    onChange={(_, selectedOptions) => {
                      rhfOnChangeHandler(selectedOptions);
                      if (onChange) {
                        onChange(selectedOptions);
                      }
                    }}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Grid container>
                          <Grid item xs={3}>
                            <Typography variant="body2">{option.code}</Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <Typography variant="body2">{option.desc}</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={placeholder}
                        size="small"
                        error={!!error?.message}
                        helperText={error?.message}
                        FormHelperTextProps={{
                          sx: {
                            ml: 0,
                            borderRadius: "15px",
                            fontSize: "0.9rem",
                          },
                        }}
                        autoFocus={autoFocus}
                      />
                    )}
                    PaperComponent={CustomPaper}
                    {...muiAutocompleteProps}
                  />
                </Fragment>
              );
            }}
          />
        </Grid>
      </Fragment>
    );
  }