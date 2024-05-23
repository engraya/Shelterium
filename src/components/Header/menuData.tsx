import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 33,
    title: "Buy",
    path: "/buy",
    newTab: false,
  },
  {
    id: 4,
    title: "Search",
    path: "/search",
    newTab: false,
  },
  {
    id: 5,
    title: "Rent",
    path: "/rent",
    newTab: false,
  },
  {
    id: 6,
    title: "Support",
    path: "/contact",
    newTab: false,
  },
  {
    id: 7,
    title: "Pages",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "About Page",
        path: "/about",
        newTab: false,
      },
      {
        id: 42,
        title: "Contact Page",
        path: "/contact",
        newTab: false,
      },
      {
        id: 43,
        title: "Blog Grid Page",
        path: "/buy",
        newTab: false,
      },
      {
        id: 44,
        title: "Blog Sidebar Page",
        path: "/blog-sidebar",
        newTab: false,
      },
      {
        id: 45,
        title: "Blog Details Page",
        path: "/blog-details",
        newTab: false,
      },
      {
        id: 48,
        title: "Error Page",
        path: "/error",
        newTab: false,
      },
    ],
  },
];
export default menuData;
