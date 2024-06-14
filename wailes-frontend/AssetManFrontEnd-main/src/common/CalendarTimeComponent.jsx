import { Controller, useFormContext } from "react-hook-form";
import { Grid, InputLabel, TextField, Typography } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./DateInput.css";
import dayjs from "dayjs";
import { useEffect } from "react";
 
export const CalendarTimeComponent = ({
  label,
  name,
  required,
  width,
  showLabel,
  value,
}) => {
  const {
    control,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext();
 
  const [startTime, endTime] = name;
 
  const startValue = watch(startTime);
 
  const validateEndTime = (value) => {
    if (!startValue || !value) return true;
    const startTemp =
      typeof startValue === "object"
        ? dayjs(startValue).format("HH:mm:ss")
        : startValue;
    const startTime = dayjs(`1970-01-01T${startTemp}`).valueOf();
 
    const endValue =
      typeof value === "object" ? dayjs(value).format("HH:mm:ss") : value;
    const endTime = dayjs(`1970-01-01T${endValue}`).valueOf();
    if (isNaN(startTime) || isNaN(endTime)) {
      return true;
    }
 
    return (
      endTime >= startTime ||
      "End time must be greater than or equal to start time"
    );
  };
 
  return (
    <Grid container sx={{ margin: "4px" }}>
      <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
        <InputLabel sx={{ fontSize: "0.9rem" }}>
          {label}
          {required && <span style={{ color: "red", margin: "5px" }}>*</span>}
        </InputLabel>
      </Grid>
 
      <Grid item xs={4} sx={{ alignItems: "center" }}>
        {showLabel && (
          <InputLabel sx={{ fontSize: "0.9rem" }}>Time Start</InputLabel>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            control={control}
            name={startTime}
            rules={{ required }}
            render={({ field: { value, onChange } }) => {
              return (
                <>
                  <TimePicker
                    size="small"
                    sx={{ width: "100%", borderRadius: "8px" }}
                    onChange={(v) => {
                      onChange(v);
                    }}
                    value={
                      value !== undefined && value !== null
                        ? dayjs(value, "HH:mm:ss")
                        : dayjs("--:--:--").format()
                    }
                    className="customPicker timePicker"
                    slotProps={{
                      textField: {
                        error: false,
                      },
                    }}
                  />
                </>
              );
            }}
          />
        </LocalizationProvider>
        <Typography
          variant="inherit"
          sx={{ fontSize: "0.9rem", color: "#d32f2f" }}
        >
          {errors[startTime] && errors[startTime].message}
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ alignItems: "center", ml: "1rem" }}>
        {showLabel && (
          <InputLabel sx={{ fontSize: "0.9rem" }}>Time end</InputLabel>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            control={control}
            name={endTime}
            rules={{
              required,
              validate: validateEndTime,
            }}
            render={({ field }) => {
              return (
                <>
                  <TimePicker
                    size="small"
                    sx={{ width: "100%", borderRadius: "8px" }}
                    onChange={(v) => {
                      field.onChange(v);
                    }}
                    value={
                      field.value !== undefined && field.value !== null
                        ? dayjs(field.value, "HH:mm:ss")
                        : dayjs("--:--:--").format()
                    }
                    className="customPicker timePicker"
                    slotProps={{
                      textField: {
                        error: false,
                      },
                    }}
                  />
                </>
              );
            }}
          />
        </LocalizationProvider>
        <Typography
          variant="inherit"
          sx={{ fontSize: "0.9rem", color: "#d32f2f" }}
        >
          {errors[endTime] && errors[endTime].message}
        </Typography>
      </Grid>
    </Grid>
  );
};
 