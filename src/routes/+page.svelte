<script lang="ts">
	import { Button } from '$lib';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
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
				goto('/dashboard');
			}
		};
	}
</script>

<main class="flex h-dvh w-full items-center justify-center bg-gray-50">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<h1 class="mb-8 text-center text-2xl font-bold text-gray-900">Welcome Back</h1>
		<form method="POST" use:enhance={handleSubmit}>
			<Button type="submit" disabled={loading} class="w-full">
				{loading ? 'Logging in...' : 'Login'}
			</Button>
		</form>
	</div>
</main>
