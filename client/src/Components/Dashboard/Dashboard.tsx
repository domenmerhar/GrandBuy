import { Outlet } from "react-router-dom";
import { Sidebar } from "../../Util/Sidebar";
import { ContentWithSidebar } from "../../Util/ContentWithSidebar";
import { SidebarLayout } from "../../Util/SidebarLayout";
import { DashboardAdminList } from "./DashboardAdminList";
import styled from "styled-components";
import { DashboardSellerList } from "./DashboardSellerList";
import { Modal } from "../../Util/Modal";

const DashboardLayout = styled(SidebarLayout)`
  font-weight: 500;
`;

const role = "seller";

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <Sidebar>
        {role === "seller" ? (
          <Modal>
            <DashboardSellerList />
          </Modal>
        ) : (
          <DashboardAdminList />
        )}
      </Sidebar>

      <ContentWithSidebar>
        <Outlet />
      </ContentWithSidebar>
    </DashboardLayout>
  );
};
