import { db } from "$lib/server/db";
import { course, invoice, order, users } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";
import { eq} from 'drizzle-orm';

export const load: PageServerLoad = async ({params}) => {
    let user = await db.select().from(users).where(eq(users.id, params.id));
    let ownedCourses = await db.select().from(course).leftJoin(order, eq(course.id, order.courseId)).where(eq(order.userId, user[0].id));
    let invoices = await db.select().from(invoice).leftJoin(order, eq(invoice.id, order.invoiceId)).where(eq(order.userId, user[0].id));
    return {user: user[0], ownedCourses: ownedCourses, invoices: invoices};
};