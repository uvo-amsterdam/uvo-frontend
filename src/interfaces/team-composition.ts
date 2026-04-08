export interface DirectusTeamComposition {
    id: number;
    user_created: string | null;
    user_updated: string | null;
    date_updated: string | null;
    Team: string;
    Name: string;
    Position: string;
}

export interface TeamComposition {
    id: number;
    team: string;
    name: string;
    position: string;
}
