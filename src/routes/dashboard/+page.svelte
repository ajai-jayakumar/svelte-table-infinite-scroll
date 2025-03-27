<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Button, Input, Label } from '$lib';
	import type { ActionResult } from '@sveltejs/kit';

	import SuperDebug, { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, errors, enhance: superFormEnhance, submitting } = superForm(data.form);

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
		<form class="flex justify-end" method="POST" action="?/logout" use:enhance={handleSubmit}>
			<Button type="submit" disabled={loading}>
				{loading ? 'Logging out...' : 'Logout'}
			</Button>
		</form>
	</nav>

	<section class="flex-1 p-8">
		<form method="POST" use:superFormEnhance action="?/createEmployee">
			<section class="form-group flex items-baseline gap-8">
				<fieldset class="flex flex-col">
					<legend class="mb-2">
						<Label for="employees" class="font-semibold text-gray-500">
							Anzahl der Mitarbeiter die angelegt werden
						</Label>
					</legend>
					<Input
						type="number"
						id="employees"
						name="employees"
						bind:value={$form.employees}
						aria-required="true"
						required
					/>
					{#if $errors.employees}
						<small class="error-message text-sm text-red-500" role="alert">
							{$errors.employees}
						</small>
					{/if}
				</fieldset>
				<Button type="submit" disabled={$submitting}>Mitarbeiter anlegen</Button>
			</section>
		</form>
	</section>
</main>
