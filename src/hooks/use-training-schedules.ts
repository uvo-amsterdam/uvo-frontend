import type { TrainingSchedules } from '@interfaces/training-schedule';
import { useApiFetch } from './use-api-fetch';

export const useTrainingSchedules = () => {
    const { data, loading, error } = useApiFetch<
        TrainingSchedules,
        TrainingSchedules | null
    >('/api/training-schedules', raw => raw, null);

    return { data, loading, error };
};
