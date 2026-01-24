<script lang="ts">
    import placeholderImage from '$lib/assets/course.jpg';
    let { id, title, image, price, isOwned, description } = $props();
</script>

<div class="card overflow-hidden flex flex-col md:flex-row shadow-lg hover:shadow-xl transition-shadow my-4 mx-auto max-w-sm md:max-w-none">
    
    <header class="w-full aspect-video md:aspect-auto md:w-72 md:h-auto shrink-0 relative">
        <img 
            src={placeholderImage} 
            alt={title} 
            class="w-full h-full object-cover"
        />
        </header>

    <div class="p-4 md:p-6 flex flex-col justify-between w-full gap-4">
        
        <div>
            <h3 class="h3 font-bold leading-tight">{title}</h3>
            <p class="opacity-70 mt-2 text-base line-clamp-3">{description}</p>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-surface-500/30 mt-auto gap-4">
            
            {#if !isOwned}
                <div class="text-xl font-bold text-primary-500 whitespace-nowrap">
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
                    <form action="/purchase/{id}" method="POST">
                        <button type="submit" class="btn variant-filled-secondary font-bold shadow-md">
                            Buy Now
                        </button>
                    </form>
                {/if}
            </div>
        </div>

    </div>
</div>
<!--
<script lang="ts">
    let { id, title, image, price, isOwned } = $props();
</script>

<div class="flex flex-row border-2 border-black m-4">
    <div>
        Image here
    </div>
    <div>
        {title}
    </div>
    {#if !isOwned}
        <div>
            Price: {price}
        </div>
    {/if}
    <div>
        {#if isOwned}
            <form action="/courses/"{id}>
                <button>Go to course</button>
            </form>
        {:else}
            <form action="/purchase/"{id}>
                <button>Buy course</button>
            </form>
        {/if}
    </div>
</div>
-->