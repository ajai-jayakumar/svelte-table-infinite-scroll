<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		class: className = '',
		name,
		placeholder = '',
		type = 'text',
		value = $bindable(),
		...props
	}: HTMLInputAttributes = $props();
</script>

<input
	id={name}
	{name}
	{type}
	{placeholder}
	bind:value
	class={`input h-10 rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none ${
		type === 'number'
			? 'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
			: ''
	} ${className}`}
	{...props}
/>
