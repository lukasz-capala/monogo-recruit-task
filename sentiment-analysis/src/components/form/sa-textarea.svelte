<script lang="ts">
	import { FormControl } from '@/utils/form/form-control.svelte';
	import { FormState } from '@/utils/form/form-state';

	const {
		name,
		control,
		placeholder,
		...restProps
	}: {
		name: string;
		control: FormControl;
		placeholder: string;
		[key: `data-${string}`]: string;
	} = $props();

	const getValue = (): string => {
		return control.value as string;
	};

	const setValue = (value: string): void => {
		control.value = value;
	};
</script>

<textarea
	bind:value={getValue, setValue}
	class={['textarea', control.state === FormState.INVALID && 'textarea--invalid']}
	{name}
	{placeholder}
	{...restProps}
></textarea>

<style lang="scss">
	@use '@/scss/form' as form;

	.textarea {
		@include form.textarea;

		&--invalid {
			@include form.textarea-invalid;
		}
	}
</style>
