import { createContext, useEffect, useState } from "react";
import MenusData, {
    User,
    Addon,
    AddonCategory,
    Company,
    branchesMenus,
    BranchesData,
    MenuCategory,
    menuMenuCategory,
    Townships,
} from "../typings/Types";
import { config } from "../config/Config";

export interface AppContextType {
    user: User | null;
    menus: MenusData[];
    menuCategories: MenuCategory[];
    addons: Addon[];
    addonCategories: AddonCategory[];
    menuMenuCategories: menuMenuCategory[];
    company: Company | null;
    townships: Townships[];
    branches: BranchesData[];
    branchesMenus: branchesMenus[];
    accessToken: string;
    setPosData: (data: any) => void;
    fetchData: () => void;
}

export const defaultContext: AppContextType = {
    user: null,
    menus: [],
    menuCategories: [],
    addons: [],
    addonCategories: [],
    menuMenuCategories: [],
    company: null,
    townships: [],
    branches: [],
    branchesMenus: [],
    accessToken: "",
    setPosData: () => {},
    fetchData: () => {},
};

export const AppContext = createContext(defaultContext);

const AppProvider = ({ children }: any) => {
    const [posData, setPosData] = useState(defaultContext);

    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken) {
            fetchData();
        }
    }, [accessToken]);

    const fetchData = async () => {
        const response = await fetch(`${config.apiBaseUrl}/data  `, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        console.log(data);

        const {
            user,
            menus,
            menuCategories,
            addons,
            addonCategories,
            branches,
            townships,
            company,
            branchesMenus,
        } = data;

        setPosData({
            ...posData,
            user: user,
            menus: menus,
            menuCategories: menuCategories,
            addons: addons,
            addonCategories: addonCategories,
            company: company,
            townships: townships,
            branches: branches,
            branchesMenus: branchesMenus,
        });
    };

    return (
        <AppContext.Provider value={{ ...posData, setPosData, fetchData }}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;
