<script lang="ts">
    let { number, content, nOfChapters, onPrevious, onNext } = $props<{
        number: number;
        content: string;
        nOfChapters: number;
        onPrevious?: () => void;
        onNext?: () => void;
    }>();
</script>

<div class="card overflow-hidden flex flex-col md:flex-row shadow-lg hover:shadow-xl transition-shadow my-4 mx-auto max-w-sm md:max-w-none">
    
    <header class="w-full aspect-video md:aspect-auto md:w-72 md:h-auto shrink-0 relative">
        Chapter {number}
    </header>

    <div class="p-4 md:p-6 flex flex-col justify-between w-full gap-4">
        
        <div class="chapter-content">
            {@html content ?? ""}
        </div>
        {#if number !== 1}
            <button class="btn variant-soft" onclick={onPrevious}>Previous chapter</button>
        {/if}
        {#if number !== nOfChapters}
            <button class="btn variant-filled-primary" onclick={onNext}>Next chapter</button>
        {/if}
    </div>
</div>

<style>
    .chapter-content :global(h1) {
        font-size: 2rem;
        font-weight: 700;
        margin: 0.5rem 0;
    }

    .chapter-content :global(h2) {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0.5rem 0;
    }

    .chapter-content :global(h3) {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0.5rem 0;
    }

    .chapter-content :global(ul) {
        list-style: disc;
        padding-left: 1.5rem;
        margin: 0.75rem 0;
    }

    .chapter-content :global(ol) {
        list-style: decimal;
        padding-left: 1.5rem;
        margin: 0.75rem 0;
    }

    .chapter-content :global(li) {
        margin: 0.25rem 0;
    }

    .chapter-content :global(.ql-indent-1) {
        padding-left: 3em;
    }

    .chapter-content :global(.ql-indent-2) {
        padding-left: 6em;
    }

    .chapter-content :global(.ql-indent-3) {
        padding-left: 9em;
    }

    .chapter-content :global(.ql-align-center) {
        text-align: center;
    }

    .chapter-content :global(.ql-align-right) {
        text-align: right;
    }

    .chapter-content :global(.ql-align-justify) {
        text-align: justify;
    }

    .chapter-content :global(blockquote) {
        border-left: 4px solid rgb(148 163 184 / 0.8);
        padding-left: 1rem;
        margin: 0.75rem 0;
        opacity: 0.9;
    }

    .chapter-content :global(img),
    .chapter-content :global(video),
    .chapter-content :global(iframe) {
        display: block;
        max-width: 100%;
        height: auto;
        margin: 1rem 0;
    }

    .chapter-content :global(iframe.ql-video) {
        width: min(100%, 760px);
        aspect-ratio: 16 / 9;
    }
</style>