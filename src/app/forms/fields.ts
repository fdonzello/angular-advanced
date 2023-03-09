import { FormControl, Validators } from "@angular/forms";
import { restrictDomains } from "./validators";

// These fields will be probably useful in other page such as Reset Password, Change Password, Change Email.
export const emailField = new FormControl('', {
    nonNullable: true,
    validators: [
        Validators.required,
        Validators.email,
        restrictDomains(["gmail.com", "hotmail.com"])
    ],
})
export const passwordField = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(6)]
})