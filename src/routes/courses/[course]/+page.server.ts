import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { course, chapter } from "$lib/server/db/schema";
import { eq} from 'drizzle-orm';
import rtfToHTML from "@iarna/rtf-to-html";

const convertRtfToHtml = async (rtfContent: string | null): Promise<string> => {
    if (!rtfContent) {
        return "";
    }

    if (!rtfContent.trimStart().startsWith("{\\rtf")) {
        return rtfContent;
    }

    return new Promise((resolve, reject) => {
            rtfToHTML.fromString(rtfContent, (error: Error | null, html: string) => {
            if (error) {
                reject(error);
                return;
            }

                const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
            resolve(bodyMatch ? bodyMatch[1] : html);
        });
    });
};

export const load: PageServerLoad = async ({params}) => {
    let courseContent = await db.select().from(course).where(eq(course.id, params.course));
    let chapters = await db.select().from(chapter).where(eq(chapter.courseId, params.course)).orderBy(chapter.indexInCourse);

    const chaptersWithHtml = await Promise.all(
        chapters.map(async (chapterItem) => ({
            ...chapterItem,
            htmlContent: await convertRtfToHtml(chapterItem.content)
        }))
    );

    return {course: courseContent[0], chapters: chaptersWithHtml};
};