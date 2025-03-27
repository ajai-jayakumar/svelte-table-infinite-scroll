<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';

	let { children, for: LabelFor, class: className, ...props }: HTMLLabelAttributes = $props();
</script>

<label for={LabelFor} class={className} {...props}>
	{@render children?.()}
</label>
