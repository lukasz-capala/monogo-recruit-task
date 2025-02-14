import { describe, expect, test } from 'vitest';
import { RequiredValidator } from './required.validator';

describe('RequiredValidator', () => {
    test('should validate', () => {
        const validator = new RequiredValidator();

        let validationResult = validator.validate('');
        expect(validationResult).toEqual({
            message: 'Pole jest wymagane',
            validator: 'required'
        });

        validationResult = validator.validate('This is ok');
        expect(validationResult).toEqual(true);

        validationResult = validator.validate(12.345);
        expect(validationResult).toEqual(true);
        
        validationResult = validator.validate(false);
        expect(validationResult).toEqual(true);

        validationResult = validator.validate(null);
        expect(validationResult).toEqual({
            message: 'Pole jest wymagane',
            validator: 'required'
        });
        
        validationResult = validator.validate(undefined);
        expect(validationResult).toEqual({
            message: 'Pole jest wymagane',
            validator: 'required'
        });
    });

    test('should validate with custom message', () => {
        const validator = new RequiredValidator('Test');

        const validationResult = validator.validate('');
        expect(validationResult).toEqual({
            message: 'Test',
            validator: 'required'
        });
    });
})