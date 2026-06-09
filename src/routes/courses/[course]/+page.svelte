<script lang="ts">
	import Chapter from "$lib/components/Chapter.svelte";
	import type { PageProps } from "./$types";
	let { data }: PageProps = $props();

	const chapterItems = $derived(
		data.chapters.map((chapter, index) => ({
			...chapter,
			displayNumber: chapter.indexInCourse ?? index + 1
		}))
	);
	const totalChapters = $derived(chapterItems.length);

	let selectedChapterNumber = $state(1);
	const selectedChapterIndex = $derived(
		chapterItems.findIndex((chapter) => chapter.displayNumber === selectedChapterNumber)
	);
	const selectedChapter = $derived(
		chapterItems.find((chapter) => chapter.displayNumber === selectedChapterNumber) ?? chapterItems[0]
	);

	const goToPreviousChapter = () => {
		if (selectedChapterIndex <= 0) {
			return;
		}

		selectedChapterNumber = chapterItems[selectedChapterIndex - 1].displayNumber;
	};

	const goToNextChapter = () => {
		if (selectedChapterIndex === -1 || selectedChapterIndex >= chapterItems.length - 1) {
			return;
		}

		selectedChapterNumber = chapterItems[selectedChapterIndex + 1].displayNumber;
	};
</script>

<section class="container mx-auto p-4 md:p-6">
	<div class="grid gap-6 md:grid-cols-[120px_1fr]">
		<nav aria-label="Course chapters" class="rounded-lg border border-surface-500/30 p-3">
			<ul class="flex flex-row gap-2 md:flex-col">
				{#each chapterItems as chapter}
					<li>
						<a
							href={`#chapter-${chapter.displayNumber}`}
							onclick={(event) => {
								event.preventDefault();
								selectedChapterNumber = chapter.displayNumber;
							}}
							class={`btn w-10 justify-center ${selectedChapterNumber === chapter.displayNumber ? "variant-filled-primary" : "variant-soft"}`}
						>
							{chapter.displayNumber}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div>
			{#if selectedChapter}
				<div id={`chapter-${selectedChapter.displayNumber}`}>
					<Chapter
						number={selectedChapter.displayNumber}
						content={selectedChapter.htmlContent}
						nOfChapters={totalChapters}
						onPrevious={goToPreviousChapter}
						onNext={goToNextChapter}
					/>
				</div>
			{:else}
				<p>No chapters available for this course yet.</p>
			{/if}
		</div>
	</div>
</section>