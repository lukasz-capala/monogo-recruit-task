<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		buttonType = 'submit',
		children,
		...restProps
	}: {
		buttonType: 'submit' | 'reset' | 'button' | null;
		children: Snippet;
		[key: `data-${string}`]: string;
	} = $props();
</script>

<button type={buttonType} {...restProps} class="button">
	{@render children()}
</button>

<style lang="scss">
	@use '@/scss/form' as form;

	.button {
		@include form.button;
	}
</style>
