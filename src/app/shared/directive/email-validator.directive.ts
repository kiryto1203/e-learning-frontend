import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";
import {Common} from "../utility/common";

export function emailValidator(emailRe: RegExp): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		return !emailRe.test(control.value) ? { 'email': { value: control.value }} : null;
	}
}

@Directive({
	selector: '[appEmailValidator]',
	providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements Validator {
	registerOnValidatorChange(fn: () => void): void {
	}
	
	validate(control: AbstractControl): ValidationErrors | null {
		return control.value ? emailValidator(new RegExp(Common.REGEXP_EMAIL, 'i'))(control) : null;
	}
	
	constructor() {
	}
	
}

