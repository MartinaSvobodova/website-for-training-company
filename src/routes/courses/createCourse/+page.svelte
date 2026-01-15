<script lang="ts">
	import QuillEditor from "$lib/components/QuillEditor.svelte";
	import { onMount } from "svelte";

	let sortable_element: HTMLElement;
	let indexes = [1];
	let courseName = "";
    let coursePrice = 0;
	let selectedChapter = 1;

	onMount(async ()=>{
		const {Sortable} = await import("sortablejs");
		Sortable.create(sortable_element, {onEnd:(event)=>{
			let tmp = indexes[event.oldIndex];
			indexes.splice(event.oldIndex, 1);
			indexes.splice(event.newIndex, 0, tmp);
		}});
	});

	function addChapter() {
		indexes.push(indexes.length + 1);
		indexes = indexes;
	}

	function removeChapter(chapter) {
		let chapterIndex = indexes.find((element) => element = chapter);
		console.log(chapterIndex)
		indexes.splice(chapterIndex, 1);
		indexes = indexes;
	}

	function editChapter(chapter) {
		selectedChapter = chapter;
	}
</script>

<label for="name">Course name</label>

<input
  type="text"
  id="name"
  name="name"
  required
  class="text-black"
  bind:value={courseName}/>

<label for="price">Course price in CZK</label>

<input
  type="number"
  id="price"
  name="price"
  required
  class="text-black"
  bind:value={courseName}/>


<div class="flex flex-row">
	<div>
		<ul bind:this={sortable_element}>
		{#each indexes as i }
			<li>Chapter {i}</li> <button on:click={() => editChapter(i)}>Edit Chapter</button> <button on:click={() => removeChapter(i)}>Remove Chapter</button>
		{/each}
		</ul>
		<button on:click={addChapter}>Add Chapter</button>
	</div>
	<div>
		<h3>Current Chapter {selectedChapter}</h3>
		<QuillEditor>	
		</QuillEditor>
		<button>Submit Chapter</button>
	</div>
</div>