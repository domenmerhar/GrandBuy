import { Outlet } from "react-router-dom";
import { Sidebar } from "../../Util/Sidebar";
import { ContentWithSidebar } from "../../Util/ContentWithSidebar";
import { SidebarLayout } from "../../Util/SidebarLayout";
import { DashboardSellerList } from "./DashboardSellerList";

export const Dashboard = () => {
  return (
    <SidebarLayout>
      <Sidebar>
        <DashboardSellerList />
      </Sidebar>

      <ContentWithSidebar>
        Main
        <Outlet />
      </ContentWithSidebar>
    </SidebarLayout>
  );
};
