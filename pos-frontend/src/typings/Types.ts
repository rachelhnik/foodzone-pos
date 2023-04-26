export interface BaseType {
    name: string;
    id?: number | undefined;
}

export default interface MenusData extends BaseType {
    price: number;
}
export interface MenuCategory extends BaseType {}

export interface Addon extends BaseType {
    price: number;
    addonCategoriesId: number | null | undefined;
    isAvailable: boolean;
}
export interface menuMenuCategory {
    menu_cat_id: any;
    menu_id: number;
    menu_categories_id: number;
}

export interface AddonCategory extends BaseType {
    isRequired: boolean;
}

export interface Locations extends BaseType {
    open_time: number;
    close_time: number;
}

export interface LocationMenu {
    id?: number;
    menuId: number;
    locationId: number;
}
