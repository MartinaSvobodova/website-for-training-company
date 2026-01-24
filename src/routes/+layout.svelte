<script lang="ts">
    import './layout.css';
    import { SignIn, SignOut } from '@auth/sveltekit/components';
    import type { LayoutProps } from './$types';
    import '@skeletonlabs/skeleton/themes/cerberus';
    import logo from '$lib/assets/lgo.jpg';

    let { data, children }: LayoutProps = $props();
    
    let isMenuOpen = $state(false);
    function closeMenu() {
        isMenuOpen = false;
    }
</script>

<link rel="icon" href={logo} />

<div class="min-h-screen mx-4 flex flex-col relative">
    
    <nav class="flex flex-row items-center justify-between p-2 mt-4 preset-outlined-surface-200-800 rounded-container-token"> 
        
        <a href="/" class="text-xl font-bold tracking-wide hover:opacity-75 transition-opacity whitespace-nowrap">
            Company Name
        </a>

        <div class="hidden md:flex flex-row gap-1">
            <a href="/about" class="btn text-base px-4 hover:variant-soft-primary"> About </a>
            <a href="/testimonials" class="btn text-base px-4 hover:variant-soft-primary"> Testimonials </a>
            <a href="/contact" class="btn text-base px-4 hover:variant-soft-primary"> Contact </a>
        </div>

        <div class="flex items-center gap-2">
            
            <div class="hidden md:block">
                {#if !data.session}
                    <SignIn>
                        <div slot="submitButton" class="btn preset-filled-primary-500 font-medium">Sign in</div>
                    </SignIn>
                {:else}
                    <SignOut>
                        <div slot="submitButton" class="btn preset-filled-primary-500 font-medium">Sign out</div>
                    </SignOut>
                {/if}
            </div>

            <button 
                class="btn p-0 px-3 preset-outlined-primary-500 md:hidden" 
                onclick={() => isMenuOpen = !isMenuOpen}
            >
                <span class="font-bold text-3xl leading-none pb-1">≡</span>
            </button>
        </div>

    </nav>

    {#if isMenuOpen}
        <div class="absolute top-20 left-0 right-0 z-50 flex flex-col gap-2 p-4 shadow-xl preset-filled-surface-100-900 rounded-container-token md:hidden border border-surface-500/30">
            <a href="/about" onclick={closeMenu} class="btn variant-soft-primary w-full justify-start">About</a>
            <a href="/testimonials" onclick={closeMenu} class="btn variant-soft-primary w-full justify-start">Testimonials</a>
            <a href="/contact" onclick={closeMenu} class="btn variant-soft-primary w-full justify-start">Contact</a>
            
            <hr class="opacity-50 my-1" />

            <div class="w-full">
                {#if !data.session}
                    <SignIn>
                        <div slot="submitButton" class="btn preset-filled-primary-500 w-full">Sign in</div>
                    </SignIn>
                {:else}
                    <SignOut>
                        <div slot="submitButton" class="btn preset-filled-primary-500 w-full">Sign out</div>
                    </SignOut>
                {/if}
            </div>
        </div>
    {/if}

    <main class="mt-8">
        {@render children()}
    </main>
    
    <footer class="flex flex-row py-4 mt-auto border-t border-surface-500/30">
        <div class="justify-start">Contact</div>
        <div class="grow"></div>
        <a href="mailto:a@a.com" class="justify-end hover:underline">email</a>
    </footer>
</div>

<style lang="scss">
    :global(body) {
        padding: 0;
        margin: 0;
    }
</style>
<!--
<link rel="icon" href={logo} />


<div class="min-h-100vh mx-1em flex flex-col">
	<nav class="btn-group flex flex-row preset-outlined-surface-200-800">
		<a href="/" class="btn justify-self-start preset-outlined-primary-500"> Home </a>
		<a href="/about" class="btn justify-self-start preset-outlined-primary-500"> About </a>
		<a href="/testimonials" class="btn justify-self-start preset-outlined-primary-500">
			Testimonials
		</a>
		<a href="/contact" class="btn justify-self-start preset-outlined-primary-500"> Contact </a>
		<div class="flex grow flex-row justify-end">
			{#if !data.session}
				<SignIn>
					<div slot="submitButton" class="buttonPrimary">Sign in</div>
				</SignIn>
			{:else}
				<SignOut>
					<div slot="submitButton" class="buttonPrimary">Sign out</div>
				</SignOut>
			{/if}
		</div>
	</nav>
	<header class="font-size-2rem <lg:flex-col flex flex-row justify-between">
		<div class="text-xl font-medium text-black dark:text-white flex flex-row justify-center">Company name here</div>
	</header>
	<main>
		{@render children()}
	</main>
	<footer class="flex flex-row">
		<div class="justify-start">Contact</div>
		<div class="grow"></div>
		<a href="mailto:a@a.com" class="justify-end">email</a>
	</footer>
</div>

<style lang="scss">
	:global(body) {
		padding: 0;
		margin: 0;
	}
</style>
-->