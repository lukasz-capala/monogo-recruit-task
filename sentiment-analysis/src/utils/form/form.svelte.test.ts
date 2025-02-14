import { describe, expect, test } from 'vitest';
import { Form } from './form.svelte';
import { FormControl } from './form-control.svelte';
import { FormState } from './form-state';
import { RequiredValidator } from '../validators/required.validator';

describe('Form', () => {
	test('should change state after validation', () => {
		const form = new Form({
			control1: new FormControl(null, [new RequiredValidator()]),
			control2: new FormControl(26),
			control3: new FormControl({ test: 'abc' })
		});

		expect(form.state).toBe(FormState.PRISTINE);

		form.getControl('control1').value = '123';

		form.validate();
		expect(form.state).toBe(FormState.VALID);

		form.getControl('control1').value = '';

		form.validate();
		expect(form.state).toBe(FormState.INVALID);
	});

	test('should return proper value', () => {
		const form = new Form({
			control1: new FormControl(null, [new RequiredValidator()]),
			control2: new FormControl(26),
			control3: new FormControl<{ test: string }>({ test: 'abc' })
		});

		form.getControl('control1').value = '123';
		form.getControl('control2').value = 0;
		(form.getControl('control3').value as { test: string }).test = 'def';

		expect(form.value).toEqual({
			control1: '123',
			control2: 0,
			control3: { test: 'def' }
		});
	});
});
