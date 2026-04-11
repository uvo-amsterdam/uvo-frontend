export interface TeamConfig {
    id: string; // The URL slug (e.g., 'gents-1')
    siteDisplayName: string; // The formatted name for the UI (e.g., 'Gents 1')
    teamImageUrl: string; // The exact path to the team photo
    nevoboTeamName: string; // The string used in Nevobo data (e.g., 'HS 1')
    possibleAliases: string[]; // Aliases to match against Directus (e.g., ['gents 1', 'heren 1'])
}

export const TEAMS: TeamConfig[] = [
    // Gents
    {
        id: 'gents-1',
        siteDisplayName: 'Gents 1',
        teamImageUrl: '/images/teamphotos/G1.jpeg',
        nevoboTeamName: 'HS 1',
        possibleAliases: ['gents 1', 'heren 1'],
    },
    {
        id: 'gents-2',
        siteDisplayName: 'Gents 2',
        teamImageUrl: '/images/teamphotos/G2.jpeg',
        nevoboTeamName: 'HS 2',
        possibleAliases: ['gents 2', 'heren 2'],
    },
    {
        id: 'gents-3',
        siteDisplayName: 'Gents 3',
        teamImageUrl: '/images/teamphotos/G3.jpeg',
        nevoboTeamName: 'HS 3',
        possibleAliases: ['gents 3', 'heren 3'],
    },
    {
        id: 'gents-4',
        siteDisplayName: 'Gents 4',
        teamImageUrl: '/images/teamphotos/G4.jpeg',
        nevoboTeamName: 'HS 4',
        possibleAliases: ['gents 4', 'heren 4'],
    },
    {
        id: 'gents-5',
        siteDisplayName: 'Gents 5',
        teamImageUrl: '/images/teamphotos/G5.jpeg',
        nevoboTeamName: 'HS 5',
        possibleAliases: ['gents 5', 'heren 5'],
    },
    {
        id: 'gents-b',
        siteDisplayName: 'Gents Beginners',
        teamImageUrl: '/images/teamphotos/GB.jpeg',
        nevoboTeamName: 'HS B',
        possibleAliases: ['gents b', 'heren b'],
    },
    // Ladies
    {
        id: 'ladies-1',
        siteDisplayName: 'Ladies 1',
        teamImageUrl: '/images/teamphotos/L1.jpeg',
        nevoboTeamName: 'DS 1',
        possibleAliases: ['ladies 1', 'dames 1'],
    },
    {
        id: 'ladies-2',
        siteDisplayName: 'Ladies 2',
        teamImageUrl: '/images/teamphotos/L2.jpeg',
        nevoboTeamName: 'DS 2',
        possibleAliases: ['ladies 2', 'dames 2'],
    },
    {
        id: 'ladies-3',
        siteDisplayName: 'Ladies 3',
        teamImageUrl: '/images/teamphotos/L3.jpeg',
        nevoboTeamName: 'DS 3',
        possibleAliases: ['ladies 3', 'dames 3'],
    },
    {
        id: 'ladies-4',
        siteDisplayName: 'Ladies 4',
        teamImageUrl: '/images/teamphotos/unknown.webp',
        nevoboTeamName: 'DS 4',
        possibleAliases: ['ladies 4', 'dames 4'],
    },
    {
        id: 'ladies-5',
        siteDisplayName: 'Ladies 5',
        teamImageUrl: '/images/teamphotos/L5.jpeg',
        nevoboTeamName: 'DS 5',
        possibleAliases: ['ladies 5', 'dames 5'],
    },
    {
        id: 'ladies-6',
        siteDisplayName: 'Ladies 6',
        teamImageUrl: '/images/teamphotos/L6.jpeg',
        nevoboTeamName: 'DS 6',
        possibleAliases: ['ladies 6', 'dames 6'],
    },
    {
        id: 'ladies-7',
        siteDisplayName: 'Ladies 7',
        teamImageUrl: '/images/teamphotos/L7.jpeg',
        nevoboTeamName: 'DS 7',
        possibleAliases: ['ladies 7', 'dames 7'],
    },
    {
        id: 'ladies-8',
        siteDisplayName: 'Ladies 8',
        teamImageUrl: '/images/teamphotos/L8.jpeg',
        nevoboTeamName: 'DS 8',
        possibleAliases: ['ladies 8', 'dames 8'],
    },
    {
        id: 'ladies-b',
        siteDisplayName: 'Ladies Beginners',
        teamImageUrl: '/images/teamphotos/LB.jpeg',
        nevoboTeamName: 'DS B',
        possibleAliases: ['ladies b', 'dames b'],
    },
];

export const getTeamConfig = (id: string) =>
    TEAMS.find(team => team.id === id) || null;
