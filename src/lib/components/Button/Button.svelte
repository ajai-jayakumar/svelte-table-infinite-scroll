<script lang="ts">
	import { type HTMLButtonAttributes } from 'svelte/elements';

	let {
		type = 'button',
		class: className = '',
		onclick: onClick = () => {},
		children,
		...props
	}: HTMLButtonAttributes = $props();
</script>

<button
	{type}
	onclick={onClick}
	class={`h-10 cursor-pointer rounded-3xl bg-[var(--default-color)] px-4 py-2 text-white hover:opacity-90 focus:ring-2 focus:ring-[#30A46C]/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
	{...props}
>
	{@render children?.()}
</button>
