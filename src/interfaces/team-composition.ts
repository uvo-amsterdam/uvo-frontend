export interface DirectusTeamComposition {
    id: number;
    user_created: string;
    user_updated: string;
    date_updated: string;
    Team: string | null;
    Name: string | null;
    Position: string | null;
}

export interface TeamComposition {
    id: number;
    team: string | null;
    name: string | null;
    position: string | null;
}
