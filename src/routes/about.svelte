<script lang="ts">
	interface errorField {
		success?: boolean,
		message?: string
	}
	let ideaName = "";
	let ideaDescription = "";
	let errors: errorField = {}
	const clicker = async () => {
		const res = await fetch(`/api/user/${'boggerspoggers'}`)
		const json = await res.json()
		// console.log(ideaDescription, ideaName)
		const message = await fetch('/api/idea/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				idea: ideaName,
				description: ideaDescription,
				author: json.id
			})
		})
		errors = await message.json()
	};
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<h2>This is your idea name</h2><br />
<input bind:value={ideaName} /><br />
<h2>This is your idea description</h2><br />
<input bind:value={ideaDescription} /><br />

<button on:click={clicker}>Create Idea</button>

{#if errors.message}
	<p style="color: {errors.success? 'green': 'red'}">{errors.message}</p>
{/if}