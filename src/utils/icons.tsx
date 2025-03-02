import { JSX } from "react";
import { LuBuilding2, LuLayoutDashboard } from "react-icons/lu";
import { PiBuildingsDuotone, PiCardsThree, PiCarSimple, PiNewspaperClipping } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import { MdMoreHoriz } from "react-icons/md";
import { FiEye, FiEyeOff, FiUsers } from "react-icons/fi";
import { IoTrendingDownOutline, IoTrendingUpOutline } from "react-icons/io5";

// Imports and provides icons needed.
export const icons: Record<string, JSX.Element> = {
    dashboard : <LuLayoutDashboard/>,
    companies : <LuBuilding2/>,
    plans: <PiCardsThree/>,
    billing: <PiNewspaperClipping/>,
    login: <CiLogin/>,
    sideNavClosed: <CgMenuLeft/>,
    sideNavOpen: <CgMenuRight/>,
    more : <MdMoreHoriz />,
    eye : <FiEye/>,
    eyeOff : <FiEyeOff/>,
    users : <FiUsers />,
    companies2 : <PiBuildingsDuotone />,
    vehicles2 : <PiCarSimple />,
    positive : <IoTrendingUpOutline />,
    negative : <IoTrendingDownOutline />,
}