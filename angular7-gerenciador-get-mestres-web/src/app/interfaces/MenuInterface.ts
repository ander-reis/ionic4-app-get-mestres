export interface MenuInterface {
    group: string;
    items: Array<MenuItemInterface>;
}

export interface MenuItemInterface {
    label: string;
    url: string;
    icon: string;
}
