import { JSX } from "react";
import { LuBuilding2, LuLayoutDashboard } from "react-icons/lu";
import { PiCardsThree, PiNewspaperClipping } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import { MdMoreHoriz } from "react-icons/md";

// Imports and provides icons needed.
export const icons: Record<string, JSX.Element> = {
    dashboard : <LuLayoutDashboard/>,
    companies : <LuBuilding2/>,
    plans: <PiCardsThree/>,
    billing: <PiNewspaperClipping/>,
    login: <CiLogin/>,
    sideNavClosed: <CgMenuLeft/>,
    sideNavOpen: <CgMenuRight/>,
    more : <MdMoreHoriz />
}