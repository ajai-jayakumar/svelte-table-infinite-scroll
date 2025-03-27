<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Button } from '$lib';
	import type { ActionResult } from '@sveltejs/kit';

	let loading = $state(false);

	function handleSubmit() {
		loading = true;
		return async ({ result }: { result: ActionResult }) => {
			loading = false;
			if (result.type === 'error') {
				alert(result.error.message);
			}
			if (result.type === 'success') {
				goto('/');
			}
		};
	}
</script>

<main class="flex h-dvh w-full flex-col">
	<nav class="w-full p-4">
		<form class="flex justify-end" method="POST" use:enhance={handleSubmit}>
			<Button type="submit" disabled={loading}>
				{loading ? 'Logging out...' : 'Logout'}
			</Button>
		</form>
	</nav>

	<section class="flex-1 p-8">Body Section</section>
</main>
