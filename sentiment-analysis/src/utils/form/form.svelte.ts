import type { FormConfig } from './form-config';
import { FormControl } from './form-control.svelte';
import { FormState } from './form-state';

export class Form<T = { [key: string]: unknown }> {
	private _config: FormConfig = $state({});
	private _state: FormState = $state(FormState.PRISTINE);

	constructor(config: FormConfig) {
		this._config = config;
	}

	get state(): FormState {
		return this._state;
	}

	get value(): T {
		return Object.entries(this._config).reduce(
			(acc, [name, control]) => {
				acc[name] = control.value;
				return acc;
			},
			{} as { [key: string]: unknown }
		) as T;
	}

	getControl(name: string): FormControl {
		if (!this._config[name]) {
			throw Error(`form control ${name} does not exist`);
		}
		return this._config[name];
	}

	validate(): void {
		let errors = 0;

		Object.values(this._config).forEach((formControl: FormControl) => {
			formControl.validate();
			errors += formControl.errors.length;
		});

		this._state = errors ? FormState.INVALID : FormState.VALID;
	}
}
