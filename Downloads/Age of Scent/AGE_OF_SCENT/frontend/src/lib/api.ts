import { getToken } from "@/lib/auth";

/**
 * AGE OF SCENT frontend API helper.
 *
 * Your backend is deployed on Render:
 *   https://largefile.onrender.com
 *
 * In Vercel, you may set either:
 *   NEXT_PUBLIC_API_URL=https://largefile.onrender.com
 * or:
 *   NEXT_PUBLIC_API_BASE_URL=https://largefile.onrender.com/api
 *
 * This file also falls back to the Render backend automatically, so the app
 * will not accidentally call localhost or api.example.com in production.
 */
const RENDER_BACKEND_ORIGIN = "https://largefile.onrender.com";

function normalizeBaseUrl(value?: string) {
    const raw = (value || "").trim();

    // Ignore empty values and common placeholders that cause "Failed to fetch".
    if (!raw || raw.includes("api.example.com")) {
        return `${RENDER_BACKEND_ORIGIN}/api`;
    }

    const withoutTrailingSlash = raw.replace(/\/+$/, "");

    // If the env value is the backend origin, append /api.
    // Example: https://largefile.onrender.com -> https://largefile.onrender.com/api
    if (!withoutTrailingSlash.endsWith("/api")) {
        return `${withoutTrailingSlash}/api`;
    }

    // If the env value already includes /api, keep it.
    return withoutTrailingSlash;
}

export const API_BASE_URL = normalizeBaseUrl(
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL
);

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

type RequestBody = BodyInit | Record<string, unknown> | null | undefined;

type RequestOptions = Omit<RequestInit, "body"> & {
    body?: RequestBody;
};

export function mediaUrl(path?: string) {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    if (path.startsWith("/")) return `${API_ORIGIN}${path}`;
    return `${API_ORIGIN}/${path}`;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const requestUrl = `${API_BASE_URL}${cleanPath}`;

    const headers = new Headers(options.headers);
    const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

    if (options.body && !isFormData) {
        headers.set("Content-Type", "application/json");
    }

    const token = typeof window !== "undefined" ? getToken() : null;
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    let requestBody: BodyInit | undefined;
    if (isFormData) {
        requestBody = options.body as FormData;
    } else if (options.body != null) {
        requestBody = JSON.stringify(options.body);
    } else {
        requestBody = undefined;
    }

    let response: Response;

    try {
        response = await fetch(requestUrl, {
            ...options,
            headers,
            body: requestBody,
            cache: "no-store"
        });
    } catch (error) {
        throw new Error(
            `Failed to connect to backend at ${requestUrl}. Check Vercel NEXT_PUBLIC_API_URL and Render CORS_ORIGIN.`
        );
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || `Request failed with status ${response.status}.`);
    }

    return data as T;
}

export const api = {
    get: <T>(path: string): Promise<T> => request<T>(path),
    post: <T>(path: string, body?: RequestBody): Promise<T> =>
        request<T>(path, { method: "POST", body }),
    put: <T>(path: string, body?: RequestBody): Promise<T> =>
        request<T>(path, { method: "PUT", body }),
    delete: <T>(path: string): Promise<T> => request<T>(path, { method: "DELETE" })
};
