<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		showModal = $bindable(),
		dialogHeader,
		children,
		dialogFooter,
		...restProps
	}: {
		showModal: boolean;
		dialogHeader?: Snippet;
		children: Snippet;
		dialogFooter?: Snippet;
		[key: `data-${string}`]: string;
	} = $props();
	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (showModal) dialog?.showModal();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
	{...restProps}
	class="dialog"
>
	<div class="dialog__header">
		<div class="dialog__header__content">
			{@render dialogHeader?.()}
		</div>
		<button class="dialog__header__close" onclick={() => dialog?.close()}>Zamknij</button>
	</div>

	<div class="dialog__body">
		{@render children()}
	</div>

	<div class="dialog__footer">
		{@render dialogFooter?.()}
	</div>
</dialog>

<style lang="scss">
	@use '@/scss/components/frame' as frame;
	@use '@/scss/colors' as colors;
	@use '@/scss/form' as form;

	.dialog {
		width: 100%;
		max-width: 800px;
		@include frame.frame();
		box-shadow: 0 30px 50px 0 colors.use-color(shadow);
		border: none;

		&__header {
			display: flex;

			&__close {
				@include form.button;
				align-self: flex-start;
			}
		}
	}

	.dialog::backdrop {
		background: colors.use-color(primary);
	}
</style>
