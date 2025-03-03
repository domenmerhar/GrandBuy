import ExpandingList from "./ExpandingList";
import { ButtonWithNotifcations } from "./Button/ButtonWithNotifcations";
import { HiDotsVertical } from "react-icons/hi";

/**
 * ExpandingThreeDotsButton komponenta za prikaz gumba s tremi pikami, ki odpira razširljiv seznam.
 *
 * @function
 * @returns {JSX.Element} - JSX element gumba s tremi pikami.
 *
 * @example
 * // Uporaba komponente
 * <ExpandingThreeDotsButton />
 */

export default function ExpandingThreeDotsButton() {
  return (
    <ExpandingList.Button>
      <ButtonWithNotifcations>
        <HiDotsVertical />
      </ButtonWithNotifcations>
    </ExpandingList.Button>
  );
}
