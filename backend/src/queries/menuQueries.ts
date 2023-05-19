import { pool } from "../../db/db";
import { CreateMenuParams, Menu } from "../typings/menus";

interface MenuQueries {
    createMenu: (createMenuParams: CreateMenuParams) => Promise<Menu>;
    getMenu: (menuId: string) => Promise<Menu | undefined>;
    getMenusbyLocationIds: (locationId: string) => Promise<Menu[] | []>;
    deleteMenu: (menuId: string) => Promise<void>;
    updateMenu: (
        menuId: string,
        updateMenuParams: Partial<Menu>
    ) => Promise<Menu[]>;
}
export const menuQueries: MenuQueries = {
    createMenu: async (createMenuParams: CreateMenuParams) => {
        const { name, price, branchIds, asset_url, description } =
            createMenuParams;

        const text =
            "INSERT into menus (name,price,asset_url,description) values($1,$2,$3,$4) RETURNING * ";
        const values = [name, price, asset_url, description];
        const result = await pool.query(text, values);
        const menu = result.rows[0] as Menu;

        const menuId = menu.id;
        await pool.query(
            `INSERT into branches_menus(menu_id,branch_id) select * from unnest ($1::int[], $2::int[])`,
            [Array(branchIds.length).fill(menuId), branchIds]
        );
        return { name, price, branchIds, asset_url, description };
    },
    getMenu: async (menuId: string) => {
        const menuResult = await pool.query(`SELECT * from menus where id=$1`, [
            menuId,
        ]);
        const hasMenus = menuResult.rows.length > 0;
        if (hasMenus) {
            const menu = menuResult.rows[0] as Menu;
            const branchesMenusResult = await pool.query(
                `SELECT location_id from branches_menus where menu_id=$1`,
                [menuId]
            );
            const branchIds = branchesMenusResult.rows.map(
                (row) => row.branch_id
            );
            const menusMenuCategriesResult = await pool.query(
                `select menu_categories_id from menus_menus_categories where id=$1`,
                [menuId]
            );
            const menuCategoryIds = menusMenuCategriesResult.rows.map(
                (row) => row.menu_categories_id
            );
            const menuAddonCategoriesResult = await pool.query(
                `SELECT addon_categories_id from menus_addon_categories where id=$1`,
                [menuId]
            );
            const addonIds = menuAddonCategoriesResult.rows.map(
                (row) => row.addon_categories_id
            );
            return {
                id: menuId,
                name: menu.name,
                price: menu.price,
                branchIds,
                menuCategoryIds,
                addonIds,
            };
        }
    },
    getMenusbyLocationIds: async (locaionId: string) => {
        const menuIdResult = await pool.query(
            `SELECT menu_id from location_menus where location_id=$1`,
            [locaionId]
        );
        const menuIds = menuIdResult.rows.map((row) => row.menu_id);
        const menusResult = await pool.query(
            `SELECT * FROM menus WHERE id = ANY($1::int[]) `,
            [menuIds]
        );
        const menus = menusResult.rows as Menu[];
        return menus;
    },
    deleteMenu: async (menuId: string) => {
        await pool.query(
            "DELETE from menus_menu_categories WHERE menus_id=$1",
            [menuId]
        );
        await pool.query(
            "DELETE from menus_addon_categories WHERE menus_id=$1",
            [menuId]
        );
        await pool.query("DELETE from branches_menus WHERE menu_id=$1", [
            menuId,
        ]);

        const deletedMenu = await pool.query("DELETE from menus WHERE id=$1", [
            menuId,
        ]);
        console.log(deletedMenu.rows);
        return deletedMenu.rows[0];
    },
    updateMenu: async (menuId: string, updateMenuParams: Partial<Menu>) => {
        const { name, price } = updateMenuParams;
        const menuResult = await pool.query(
            "UPDATE menus SET name=$1, price=$2  WHERE id =($3) RETURNING *",
            [name, price, menuId]
        );
        const menus = menuResult.rows;
        return menus;
    },
};
