export interface NevoboMatchResult {
    date: Date;
    time: Date | null;
    homeTeam: string;
    awayTeam: string;
    result: string;
    setScores: string;
    region: string;
    poule: string;
    code: string;
    roomCode: string;
    location: string;
    city: string;
    matchStatus: string;
}
