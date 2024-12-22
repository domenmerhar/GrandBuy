import { Outlet } from "react-router-dom";
import { Sidebar } from "../../Util/Sidebar";
import { ContentWithSidebar } from "../../Util/ContentWithSidebar";
import { SidebarLayout } from "../../Util/SidebarLayout";
import { DashboardAdminList } from "./DashboardAdminList";

export const Dashboard = () => {
  return (
    <SidebarLayout>
      <Sidebar>
        {/* <DashboardSellerList /> */}
        <DashboardAdminList />
      </Sidebar>

      <ContentWithSidebar>
        Main
        <Outlet />
      </ContentWithSidebar>
    </SidebarLayout>
  );
};
