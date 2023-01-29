export const Roles = ["USER", "ADMIN"] as const;
export type Role = typeof Roles[number];

export const USER_ROLE: Role = "USER";


export type IRoleProps = {
  roles: Role[];
};
