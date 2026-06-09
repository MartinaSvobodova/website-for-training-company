import { db } from "$lib/server/db";
import { course, invoice, order, roles, users } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";
import { eq} from 'drizzle-orm';

export const load: PageServerLoad = async ({params}) => {
    let user = await db.select().from(users).where(eq(users.id, params.id));
    let ownedCourses = await db.select().from(course).leftJoin(order, eq(course.id, order.courseId)).where(eq(order.userId, user[0].id));
    let invoices = await db.select().from(invoice).leftJoin(order, eq(invoice.id, order.invoiceId)).where(eq(order.userId, user[0].id));
    let isAdmin = false;
    let userRole = await db.select({role: roles.roleName}).from(roles).where(eq(roles.userId, user[0].id));
    if (userRole.some(r => r.role === 'admin')) {
        isAdmin = true;
    }
    let unfinishedCourses = await db.select().from(course).where(eq(course.isPublished, false));
    return {user: user[0], ownedCourses: ownedCourses, invoices: invoices, isAdmin: isAdmin, unfinishedCourses: unfinishedCourses};
};