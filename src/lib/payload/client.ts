export const PAYLOAD_URL =
    process.env.NEXT_PUBLIC_PAYLOAD_URL ?? 'http://localhost:3000';

export async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${PAYLOAD_URL}${path}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers || {}),
        },
        next: { revalidate: 60 },
        cache: 'force-cache',
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Payload error ${res.status}: ${text}`);
    }
    return res.json();
}
