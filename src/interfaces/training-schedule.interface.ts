export interface DirectusScheduleItem {
    id: number;
    Time: string;
    Field_1: string | null;
    Field_2: string | null;
    Field_3: string | null;
    Field_4: string | null;
}

export interface ScheduleItem {
    id: number;
    time: string;
    field1: string | null;
    field2: string | null;
    field3: string | null;
    field4: string | null;
}

export interface TrainingSchedules {
    mondayEven: ScheduleItem[];
    mondayUneven: ScheduleItem[];
    thursdayEven: ScheduleItem[];
    thursdayUneven: ScheduleItem[];
}
