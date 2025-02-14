import { describe, expect, test } from 'vitest';
import { MaxLengthValidator } from './max-length.validator';

describe('MaxLengthValidator', () => {
    test('should validate', () => {
        const validator = new MaxLengthValidator(10);

        let validationResult = validator.validate('This text is too long');
        expect(validationResult).toEqual({
            message: 'Pole powinno zawierać nie więcej niż 10 znaków',
            validator: 'maxLength'
        });

        validationResult = validator.validate('This is ok');
        expect(validationResult).toEqual(true);

        validationResult = validator.validate(12.345);
        expect(validationResult).toEqual(true);
        
        validationResult = validator.validate(undefined);
        expect(validationResult).toEqual({
            message: 'Pole powinno zawierać nie więcej niż 10 znaków',
            validator: 'maxLength'
        });
    });

    test('should validate with custom message', () => {
        const validator = new MaxLengthValidator(10, 'Test');

        const validationResult = validator.validate('This text is too long');
        expect(validationResult).toEqual({
            message: 'Test',
            validator: 'maxLength'
        });
    });
})