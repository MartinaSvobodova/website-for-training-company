<script lang="ts">
	import type { PageProps } from "./$types";
    let { data }: PageProps = $props();
</script>

<h3>Account Details</h3>
<div class="card">
    <h4>Personal Information</h4>
    <p><strong>Name:</strong> {data.user.name}</p>
    <p><strong>Email:</strong> {data.user.email}</p>
</div>
<div class="card">
    <h4>Owned Courses</h4>
    {#if data.ownedCourses.length > 0}
        <ul>
            {#each data.ownedCourses as course}
                <li>{course?.course?.title}</li>
            {/each}
        </ul>
    {:else}
        <p>You do not own any courses yet.</p>
    {/if}
</div>
<div class="card">
    <h4>Invoices</h4>
    {#if data.invoices.length > 0}
        <ul>
            {#each data.invoices as invoice}
                <li>Invoice #{invoice?.invoice?.id}</li>
            {/each}
        </ul>
    {:else}
        <p>You do not have any invoices yet.</p>
    {/if}
</div>