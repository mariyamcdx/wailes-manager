const mainHeaderHeight = 5;
const subHeaderHeight = 8;

const menuTitleHeight = 4.5;
export const gridHeight = 25;

export { mainHeaderHeight, subHeaderHeight, menuTitleHeight };

export const small = "40%";
export const medium = "50%";
export const dateWidth = "40%";

export const defaultDateFormate = "DD-MM-YYYY";

export const deviceTypesOptions = [
  { id: 1, label: "Pressure Monitor" },
  { id: 2, label: "Temperature Monitor" },
  { id: 3, label: "Sound sensor" },
];

export const protocolOptions = [
  { id: 1, label: "MQTT" },
  { id: 2, label: "HTTP" },
];

export const workOrderStatusOptions = [
  { id: 1, label: "Pass" },
  { id: 2, label: "Fail" },
];

export const applicationOption = [{ id: 1, value: "Asset Management" }];
export const uomParentOptions = [
  { id: 1, label: "mtr" },
  { id: 2, label: "km" },
  { id: 3, label: "day" },
  { id: 4, label: "ltr" },
];
export const baseCurrencyOptions = [
  { id: false, label: "false", value: "false" },
  { id: true, label: "true", value: "true" },
];
export const foreignCurrencyOptions = [{ id: 1, label: "USD" }];
export const ticketRequestStatus = [
  { id: 1, label: "OPEN" },
  { id: 2, label: "PROCESSING" },
  { id: 3, label: "CLOSED" },
];

export const userStatusOptions = [
  { id: 1, label: "Active" },
  { id: 2, label: "InActive" },
];

export const GridWidthSmall = 50;
export const GridWidthMedium = 100;
export const GridWidthLargeWidth = 150;
export const GridWidthExtraLargeWidth = 200;

export const ListGroupPrefix = "listgroup";
export const PlantPrefix = "plants";
export const AssetPrefix = "assets";
export const WorkOrderPrefix = "workorder";
export const GeneralPrefix = "general";
export const PreventivePrefix = "pm";
