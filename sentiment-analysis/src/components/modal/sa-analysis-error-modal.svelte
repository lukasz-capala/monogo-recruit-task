<script lang="ts">
	import type { AnalysisError } from '@/utils/api/analysis-error';
	import SaModal from './sa-modal.svelte';

	let {
		showModal = $bindable(),
		analysisError
	}: { showModal: boolean; analysisError?: AnalysisError } = $props();
</script>

<SaModal bind:showModal>
	{#snippet dialogHeader()}
		<h3 class="analysis-error__title">Wystąpił problem</h3>
		<p class="analysis-error__desc">
			Spróbuj ponownie zamykając to okno. Poniżej znajdują się szczegóły problemu, które możesz
			wysłać do pomocy technicznej.
		</p>
	{/snippet}
	<p class="analysis-error__details">
		{#if analysisError?.status !== -1}
			<span>{analysisError?.status}:</span>
		{/if}
		<span>{@html analysisError?.message}</span>
	</p>
	{#snippet dialogFooter()}
		<aside>
			<p class="analysis-error__summary">Możesz wykonać analizę ponownie zamykając to okno.</p>
		</aside>
	{/snippet}
</SaModal>

<style lang="scss">
	@use '@/scss/colors' as colors;
	@use '@/scss/typography' as typography;

	.analysis-error {
		&__title {
			@include typography.heading-3;
			color: colors.use-color(text);
		}

		&__desc {
			@include typography.small;
			font-weight: 300;
			color: colors.use-color(accent);
		}

		&__details {
			display: block;
			@include typography.small;
			font-weight: 300;
			color: colors.use-color(invalid);
			background-color: colors.use-color(shadow);
			padding: 5px;
		}

		&__summary {
			@include typography.small;
			font-weight: 100;
			color: colors.use-color(text-bright);
		}
	}
</style>
