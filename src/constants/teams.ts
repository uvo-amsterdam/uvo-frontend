export interface TeamConfig {
    id: string; // The URL slug (e.g., 'gents-1')
    site_display_name: string; // The formatted name for the UI (e.g., 'Gents 1')
    team_image_url: string; // The exact path to the team photo
    nevobo_team_name: string; // The string used in Nevobo data (e.g., 'HS 1')
    possible_aliases: string[]; // Aliases to match against Directus (e.g., ['gents 1', 'heren 1'])
}

export const TEAMS: TeamConfig[] = [
    // Gents
    {
        id: 'gents-1',
        site_display_name: 'Gents 1',
        team_image_url: '/images/teamphotos/G1.jpeg',
        nevobo_team_name: 'HS 1',
        possible_aliases: ['gents 1', 'heren 1'],
    },
    {
        id: 'gents-2',
        site_display_name: 'Gents 2',
        team_image_url: '/images/teamphotos/G2.jpeg',
        nevobo_team_name: 'HS 2',
        possible_aliases: ['gents 2', 'heren 2'],
    },
    {
        id: 'gents-3',
        site_display_name: 'Gents 3',
        team_image_url: '/images/teamphotos/G3.jpeg',
        nevobo_team_name: 'HS 3',
        possible_aliases: ['gents 3', 'heren 3'],
    },
    {
        id: 'gents-4',
        site_display_name: 'Gents 4',
        team_image_url: '/images/teamphotos/G4.jpeg',
        nevobo_team_name: 'HS 4',
        possible_aliases: ['gents 4', 'heren 4'],
    },
    {
        id: 'gents-5',
        site_display_name: 'Gents 5',
        team_image_url: '/images/teamphotos/G5.jpeg',
        nevobo_team_name: 'HS 5',
        possible_aliases: ['gents 5', 'heren 5'],
    },
    {
        id: 'gents-b',
        site_display_name: 'Gents Beginners',
        team_image_url: '/images/teamphotos/GB.jpeg',
        nevobo_team_name: 'HS B',
        possible_aliases: ['gents b', 'heren b'],
    },
    // Ladies
    {
        id: 'ladies-1',
        site_display_name: 'Ladies 1',
        team_image_url: '/images/teamphotos/L1.jpeg',
        nevobo_team_name: 'DS 1',
        possible_aliases: ['ladies 1', 'dames 1'],
    },
    {
        id: 'ladies-2',
        site_display_name: 'Ladies 2',
        team_image_url: '/images/teamphotos/L2.jpeg',
        nevobo_team_name: 'DS 2',
        possible_aliases: ['ladies 2', 'dames 2'],
    },
    {
        id: 'ladies-3',
        site_display_name: 'Ladies 3',
        team_image_url: '/images/teamphotos/L3.jpeg',
        nevobo_team_name: 'DS 3',
        possible_aliases: ['ladies 3', 'dames 3'],
    },
    {
        id: 'ladies-4',
        site_display_name: 'Ladies 4',
        team_image_url: '/images/teamphotos/unknown.webp',
        nevobo_team_name: 'DS 4',
        possible_aliases: ['ladies 4', 'dames 4'],
    },
    {
        id: 'ladies-5',
        site_display_name: 'Ladies 5',
        team_image_url: '/images/teamphotos/L5.jpeg',
        nevobo_team_name: 'DS 5',
        possible_aliases: ['ladies 5', 'dames 5'],
    },
    {
        id: 'ladies-6',
        site_display_name: 'Ladies 6',
        team_image_url: '/images/teamphotos/L6.jpeg',
        nevobo_team_name: 'DS 6',
        possible_aliases: ['ladies 6', 'dames 6'],
    },
    {
        id: 'ladies-7',
        site_display_name: 'Ladies 7',
        team_image_url: '/images/teamphotos/L7.jpeg',
        nevobo_team_name: 'DS 7',
        possible_aliases: ['ladies 7', 'dames 7'],
    },
    {
        id: 'ladies-8',
        site_display_name: 'Ladies 8',
        team_image_url: '/images/teamphotos/L8.jpeg',
        nevobo_team_name: 'DS 8',
        possible_aliases: ['ladies 8', 'dames 8'],
    },
    {
        id: 'ladies-b',
        site_display_name: 'Ladies Beginners',
        team_image_url: '/images/teamphotos/LB.jpeg',
        nevobo_team_name: 'DS B',
        possible_aliases: ['ladies b', 'dames b'],
    },
];

export const getTeamConfig = (id: string) =>
    TEAMS.find(team => team.id === id) || null;
