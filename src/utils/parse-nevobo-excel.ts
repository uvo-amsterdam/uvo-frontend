import type { NevoboFixture } from '@interfaces/nevobo-fixture';
import type { NevoboMatchResult } from '@interfaces/nevobo-match-result';
import pino from 'pino';
import {
    parseSheetData,
    type Row,
    readSheet,
    type Schema,
} from 'read-excel-file/node';

const logger = pino();

const isDate = (value: unknown): value is Date => value instanceof Date;

/** with null before schema parsing.
 * Nevobo exports can contain strings like "Vervallen" in this column for cancelled matches.
 * Under the parseSheetData contract, any parse error causes `objects` to be undefined,
 * so we sanitize upfront to avoid losing all parsed rows.
 */
function nullifyNonDateColumn(data: Row[], columnName: string): Row[] {
    if (data.length === 0) return data;
    const colIndex = data[0].findIndex(cell => cell === columnName);
    if (colIndex === -1) return data;

    return data.map((row, rowIndex) => {
        if (rowIndex === 0) return row;
        const cell = row[colIndex];
        if (cell !== null && !isDate(cell)) {
            const sanitized = [...row];
            sanitized[colIndex] = null;
            return sanitized;
        }
        return row;
    });
}

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
    let rawData: Row[];
    try {
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        rawData = await readSheet(buffer);
        const data = nullifyNonDateColumn(rawData, 'Tijd');

        if (type === 'fixtures') {
            const result = parseSheetData(data, NEVOBO_FIXTURE_SCHEMA);
            if (result.errors?.length) {
                logger.warn(result.errors, 'Parsing issues in fixtures sheet:');
            }
            return result.objects ?? [];
        } else {
            const result = parseSheetData(data, NEVOBO_RESULTS_SCHEMA);
            if (result.errors?.length) {
                logger.warn(result.errors, 'Parsing issues in results sheet:');
            }
            return result.objects ?? [];
        }
    } catch (error) {
        throw new Error(
            `Failed to process Nevobo export: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}
