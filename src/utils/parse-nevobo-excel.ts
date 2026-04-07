import type { NevoboFixture } from '@interfaces/nevobo-fixture';
import type { NevoboMatchResult } from '@interfaces/nevobo-match-result';
import pino from 'pino';
import { parseData, readSheet, type Schema } from 'read-excel-file/node';

const logger = pino();

const NEVOBO_FIXTURE_SCHEMA: Schema<NevoboFixture> = {
    date: { column: 'Datum', type: Date },
    time: { column: 'Tijd', type: Date },
    homeTeam: { column: 'Team thuis', type: String },
    awayTeam: { column: 'Team uit', type: String },
    location: { column: 'Locatie', type: String },
    field: { column: 'Veld', type: String },
    city: { column: 'Plaats', type: String },
    poule: { column: 'Poule', type: String },
    matchStatus: { column: 'Wedstrijd status', type: String },
};

const NEVOBO_RESULTS_SCHEMA: Schema<NevoboMatchResult> = {
    date: { column: 'Datum', type: Date },
    time: { column: 'Tijd', type: Date },
    homeTeam: { column: 'Team thuis', type: String },
    awayTeam: { column: 'Team uit', type: String },
    result: { column: 'Uitslag', type: String },
    setScores: { column: 'Setstanden', type: String },
    region: { column: 'Regio', type: String },
    poule: { column: 'Poule', type: String },
    code: { column: 'Code', type: String },
    roomCode: { column: 'Zaalcode', type: String },
    location: { column: 'Zaal', type: String },
    city: { column: 'Plaats', type: String },
    matchStatus: { column: 'Wedstrijd status', type: String },
};

export async function parseNevoboExcel(
    response: Response,
    type: 'fixtures',
): Promise<NevoboFixture[]>;
export async function parseNevoboExcel(
    response: Response,
    type: 'results',
): Promise<NevoboMatchResult[]>;
export async function parseNevoboExcel(
    response: Response,
    type: 'fixtures' | 'results',
): Promise<NevoboFixture[] | NevoboMatchResult[]> {
    try {
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const data = await readSheet(buffer);

        if (type === 'fixtures') {
            const result = parseData(data, NEVOBO_FIXTURE_SCHEMA);
            const rows: NevoboFixture[] = [];
            for (const item of result) {
                if (item.errors) {
                    logger.debug(item.errors, 'Minor parsing issues:');
                }
                if (item.object) {
                    rows.push(item.object);
                }
            }
            return rows;
        } else {
            const result = parseData(data, NEVOBO_RESULTS_SCHEMA);
            const rows: NevoboMatchResult[] = [];
            for (const item of result) {
                if (item.errors) {
                    logger.debug(item.errors, 'Minor parsing issues:');
                }
                if (item.object) {
                    rows.push(item.object);
                }
            }
            return rows;
        }
    } catch (error) {
        throw new Error(
            `Failed to process Nevobo export: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}
