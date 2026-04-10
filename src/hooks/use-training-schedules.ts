import type { TrainingSchedules } from '@interfaces/training-schedule';
import { useApiFetch } from './use-api-fetch';

const identityParser = (raw: TrainingSchedules): TrainingSchedules => raw;

export const useTrainingSchedules = () => {
    const { data, loading, error } = useApiFetch<
        TrainingSchedules,
        TrainingSchedules | null
    >('/api/training-schedules', identityParser, null);

    return { data, loading, error };
};
