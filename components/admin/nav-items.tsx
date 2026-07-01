import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  Package,
  Percent,
  ShoppingBag,
  Users,
} from "lucide-react";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const adminNavItems: AdminNavItem[] = [
  // {
  //   label: "Dashboard",
  //   href: "/admin",
  //   icon: LayoutDashboard,
  // },
  // {
  //   label: "Orders",
  //   href: "/admin/orders",
  //   icon: ShoppingBag,
  // },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Coupons",
    href: "/admin/coupons",
    icon: Percent,
  },
  // {
  //   label: "Customers",
  //   href: "/admin/customers",
  //   icon: Users,
  // },
  // {
  //   label: "Analytics",
  //   href: "/admin/analytics",
  //   icon: BarChart3,
  // },
  {
    label: "Logout",
    href: "/admin/logout",
    icon: LogOut,
  },
];

