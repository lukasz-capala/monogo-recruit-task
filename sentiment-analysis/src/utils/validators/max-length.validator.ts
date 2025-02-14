import type { FormControl } from '../form/form-control.svelte';
import type { Validator, ValidatorError } from './validator';

export class MaxLengthValidator implements Validator {
	private _message: string;
	private _maxLength: number;

	constructor(maxLength: number, message?: string) {
		this._message = message ?? `Pole powinno zawierać nie więcej niż ${maxLength} znaków`;
		this._maxLength = maxLength;
	}

	validate(value: FormControl['value']): true | ValidatorError {
		return typeof value !== 'undefined' &&
			value !== null &&
			String(value)?.length <= this._maxLength
			? true
			: { message: this._message, validator: 'maxLength' };
	}
}
