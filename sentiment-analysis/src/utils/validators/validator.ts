import type { FormControl } from '../form/form-control.svelte';

export interface Validator {
	validate(value: FormControl['value']): true | ValidatorError;
}

export interface ValidatorError {
    message: string;
    validator: string;
}