import { JSX } from "react";
import { LuBuilding2, LuLayoutDashboard } from "react-icons/lu";
import { PiCardsThree, PiNewspaperClipping } from "react-icons/pi";

// Imports and provides icons need for the sideBar
export const icons: Record<string, JSX.Element> = {
    LuLayoutDashboard : <LuLayoutDashboard/>,
    LuBuilding2 : <LuBuilding2/>,
    PiCardsThree: <PiCardsThree/>,
    PiNewspaperClipping: <PiNewspaperClipping/>
}