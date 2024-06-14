import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { TextInput } from "./TextInput";
import { DateInput } from "./DateInput";
 
const ScheduleTimeWidget = ({
  showOneTimeComponent,
  showDailyComponent,
  showWeeklyComponent,
  showMonthlyComponent,
  schType,
  apiEditTime,
  defaultValues,
  startYear,
}) => {
  const methods = useForm();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <Grid container sx={{ margin: "4px" }}>
        <Grid item xs={12} sx={{ alignItems: "center", pl: "1rem" }}>
          <Controller
            control={control}
            name={"apiTimeKey"}
            render={({ field }) => (
              <RadioGroup>
                <FormControlLabel
                  value="OneTime"
                  control={<Radio checked={apiEditTime === "OneTime"} />}
                  label="One Time"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("apiTimeKey")}
                />
                {showOneTimeComponent && (
                  <ScheduleOneTimeTextField methods={methods} />
                )}
                <FormControlLabel
                  value="Daily"
                  control={<Radio checked={apiEditTime === "Daily"} />}
                  label="Daily"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("apiTimeKey")}
                />
                {showDailyComponent && (
                  <ScheduleDailyTextField
                    methods={methods}
                    startYear={startYear}
                  />
                )}
                <FormControlLabel
                  value="Weekly"
                  control={<Radio checked={apiEditTime === "Weekly"} />}
                  label="Weekly"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("apiTimeKey")}
                />
                {showWeeklyComponent && (
                  <ScheduleWeeklyTextField
                    methods={methods}
                    defaultValues={defaultValues}
                  />
                )}
                <FormControlLabel
                  value="Monthly"
                  control={<Radio checked={apiEditTime === "Monthly"} />}
                  label="Monthly"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("apiTimeKey")}
                />
                {showMonthlyComponent && (
                  <ScheduleMonthlyTextField
                    methods={methods}
                    defaultValues={defaultValues}
                  />
                )}
              </RadioGroup>
            )}
          />
        </Grid>
        <Typography
          variant="inherit"
          sx={{ fontSize: "0.9rem", color: "#d32f2f" }}
        >
          {"apiTimeKey" in errors && `Please Enter  ${"apiTimeKey"} `}
        </Typography>
      </Grid>
    </div>
  );
};
 
export default ScheduleTimeWidget;
 
const ScheduleOneTimeTextField = ({ methods }) => {
  return (
    <div style={{ paddingLeft: "2rem" }}>
      <DateInput
        label={"Date"}
        variant="outlined"
        name={"schStartYear"}
        value={methods.getValues("schStartYear")}
        required={true}
      />
    </div>
  );
};
 
const ScheduleDailyTextField = ({ methods, startYear }) => {
  return (
    <div style={{ paddingLeft: "2rem" }}>
      <DateInput
        label={"Start Date"}
        variant="outlined"
        name={"schStartYear"}
        value={methods.getValues("schStartYear")}
        required={true}
      />
      <DateInput
        label={"End Date"}
        variant="outlined"
        name={"schEndYear"}
        minDateLabel={"schStartYear"}
        value={methods.getValues("schEndYear")}
        required={true}
      />
    </div>
  );
};
 
const ScheduleWeeklyTextField = ({ methods, defaultValues }) => {
  const { register, control } = useFormContext();
 
  return (
    <div style={{ paddingLeft: "2rem" }}>
      <DateInput
        label={"Start Date"}
        variant="outlined"
        name={"schStartYear"}
        value={methods.getValues("schStartYear")}
        required={true}
      />
      <DateInput
        label={"End Date"}
        variant="outlined"
        name={"schEndYear"}
        minDateLabel={"schStartYear"}
        value={methods.getValues("schEndYear")}
        required={true}
      />
      <Controller
        control={control}
        name={"Weekly"}
        render={({ field }) => (
          <FormGroup>
            <FormControlLabel
              value={"schSun"}
              control={<Checkbox defaultChecked={defaultValues?.schSun} />}
              label="Sunday"
              onChange={(v) => {
                field.onChange(v);
              }}
              {...register("schSun")}
            />
 
            <FormControlLabel
              value={"schMon"}
              control={<Checkbox defaultChecked={defaultValues?.schMon} />}
              label="Monday"
              onChange={(v) => {
                field.onChange(v);
              }}
              {...register("schMon")}
            />
            <FormControlLabel
              value={"schTue"}
              control={<Checkbox defaultChecked={defaultValues?.schTue} />}
              label="Tuesday"
              onChange={(v) => {
                field.onChange(v);
              }}
              {...register("schTue")}
            />
 
            <FormControlLabel
              value={"schWeb"}
              control={<Checkbox defaultChecked={defaultValues?.schWeb} />}
              label="Wednesday"
              onChange={(v) => {
                field.onChange(v);
              }}
              {...register("schWeb")}
            />
            <FormControlLabel
              value={"schThu"}
              control={<Checkbox defaultChecked={defaultValues?.schThu} />}
              label="Thursday"
              onChange={(v) => {
                field.onChange(v);
              }}
              {...register("schThu")}
            />
            <FormControlLabel
              value={"schFri"}
              control={<Checkbox defaultChecked={defaultValues?.schFri} />}
              label="Friday"
              onChange={(v) => {
                field.onChange(v);
              }}
              {...register("schFri")}
            />
            <FormControlLabel
              value={"schSat"}
              control={<Checkbox defaultChecked={defaultValues?.schSat} />}
              label="Saturday"
              onChange={(v) => {
                field.onChange(v);
              }}
              {...register("schSat")}
            />
          </FormGroup>
        )}
      />
    </div>
  );
};
 
