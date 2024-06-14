import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import useFetchApi from "../../hooks/useFetchApi";
import useMutationApi from "../../hooks/useMutationApi";
import {
  GridWidthLargeWidth,
  GridWidthMedium,
  WorkOrderPrefix,
  gridHeight,
  medium,
  small,
} from "../../constants/global";
import { AddEditForm } from "../../common/AddEditForm";
import DeleteDialog from "../../common/DeleteDialog";
import { Box } from "@mui/material";
import {
  CustomToolbar,
  DataGridComponent,
} from "../../common/DataGridComponent";
import AddEditToolBar from "../../common/AddEditToolBar";
import { Progressor } from "../../common/Progressor";
import {
  mapDropdownValueToIdWithLabel,
  mapDropdownValueToLabelWithId,
  mapDropdownValueToLabelWithIdForTree,
} from "../../utils/common";
import { useCommonData } from "../../context/CommonDataProvider";
import { useMenuContext } from "../../context/MenuContextProvider";

export const Materials = () => {
  const commonData = useCommonData();
  const { rightsArray } = useMenuContext();
  const canRead = rightsArray[0]?.urAdmin || rightsArray[0]?.urRead;
  const [id, setId] = useState(0);
  const [editDefValues, setEditDefValues] = useState();
  const [showMaterialsForm, setShowMaterialsForm] = useState(false);
  const [rows, setRows] = useState([]);
  const [showMaterialsEditForm, setShowMaterialsEditForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState();
  const plant_Id = commonData?.userData?.lastLoginPlantID;
  const handleRowClick = (params) => {
    setId(params.row.id);
    setEditData(params.row);
  };
  const {
    mutateAsync: addMaterials,
    isSuccess: isMaterialsSuccess,
    isLoading: isPostLoading,
  } = useMutationApi({
    endpoint: `${WorkOrderPrefix}/materials/addMaterial`,
    method: "post",
    Menu_id: rightsArray[0]?.urMenuIdFk,
  });
  const {
    mutateAsync: updateMaterials,
    isSuccess: isUpdateSuccess,
    isLoading: isUpdateLoading,
  } = useMutationApi({
    endpoint: `${WorkOrderPrefix}/materials/addMaterial`,
    method: "post",
    Menu_id: rightsArray[0]?.urMenuIdFk,
  });
  const { mutateAsync: deleteMaterials, isSuccess: isDeleteSuccess } =
    useMutationApi({
      endpoint: `${WorkOrderPrefix}/materials?mtrlId=${id}`,
      method: "delete",
      Menu_id: rightsArray[0]?.urMenuIdFk,
    });

  const {
    data: getMaterialsData,
    isFetchedAfterMount: isFetch,
    isFetching: isMaterialsFetching,
    refetch,
  } = useFetchApi({
    endpoint: `${WorkOrderPrefix}/materials`,
    retrieveOnMount: rightsArray[0]?.urMenuIdFk ? true : false,
    Menu_id: rightsArray[0]?.urMenuIdFk,
  });

  useEffect(() => {
    if (isMaterialsSuccess || isUpdateSuccess || isDeleteSuccess) {
      refetch();
    }
  }, [isMaterialsSuccess, isUpdateSuccess, isDeleteSuccess, refetch]);

  const [getMainMaterialsData, setGetMainMaterialsData] =
    useState(getMaterialsData);

  useEffect(() => {
    if (getMaterialsData) {
      const MaterialsData = getMaterialsData.map((item) => {
        const newMaterialGroup = mapDropdownValueToLabelWithId(
          commonData.getMaterialGroupDataList,
          item.mtrlGroup
        );
        const newMaterialType = mapDropdownValueToLabelWithId(
          commonData.getMaterialTypeData,
          item.mtrlType
        );
        const newUnitId = mapDropdownValueToLabelWithId(
          commonData.getUomDataList,
          item.unitOfMeasurementId
        );
        const newUnitSize1 = mapDropdownValueToLabelWithId(
          commonData.getUomDataList,
          item.unitOfMeasurementSize1Id
        );
        const newUnitSize2 = mapDropdownValueToLabelWithId(
          commonData.getUomDataList,
          item.unitOfMeasurementSize2Id
        );
        const newUnitSize3 = mapDropdownValueToLabelWithId(
          commonData.getUomDataList,
          item.unitOfMeasurementSize3Id
        );
        const newUnitSize4 = mapDropdownValueToLabelWithId(
          commonData.getUomDataList,
          item.unitOfMeasurementSize4Id
        );
        const newUnitVolumeId = mapDropdownValueToLabelWithId(
          commonData.getUomDataList,
          item.unitOfMeasurementVolumeId
        );
        const newUnitWeightId = mapDropdownValueToLabelWithId(
          commonData.getUomDataList,
          item.unitOfMeasurementWeightId
        );
        const newCurrency = mapDropdownValueToLabelWithId(
          commonData.getCurrencyData,
          item.currencyId
        );
        return {
          ...item,
          mtrlType: newMaterialType,
          unitOfMeasurementId: newUnitId,
          unitOfMeasurementSize1Id: newUnitSize1,
          unitOfMeasurementSize2Id: newUnitSize2,
          unitOfMeasurementSize3Id: newUnitSize3,
          unitOfMeasurementSize4Id: newUnitSize4,
          unitOfMeasurementVolumeId: newUnitVolumeId,
          unitOfMeasurementWeightId: newUnitWeightId,
          mtrlGroup: newMaterialGroup,
          currencyId: newCurrency,
        };
      });
      setGetMainMaterialsData(MaterialsData);
    }
  }, [getMaterialsData, commonData]);

  useEffect(() => {
    if (isFetch && getMainMaterialsData && canRead) {
      setRows(() =>
        getMainMaterialsData?.map((w) => {
          return { id: w.mtrlId, ...w };
        })
      );
    }
  }, [isFetch, getMainMaterialsData, rightsArray, canRead]);

  const handleMaterialsEditClick = () => {
    setShowMaterialsEditForm(true);
    setId(editData.id);

    const newMaterialGroup = mapDropdownValueToLabelWithIdForTree(
      commonData.getMaterialGroupDataList,
      editData.mtrlGroup
    );
    const newMaterialType = mapDropdownValueToIdWithLabel(
      commonData.getMaterialTypeData,
      editData.mtrlType
    );
    const newUnitId = mapDropdownValueToIdWithLabel(
      commonData.getUomDataList,
      editData.unitOfMeasurementId
    );
    const newUnitSize1 = mapDropdownValueToIdWithLabel(
      commonData.getUomDataList,
      editData.unitOfMeasurementSize1Id
    );
    const newUnitSize2 = mapDropdownValueToIdWithLabel(
      commonData.getUomDataList,
      editData.unitOfMeasurementSize2Id
    );
    const newUnitSize3 = mapDropdownValueToIdWithLabel(
      commonData.getUomDataList,
      editData.unitOfMeasurementSize3Id
    );
    const newUnitSize4 = mapDropdownValueToIdWithLabel(
      commonData.getUomDataList,
      editData.unitOfMeasurementSize4Id
    );
    const newUnitVolumeId = mapDropdownValueToIdWithLabel(
      commonData.getUomDataList,
      editData.unitOfMeasurementVolumeId
    );
    const newUnitWeightId = mapDropdownValueToIdWithLabel(
      commonData.getUomDataList,
      editData.unitOfMeasurementWeightId
    );
    const newCurrency = mapDropdownValueToIdWithLabel(
      commonData.getCurrencyData,
      editData.currencyId
    );
    setEditDefValues({
      ...editData,
      mtrlType: newMaterialType,
      unitOfMeasurementId: newUnitId,
      unitOfMeasurementSize1Id: newUnitSize1,
      unitOfMeasurementSize2Id: newUnitSize2,
      unitOfMeasurementSize3Id: newUnitSize3,
      unitOfMeasurementSize4Id: newUnitSize4,
      unitOfMeasurementVolumeId: newUnitVolumeId,
      unitOfMeasurementWeightId: newUnitWeightId,
      mtrlGroup: newMaterialGroup,
      currencyId: newCurrency,
    });
  };

  const saveUpdateData = async (MaterialsDataToSave) => {
    await updateMaterials({
      id: MaterialsDataToSave.mtrlId,
      ...MaterialsDataToSave,
      mtrlType: MaterialsDataToSave?.mtrlType?.id,
      unitOfMeasurementId: MaterialsDataToSave?.unitOfMeasurementId?.id,
      unitOfMeasurementSize1Id:
        MaterialsDataToSave?.unitOfMeasurementSize1Id?.id,
      unitOfMeasurementSize2Id:
        MaterialsDataToSave?.unitOfMeasurementSize2Id?.id,
      unitOfMeasurementSize3Id:
        MaterialsDataToSave?.unitOfMeasurementSize3Id?.id,
      unitOfMeasurementSize4Id:
        MaterialsDataToSave?.unitOfMeasurementSize4Id?.id,
      unitOfMeasurementVolumeId:
        MaterialsDataToSave?.unitOfMeasurementVolumeId?.id,
      unitOfMeasurementWeightId:
        MaterialsDataToSave?.unitOfMeasurementWeightId?.id,
      currencyId: MaterialsDataToSave?.currencyId?.id,
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Materials updated successfully");
          setShowMaterialsEditForm(false);
          setId();
          commonData.refetchMaterial();
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error(error);
        }
      });
  };

  const submitMaterialsData = async (newMaterialsData) => {
    await addMaterials({
      plantId: plant_Id,
      ...newMaterialsData,
      mtrlType: newMaterialsData?.mtrlType?.id,
      unitOfMeasurementId: newMaterialsData?.unitOfMeasurementId?.id,
      unitOfMeasurementSize1Id: newMaterialsData?.unitOfMeasurementSize1Id?.id,
      unitOfMeasurementSize2Id: newMaterialsData?.unitOfMeasurementSize2Id?.id,
      unitOfMeasurementSize3Id: newMaterialsData?.unitOfMeasurementSize3Id?.id,
      unitOfMeasurementSize4Id: newMaterialsData?.unitOfMeasurementSize4Id?.id,
      unitOfMeasurementVolumeId:
        newMaterialsData?.unitOfMeasurementVolumeId?.id,
      unitOfMeasurementWeightId:
        newMaterialsData?.unitOfMeasurementWeightId?.id,
      currencyId: newMaterialsData?.currencyId?.id,
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Materials Added successfully");
          setShowMaterialsEditForm(!showMaterialsEditForm);
          setShowMaterialsForm(false);
          commonData.refetchMaterial();
        }
      })
      .catch((error) => {
        if (error?.response?.status === 404) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error(error);
        }
      });
  };

  const handleDeleteClick = async () => {
    await deleteMaterials()
      .then((response) => {
        if (response.status === 200) {
          toast.success("Materials Deleted successfully");
          setOpenDialog(false);
          setId();
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error(error);
        }
      });
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setShowMaterialsEditForm(!showMaterialsEditForm);
    setShowMaterialsForm(false);
  };

  const columns = [
    {
      field: "mtrlCode",
      headerName: "Code",
      required: true,
      type: "text",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "mtrlDesc",
      headerName: "Description",
      required: true,
      type: "text",
      width: GridWidthMedium,
    },
    {
      field: "mtrlPartNo",
      headerName: "Part No",
      required: true,
      type: "text",
      width: GridWidthMedium,
      textFieldWidth: medium,
    },
    {
      field: "mtrlBarCode",
      headerName: "Bar Code",
      type: "text",
      width: GridWidthMedium,
      textFieldWidth: medium,
    },
    {
      field: "mtrlType",
      headerName: "Material Type",
      type: "select",
      apiendpoint: "getMaterialTypeData",
      width: GridWidthMedium,
      textFieldWidth: medium,
    },
    {
      field: "mtrlBaseCost",
      headerName: "Base Cost",
      type: "number",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "mtrlAdders",
      headerName: "Address",
      required: true,
      type: "text",
      width: GridWidthMedium,
      textFieldWidth: medium,
    },
    {
      field: "mtrlTax",
      headerName: "Tax",
      type: "number",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "mtrlFactor",
      headerName: "Factor",
      required: true,
      type: "number",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "mtrlFactorDetails",
      headerName: "Factor Details",
      type: "text",
      multiline: "multiline",
      row: 4,
      width: GridWidthLargeWidth,
    },
    {
      field: "mtrlFinalCost",
      headerName: "Final Cost",
      type: "number",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "unitOfMeasurementId",
      headerName: "Base Unit",
      type: "select",
      required: true,
      apiendpoint: "getUomDataList",
      width: GridWidthMedium,
      textFieldWidth: medium,
    },
    {
      field: "currencyId",
      headerName: "Base Currency",
      type: "select",
      width: GridWidthMedium,
      required: true,
      apiendpoint: "getCurrencyData",
      textFieldWidth: medium,
    },
    {
      field: "mtrlCatalog",
      headerName: "Catalog",
      type: "text",
      width: GridWidthMedium,
      textFieldWidth: medium,
    },
    {
      field: "mtrlGroup",
      headerName: "Group",
      apiendpoint: `${WorkOrderPrefix}/material-group?plantId=${plant_Id}`,
      type: "tree",
      width: GridWidthLargeWidth,
      required: true,
    },
    {
      field: "mtrlWh",
      headerName: "WH",
      type: "text",
      width: GridWidthMedium,
      textFieldWidth: medium,
    },
    {
      field: "mtrlWhType",
      headerName: "WH Type",
      type: "text",
      width: GridWidthMedium,
      textFieldWidth: medium,
    },
    {
      field: "mtrlWhSection",
      headerName: "WH Section",
      type: "text",
      width: GridWidthMedium,
      textFieldWidth: medium,
    },
    {
      field: "mtrlWhBin",
      headerName: "Bin",
      type: "text",
      width: GridWidthMedium,
      textFieldWidth: medium,
    },
    {
      field: "mtrlWeight",
      headerName: "Weight",
      type: "number",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "unitOfMeasurementWeightId",
      headerName: "Weight UOM",
      type: "select",
      apiendpoint: "getUomDataList",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "mtrlVolume",
      headerName: "Volume",
      type: "number",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "unitOfMeasurementVolumeId",
      headerName: "Volume UOM",
      type: "select",
      apiendpoint: "getUomDataList",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "mtrlSize1",
      headerName: "Size 1",
      type: "number",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "unitOfMeasurementSize1Id",
      headerName: "Size 1 UOM",
      type: "select",
      apiendpoint: "getUomDataList",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "mtrlSize2",
      headerName: "Size 2",
      type: "number",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "unitOfMeasurementSize2Id",
      headerName: "Size 2 UOM",
      type: "select",
      apiendpoint: "getUomDataList",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "mtrlSize3",
      headerName: "Size 3",
      type: "number",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "unitOfMeasurementSize3Id",
      headerName: "Size 3 UOM",
      type: "select",
      apiendpoint: "getUomDataList",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "mtrlSize4",
      headerName: "Size 4",
      type: "number",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
    {
      field: "unitOfMeasurementSize4Id",
      headerName: "Size 4 UOM",
      type: "select",
      apiendpoint: "getUomDataList",
      width: GridWidthMedium,
      textFieldWidth: small,
    },
  ];

  const onAdd = () => {
    setShowMaterialsEditForm(true);
    setShowMaterialsForm(true);
    setEditDefValues({});
  };

  return (
    <>
      <ToastContainer />
      <Box>
        <Box sx={{ padding: "1rem" }}>
          {isMaterialsFetching && <Progressor />}

          <Box
            sx={{
              height: `${100 - gridHeight}vh`,
              width: "90vw",
            }}
          >
            <DataGridComponent
              columns={columns}
              rows={rows}
              sortingField={"mtrlCode"}
              components={{
                Toolbar: (props) => (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <CustomToolbar {...props} />
                      <AddEditToolBar
                        onClickAdd={() => onAdd()}
                        onClickEdit={() => handleMaterialsEditClick()}
                        onClickDelete={() => handleClickOpen()}
                        editId={id}
                        urWrite={rightsArray[0]?.urWrite}
                        urModify={rightsArray[0]?.urModify}
                        urDelete={rightsArray[0]?.urDelete}
                      />
                    </div>
                  </>
                ),
              }}
              onRowClick={handleRowClick}
            ></DataGridComponent>
          </Box>
        </Box>
      </Box>
      {showMaterialsEditForm && (
        <AddEditForm
          onClose={handleClose}
          showForm={showMaterialsForm}
          setShowForm={setShowMaterialsForm}
          columns={columns}
          onUpData={saveUpdateData}
          onAdd={submitMaterialsData}
          editId={id}
          isLoading={isUpdateLoading || isPostLoading}
          defaultValues={editDefValues}
          label="Materials"
        />
      )}

      <DeleteDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title={"Are you sure you want to delete Materials? "}
        handleApprove={handleDeleteClick}
      />
    </>
  );
};
export default Materials