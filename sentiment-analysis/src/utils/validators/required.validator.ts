import type { FormControl } from '../form/form-control.svelte';
import type { Validator, ValidatorError } from './validator';

export class RequiredValidator implements Validator {
	private _message: string;

	constructor(message: string = 'Pole jest wymagane') {
		this._message = message;
	}

	validate(value: FormControl['value']): true | ValidatorError {
		return typeof value !== 'undefined' && value !== null && String(value)?.trim() !== ''
			? true
			: { message: this._message, validator: 'required' };
	}
}
