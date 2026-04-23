export interface DirectusTeamMapping {
    id: string;
    SiteDisplayName: string;
    TeamImageUrl: string | null;
    NevoboTeamName: string;
    PossibleAliases: string | string[] | null;
    Competition_Yes_No: boolean;
}

export interface TeamMapping {
    id: string;
    siteDisplayName: string;
    teamImageUrl: string;
    nevoboTeamName: string;
    possibleAliases: string[];
    competitionYesNo: boolean;
}
