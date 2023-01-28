export const EMAIL_REGEX =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const NAME_REGEX = /^([A-Z][a-zA-Z]*)$/;

/* extract the payload from a jwt token and return it as a JSON/js object like */
export const parseJWTPayload = (token: string): any => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export const getUserRoleFromToken = (token: string): string => {
  const payload = parseJWTPayload(token);
  return payload.role;
};

export const getUserNameFromToken = (token: string): string => {
  const payload = parseJWTPayload(token);
  return payload.name;
};

export default {};
