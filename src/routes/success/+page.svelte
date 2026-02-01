<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let status = "Processing payment...";
    let orderId = $page.url.searchParams.get('orderId');

    async function checkStatus() {
        if (!orderId) return;

        const response = await fetch(`/api/checkOrder?id=${orderId}`);
        const data = await response.json();
        console.log("DB Status:", data.status);
        if (data.status === true) { 
            status = "Payment Successful!";
            return true; 
        } else {
            status = "Confirming with bank...";
            return false;
        }
    }

    onMount(() => {
        // "Listen" every 2 seconds
        const interval = setInterval(async () => {
            const isPaid = await checkStatus();
            if (isPaid) clearInterval(interval);
        }, 2000);

        return () => clearInterval(interval);
    });
</script>

<div class="card p-10 text-center">
    <h1 class="h1">{status}</h1>
    {#if status === "Payment Successful!"}
        <a href="/" class="btn variant-filled-primary">Go to Home</a>
    {:else}
        <p>Please wait while we confirm your transaction...</p>
    {/if}
</div>