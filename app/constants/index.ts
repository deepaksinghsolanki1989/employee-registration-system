export const navItems = [
  {
    name: "Dashboard",
    icon: "/assets/icons/dashboard.svg",
    url: "/",
    roles: ["admin", "employee"],
  },
  {
    name: "Employees",
    icon: "/assets/icons/documents.svg",
    url: "/employees",
    roles: ["admin", "employee"],
  },
  {
    name: "Arts",
    icon: "/assets/icons/images.svg",
    url: "/arts",
    roles: ["admin", "employee"],
  },
  {
    name: "Change Password",
    icon: "/assets/icons/others.svg",
    url: "/change-password",
    roles: ["admin", "employee"],
  },
];

export const actionsDropdownItems = [
  {
    label: "Rename",
    icon: "/assets/icons/edit.svg",
    value: "rename",
  },
  {
    label: "Details",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
  {
    label: "Delete",
    icon: "/assets/icons/delete.svg",
    value: "delete",
  },
];

export const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Created Date (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
];

export const avatarPlaceholderUrl =
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
