import { createContext, useContext, useEffect, useMemo } from "react";
import useFetchApi from "../hooks/useFetchApi";
import { ListGroupPrefix } from "../constants/global";
import { menuInitialData } from "../utils/MenuInitialData";
import { filterMenuObjectWithUserRights } from "../utils/common";
import { Progressor } from "../common/Progressor";
import { useCommonData } from "./CommonDataProvider";
const MenuContext = createContext();
export const MenuContextProvider = ({ children }) => {
  const commonData = useCommonData();
  const urlValue = window.location.pathname;
  const ugId = commonData?.userData?.groupId;
  const {
    data: getUserGroupRightsData,
    isFetchedAfterMount: isFetch,
    refetch,
  } = useFetchApi({
    endpoint: `${ListGroupPrefix}/user-group-rights-json-menu?groupId=${ugId}`,
    retrieveOnMount: true,
    Menu_id: 19,
  });
  useEffect(() => {
    if (isFetch) {
      <Progressor />;
    }
  }, [isFetch]);
  const menuObjectWithUserRights = useMemo(() => {
    if (!getUserGroupRightsData || !menuInitialData || !menuInitialData.members)
      return [];

    getUserGroupRightsData.sort((a, b) => a.urMenuIdFk - b.urMenuIdFk);

    return getUserGroupRightsData.map((obj1) => {
      const obj2 = menuInitialData.members.find(
        (obj2) => obj2.menu_e_name === obj1.menuName
      );

      if (obj2) {
        return Object.assign({}, obj1, obj2);
      } else {
        return obj1;
      }
    });
  }, [getUserGroupRightsData]);
  const rightsArray = filterMenuObjectWithUserRights(
    menuObjectWithUserRights,
    urlValue
  );

  return (
    <MenuContext.Provider
      value={{ menuObjectWithUserRights, refetch, rightsArray }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenuContext must be used within a MenuContextProvider");
  }
  return context;
};
