import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import BusinessUnit from "../pages/admin/BusinessUnit";
import Company from "../pages/admin/Company";
import Department from "../pages/admin/Department";
import AssetManagement from "../pages/home/AssetManagement";
import MyCalendar from "../pages/home/MyCalendar";
import Notification from "../pages/home/Notification";
import HomePage from "../pages/HomePage";
import PageNotFound from "../pages/PageNotFound";
import PageUnderDevelopment from "../pages/PageUnderDevelopment";
import PartsQuery from "../pages/plant/PartsQuery";
import PlantView from "../pages/plant/PlantView";
import AssetList from "../pages/report/AssetList";
import AssetUsage from "../pages/report/AssetUsage";
import InventoryTracking from "../pages/report/InventoryTracking";
import ServiceForecast from "../pages/report/ServiceForecast";
import AppSettings from "../pages/settings/AppSettings";
import SignIn from "../pages/SignIn";
import { WorkOrderMultiStep } from "../pages/home/workordersteps/WorkOrderMultiStep";
import { WorkOrder } from "../pages/home/WorkOrder";
import {
  mainHeaderHeight,
  subHeaderHeight,
  menuTitleHeight,
} from "../constants/global";
import DBView from "../pages/home/DBView";

const Content = () => {
  return (
    <>
      <Box
        sx={{
          height: `${
            100 - mainHeaderHeight - subHeaderHeight - menuTitleHeight
          }vh`,
          overflow: "auto",
          mt: 1,
        }}
      >
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/home/my-calendar" element={<MyCalendar />} />
          <Route path="/home/work-order" element={<WorkOrder />} />
          <Route path="/home/dbview" element={<DBView />} />
          <Route path="/home/notification" element={<Notification />} />
          <Route path="/home/asset-management" element={<AssetManagement />} />
          <Route
            path="/home/work-order/edit/:id"
            element={<WorkOrderMultiStep />}
          />
          <Route path="/plant/plant-view" element={<PlantView />} />
          <Route path="/plant/parts-query" element={<PartsQuery />} />

          <Route path="/report/asset-list" element={<AssetList />} />
          <Route path="/report/asset-usage" element={<AssetUsage />} />
          <Route
            path="/report/service-forecast"
            element={<ServiceForecast />}
          />
          <Route
            path="/report/inventory-tracking"
            element={<InventoryTracking />}
          />

          <Route path="/admin/company" element={<Company />} />
          <Route path="/admin/business-unit" element={<BusinessUnit />} />
          <Route path="/admin/department" element={<Department />} />

          <Route path="/settings/app-settings" element={<AppSettings />} />

          <Route path="/help/help" element={<PageUnderDevelopment />} />

          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </>
  );
};

export default Content;