const ScheduleMonthlyTextField = ({ methods, defaultValues }) => {
  const { register, control } = useFormContext();
  return (
    <div style={{ paddingLeft: "2rem" }}>
      <DateInput
        label={"Start Date"}
        variant="outlined"
        name={"schStartYear"}
        value={methods.getValues("schStartYear")}
        required={true}
      />
      <DateInput
        label={"End Date"}
        variant="outlined"
        name={"schEndYear"}
        minDateLabel={"schStartYear"}
        value={methods.getValues("schEndYear")}
        required={true}
      />
      <TextInput
        type={"number"}
        label={"Day of Month"}
        variant="outlined"
        name={"schMonthDay"}
        value={methods.getValues("schMonthDay")}
        required={true}
      />
      <Controller
        control={control}
        name={"Monthly"}
        render={({ field }) => (
          <FormGroup>
            <Grid container sx={{ margin: "4px" }}>
              <Grid item xs={6} sx={{ alignItems: "center", display: "grid" }}>
                <FormControlLabel
                  value={"schJan"}
                  control={<Checkbox defaultChecked={defaultValues?.schJan} />}
                  label="January"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("schJan")}
                />
                <FormControlLabel
                  value={"schFeb"}
                  control={<Checkbox defaultChecked={defaultValues?.schFeb} />}
                  label="February"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("schFeb")}
                />
                <FormControlLabel
                  value={"schMar"}
                  control={<Checkbox defaultChecked={defaultValues?.schMar} />}
                  label="March"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("schMar")}
                />
                <FormControlLabel
                  value={"schApr"}
                  control={<Checkbox defaultChecked={defaultValues?.schApr} />}
                  label="April"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("schApr")}
                />
                <FormControlLabel
                  value={"schMay"}
                  control={<Checkbox defaultChecked={defaultValues?.schMay} />}
                  label="May"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("schMay")}
                />
                <FormControlLabel
                  value={"schJun"}
                  control={<Checkbox defaultChecked={defaultValues?.schJun} />}
                  label="June"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("schJun")}
                />
              </Grid>
              <Grid item xs={6} sx={{ alignItems: "center", display: "grid" }}>
                <FormControlLabel
                  value={"schJul"}
                  control={<Checkbox defaultChecked={defaultValues?.schJul} />}
                  label="July"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("schJul")}
                />
                <FormControlLabel
                  value={"schAug"}
                  control={<Checkbox defaultChecked={defaultValues?.schAug} />}
                  label="August"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("schAug")}
                />
                <FormControlLabel
                  value={"schSep"}
                  control={<Checkbox defaultChecked={defaultValues?.schSep} />}
                  label="September"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("schSep")}
                />{" "}
                <FormControlLabel
                  value={"schOct"}
                  control={<Checkbox defaultChecked={defaultValues?.schOct} />}
                  label="October"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("schOct")}
                />{" "}
                <FormControlLabel
                  value={"schNov"}
                  control={<Checkbox defaultChecked={defaultValues?.schNov} />}
                  label="November"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("schNov")}
                />{" "}
                <FormControlLabel
                  value={"schDec"}
                  control={<Checkbox defaultChecked={defaultValues?.schDec} />}
                  label="December"
                  onChange={(v) => {
                    field.onChange(v);
                  }}
                  {...register("schDec")}
                />
              </Grid>
            </Grid>
          </FormGroup>
        )}
      />
    </div>
  );
};