export const fetchCsrfCookie = async () => {
  await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
    credentials: "include",
  });
};

export function getXSRFTokenFromCookie(): string | null {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
  return token ? decodeURIComponent(token) : null;
}
