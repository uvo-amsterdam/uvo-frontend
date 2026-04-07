import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { logger } from '../../../../lib/logger';

export async function POST(request: NextRequest) {
    // 1. Check for the secret token in the URL search params
    const searchParams = request.nextUrl.searchParams;
    const secret = searchParams.get('secret');

    if (secret !== process.env.DIRECTUS_WEBHOOK_SECRET) {
        return NextResponse.json(
            { error: 'Unauthorized webhook request' },
            { status: 401 },
        );
    }

    try {
        // 2. Parse the JSON body
        const body = await request.json();
        const { collection, keys, event } = body;

        // 3. Log the trigger
        logger.info(
            `[Directus Webhook] Triggered event '${event}' for collection: ${collection}, keys: ${keys}`,
        );

        // 4. Invalidate the relevant Next.js cache paths based on the collection
        if (!collection) {
            return NextResponse.json(
                { message: 'Webhook received but no collection specified.' },
                { status: 200 },
            );
        }

        switch (collection) {
            case 'monday_even_schedule':
            case 'monday_uneven_schedule':
            case 'thursday_even_schedule':
            case 'thursday_uneven_schedule':
                revalidatePath('/api/training-schedules');
                break;
            case 'team_compositions':
                revalidatePath('/api/team-compositions');
                break;
            default:
                // Fallback: clear the entire cache layout if the collection isn't explicitly mapped
                revalidatePath('/', 'layout');
                break;
        }

        return NextResponse.json(
            { revalidated: true, now: Date.now(), collection, keys },
            { status: 200 },
        );
    } catch (err) {
        logger.error({ err }, '[Directus Webhook] Error processing request');
        return NextResponse.json(
            { error: 'Error processing webhook request' },
            { status: 500 },
        );
    }
}
