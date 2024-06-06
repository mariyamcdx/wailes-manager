import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import "./DateInput.css";

export function FormAutocompleteField({
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
  ...muiAutocompleteProps
}) {
  const { control } = useFormContext();
  let optionsArray = Array.from(options);
  const sortedOptions = optionsArray?.sort((a, b) =>
    a.label.localeCompare(b.label)
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
                    mb: 2,
                    ...sx,
                    borderRadius: "15px",
                    width: { width },
                    fontSize: "0.9rem",
                  }}
                  options={sortedOptions}
                  getOptionLabel={(option) =>
                    option.label || option.plantCode || ""
                  }
                  isOptionEqualToValue={(option, currentOption) => {
                    return option === currentOption;
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
                  // renderOption={(option) => {
                  //   console.log({ option });
                  //   return <Typography>{option.key}</Typography>;
                  // }}
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
