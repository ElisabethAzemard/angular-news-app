/* IMPORTS */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ObservablesService } from 'src/app/services/observable/observable.service';


/* DEFINITION & EXPORT */
@Component({
    selector: 'app-news-source-selector',
    templateUrl: './news-source-selector.component.html',
    styleUrls: ['./news-source-selector.component.scss']
})
export class NewsSourceSelectorComponent implements OnInit {

    // PROPERTIES
    public formData: FormGroup;
    @Output() formSubmit = new EventEmitter();
    newsSources: object;
    newsList: object;
    previousKeyword: string;
    previousSource: string;


    // DEPENDENCIES INJECTION
    constructor(private FormBuilder: FormBuilder, private ObservablesService: ObservablesService) {
        // Get news sources data from observer
        this.ObservablesService.getObservableData('sources').subscribe(observerNewsSourcesData => {
            if (observerNewsSourcesData === null) {
                this.newsSources = null;
            } else {
                if (observerNewsSourcesData) {
                    this.newsSources = observerNewsSourcesData;
                } else {
                    this.newsSources = null;
                }
            }
        });
    }


    // METHODS
    // reset form
    private resetForm = () => {
        this.formData = this.FormBuilder.group({
            source: [null, Validators.required],
            keyword: [null],
        });

        if (localStorage.getItem('last-source')) {
            this.previousSource = localStorage.getItem('last-source');
            this.formData.patchValue({ source: this.previousSource });
        }

        if (localStorage.getItem('last-keyword')) {
            this.previousKeyword = localStorage.getItem('last-keyword');
            this.formData.patchValue({ keyword: this.previousKeyword });
        }
    };


    // LIFECYCLE HOOKS
    ngOnInit() {
        this.resetForm();
    }

}
