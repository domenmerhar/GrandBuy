import { Badge } from "../../Util/Badge";
import { Header } from "../../Util/Header";
import { Row } from "../../Util/Row";
import { UserImageBig } from "../../Util/UserImageBig";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { useUser } from "../../hooks/useUser";
import { useTranslation } from "react-i18next";
import { toApiFilesPath } from "../../functions/toApiFilesPath";

/**
 * UserInfo komponenta za prikaz informacij o uporabniku.
 *
 * Ta komponenta prikazuje profilno sliko, uporabniško ime in status uporabnika (prepovedan ali ne).
 *
 * @returns {JSX.Element} - JSX element, ki prikazuje informacije o uporabniku.
 *
 * @example
 * // Uporaba komponente
 * <UserInfo />
 */

export const UserInfo = () => {
  const { t } = useTranslation();
  const { data, error, isLoading } = useUser();

  if (isLoading) return <SpinnerInBox size="large" />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <>
      <UserImageBig src={toApiFilesPath(data?.data?.image)} />
      <Row $justifyContent="center" $alignItems="center" $gap="12px">
        <Header $color="orange" $size="small" as="h1">
          {data?.data?.username}
        </Header>
        {data?.data?.banned ? <Badge $color="red">{t("banned")}</Badge> : null}
      </Row>
    </>
  );
};
