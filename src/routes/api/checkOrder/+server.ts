import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { order } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function GET({ url }) {
    const orderId = url.searchParams.get('id');

    if (!orderId) {
        return json({ status: 'error', message: 'Missing Order ID' }, { status: 400 });
    }
    const result = await db.select({ status: order.paymentStatus })
                           .from(order)
                           .where(eq(order.id, orderId));

    if (result.length === 0) return json({ status: 'not_found' });
    
    return json({ status: result[0].status });
};