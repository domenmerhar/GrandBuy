import { Outlet } from "react-router-dom";
import { Sidebar } from "../../Util/Sidebar";
import { ContentWithSidebar } from "../../Util/ContentWithSidebar";
import { SidebarLayout } from "../../Util/SidebarLayout";
import { DashboardAdminList } from "./DashboardAdminList";
import styled from "styled-components";

const DashboardLayout = styled(SidebarLayout)`
  font-weight: 500;
`;

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <Sidebar>
        {/* <DashboardSellerList /> */}
        <DashboardAdminList />
      </Sidebar>

      <ContentWithSidebar>
        Main
        <Outlet />
      </ContentWithSidebar>
    </DashboardLayout>
  );
};
