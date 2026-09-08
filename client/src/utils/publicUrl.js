export const publicUrl = (path = "") => {
  const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}` || "/";
};
