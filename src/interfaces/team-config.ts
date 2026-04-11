export interface TeamConfig {
    id: string; // The URL slug (e.g., 'gents-1')
    siteDisplayName: string; // The formatted name for the UI (e.g., 'Gents 1')
    teamImageUrl: string; // The exact path to the team photo
    nevoboTeamName: string; // The string used in Nevobo data (e.g., 'HS 1')
    possibleAliases: string[]; // Aliases to match against Directus (e.g., ['gents 1', 'heren 1'])
}
