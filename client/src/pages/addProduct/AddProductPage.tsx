import { Content } from "../../Util/Content";
import { Row } from "../../Util/Row";
import { Modal } from "../../Components/Modal";
import { ProductInfoCard } from "./ProductInfoCard";
import { useState } from "react";
import { CarouselUpload } from "./CarouselUpload";
import { MarkdownFileUploader } from "./MarkdownFileUploader";
import styled from "styled-components";
import { Button } from "../../Util/Button";
import { useTranslation } from "react-i18next";

const CarouselCardRow = styled(Row)`
  margin-bottom: 6.4rem;
`;

const CreateButton = styled(Button)`
  margin-left: auto;
`;

const AddProductPageContent = styled(Content)`
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
`;

/**
 * AddProductPage komponenta za prikaz strani za dodajanje izdelka.
 *
 * Ta komponenta omogoča uporabniku, da naloži slike izdelka, vnese informacije o izdelku in naloži datoteko Markdown z opisom izdelka.
 *
 * @returns {JSX.Element} - JSX element, ki predstavlja stran za dodajanje izdelka.
 *
 * @example
 * // Uporaba komponente
 * <AddProductPage />
 */

export const AddProductPage = () => {
  const { t } = useTranslation();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  return (
    <AddProductPageContent>
      <CarouselCardRow $gap="2.8rem" $alignItems="center">
        <CarouselUpload
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />

        <Modal>
          <ProductInfoCard />
        </Modal>
      </CarouselCardRow>

      <MarkdownFileUploader />
      <CreateButton $shape="oval" $color="orange" $size="large">
        {t("create")}
      </CreateButton>
    </AddProductPageContent>
  );
};
