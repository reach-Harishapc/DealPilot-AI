const RAW_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
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
