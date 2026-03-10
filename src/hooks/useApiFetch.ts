import { useEffect, useState } from 'react';

export function useApiFetch<T, R>(url: string, parser: (raw: T) => R) {
    const [data, setData] = useState<R>([] as R);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error('API error');
                return res.json();
            })
            .then((raw: T) => {
                setData(parser(raw));
                setLoading(false);
            })
            .catch(err => {
                setError(
                    err instanceof Error ? err : new Error('Unknown error'),
                );
                setLoading(false);
            });
    }, [url, parser]);

    return { data, loading, error };
}
