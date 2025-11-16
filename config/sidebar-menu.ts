import {
    Home,
    Calendar,
    FileText,
    User,
    Users,
    Settings,
    Stethoscope,
    ClipboardList,
    LogOut,
} from "lucide-react";

export interface MenuItemType {
    title: string;
    url: string;
    icon: any;
    subItems?: MenuItemType[];
}

export const menuItems: MenuItemType[] = [
    {
        title: "Dashboard",
        url: "/",
        icon: Home,
    },
    {
        title: "Meus Horários",
        url: "/horarios",
        icon: Calendar,
    },
];
