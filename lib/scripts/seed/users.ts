type SeedUserType = {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin" | "super_admin" | null | undefined;
  isActive?: boolean;
  image?: string | null | undefined;
};

export function getSeedUsers(): SeedUserType[] {
  return [
    {
      name: "Super Admin",
      email: "superadmin@cartly.com",
      password: "P@ssw0rd",
      role: "super_admin",
      isActive: true,
      image: undefined,
    },
    {
      name: "Admin",
      email: "admin@cartly.com",
      password: "P@ssw0rd",
      role: "admin",
      isActive: true,
      image: undefined,
    },

    {
      name: "John Carter",
      email: "john@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "Emily Johnson",
      email: "emily@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "Sophia Davis",
      email: "sophia@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "Daniel Wilson",
      email: "daniel@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "Olivia Martinez",
      email: "olivia@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "James Anderson",
      email: "james@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "Charlotte Thomas",
      email: "charlotte@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "Benjamin Moore",
      email: "benjamin@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "Amelia Jackson",
      email: "amelia@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "William White",
      email: "william@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "Isabella Harris",
      email: "isabella@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "Lucas Martin",
      email: "lucas@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "Mia Thompson",
      email: "mia@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "Henry Garcia",
      email: "henry@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
    {
      name: "Evelyn Clark",
      email: "evelyn@example.com",
      password: "P@ssw0rd",
      role: "user",
      isActive: true,
      image: undefined,
    },
  ];
}
