export interface BaseType {
    name: string;
    id?: number | undefined;
}

export default interface MenusData extends BaseType {
    asset_url: string;
    price: number;
    description: string;
    branchIds?: string[];
    isAvailable: boolean;
}
export interface MenuCategory extends BaseType {}

export interface Addon extends BaseType {
    price: number;
    addonCategoriesId: number | null | undefined;
}
export interface menuMenuCategory {
    menu_cat_id: any;
    menu_id: number;
    menu_categories_id: number;
}

export interface AddonCategory extends BaseType {
    isRequired: boolean;
}

export interface BranchesData {
    id?: number;
    township_id?: number | undefined;
    address: string;
    companyId?: number;
    townshipId?: string;
}

export interface branchesMenus {
    menu_id?: number | undefined;
    branch_id?: number;
    id?: number;
    is_available: boolean;
}

export interface Company {
    id?: any;
    name: string;
}

export interface User {
    id?: number;
    email: string;
}
export interface Townships extends BaseType {}
