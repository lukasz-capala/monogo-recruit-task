import type { Validator, ValidatorError } from '../validators/validator';
import { FormState } from './form-state';

export class FormControl<T = unknown> {
	private _value: T | null | undefined = $state(null);
	private _state: FormState = $state(FormState.PRISTINE);
	private _validators?: Array<Validator>;
	private _errors?: Array<ValidatorError> = $state([]);

	constructor(value: T | null | undefined, validators?: Array<Validator>) {
		this._value = value;
		this._validators = validators;
		this._state = FormState.PRISTINE;
	}

	get value(): T | null | undefined {
		return this._value;
	}

	set value(value: T | null | undefined) {
		this._value = value;
		this.validate();
	}

	get errors(): Array<ValidatorError> {
		return this._errors ?? [];
	}

	get state(): FormState {
		return this._state;
	}

	validate(): void {
		const errors: Array<ValidatorError> = [];

		this._validators?.forEach((validator) => {
			const result = validator.validate(this._value);

			if (result === true) {
				return;
			}

			errors.push(result);
		});

		this._errors = errors;
		this._state = errors.length ? FormState.INVALID : FormState.VALID;
	}
}
