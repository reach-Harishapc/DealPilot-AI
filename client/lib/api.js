const RAW_BASE = process.env.NEXT_PUBLIC_API_URL;
if (!RAW_BASE) {
  throw new Error("NEXT_PUBLIC_API_URL is not set. Set it in Vercel Project → Settings → Environment Variables as Config, then redeploy.");
}
export const API_BASE = RAW_BASE.replace(/\/+$/, "");

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    throw new Error(`API ${res.status} on ${path}`);
  }
  return res.json();
}
