import readXlsxFile from 'read-excel-file/node';

export async function parseNevoboExcel(
    response: Response,
): Promise<unknown[][]> {
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // read-excel-file/node can read from a Buffer
    const rows = await readXlsxFile(buffer);

    // Skip header, take first 15 (most recent results / next fixtures)
    return rows.slice(1, 16);
}
