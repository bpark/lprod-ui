export interface SideNavModel {
  title: string;
  items: SideNavItem[];
}

export interface SideNavItem {
  id: number;
  link: string;
  label: string;
}
