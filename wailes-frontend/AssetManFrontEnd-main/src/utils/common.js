import dayjs from "dayjs";
import { defaultDateFormate } from "../constants/global";

export const mapDropdownValueToLabelWithListId = (inputArray, findValue) => {
  if (inputArray) {
    const foundObject = inputArray.find(
      (item) => item.listId === parseInt(findValue)
    );
    if (foundObject) {
      return foundObject.label || "";
    }
    return "";
  }
  return "";
};

export const mapDropdownValueToListIdWithLabel = (inputArray, findValue) => {
  if (inputArray) {
    const foundObject = inputArray.find((item) => item.label === findValue);
    if (foundObject) {
      return foundObject || "";
    }
    return "";
  }
  return "";
};

export const mapDropdownValueToLabelWithCode = (inputArray, findValue) => {
  if (inputArray) {
    const foundObject = inputArray.find(
      (item) => item.code === parseInt(findValue)
    );
    if (foundObject) {
      return foundObject.label || "";
    }
    return "";
  }
  return "";
};

export const mapDropdownValueToLabelWithId = (inputArray, findValue) => {
  if (inputArray) {
    const foundObject = inputArray.find((item) => item.id === findValue);
    if (foundObject) {
      return foundObject.label || "";
    }
    return "";
  }
  return "";
};

export const mapDropdownValueToLabelWithIdForTree = (inputArray, findValue) => {
  if (inputArray) {
    const foundObject = inputArray.find((item) => item.label === findValue);
    if (foundObject) {
      return foundObject.id || "";
    }
    return "";
  }
  return "";
};

export const mapDropdownValueToFindIdWithLabel = (inputArray, findValue) => {
  if (inputArray) {
    const foundObject = inputArray.find((item) => item.label === findValue);
    if (foundObject) {
      return foundObject.label || "";
    }
    return "";
  }
  return "";
};

export const mapDropdownValueToIdWithLabel = (inputArray, findValue) => {
  if (inputArray) {
    const foundObject = inputArray.find((item) => item.label === findValue);

    if (foundObject) {
      return foundObject || "";
    }
    return "";
  }
  return "";
};

export const mapDropdownValueToId = (inputArray, findValue) => {
  if (inputArray) {
    const foundObject = inputArray.find((item) => item.id === findValue);

    if (foundObject) {
      return foundObject || "";
    }
    return "";
  }
  return "";
};

export const mapDropdownValueToPlantIdWithLabel = (inputArray, findValue) => {
  if (inputArray) {
    const foundObject = inputArray.find((item) => item.plantId === findValue);
    if (foundObject) {
      return foundObject.plantCode || "";
    }
    return "";
  }
  return "";
};

export const mapDropdownValueToLabelWithPlantId = (inputArray, findValue) => {
  if (inputArray) {
    const foundObject = inputArray.find((item) => item.plantCode === findValue);
    if (foundObject) {
      return foundObject || "";
    }
    return "";
  }
  return "";
};

export const mapDropdownValueToNameWithCode = (inputArray, findValue) => {
  if (inputArray) {
    const foundObject = inputArray.find((item) => item.code === findValue);
    if (foundObject) {
      return foundObject.name || "";
    }
    return "";
  }
  return "";
};

export const mapDropdownValueToCodeWithName = (inputArray, findValue) => {
  if (inputArray) {
    const foundObject = inputArray.find((item) => item.name === findValue);

    if (foundObject) {
      return foundObject || "";
    }
    return "";
  }
  return "";
};

export const getFormattedDate = (dateArg) => {
  return dateArg === null ? "" : dayjs(dateArg).format(defaultDateFormate);
};

export const getFormattedTime = (dateArg) => {
  return dateArg === null ? "" : dayjs(dateArg).format("LT");
};
export function filterMenuObjectWithUserRights(
  menuObjectWithUserRights,
  urlValue
) {
  if (!menuObjectWithUserRights || !urlValue) {
    return [];
  }

  return menuObjectWithUserRights.filter((row) => row.route === urlValue);
}

