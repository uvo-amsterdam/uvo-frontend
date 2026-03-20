import type { NevoboMatch } from '@interfaces/nevobo-match';
import pino from 'pino';
import readXlsxFile, { type Schema } from 'read-excel-file/node';

const logger = pino();

const NEVOBO_SCHEMA: Schema<NevoboMatch> = {
    date: { column: 'Datum', type: Date },
    time: { column: 'Tijd', type: String },
    homeTeam: { column: 'Team thuis', type: String },
    awayTeam: { column: 'Team uit', type: String },
    location: { column: 'Locatie', type: String },
    field: { column: 'Veld', type: String },
    poule: { column: 'Poule', type: String },
    matchStatus: { column: 'Wedstrijd status', type: String },
};

export async function parseNevoboExcel(
    response: Response,
): Promise<NevoboMatch[]> {
    try {
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { rows, errors } = await readXlsxFile(buffer, {
            schema: NEVOBO_SCHEMA,
        });

        if (errors.length > 0) {
            logger.debug(errors, 'Minor parsing issues:');
        }

        return rows as NevoboMatch[];
    } catch (error) {
        throw new Error(
            `Failed to process Nevobo export: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}
