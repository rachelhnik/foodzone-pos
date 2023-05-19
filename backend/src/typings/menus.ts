export interface Menu {
    id?: string;
    name: string;
    price: number;

    branchIds: string[];
    menuCategoryIds?: string[];
    addonCategoryIds?: string[];
}

export interface CreateMenuParams {
    name: string;
    price: number;
    branchIds: string[];
    asset_url: string;
    description: string;
}
