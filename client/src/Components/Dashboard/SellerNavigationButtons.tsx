import { NavigationTextButton } from "../../Util/NavigationTextButton";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { BiPackage } from "react-icons/bi";
import { HiOutlineEye, HiOutlineMicrophone } from "react-icons/hi";

export const SellerNavigationButtons = () => {
  return (
    <>
      <NavigationTextButton to="overview" variant="dark">
        <HiOutlineEye size={24} />
        Overview
      </NavigationTextButton>

      <NavigationTextButton to="reviews" variant="dark">
        <HiOutlineMicrophone size={24} />
        Reviews
      </NavigationTextButton>

      <NavigationTextButton to="orders" variant="dark">
        <BiPackage size={24} />
        Orders
      </NavigationTextButton>

      <NavigationTextButton to="refund" iconColoring="stroke" variant="dark">
        <HiArrowUturnLeft size={24} />
        Refunds
      </NavigationTextButton>

      <NavigationTextButton to="coupons" variant="dark" iconColoring="stroke">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          height={24}
          width={24}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
          />
        </svg>
        Coupons
      </NavigationTextButton>
    </>
  );
};
