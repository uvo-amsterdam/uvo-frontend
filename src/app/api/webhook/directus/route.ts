import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

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
        console.log(
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
            case 'Monday_Even_Schedule':
            case 'Monday_Uneven_Schedule':
            case 'Thursday_Even_Schedule':
            case 'Thursday_Uneven_Schedule':
                revalidatePath('/api/training-schedules');
                break;
            case 'Team_Compositions':
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
        console.error('[Directus Webhook] Error processing request:', err);
        return NextResponse.json(
            { error: 'Error processing webhook request' },
            { status: 500 },
        );
    }
}
