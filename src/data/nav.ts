import {
  Building2,
  Briefcase,
  CreditCard,
  LayoutDashboard,
  Users,
  BarChart,
  Settings,
} from "lucide-react";

export const navData = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://source.unsplash.com/random/32x32?face",
  },
  companies: [
    {
      name: "Acme Inc",
      logo: Building2,
      plan: "Enterprise",
    },
    {
      name: "Globex Corp",
      logo: Briefcase,
      plan: "Startup",
    },
    {
      name: "Umbrella Corp",
      logo: CreditCard,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Finance",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Invoices",
          url: "/dashboard/invoices",
        },
        {
          title: "Revenue",
          url: "/dashboard/revenue",
        },
      ],
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: Users,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/dashboard/settings/profile",
        },
        {
          title: "General",
          url: "/dashboard/settings/general",
        },
      ],
    },
  ],
};
