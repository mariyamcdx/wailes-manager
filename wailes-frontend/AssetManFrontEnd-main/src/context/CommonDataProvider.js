import { createContext, useContext, useMemo } from "react";
import useFetchApi from "../hooks/useFetchApi";
import { useAuthContext } from "./AuthContextProvider";
import {
  AssetPrefix,
  GeneralPrefix,
  ListGroupPrefix,
  WorkOrderPrefix,
} from "../constants/global";

const CommonDataContext = createContext();

export const CommonDataProvider = ({ children }) => {
  const { userData } = useAuthContext();
  const lastLoginPlantId = userData?.lastLoginPlantID;

  const { data: workOrderType } = useFetchApi({
    endpoint: `${ListGroupPrefix}/work-order-type`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: workOrderStatus } = useFetchApi({
    endpoint: `${ListGroupPrefix}/work-order-status`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: workOrderSubStatus } = useFetchApi({
    endpoint: `${ListGroupPrefix}/work-order-sub-status`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: workOrderAccount } = useFetchApi({
    endpoint: `${ListGroupPrefix}/work-order-account`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: workType } = useFetchApi({
    endpoint: `${ListGroupPrefix}/work-type`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: workOrderPriority } = useFetchApi({
    endpoint: `${ListGroupPrefix}/work-order-priority`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: workOrderAssetCriticality } = useFetchApi({
    endpoint: `${ListGroupPrefix}/work-order-asst-criticality`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: workOrderAssetCriticalityImpact } = useFetchApi({
    endpoint: `${ListGroupPrefix}/work-order-criticality-impact`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: AssetMeterType } = useFetchApi({
    endpoint: `${ListGroupPrefix}/asset-meter-type`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: assetMode } = useFetchApi({
    endpoint: `${ListGroupPrefix}/assets-mode`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: assetType } = useFetchApi({
    endpoint: `${ListGroupPrefix}/assets-type`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: assetStatus } = useFetchApi({
    endpoint: `${ListGroupPrefix}/assets-status`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: company } = useFetchApi({
    endpoint: `${ListGroupPrefix}/company`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: department } = useFetchApi({
    endpoint: `${ListGroupPrefix}/department`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: plantCompUnit } = useFetchApi({
    endpoint: `${ListGroupPrefix}/plant-comp-unit`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: plantControlling } = useFetchApi({
    endpoint: `${ListGroupPrefix}/controling`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: assetsBuilding } = useFetchApi({
    endpoint: `${ListGroupPrefix}/assets-Building`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: assetsZone } = useFetchApi({
    endpoint: `${ListGroupPrefix}/assets-zone`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: assetsClass } = useFetchApi({
    endpoint: `${ListGroupPrefix}/asset_class`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: asst_warrenty_type } = useFetchApi({
    endpoint: `${ListGroupPrefix}/warranty-type`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: workLockLocation } = useFetchApi({
    endpoint: `${ListGroupPrefix}/work-loc-location`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: employeDetails, refetch: refetchEmp } = useFetchApi({
    endpoint: `${WorkOrderPrefix}/emp?plantId=${lastLoginPlantId}`,
    retrieveOnMount: lastLoginPlantId !== null,
    Menu_id: 16,
  });
  const { data: resourceStatus } = useFetchApi({
    endpoint: `${ListGroupPrefix}/resource_status`,
    retrieveOnMount: true,
    Menu_id: 16,
  });

  const { data: getAssetDataList, refetch: refetchAssets } = useFetchApi({
    endpoint: `${AssetPrefix}?plantId=${lastLoginPlantId}`,
    retrieveOnMount: lastLoginPlantId !== null,
    Menu_id: 3,
  });

  const { data: getUomDataList, refetch: refetchUom } = useFetchApi({
    endpoint: `${GeneralPrefix}/uom`,
    retrieveOnMount: true,
    Menu_id: 23,
  });

  const { data: getAssetCategory, refetch: refetchAsctCat } = useFetchApi({
    endpoint: `${AssetPrefix}/asset-category?plantId=${lastLoginPlantId}`,
    retrieveOnMount: lastLoginPlantId !== null,
    Menu_id: 19,
  });

  const { data: getAssetManufacture, refetch: refetchManuFacture } =
    useFetchApi({
      endpoint: `${AssetPrefix}/asset-manufacture`,
      retrieveOnMount: true,
      Menu_id: 22,
    });

  const { data: getSupplierList, refetch: refetchSupplier } = useFetchApi({
    endpoint: `${GeneralPrefix}/businesspartner?plantId=${lastLoginPlantId}`,
    retrieveOnMount: lastLoginPlantId !== null,
    Menu_id: 9,
  });

  const { data: getAssetGroupList, refetch: refetchAssGroup } = useFetchApi({
    endpoint: `${AssetPrefix}/asset-group?plantId=${lastLoginPlantId}`,
    retrieveOnMount: lastLoginPlantId !== null,
    Menu_id: 20,
  });
  const { data: getCbsDataList, refetch: refetchCbs } = useFetchApi({
    endpoint: `${WorkOrderPrefix}/cbs`,
    retrieveOnMount: true,
    Menu_id: 28,
  });
  const { data: getProjectList, refetch: refetchProject } = useFetchApi({
    endpoint: `${WorkOrderPrefix}/project/plant/${lastLoginPlantId}`,
    retrieveOnMount: lastLoginPlantId !== null ? true : false,
    Menu_id: 33,
  });
  const { data: getIncidentOptions } = useFetchApi({
    endpoint: `${WorkOrderPrefix}/incident-item`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: getMaterialDataList, refetch: refetchMaterial } = useFetchApi({
    endpoint: `${WorkOrderPrefix}/materials?plantId=${lastLoginPlantId}`,
    retrieveOnMount: lastLoginPlantId !== null,
    Menu_id: 7,
  });
  const { data: getServiceDataList, refetch: refetchService } = useFetchApi({
    endpoint: `${AssetPrefix}/service`,
    retrieveOnMount: true,
    Menu_id: 8,
  });
  const { data: getTestingData } = useFetchApi({
    endpoint: `${AssetPrefix}/tests`,
    retrieveOnMount: true,
    Menu_id: 16,
  });
  const { data: getCheckListGroupData, refetch: refetchCheckListGroup } =
    useFetchApi({
      endpoint: `${WorkOrderPrefix}/CheckListGroup`,
      retrieveOnMount: true,
      Menu_id: 25,
    });
  const { data: getMaterialTypeData, refetch: refetchMaterialType } =
    useFetchApi({
      endpoint: `${WorkOrderPrefix}/material-type?plantId=${lastLoginPlantId}`,
      retrieveOnMount: lastLoginPlantId !== null ? true : false,
      Menu_id: 17,
    });
  const { data: getCalendarSystemData, refetch: refetchCalsSystem } =
    useFetchApi({
      endpoint: `${WorkOrderPrefix}/calendar-system/plant`,
      retrieveOnMount: true,
      Menu_id: 21,
    });
  const { data: getCurrencyData, refetch: refetchCurrency } = useFetchApi({
    endpoint: `${WorkOrderPrefix}/currency`,
    retrieveOnMount: true,
    Menu_id: 24,
  });
  const { data: getMaterialGroupDataList, refetch: refetchMaterialGroup } =
    useFetchApi({
      endpoint: `${WorkOrderPrefix}/material-group?plantId=${lastLoginPlantId}`,
      retrieveOnMount: lastLoginPlantId !== null ? true : false,
      Menu_id: 18,
    });
  const { data: getUserGroupData, refetch: refetchUserGroup } = useFetchApi({
    endpoint: `${ListGroupPrefix}/user-groups`,
    retrieveOnMount: true,
    Menu_id: 29,
  });
  const value = useMemo(
    () => ({
      company,
      department,
      workOrderType,
      workOrderStatus,
      workOrderSubStatus,
      workOrderAccount,
      workType,
      workOrderPriority,
      workOrderAssetCriticality,
      workOrderAssetCriticalityImpact,
      assetsBuilding,
      assetsZone,
      workLockLocation,
      assetMode,
      assetStatus,
      assetType,
      AssetMeterType,
      asst_warrenty_type,
      employeDetails: Array.isArray(employeDetails)
        ? employeDetails?.map((e) => ({
            label: e.empName,
            id: e.empId,
          }))
        : [],
      getAssetDataList: Array.isArray(getAssetDataList)
        ? getAssetDataList?.map((e) => ({
            label: e.asstTag,
            id: e.asstId,
          }))
        : [],
      getAssetCategory: Array.isArray(getAssetCategory)
        ? getAssetCategory?.map((e) => ({
            label: e.asctDesc,
            id: e.asctCatId,
          }))
        : [],
      getAssetGroupList: Array.isArray(getAssetGroupList)
        ? getAssetGroupList?.map((e) => ({
            label: e.asgpDesc,
            id: e.asgpId,
          }))
        : [],
      getAssetManufacture: Array.isArray(getAssetManufacture)
        ? getAssetManufacture?.map((e) => ({
            label: e.manuDesc,
            id: e.manuId,
          }))
        : [],
      getSupplierList: Array.isArray(getSupplierList)
        ? getSupplierList?.map((e) => ({
            label: e.busCompany,
            id: e.busId,
          }))
        : [],
      getUomDataList: Array.isArray(getUomDataList)
        ? getUomDataList?.map((e) => ({
            label: e.uomDescription,
            id: e.uomId,
          }))
        : [],
      getCbsDataList: Array.isArray(getCbsDataList)
        ? getCbsDataList?.map((e) => ({
            label: e.cbsNode,
            id: e.cbsId,
          }))
        : [],
      getProjectList: Array.isArray(getProjectList)
        ? getProjectList?.map((e) => ({
            label: e.prjDesc,
            id: e.prjId,
          }))
        : [],
      getIncidentOptions: Array.isArray(getIncidentOptions)
        ? getIncidentOptions?.map((e) => ({
            label: e.incIncident,
            id: e.incItemId,
          }))
        : [],
      getMaterialDataList: Array.isArray(getMaterialDataList)
        ? getMaterialDataList?.map((e) => ({
            label: e.mtrlCode,
            id: e.mtrlId,
          }))
        : [],
      getServiceDataList: Array.isArray(getServiceDataList)
        ? getServiceDataList?.map((e) => ({
            label: e.serDesc,
            id: e.serId,
          }))
        : [],
      getTestingData: Array.isArray(getTestingData)
        ? getTestingData?.map((e) => ({
            label: e.testTestDescription,
            id: e.testId,
          }))
        : [],
      getCheckListGroupData: Array.isArray(getCheckListGroupData)
        ? getCheckListGroupData?.map((e) => ({
            label: e.checkListGroupDesc,
            id: e.checkListGroupId,
          }))
        : [],
      getMaterialTypeData: Array.isArray(getMaterialTypeData)
        ? getMaterialTypeData?.map((e) => ({
            label: e.mtrltDescription,
            id: e.mtrltId,
          }))
        : [],
      getCalendarSystemData: Array.isArray(getCalendarSystemData)
        ? getCalendarSystemData?.map((e) => ({
            label: e.calsDesc,
            id: e.calsId,
          }))
        : [],
      getCurrencyData: Array.isArray(getCurrencyData)
        ? getCurrencyData?.map((e) => ({
            label: e.curDescription,
            id: e.curId,
          }))
        : [],
      getMaterialGroupDataList: Array.isArray(getMaterialGroupDataList)
        ? getMaterialGroupDataList?.map((e) => ({
            label: e.mtrlgDescription,
            id: e.mtrlgId,
          }))
        : [],
      getUserGroupData: Array.isArray(getUserGroupData)
        ? getUserGroupData?.map((e) => ({
            label: e.ugGroup,
            id: e.ugId,
          }))
        : [],
      plantControlling,
      plantCompUnit,
      userData,
      assetsClass,
      resourceStatus,
      refetchUom,
      refetchAsctCat,
      refetchAssGroup,
      refetchManuFacture,
      refetchSupplier,
      refetchProject,
      refetchCurrency,
      refetchCheckListGroup,
      refetchCbs,
      refetchEmp,
      refetchMaterialGroup,
      refetchMaterialType,
      refetchMaterial,
      refetchService,
      refetchCalsSystem,
      refetchUserGroup,
      refetchAssets,
    }),

    [
      workOrderType,
      workOrderStatus,
      workOrderAccount,
      workOrderSubStatus,
      workType,
      workOrderPriority,
      workOrderAssetCriticality,
      workOrderAssetCriticalityImpact,
      assetsBuilding,
      assetsZone,
      workLockLocation,
      assetMode,
      assetStatus,
      assetType,
      AssetMeterType,
      asst_warrenty_type,
      employeDetails,
      getAssetDataList,
      plantControlling,
      plantCompUnit,
      company,
      department,
      userData,
      assetsClass,
      resourceStatus,
      getSupplierList,
      getAssetManufacture,
      getAssetGroupList,
      getAssetCategory,
      getUomDataList,
      getCbsDataList,
      getProjectList,
      getIncidentOptions,
      getMaterialDataList,
      getServiceDataList,
      getTestingData,
      getCheckListGroupData,
      getMaterialTypeData,
      getCalendarSystemData,
      getCurrencyData,
      getMaterialGroupDataList,
      getUserGroupData,
      refetchUom,
      refetchAsctCat,
      refetchAssGroup,
      refetchManuFacture,
      refetchSupplier,
      refetchProject,
      refetchCurrency,
      refetchCheckListGroup,
      refetchCbs,
      refetchEmp,
      refetchMaterialGroup,
      refetchMaterialType,
      refetchMaterial,
      refetchService,
      refetchCalsSystem,
      refetchUserGroup,
      refetchAssets,
    ]
  );

  return (
    <CommonDataContext.Provider value={value}>
      {children}
    </CommonDataContext.Provider>
  );
};

export const useCommonData = () => {
  const context = useContext(CommonDataContext);
  if (context === undefined) {
    throw new Error("useCommonData must be used within a CommonDataProvider");
  }
  return context;
};
