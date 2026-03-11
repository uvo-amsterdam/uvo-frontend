import { useEffect, useState } from 'react';
import type { TrainingSchedules } from '@interfaces/training-schedule.interface';

export const useTrainingSchedules = () => {
    const [data, setData] = useState<TrainingSchedules | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const fetchSchedules = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/training-schedules');
                if (!response.ok) {
                    throw new Error('Failed to fetch training schedules');
                }
                const json = await response.json();
                if (mounted) {
                    setData(json);
                    setError(null);
                }
            } catch (err) {
                if (mounted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : 'An unknown error occurred',
                    );
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchSchedules();

        return () => {
            mounted = false;
        };
    }, []);

    return { data, loading, error };
};
