import { AbstractControl, ValidationErrors } from "@angular/forms";

export function forbidenName(nameRegex: RegExp){

    return (control: AbstractControl): ValidationErrors | null =>{
        const forbiden = nameRegex.test(control.value)
        return forbiden ? {forbidenName: {value: control.value}} : null
    }

}