import styled from "styled-components";
import { Content } from "../../Util/Content";
import { FilterSortHeader } from "../../Util/FilterSortHeader";
import { NotificationCard } from "./NotificationCard";
import { useInfinite } from "../../hooks/useInfinite";
import { useSearchParams } from "react-router-dom";
import { NotificationResponse, NotificationType } from "../../Util/types";
import { useAuthContext } from "../../contexts/AuthContext";
import { getYourNotifications } from "../../api/notification/getYourNotifications";
import { InfiniteProducts } from "../../Components/InfiniteProducts";
import { toDate } from "../../functions/toDate";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 42rem));
  justify-content: space-between;

  row-gap: 3.2rem;
  margin-top: 3.2rem;
`;

export const NotificationPage = () => {
  const [{ JWT, userId }] = useAuthContext();
  const [searchParams] = useSearchParams();

  const type: NotificationType | "all" = ["message", "warning"].includes(
    searchParams.get("filter")!
  )
    ? (searchParams.get("filter") as NotificationType)
    : "all";

  const sort: "-createdAt" | "+createdAt" = [
    "-createdAt",
    "+createdAt",
  ].includes(searchParams.get("sort") ?? "")
    ? (searchParams.get("sort") as "-createdAt" | "+createdAt")
    : "-createdAt";

  const data = useInfinite({
    queryKey: ["notifications", userId, type, sort],
    queryFn: ({ pageParam }) => {
      if (pageParam === null) return;

      return getYourNotifications({
        JWT,
        page: Number(pageParam),
        type,
        sort,
      });
    },
  });

  return (
    <Content>
      <FilterSortHeader
        headerText="Notifications"
        filterOptions={[
          { value: "all", name: "All" },
          { value: "message", name: "Message" },
          { value: "warning", name: "Warning" },
        ]}
        selectOptions={[
          { name: "Sort by age (newest)", value: "-createdAt" },
          { name: "Sort by age (oldest)", value: "+createdAt" },
        ]}
      />

      <InfiniteProducts
        container={Grid}
        {...data}
        renderFn={(page: NotificationResponse) =>
          page?.data?.notifications.map(({ _id, createdAt, message, type }) => (
            <NotificationCard key={_id} date={toDate(createdAt)} type={type}>
              {message}
            </NotificationCard>
          ))
        }
      />
    </Content>
  );
};
