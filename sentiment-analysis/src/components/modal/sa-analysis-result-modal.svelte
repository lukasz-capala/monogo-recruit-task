<script lang="ts">
	import type { AnalysisLabel, AnalysisResponse } from '@/utils/api/analysis-response';
	import SaModal from './sa-modal.svelte';

	let {
		showModal = $bindable(),
		analysisResult,
		...restProps
	}: {
		showModal: boolean;
		analysisResult?: AnalysisResponse;
		[key: `data-${string}`]: string;
	} = $props();

	const getScore = (result: AnalysisResponse | undefined, label: AnalysisLabel) => {
		let score = result?.find((record) => record.label === label)?.score ?? 0;
		return (score *= 100.0);
	};

	let positiveResult: number = $derived(getScore(analysisResult, 'POSITIVE'));
	let negativeResult: number = $derived(getScore(analysisResult, 'NEGATIVE'));

	let positiveResultFixed: string = $derived(positiveResult.toFixed(2));
	let negativeResultFixed: string = $derived(negativeResult.toFixed(2));
</script>

<SaModal bind:showModal {...restProps}>
	{#snippet dialogHeader()}
		<h3 class="analysis-result__title">Twoja analiza została zakończona</h3>
		<p class="analysis-result__desc">Poniżej możesz zapoznać się z wynikami.</p>
	{/snippet}
	<div class="analysis-result__box analysis-result__box--positive">
		<svg
			class="analysis-result__box__image analysis-result__box--positive__image"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clip-path="url(#clip0_429_11223)">
				<circle
					cx="12"
					cy="12"
					r="9"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M15.4649 14C14.7733 15.1956 13.4806 16 12 16C10.5195 16 9.22678 15.1956 8.53516 14"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M14 10L15 9L16 10"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M10 10L9 9L8 10"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_429_11223">
					<rect width="24" height="24" fill="white" />
				</clipPath>
			</defs>
		</svg>

		<p class="analysis-result__box__text" data-testid="analysis-result-modal:positive">
			Twoja wiadomość została oceniona pozytywnie w {positiveResultFixed}%<br />
			{#if positiveResult > 50.0}
				To znaczy że wszystko jest jak najbardziej w porządku.
			{:else}
				To znaczy że musisz jeszcze popracować nad swoją oceną.
			{/if}
		</p>
	</div>
	<div class="analysis-result__box analysis-result__box--negative">
		<svg
			class="analysis-result__box__image analysis-result__box--negative__image"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clip-path="url(#clip0_429_10999)">
				<circle
					cx="12"
					cy="12"
					r="9"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M10 15.5352C10.5884 15.1948 11.2715 15 12.0001 15C12.7287 15 13.4118 15.1948 14.0001 15.5352"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M17 10.5L14 9.5"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M10 9.5L7 10.5"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_429_10999">
					<rect width="24" height="24" fill="white" />
				</clipPath>
			</defs>
		</svg>

		<p class="analysis-result__box__text" data-testid="analysis-result-modal:negative">
			Twoja wiadomość została oceniona negatywnie w {negativeResultFixed}%<br />
			{#if negativeResult > 50.0}
				To znaczy że warto przeanalizować wiadomość jeszcze raz i podać więcej szczegółów.
			{:else}
				To znaczy że nie musisz się martwić.
			{/if}
		</p>
	</div>
	{#snippet dialogFooter()}
		<aside>
			<p class="analysis-result__summary">Możesz wykonać analizę ponownie zamykając to okno.</p>
		</aside>
	{/snippet}
</SaModal>

<style lang="scss">
	@use '@/scss/colors' as colors;
	@use '@/scss/typography' as typography;

	.analysis-result {
		&__title {
			@include typography.heading-3;
			color: colors.use-color(text);
		}

		&__desc {
			@include typography.paragraph;
			color: colors.use-color(accent);
		}

		&__box {
			display: flex;
			margin: var(--padding-default) 0;

			&__image {
				max-width: 128px;
				height: auto;
			}

			&__text {
				@include typography.small;
				color: colors.use-color(text);
			}

			&--positive {
				&__image {
					path,
					circle {
						stroke: colors.use-color(primary);
					}
				}
			}

			&--negative {
				&__image {
					path,
					circle {
						stroke: colors.use-color(invalid);
					}
				}
			}
		}

		&__summary {
			@include typography.small;
			font-weight: 100;
			color: colors.use-color(text-bright);
		}
	}
</style>
