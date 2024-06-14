import React from "react";
import {
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { TextInput } from "./TextInput";
import ScheduleTimeWidget from "./ScheduleTimeWidget";
 
const ScheduleWidget = ({
  label,
  required,
  name,
  showMeterComponent,
  showTimeComponent,
  showOneTimeComponent,
  showDailyComponent,
  showWeeklyComponent,
  showMonthlyComponent,
  schType,
  apiEditTime,
  defaultValues,
  startYear,
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const methods = useForm();
  return (
    <div>
      <Grid container sx={{ margin: "4px" }}>
        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
          <InputLabel sx={{ fontSize: "0.9rem" }}>
            {label}
            {required && <span style={{ color: "red", margin: "5px" }}>*</span>}
          </InputLabel>
        </Grid>
 
        <Grid item xs={12} sx={{ alignItems: "center" }}>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <RadioGroup>
                <FormControlLabel
                  value="time"
                  control={
                    <Radio
                      checked={[
                        "time",
                        "OneTime",
                        "Weekly",
                        "Monthly",
                        "Daily",
                      ].includes(schType)}
                    />
                  }
                  label="Time"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register(name)}
                />
                {showTimeComponent && (
                  <ScheduleTimeWidget
                    showOneTimeComponent={showOneTimeComponent}
                    showDailyComponent={showDailyComponent}
                    showWeeklyComponent={showWeeklyComponent}
                    showMonthlyComponent={showMonthlyComponent}
                    schType={schType}
                    apiEditTime={apiEditTime}
                    defaultValues={defaultValues}
                    startYear={startYear}
                  />
                )}
                <FormControlLabel
                  value="meter"
                  control={<Radio checked={schType === "meter"} />}
                  label="Meter"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register(name)}
                />
                {showMeterComponent && (
                  <ScheduleMeterTextField methods={methods} />
                )}
                <FormControlLabel
                  value="event"
                  control={<Radio checked={schType === "event"} />}
                  label="Event"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  disabled={true}
                  {...register(name)}
                />
                <FormControlLabel
                  value="prescriptive"
                  control={<Radio checked={schType === "prescriptive"} />}
                  label="Prescriptive"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  disabled={true}
                  {...register(name)}
                />
              </RadioGroup>
            )}
          />
        </Grid>
        <Typography
          variant="inherit"
          sx={{ fontSize: "0.9rem", color: "#d32f2f" }}
        >
          {name in errors && `Please Enter  ${label} `}
        </Typography>
      </Grid>
    </div>
  );
};
 
export default ScheduleWidget;
 
const ScheduleMeterTextField = ({ methods }) => {
  return (
    <div style={{ paddingLeft: "2rem" }}>
      <TextInput
        type={"number"}
        label={"Reading Frequency"}
        variant="outlined"
        name={"schReadingFrequency"}
        value={methods.getValues("schReadingFrequency")}
      />
    </div>
  );
};
 