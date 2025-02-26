import { JSX } from "react";
import { LuBuilding2, LuLayoutDashboard } from "react-icons/lu";
import { PiCardsThree, PiNewspaperClipping } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";

// Imports and provides icons need.
export const icons: Record<string, JSX.Element> = {
    darshboard : <LuLayoutDashboard/>,
    companies : <LuBuilding2/>,
    plans: <PiCardsThree/>,
    billing: <PiNewspaperClipping/>,
    login: <CiLogin/>
}