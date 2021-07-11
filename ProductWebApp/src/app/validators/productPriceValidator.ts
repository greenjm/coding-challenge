import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function productPriceValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = +control.value;

        const priceValid = !isNaN(value) && 1 <= value && value <= 20000;

        return !priceValid ? { productPrice: true } : null;
    }
}