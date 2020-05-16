import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

  // Declarations
  public formData: FormGroup;
  @Output() formSubmit = new EventEmitter();

  // Inject FormBuilder
  constructor(private FormBuilder: FormBuilder) { }

  // Method to reset form)
  private resetForm = () => {
    this.formData = this.FormBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  };

  // Start
  ngOnInit() {
    this.resetForm();
  }

}
