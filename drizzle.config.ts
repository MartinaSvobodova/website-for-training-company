import { defineConfig } from 'drizzle-kit';
import { env } from '$env/dynamic/private';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: { url: env.DATABASE_URL },
	verbose: true,
	strict: true
});
