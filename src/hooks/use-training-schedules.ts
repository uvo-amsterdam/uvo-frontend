import type { TrainingSchedules } from '@interfaces/training-schedule';
import { useApiFetch } from './use-api-fetch';

export const useTrainingSchedules = () => {
    const { data, loading, error } = useApiFetch<
        TrainingSchedules,
        TrainingSchedules | null
    >('/api/training-schedules', parseTrainingSchedules, null);

    return { data, loading, error };
};

function parseTrainingSchedules(raw: TrainingSchedules): TrainingSchedules {
    return raw;
}
