<script lang="ts">
	import SaButton from '@/components/form/sa-button.svelte';
	import SaError from '@/components/form/sa-error.svelte';
	import SaTextarea from '@/components/form/sa-textarea.svelte';
	import SaFrame from '@/components/misc/sa-frame.svelte';
	import SaLoading from '@/components/misc/sa-loading.svelte';
	import SaAnalysisErrorModal from '@/components/modal/sa-analysis-error-modal.svelte';
	import SaAnalysisResultModal from '@/components/modal/sa-analysis-result-modal.svelte';
	import { AnalysisService } from '@/service/analysis.service';
	import type { AnalysisError } from '@/utils/api/analysis-error';
	import type { AnalysisResponse } from '@/utils/api/analysis-response';
	import { ApiConfig } from '@/utils/api/api-config';
	import { FormControl } from '@/utils/form/form-control.svelte';
	import { FormState } from '@/utils/form/form-state';
	import { Form } from '@/utils/form/form.svelte';
	import type { AnalysisForm } from '@/utils/interfaces/analysis-form';
	import type { AnalysisState } from '@/utils/interfaces/analysis-state';
	import { MaxLengthValidator } from '@/utils/validators/max-length.validator';
	import { RequiredValidator } from '@/utils/validators/required.validator';

	const INPUT_MAX_LENGTH = 500;
	const form = new Form<AnalysisForm>({
		message: new FormControl<string>('', [
			new RequiredValidator(),
			new MaxLengthValidator(
				INPUT_MAX_LENGTH,
				`Długość wiadomości nie może przekraczać ${INPUT_MAX_LENGTH} znaków`
			)
		])
	});

	let analysisState: AnalysisState = $state({
		loading: false,
		analysisResult: [],
		showSuccessModal: false,
		analysisError: undefined,
		showErrorModal: false
	});

	const submitForm = async (event: SubmitEvent): Promise<void> => {
		event.preventDefault();
		form.validate();

		if (form.state === FormState.VALID) {
			const analysisService = new AnalysisService(ApiConfig.axios);
			analysisState.loading = true;

			try {
				const evaluationResult = await analysisService.sendAnalysis(form.value.message);
				analysisState.analysisResult = evaluationResult as AnalysisResponse;
				analysisState.showSuccessModal = true;
			} catch (error) {
				analysisState.analysisError = error as AnalysisError;
				analysisState.showErrorModal = true;
			}

			analysisState.loading = false;
		}
	};
</script>

<svelte:head>
	<title>Analiza sentymentu</title>
	<meta name="description" content="To jest strona do zadania rekrutacyjnego" />
</svelte:head>

<SaFrame>
	<header>
		<h1 class="page__header">Analiza sentymentu</h1>
	</header>
	<main>
		{#if analysisState.loading}
			<SaLoading />
		{:else}
			<form method="POST" action="/" onsubmit={submitForm}>
				<div class="page__form__body">
					<p class="page__form__body__description">
						Dokonaj swojej analizy wypełniając formularz poniżej
					</p>
					<SaTextarea
						name="message"
						control={form.getControl('message')}
						placeholder="Wpisz tekst tutaj, do {INPUT_MAX_LENGTH} znaków"
						data-testid="page-form-textarea"
					/>

					{#each form.getControl('message').errors as error}
						<SaError>{error.message}</SaError>
					{/each}

					<SaButton buttonType="submit" data-testid="page-form-submitButton">Analizuj</SaButton>
				</div>
			</form>
		{/if}
	</main>
</SaFrame>

<SaAnalysisResultModal
	bind:showModal={analysisState.showSuccessModal}
	analysisResult={analysisState.analysisResult}
	data-testid="page-resultModal"
/>
<SaAnalysisErrorModal
	bind:showModal={analysisState.showErrorModal}
	analysisError={analysisState.analysisError}
/>

<style lang="scss">
	@use '@/scss/colors' as colors;
	@use '@/scss/typography' as typography;

	:global(html),
	:global(body) {
		height: 100%;
	}

	:global(body) {
		font-size: 62.5%;
		background-color: colors.use-color(primary);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.page {
		&__header {
			color: colors.use-color(text);
			@include typography.heading-1;
		}

		&__form {
			&__body {
				padding: 0 var(--padding-default);
				display: flex;
				flex-direction: column;

				&__description {
					color: colors.use-color(accent);
					@include typography.paragraph;
				}

				& :global(.button) {
					margin-top: var(--padding-default);
				}
			}
		}
	}
</style>
