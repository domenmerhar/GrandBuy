import { Outlet } from "react-router-dom";
import { Sidebar } from "../Util/Sidebar";
import { ContentWithSidebar } from "../Util/ContentWithSidebar";
import { SidebarLayout } from "../Util/SidebarLayout";

export const Dashboard = () => {
  return (
    <SidebarLayout>
      <Sidebar>
        <div>Sidebar</div>
      </Sidebar>
      <ContentWithSidebar>
        Main
        <Outlet />
      </ContentWithSidebar>
    </SidebarLayout>
  );
};
