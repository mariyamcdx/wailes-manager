import React, { useState } from "react";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
import { Grid, InputLabel, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./DateInput.css";
import { defaultDateFormate } from "../constants/global";

export const DateInput = ({
  label,
  name,
  required,
  width,
  defaultValue,
  minDateLabel,
  maxDateLabel,
}) => {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    register,
    watch,
    setError,
  } = useFormContext();
  const [manuallyEnteredDate, setManuallyEnteredDate] = useState([]);

  const extraProps = {};

  if (minDateLabel) {
    extraProps.minDate = dayjs(getValues(minDateLabel));
  }
  // if (maxDateLabel) {
  //   extraProps.maxDate = dayjs(getValues(maxDateLabel));
  // }

  const schStartYear = watch("schStartYear");
  const wosStartDate = watch("wosStartDate");
  const worStartDate = watch("worStartDate");
  const woeStartDate = watch("woeStartDate");
  const startDate = watch("startDate");
  const prjPsDate = watch("prjPsDate");
  const woPsDate = watch("woPsDate");
  const astwDateStart = watch("astwDateStart");
  const woAsDate = watch("woAsDate");
  const startDateValid =
    schStartYear ||
    wosStartDate ||
    worStartDate ||
    woeStartDate ||
    startDate ||
    prjPsDate ||
    woPsDate ||
    astwDateStart ||
    woAsDate;

  const isEndDateValid = (selectedDate) => {
    return (
      dayjs(startDateValid).format("YYYY-MM-DD") &&
      dayjs(selectedDate).format("YYYY-MM-DD") >= (startDateValid || "")
    );
  };

  if (getValues(name) === undefined) setValue(name, "");

  return (
    <div>
      <Grid container sx={{ margin: "4px" }}>
        <Grid item xs={12}>
          <InputLabel sx={{ fontSize: "0.9rem" }}>
            {label}
            {required && <span style={{ color: "red", margin: "5px" }}>*</span>}
          </InputLabel>
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              control={control}
              name={name}
              rules={{ required }}
              render={({ field }) => {
                return (
                  <>
                    <DatePicker
                      defaultValue={defaultValue}
                      placeholderText="Select date"
                      {...register(name)}
                      onChange={(v) => {
                        if (v) {
                          field.onChange(dayjs(v).format("YYYY-MM-DD"));
                        } else {
                          field.onChange(null);
                        }
                      }}
                      value={field.value ? dayjs(field.value) : " "}
                      format={defaultDateFormate}
                      sx={{ width }}
                      slotProps={{
                        textField: {
                          size: "small",
                          error: name in errors ? true : false,
                        },
                        actionBar: {
                          actions: ["clear"],
                        },
                      }}
                      InputProps={{ sx: { fontSize: "0.9rem" } }}
                      className="customPicker"
                      height="20%"
                      {...extraProps}
                      // shouldDisableDate={(date) => !isEndDateValid(date)}
                    />
                  </>
                );
              }}
            />
          </LocalizationProvider>
          <Typography
            variant="inherit"
            sx={{ color: "#d32f2f", fontSize: "0.9rem" }}
          >
            {name in errors && `Please Select ${label}`}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
