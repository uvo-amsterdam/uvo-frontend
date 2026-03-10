import * as XLSX from 'xlsx';

export async function parseNevoboExcel(
    response: Response,
): Promise<unknown[][]> {
    const buffer = await response.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
    });
    // Skip header
    return rows.slice(1);
}
