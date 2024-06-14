import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { format } from "date-fns";
import { useCommonData } from "../context/CommonDataProvider";
import { Button } from "./Button";
import { DateInput } from "./DateInput";
import { FileUploadInput } from "./FileUploadInput";
import Section from "./Section";
import { TextInput } from "./TextInput";
import { TimeInput } from "./TimeInput";
import { PaperComponent } from "./PaperComponent";
import { FormAutocompleteField } from "./FormAutocompleteField";
import DoneIcon from "@mui/icons-material/Done";
import PhonelinkEraseIcon from "@mui/icons-material/PhonelinkErase";
import "./CommonButton.css";
import { CalendarTimeComponent } from "./CalendarTimeComponent";
import TreeSelectComponent from "./TreeSelectComponent";
import ScheduleWidget from "./ScheduleWidget";
import { TextFieldForNumberInput } from "./TextFieldForNumberInput";
import { TwoColumnAutoCompleteField } from "./TwoColumnAutoCompleteField";
 
export const AddEditForm = (props) => {
  const commonData = useCommonData();
  const [showMeterComponent, setShowMeterComponent] = useState(false);
  const [showTimeComponent, setShowTimeComponent] = useState(false);
 
  const [showOneTimeComponent, setShowOneTimeComponent] = useState(false);
  const [showDailyComponent, setShowDailyComponent] = useState(false);
  const [showWeeklyComponent, setShowWeeklyComponent] = useState(false);
  const [showMonthlyComponent, setShowMonthlyComponent] = useState(false);
  const methods = useForm({
    defaultValues: {
      ...props.defaultValues,
    },
  });
  const apiEditTime = methods.watch("apiTimeKey");
  const serAddCostFactor = methods.watch("serAddCostFactor");
  const serBaseCost = methods.watch("serBaseCost");
 
  const schType = methods.watch("schType");
  const startYear = methods.watch("schStartYear");
  const mtrlGroup = methods.watch("mtrlGroup");
  const wosSerIdFk = methods.watch("wosSerIdFk");
  const womMaterialIdFk = methods.watch("womMaterialIdFk");
 
  const empCostPerUnit = methods.watch("empCostPerUnit");
  const empAdderCost = methods.watch("empAdderCost");
 
  const mtrlBaseCost = methods.watch("mtrlBaseCost");
  const mtrlFactor = methods.watch("mtrlFactor");
 
  const serviceCost = commonData?.getServiceMainDataList
    ?.filter((item) => item?.serId === wosSerIdFk?.id)
    .map((data) => ({ cost: data?.serFinalCost, qty: data?.serQtyFactor }));
 
  const materialCost = commonData?.getMainMaterialDataList
    ?.filter((item) => item?.mtrlId === womMaterialIdFk?.mtrlId)
    .map((data) => data?.mtrlFinalCost);
 
  useEffect(() => {
    props.isService &&
      methods.setValue("serFinalCost", serAddCostFactor * serBaseCost || "");
    props.isWosService &&
      commonData?.getServiceMainDataList &&
      methods.setValue("wosCost", serviceCost[0]?.cost || "");
    props.isWosService &&
      commonData?.getServiceMainDataList &&
      methods.setValue("wosQty", serviceCost[0]?.qty || "");
    props.isEmployee &&
      methods.setValue(
        "empFinalCost",
        parseInt(empCostPerUnit) + parseInt(empAdderCost) || ""
      );
    props.isMaterials &&
      methods.setValue("mtrlFinalCost", mtrlBaseCost * mtrlFactor || "");
    props.workMaterial && methods.setValue("womCost", materialCost || "");
    setShowMeterComponent(schType === "meter");
    setShowTimeComponent(schType === "time");
    setShowOneTimeComponent(apiEditTime === "OneTime");
    setShowDailyComponent(apiEditTime === "Daily");
    setShowWeeklyComponent(apiEditTime === "Weekly");
    setShowMonthlyComponent(apiEditTime === "Monthly");
  }, [
    commonData,
    methods,
    serAddCostFactor,
    serBaseCost,
    schType,
    apiEditTime,
    props.isService,
    serviceCost,
    props.isWosService,
    commonData?.getServiceMainDataList,
    props.isEmployee,
    empCostPerUnit,
    empAdderCost,
    props.isMaterial,
    mtrlBaseCost,
    mtrlFactor,
    props.isMaterials,
    props.workMaterial,
    materialCost,
  ]);
 
  const updateData = () => {
    const values = methods.getValues();
    const valuesWithId = {
      id: props.editId,
      ...values,
    };
 
    props.onUpData(valuesWithId);
  };
 
  const saveData = (data) => {
    const savedData = { ...data };
 
    if (props.label === "Materials" && !props.workMaterial) {
      if (mtrlGroup === undefined) {
        return;
      } else {
        props.onAdd(savedData);
      }
    } else {
      if (data.asstExpiryDate) {
        savedData["asstExpiryDate"] = format(
          new Date(data.asstExpiryDate),
          "yyyy-MM-dd"
        );
      }
      if (data.asstImanufactDate) {
        savedData["asstImanufactDate"] = format(
          new Date(data.asstImanufactDate),
          "yyyy-MM-dd"
        );
      }
      if (data.asstInstalledDate) {
        savedData["asstInstalledDate"] = format(
          new Date(data.asstInstalledDate),
          "yyyy-MM-dd"
        );
      }
      if (data.asstPurchasedDate) {
        savedData["asstPurchasedDate"] = format(
          new Date(data.asstPurchasedDate),
          "yyyy-MM-dd"
        );
      }
      if (data.asstRetiredDate) {
        savedData["asstRetiredDate"] = format(
          new Date(data.asstRetiredDate),
          "yyyy-MM-dd"
        );
      }
 
      props.onAdd(savedData);
    }
  };
  return (
    <>
      {props.columns.length <= 6 || props.schedule ? (
        <Dialog
          open
          onClose={props.onClose}
          fullWidth
          scroll="paper"
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <form
            onSubmit={methods.handleSubmit(
              !props.showForm ? updateData : saveData
            )}
          >
            <FormProvider {...methods}>
              <DialogTitle
                sx={{ backgroundColor: "#1976d2", color: "white" }}
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
                <Grid container justifyContent="space-between">
                  <Grid item>
                    {props.showEdit ? `${props.label}` : `${props.label}`}
                  </Grid>
                  <Grid item>
                    <Button
                      sx={{
                        color: "#1976d2",
                        backgroundColor: "white",
                        marginRight: "4px",
                        padding: "4px 16px",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                      label={<DoneIcon />}
                      disabled={props.isLoading}
                      type="submit"
                    />
                    <Button
                      sx={{
                        color: "#1976d2",
                        backgroundColor: "white",
                        padding: "4px 16px",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                      label={<PhonelinkEraseIcon />}
                      onClick={props.onClose}
                    />
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent
                dividers
                sx={{
                  maxHeight: props.maxHeight ? props.maxHeight : "410px",
                  overflowY: "auto",
                }}
              >
                <DialogContentText>
                  {props.showForm
                    ? `Add  the ${props.label} Information`
                    : `Edit the ${props.label} Information`}{" "}
                  {/* {!props.showForm && props.isUsers && (
                    <Button
                      label={"Change Password"}
                      onClick={handleChangePwd}
                    ></Button>
                  )} */}
                  {/* {openChangePwdForm && (
                    <ChangePasswordForm
                      open={openChangePwdForm}
                      methods={methods}
                      onClose={handleClose}
                    />
                  )} */}
                  {props.columns.map((inputItem) => {
                    return (
                      <React.Fragment key={inputItem.field}>
                        {inputItem.field !== "action" && (
                          <>
                            {inputItem.section && (
                              <Section title={inputItem.section}> </Section>
                            )}
 
                            {inputItem.type === "select" ? (
                              <FormAutocompleteField
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
                                    : commonData[inputItem.apiendpoint]
                                }
                                width={inputItem.textFieldWidth}
                              />
                            ) : inputItem.type === "selectTwo" ? (
                              <TwoColumnAutoCompleteField
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
                                    : commonData[inputItem.apiendpoint]
                                }
                                width={inputItem.textFieldWidth}
                              />
                            ) : inputItem.type === "file" ? (
                              <FileUploadInput
                                required={inputItem.required}
                                label={inputItem.headerName}
                                name={inputItem.field}
                                documentSizeError={props.documentSizeError}
                                handleFileUpload={props.handleFileUpload}
                                selectFile={props.selectFile}
                              />
                            ) : inputItem.type === "Date" ? (
                              <DateInput
                                required={inputItem.required}
                                label={inputItem.headerName}
                                name={inputItem.field}
                                width={inputItem.textFieldWidth}
                                defaultValue={inputItem.value}
                                minDateLabel={inputItem.minDateLabel}
                              />
                            ) : inputItem.type === "time" ? (
                              <TimeInput
                                label={inputItem.headerName}
                                name={inputItem.field}
                                value={
                                  methods.getValues(inputItem.field)
                                    ? methods.getValues(inputItem.field)
                                    : null
                                }
                                required={inputItem.required}
                                width={inputItem.textFieldWidth}
                              />
                            ) : inputItem.type === "calendarTime" ? (
                              <CalendarTimeComponent
                                label={inputItem.headerName}
                                name={inputItem.field}
                                value={
                                  methods.getValues(inputItem.field)
                                    ? methods.getValues(inputItem.field)
                                    : null
                                }
                                required={inputItem.required}
                                width={inputItem.textFieldWidth}
                              />
                            ) : inputItem.type === "tree" ? (
                              <TreeSelectComponent
                                label={inputItem.headerName}
                                name={inputItem.field}
                                value={
                                  methods.getValues(inputItem.field)
                                    ? methods.getValues(inputItem.field)
                                    : null
                                }
                                endpoint={inputItem.apiendpoint}
                                required={inputItem.required}
                                width={inputItem.textFieldWidth}
                              />
                            ) : inputItem.type === "radio" ? (
                              <ScheduleWidget
                                label={inputItem.headerName}
                                name={inputItem.field}
                                value={
                                  methods.getValues(inputItem.field)
                                    ? methods.getValues(inputItem.field)
                                    : null
                                }
                                showMeterComponent={showMeterComponent}
                                showTimeComponent={showTimeComponent}
                                showOneTimeComponent={showOneTimeComponent}
                                showDailyComponent={showDailyComponent}
                                showWeeklyComponent={showWeeklyComponent}
                                showMonthlyComponent={showMonthlyComponent}
                                required={inputItem.required}
                                width={inputItem.textFieldWidth}
                                schType={schType}
                                apiEditTime={apiEditTime}
                                defaultValues={props.defaultValues}
                                startYear={startYear}
                              />
                            ) : (inputItem.type === "text") |
                              (inputItem.type === "email") |
                              (inputItem.type === "float") |
                              (inputItem.type === "tel") |
                              (inputItem.type === "password") ? (
                              <TextInput
                                type={inputItem.type}
                                required={inputItem.required}
                                label={inputItem.headerName}
                                disable={inputItem.disable}
                                maxLength={inputItem.maxLength}
                                value={
                                  methods.getValues(inputItem.field)
                                    ? methods.getValues(inputItem.field)
                                    : null
                                }
                                multiline={inputItem.multiline}
                                variant="outlined"
                                name={inputItem.field}
                                rows={inputItem.row}
                                size={inputItem.size}
                                width={inputItem.textFieldWidth}
                                defaultValue={inputItem.value}
                                validate={inputItem.validate}
                                errorMessage={inputItem.errorMessage}
                              />
                            ) : inputItem.type === "number" ? (
                              <TextFieldForNumberInput
                                type={inputItem.type}
                                required={inputItem.required}
                                label={inputItem.headerName}
                                disable={inputItem.disable}
                                maxLength={inputItem.maxLength}
                                value={
                                  methods.getValues(inputItem.field)
                                    ? methods.getValues(inputItem.field)
                                    : null
                                }
                                multiline={inputItem.multiline}
                                variant="outlined"
                                name={inputItem.field}
                                rows={inputItem.row}
                                size={inputItem.size}
                                width={inputItem.textFieldWidth}
                                defaultValue={inputItem.value}
                                pattern={inputItem.pattern}
                                errorMessage={inputItem.errorMessage}
                                onlyPositive={inputItem.onlyPositive}
                              />
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </React.Fragment>
                    );
                  })}
                </DialogContentText>
              </DialogContent>
            </FormProvider>
          </form>
        </Dialog>
      ) : (
        <Dialog
          open
          onClose={props.onClose}
          fullWidth
          scroll="paper"
          PaperComponent={PaperComponent}
          maxWidth={false}
          sx={{
            "& .MuiDialog-container": {
              position: "absolute",
              top: "20px",
              left: "15px",
            },
          }}
          PaperProps={{
            sx: {
              height: "100vh",
              overflowY: "hidden",
            },
          }}
        >
          <form
            onSubmit={methods.handleSubmit(
              !props.showForm ? updateData : saveData
            )}
          >
            <FormProvider {...methods}>
              <DialogTitle
                sx={{ backgroundColor: "#1976d2", color: "white" }}
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
                <Grid container justifyContent="space-between">
                  <Grid item>
                    {props.showEdit ? `${props.label}` : `${props.label}`}
                  </Grid>
                  <Grid item>
                    <Button
                      sx={{
                        color: "#1976d2",
                        backgroundColor: "white",
                        marginRight: "4px",
                        padding: "4px 16px",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                      disabled={props.isLoading}
                      label={<DoneIcon />}
                      type="submit"
                    />
                    <Button
                      sx={{
                        color: "#1976d2",
                        backgroundColor: "white",
                        padding: "4px 16px",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                      label={<PhonelinkEraseIcon />}
                      onClick={props.onClose}
                    />
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent
                dividers
                sx={{
                  minHeight: "75.5vh",
                  maxHeight: "75.5vh",
                  overflowY: "auto",
                  border: "none",
                }}
              >
                <DialogContentText>
                  {props.showForm
                    ? `Add  the ${props.label} Information`
                    : `Edit the ${props.label} Information`}{" "}
                  {/* {!props.showForm && props.isUsers && (
                    <Button
                      label={"Change Password"}
                      onClick={handleChangePwd}
                    ></Button>
                  )} */}
                  {/* {openChangePwdForm && (
                    <ChangePasswordForm
                      open={openChangePwdForm}
                      methods={methods}
                      onClose={handleClose}
                    />
                  )} */}
                  <Grid container columnSpacing={2}>
                    {props.columns.map((inputItem) => {
                      return (
                        <Grid item xs={6} key={inputItem.field}>
                          <React.Fragment key={inputItem.field}>
                            {inputItem.field !== "action" && (
                              <>
                                {inputItem.section && (
                                  <Section title={inputItem.section}> </Section>
                                )}
 
                                {inputItem.type === "select" ? (
                                  <FormAutocompleteField
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
                                        : commonData[inputItem.apiendpoint]
                                    }
                                    width={inputItem.textFieldWidth}
                                  />
                                ) : inputItem.type === "selectTwo" ? (
                                  <TwoColumnAutoCompleteField
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
                                        : commonData[inputItem.apiendpoint]
                                    }
                                    width={inputItem.textFieldWidth}
                                  />
                                ) : inputItem.type === "file" ? (
                                  <FileUploadInput
                                    required={inputItem.required}
                                    label={inputItem.headerName}
                                    name={inputItem.field}
                                    documentSizeError={props.documentSizeError}
                                    handleFileUpload={props.handleFileUpload}
                                    selectFile={props.selectFile}
                                  />
                                ) : inputItem.type === "Date" ? (
                                  <DateInput
                                    required={inputItem.required}
                                    label={inputItem.headerName}
                                    name={inputItem.field}
                                    width={inputItem.textFieldWidth}
                                    defaultValue={inputItem.value}
                                    minDateLabel={inputItem.minDateLabel}
                                  />
                                ) : inputItem.type === "time" ? (
                                  <TimeInput
                                    label={inputItem.headerName}
                                    name={inputItem.field}
                                    value={
                                      methods.getValues(inputItem.field)
                                        ? methods.getValues(inputItem.field)
                                        : null
                                    }
                                    required={inputItem.required}
                                    width={inputItem.textFieldWidth}
                                  />
                                ) : inputItem.type === "calendarTime" ? (
                                  <CalendarTimeComponent
                                    label={inputItem.headerName}
                                    name={inputItem.field}
                                    value={
                                      methods.getValues(inputItem.field)
                                        ? methods.getValues(inputItem.field)
                                        : null
                                    }
                                    required={inputItem.required}
                                    width={inputItem.textFieldWidth}
                                  />
                                ) : inputItem.type === "tree" ? (
                                  <TreeSelectComponent
                                    label={inputItem.headerName}
                                    name={inputItem.field}
                                    value={
                                      methods.getValues(inputItem.field)
                                        ? methods.getValues(inputItem.field)
                                        : null
                                    }
                                    endpoint={inputItem.apiendpoint}
                                    required={inputItem.required}
                                    width={inputItem.textFieldWidth}
                                  />
                                ) : inputItem.type === "radio" ? (
                                  <ScheduleWidget
                                    label={inputItem.headerName}
                                    name={inputItem.field}
                                    value={
                                      methods.getValues(inputItem.field)
                                        ? methods.getValues(inputItem.field)
                                        : null
                                    }
                                    showMeterComponent={showMeterComponent}
                                    showTimeComponent={showTimeComponent}
                                    showOneTimeComponent={showOneTimeComponent}
                                    showDailyComponent={showDailyComponent}
                                    showWeeklyComponent={showWeeklyComponent}
                                    showMonthlyComponent={showMonthlyComponent}
                                    required={inputItem.required}
                                    width={inputItem.textFieldWidth}
                                    schType={schType}
                                    apiEditTime={apiEditTime}
                                    defaultValues={props.defaultValues}
                                    startYear={startYear}
                                  />
                                ) : (inputItem.type === "text") |
                                  (inputItem.type === "email") |
                                  (inputItem.type === "float") |
                                  (inputItem.type === "tel") |
                                  (inputItem.type === "password") ? (
                                  <TextInput
                                    type={inputItem.type}
                                    required={inputItem.required}
                                    label={inputItem.headerName}
                                    disable={inputItem.disable}
                                    maxLength={inputItem.maxLength}
                                    value={
                                      methods.getValues(inputItem.field)
                                        ? methods.getValues(inputItem.field)
                                        : null
                                    }
                                    multiline={inputItem.multiline}
                                    variant="outlined"
                                    name={inputItem.field}
                                    rows={inputItem.row}
                                    size={inputItem.size}
                                    width={inputItem.textFieldWidth}
                                    defaultValue={inputItem.value}
                                    pattern={inputItem.pattern}
                                    errorMessage={inputItem.errorMessage}
                                  />
                                ) : inputItem.type === "number" ? (
                                  <TextFieldForNumberInput
                                    type={inputItem.type}
                                    required={inputItem.required}
                                    label={inputItem.headerName}
                                    disable={inputItem.disable}
                                    maxLength={inputItem.maxLength}
                                    value={
                                      methods.getValues(inputItem.field)
                                        ? methods.getValues(inputItem.field)
                                        : null
                                    }
                                    multiline={inputItem.multiline}
                                    variant="outlined"
                                    name={inputItem.field}
                                    rows={inputItem.row}
                                    size={inputItem.size}
                                    width={inputItem.textFieldWidth}
                                    defaultValue={inputItem.value}
                                    pattern={inputItem.pattern}
                                    errorMessage={inputItem.errorMessage}
                                    onlyPositive={inputItem.onlyPositive}
                                  />
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                          </React.Fragment>
                        </Grid>
                      );
                    })}
                  </Grid>
                </DialogContentText>
              </DialogContent>
            </FormProvider>
          </form>
        </Dialog>
      )}
    </>
  );
};