import { useEffect, useState } from 'react';

export function useApiFetch<T, R>(url: string, parser: (raw: T) => R) {
    const [data, setData] = useState<R>([] as R);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        setLoading(true);
        setError(null);

        fetch(url, { signal })
            .then(res => {
                if (!res.ok) throw new Error('API error');
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
