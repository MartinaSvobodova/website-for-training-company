import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { course, order } from '$lib/server/db/schema';
import { and } from 'drizzle-orm';
import { env } from '$env/dynamic/private';
import Stripe from 'stripe';

export const load: PageServerLoad = async ({params}) => {
    let courseFromDb = await db.select().from(course).where(and(eq(course.isPublished, true), eq(course.id, params.course)));
    let courses = courseFromDb.map((c) =>({
        id: c.id,
        title: c.title,
        price: c.price,
        shortDescription: c.shortDescription,
        image: c.image
    }));
    
    return { courses };
};

export const actions: Actions = {
    buyCourse: async (event) => {
        let stripe = new Stripe(env.STRIPE_KEY);
        const session = await event.locals.auth();
        const user_id = session?.user?.id;
        const course_id = event.params.course;
        let cFromDb = await db.select({price: course.price, title: course.title}).from(course).where(eq(course.id, course_id));
        let item = cFromDb[0];
        let orderId;
        if (!user_id){
            throw redirect(303, "/");
        }
        let result = await db.insert(order)
                            .values({userId: user_id, companyId: null, courseId: course_id, invoiceId: null, paymentStatus: false})
                            .returning({id: order.id});
        orderId = result[0];

        let stripe_session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: 'czk',
                    product_data: {
                        name: item.title,
                    },
                    //unit_amount: (Number(item.price) * 100) Add this later for production
                    unit_amount: 10000
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${event.url.origin}/success/?orderId=${orderId.id}`,
            cancel_url: `${event.url.origin}/testimonials`,
            metadata: {
                orderId: orderId?.id.toString() 
            }
        });
        if(stripe_session.url){
            throw redirect(303, stripe_session.url);
        }
    }
};