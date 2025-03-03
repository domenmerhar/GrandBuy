import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { ContentWithSidebar } from "../../Util/ContentWithSidebar";
import { SidebarLayout } from "../../Util/SidebarLayout";
import { DashboardAdminList } from "./DashboardAdminList";
import styled from "styled-components";
import { DashboardSellerList } from "./DashboardSellerList";
import { Modal } from "../Modal";
import { useMe } from "../../hooks/useMe";

const DashboardLayout = styled(SidebarLayout)`
  font-weight: 500;
`;

const DashboardContent = styled(ContentWithSidebar)`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

/**
 * Dashboard komponenta za prikaz nadzorne plošče.
 *
 * @component
 * @returns {JSX.Element} - JSX element nadzorne plošče.
 *
 * @example
 * // Uporaba komponente
 * <Dashboard />
 */

export const Dashboard = () => {
  const { data } = useMe();
  const role = data?.data?.role;

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

      <DashboardContent>
        <Outlet />
      </DashboardContent>
    </DashboardLayout>
  );
};
