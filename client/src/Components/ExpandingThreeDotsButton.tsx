import ExpandingList from "./ExpandingList";
import { ButtonWithNotifcations } from "./Button/ButtonWithNotifcations";
import { HiDotsVertical } from "react-icons/hi";

export default function ExpandingThreeDotsButton() {
  return (
    <ExpandingList.Button>
      <ButtonWithNotifcations>
        <HiDotsVertical />
      </ButtonWithNotifcations>
    </ExpandingList.Button>
  );
}
