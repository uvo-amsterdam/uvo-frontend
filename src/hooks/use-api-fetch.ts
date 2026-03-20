import { useEffect, useState } from 'react';

export function useApiFetch<T, R>(
    url: string,
    parser: (raw: T) => R,
    initialData: R,
) {
    const [data, setData] = useState<R>(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        const { signal } = controller;

        fetch(url, { signal })
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text().catch(() => '');
                    throw new Error(
                        `API Error: ${res.status} ${res.statusText} at ${url}${
                            text ? ` - ${text}` : ''
                        }`,
                    );
                }
                return res.json();
            })
            .then((raw: T) => {
                setData(parser(raw));
                setLoading(false);
            })
            .catch(err => {
                if (err.name === 'AbortError') return;
                setError(
                    err instanceof Error ? err : new Error('Unknown error'),
                );
                setLoading(false);
            });

        return () => controller.abort();
    }, [url, parser]);

    return { data, loading, error };
}
