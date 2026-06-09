<script lang="ts">
	import type { PageProps } from "./$types";
    let { data }: PageProps = $props();
</script>

<section class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="mb-6 border-b border-surface-500/20 pb-4">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Account</h1>
        <p class="mt-2 max-w-2xl text-sm opacity-80 sm:text-base">
            Manage your profile details, purchased courses, and invoices in one place.
        </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
        <div class="card rounded-xl border border-surface-500/30 p-5 lg:col-span-1">
            <h2 class="text-lg font-semibold">Personal Information</h2>
            <div class="mt-4 space-y-3 text-sm sm:text-base">
                <p class="wrap-break-word"><span class="font-semibold">Name:</span> {data.user.name ?? "Not set"}</p>
                <p class="wrap-break-word"><span class="font-semibold">Email:</span> {data.user.email ?? "Not set"}</p>
            </div>
        </div>

        <div class="card rounded-xl border border-surface-500/30 p-5 lg:col-span-2">
            <h2 class="text-lg font-semibold">Owned Courses</h2>
            {#if data.ownedCourses.length > 0}
                <ul class="mt-4 space-y-3">
                    {#each data.ownedCourses as courseRow}
                        <li class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-surface-500/20 p-3">
                            <p class="min-w-0 flex-1 wrap-break-word font-medium">
                                {courseRow?.course?.title ?? "Untitled course"}
                            </p>
                            <a href="/courses/{courseRow?.course?.id}" class="btn variant-soft-primary whitespace-nowrap">
                                Go to course
                            </a>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p class="mt-4 opacity-80">You do not own any courses yet.</p>
            {/if}
        </div>

        {#if data.isAdmin}
            <div class="card rounded-xl border border-surface-500/30 p-5 lg:col-span-2">
                <h2 class="text-lg font-semibold">Unfinished Courses</h2>
                {#if data.unfinishedCourses.length > 0}
                    <ul class="mt-4 space-y-3">
                        {#each data.unfinishedCourses as unfinishedCourse}
                            <li class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-surface-500/20 p-3">
                                <p class="min-w-0 flex-1 wrap-break-word font-medium">{unfinishedCourse?.title || "Untitled course"}</p>
                                <a href="/courses/createCourse/{unfinishedCourse?.id}" class="btn variant-filled-primary whitespace-nowrap">
                                    Edit course
                                </a>
                            </li>
                        {/each}
                    </ul>
                {:else}
                    <p class="mt-4 opacity-80">There are no unfinished courses.</p>
                {/if}
            </div>
        {/if}

        <div class="card rounded-xl border border-surface-500/30 p-5 lg:col-span-1">
            <h2 class="text-lg font-semibold">Invoices</h2>
            {#if data.invoices.length > 0}
                <ul class="mt-4 space-y-2">
                    {#each data.invoices as invoiceRow}
                        <li class="rounded-lg border border-surface-500/20 px-3 py-2 text-sm">
                            Invoice #{invoiceRow?.invoice?.id}
                        </li>
                    {/each}
                </ul>
            {:else}
                <p class="mt-4 opacity-80">You do not have any invoices yet.</p>
            {/if}
        </div>
    </div>
</section>