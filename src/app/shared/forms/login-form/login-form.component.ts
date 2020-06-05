/* IMPORTS */
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/* DEFINITION & EXPORT */
@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    // PROPERTIES
    public formData: FormGroup;
    @Output() formSubmit = new EventEmitter();
    @Output() notRegistered = new EventEmitter();


    // DEPENDENCIES INJECTION
    constructor(private FormBuilder: FormBuilder) { }


    // METHODS
    // reset form
    private resetForm = () => {
        this.formData = this.FormBuilder.group({
            email: [null, Validators.required],
            password: [null, Validators.required],
        });
    };


    // LIFECYCLE HOOKS
    ngOnInit() {
        this.resetForm();
    }

}
