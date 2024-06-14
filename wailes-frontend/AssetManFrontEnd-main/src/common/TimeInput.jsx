import { Controller, useFormContext } from "react-hook-form";
import { Grid, InputLabel, Typography } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./DateInput.css";
import dayjs from "dayjs";
 
export const TimeInput = ({ label, name, required, width }) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();
  const startValue = watch("wosStartTime");
 
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
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <InputLabel sx={{ fontSize: "0.9rem" }}>
          {label}
          {required && <span style={{ color: "red", margin: "5px" }}>*</span>}
        </InputLabel>
      </Grid>
 
      <Grid item xs={12} sx={{ alignItems: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            control={control}
            name={name}
            rules={{ required, validate: validateEndTime }} //optional
            render={({ field }) => {
              return (
                <>
                  <TimePicker
                    size="small"
                    sx={{ width, borderRadius: "8px" }}
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
          {errors[name] && errors[name].message}
        </Typography>
      </Grid>
    </Grid>
  );
};
 
