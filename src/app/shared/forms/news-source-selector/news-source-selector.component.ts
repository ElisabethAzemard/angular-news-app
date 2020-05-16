import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-news-source-selector',
  templateUrl: './news-source-selector.component.html',
  styleUrls: ['./news-source-selector.component.scss']
})
export class NewsSourceSelectorComponent implements OnInit {

  // Declarations
  public formData: FormGroup;
  @Output() formSubmit = new EventEmitter();

  // Inject FormBuilder
  constructor(private FormBuilder: FormBuilder) { }

  // Method to reset form)
  private resetForm = () => {
    this.formData = this.FormBuilder.group({
      source: [null, Validators.required],
      keyword: [null],
    });
  };

  // Start
  ngOnInit() {
    this.resetForm();
  }

}
