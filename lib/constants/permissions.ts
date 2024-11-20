export const directoryPages = [
  { id: "dashboard", label: "Dashboard", description: "View directory analytics and overview" },
  { id: "listings", label: "Listings", description: "Manage directory listings" },
  { id: "blog", label: "Blog", description: "Manage blog posts" },
  { id: "pages", label: "Pages", description: "Manage static pages" },
  { id: "settings", label: "Settings", description: "Manage directory settings" },
] as const;

export const rolePermissions = {
  admin: {
    label: "Admin",
    description: "Full access to all features",
    canManageTeam: true,
    canManageSettings: true,
  },
  editor: {
    label: "Editor",
    description: "Can edit content but cannot manage team or settings",
    canManageTeam: false,
    canManageSettings: false,
  },
  viewer: {
    label: "Viewer",
    description: "Read-only access to allowed pages",
    canManageTeam: false,
    canManageSettings: false,
  },
} as const;