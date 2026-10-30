const BASE = import.meta.env.VITE_API_URL;
fetch('${API_URL}/api/v1');

export async function api(path, options = {}) {
    const res = await fetch(`${BASE}${path}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
        body: options.body ? JSON.stringify(options.body) : undefined,
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "API request failed");
    }
    return res.json();
}