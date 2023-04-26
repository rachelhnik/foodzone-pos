import { createContext, useEffect, useState } from "react";
import MenusData, {
    Addon,
    AddonCategory,
    LocationMenu,
    Locations,
    MenuCategory,
    menuMenuCategory,
} from "../typings/Types";
import { config } from "../config/Config";

export interface AppContextType {
    menus: MenusData[];
    menuCategories: MenuCategory[];
    addons: Addon[];
    addonCategories: AddonCategory[];
    menuMenuCategories: menuMenuCategory[];
    locations: Locations[];
    locationMenus: LocationMenu[];
    setPosData: (data: any) => void;
    fetchData: () => void;
}

const defaultContext: AppContextType = {
    menus: [],
    menuCategories: [],
    addons: [],
    addonCategories: [],
    menuMenuCategories: [],
    locations: [],
    locationMenus: [],
    setPosData: () => {},
    fetchData: () => {},
};

export const AppContext = createContext(defaultContext);

const AppProvider = ({ children }: any) => {
    const [posData, setPosData] = useState(defaultContext);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(`${config.apiBaseUrl}/data  `);
        const data = await response.json();
        const {
            menus,
            menuCategories,
            addons,
            addonCategories,
            locations,
            locationMenus,
        } = data;
        setPosData({
            ...posData,
            menus: menus,
            menuCategories: menuCategories,
            addons: addons,
            addonCategories: addonCategories,
            locations: locations,
            locationMenus: locationMenus,
        });
    };
    console.log(posData);
    return (
        <AppContext.Provider value={{ ...posData, setPosData, fetchData }}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;
