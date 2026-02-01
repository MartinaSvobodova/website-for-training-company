<script lang="ts">
	import type { PageProps } from "../../$types";
	let { data }: PageProps = $props();

</script>
<div>
	<form method="POST" action="?/buyCourse">
    	<button type="submit">
        	Buy Course
		</button>
	</form>
</div>

<style>
</style>