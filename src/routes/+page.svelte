<script lang="ts">
	import { enhance } from "$app/forms";
	import Course from "$lib/components/Course.svelte";
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

</script>
<section class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-surface-500/20 pb-4">
		<div class="min-w-0">
			<h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Offered Courses</h1>
			<p class="mt-2 max-w-2xl text-sm opacity-80 sm:text-base">
				Browse all published training courses and open what you already own.
			</p>
		</div>

		{#if data.isAdmin}
			<form method="POST" action="?/addCourse" use:enhance>
				<button type="submit" class="btn variant-filled-primary whitespace-nowrap">
					Add Course
				</button>
			</form>
		{/if}
	</div>

	{#if data.courses.length === 0}
		<div class="rounded-xl border border-surface-500/30 bg-surface-900/30 p-8 text-center">
			<p class="text-lg font-semibold">No courses available yet.</p>
			<p class="mt-2 text-sm opacity-80">Check back soon for new content.</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			{#each data.courses as course}
				<Course
					id={course.id}
					title={course.title}
					image={course.image}
					price={course.price}
					isOwned={course.isOwned}
					description={course.shortDescription}
				/>
			{/each}
		</div>
	{/if}
</section>