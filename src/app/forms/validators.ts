import { AbstractControl, ValidationErrors } from "@angular/forms";

export function restrictDomains(allowedDomains: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as string;

        for (const domain of allowedDomains) {
            if (value.endsWith(domain)) {
                return null;
            }
        }

        return {
            "allowedDomains": {
                "allowed": allowedDomains.join(", "),
                "actual": value
            }
        };
    }
}