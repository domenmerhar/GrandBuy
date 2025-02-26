import { useState } from "react";
import { UserImageBig } from "../../Util/UserImageBig";
import { useMe } from "../../hooks/useMe";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { Modal } from "../../Util/Modal";
import { useTranslation } from "react-i18next";
import { FilePickerDisplay } from "../../Components/Files/FilePickerDIsplay";
import styled from "styled-components";
import { useUpdateMe } from "../../hooks/useUpdateMe";
import toast from "react-hot-toast";
import { useJWT } from "../../hooks/useJWT";

const UserImage = styled(UserImageBig)`
  cursor: pointer;
`;

export default function UserImageWithModal() {
  const { t } = useTranslation();

  const { JWT } = useJWT();
  const { data } = useMe();
  const image = data?.data?.image;

  const { setIsOpen, closeModal } = Modal.useModalContext();

  const { mutate: updateMe } = useUpdateMe();
  const [profileImage, setProfileImage] = useState<File[]>([]);

  const handleImageClick = () => {
    setIsOpen(true);
  };

  const handleUpdate = () => {
    if (profileImage.length === 0)
      return toast.error(t("pleaseEnterAllFields"), { id: "updateMe" });

    updateMe({
      JWT,
      image: profileImage[0],
    });

    closeModal();
  };

  return (
    <>
      <UserImage src={toApiFilesPath(image)} onClick={handleImageClick} />

      <Modal.Window
        title={t("updateImage")}
        buttons={[
          {
            key: "update",
            text: t("update"),
            color: "green",
            onClick: handleUpdate,
          },
        ]}
      >
        <FilePickerDisplay
          id="profile-image"
          label={t("profileImage")}
          selectedImages={profileImage}
          setSelectedImages={setProfileImage}
          multiple={false}
        />
      </Modal.Window>
    </>
  );
}
