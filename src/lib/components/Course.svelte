<script lang="ts">
    import placeholderImage from '$lib/assets/course.jpg';
    let { id, title, image, price, isOwned, description } = $props();
</script>

<div class="card min-w-0 overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
    
    <header class="relative w-full aspect-video shrink-0">
        <img 
            src={placeholderImage} 
            alt={title} 
            class="w-full h-full object-cover"
        />
        </header>

    <div class="flex min-w-0 flex-col gap-4 p-4 md:p-6">
        
        <div class="min-w-0">
            <h3 class="h3 wrap-break-word font-bold leading-tight">{title || "Untitled Course"}</h3>
            <p class="mt-2 course-description wrap-break-word text-base opacity-70">{description || "No description yet."}</p>
        </div>

        <div class="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-surface-500/30 pt-4">
            
            {#if !isOwned}
                <div class="max-w-full wrap-break-word text-xl font-bold text-primary-500">
                    {price} CZK
                </div>
            {:else}
                <div class="badge variant-soft-success">Owned</div>
            {/if}

            <div class="w-auto">
                {#if isOwned}
                    <a href="/courses/{id}" class="btn variant-filled-primary font-bold">
                        Open
                    </a>
                {:else}
                    <form action="/purchase/{id}">
                        <button type="submit" class="btn variant-filled-secondary font-bold shadow-md">
                            Buy Now
                        </button>
                    </form>
                {/if}
            </div>
        </div>

    </div>
</div>

<style>
    .course-description {
        overflow: hidden;
        display: -webkit-box;
        line-clamp: 3;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
</style>