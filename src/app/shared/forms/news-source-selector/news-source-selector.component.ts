/* IMPORTS */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CrudService } from 'src/app/services/crud/crud.service';
import { ObservablesService } from 'src/app/services/observable/observable.service';
import { ActivatedRoute } from '@angular/router';


/* DEFINITION & EXPORT */
@Component({
    selector: 'app-news-source-selector',
    templateUrl: './news-source-selector.component.html',
    styleUrls: ['./news-source-selector.component.scss']
})
export class NewsSourceSelectorComponent implements OnInit {

    // PROPERTIES
    @Input() bookmarks: any;
    @Output() allNews = new EventEmitter();
    @Output() allSources = new EventEmitter();
    @Output() currentSource = new EventEmitter();
    formData: FormGroup;
    previousKeyword: string;
    previousSourceId: string;
    newsCollection: any;
    sourcesCollection: any;
    source: any = '';


    // DEPENDENCIES INJECTION
    constructor(
        private FormBuilder: FormBuilder,
        private ObservablesService: ObservablesService,
        private CrudService: CrudService)
    {
        // get news sources data from observer
        this.ObservablesService
            .getObservableData('sources')
            .subscribe(observerNewsSourcesData => { this.sourcesCollection = observerNewsSourcesData; });

        // get current source data from observer
        this.ObservablesService
            .getObservableData('source')
            .subscribe(observerNewsSourceData => { this.source = observerNewsSourceData; });

        // get current news from observer
        this.ObservablesService
            .getObservableData('news')
            .subscribe(observerNewsData => {
                this.newsCollection = observerNewsData;
            });
    }


    // METHODS
    // reset form
    private resetForm = () => {
        this.formData = this.FormBuilder.group({
            source: [null, Validators.required],
            keyword: [null],
        });

        if (localStorage.getItem('source')) {
            this.previousSourceId = JSON.parse(localStorage.getItem('source')).info.id;
            this.formData.patchValue({ source: this.previousSourceId });
        }

        if (localStorage.getItem('keyword')) {
            this.previousKeyword = localStorage.getItem('keyword');
            this.formData.patchValue({ keyword: this.previousKeyword });
        }
    };

    // ----- SOURCES -----
    // get all sources
    public getAllSources = async () => {
        if (localStorage.getItem('sources')) {
            this.sourcesCollection = JSON.parse(localStorage.getItem('sources'));
            this.ObservablesService.setObservableData('sources', this.sourcesCollection);
        } else {
            const response = await this.CrudService.getAllSources();
            this.sourcesCollection = response.sources;
        }
    };

    // ----- NEWS -----
    public getNewsFromSource = async (sourceSelectorFormData: any) => {
        let response;

        // if no keyword, don't send the parameter
        if (sourceSelectorFormData.keyword === null) {
            response = await this.CrudService.getTopHeadlines(`sources=${sourceSelectorFormData.source}`);
        } else {
            response = await this.CrudService.getTopHeadlines(`sources=${sourceSelectorFormData.source}`, `q=${sourceSelectorFormData.keyword}`);
            localStorage.setItem('keyword', sourceSelectorFormData.keyword);
        }

        this.newsCollection = response.articles;
        this.ObservablesService.setObservableData('news', this.newsCollection);
        // TODO: if no news, display message

        // send current source to Observer & local storage
        this.saveSource(sourceSelectorFormData.source);
    };

    public saveSource = (sourceId) => {
        // get source object from sourcesCollection with id obtained from select form
        let source = this.sourcesCollection.filter(source => (source.id === sourceId))[0];
        if (source) {
            // check if there are bookmarks on the page (not on home)
            if (this.bookmarks) {
                // update current source if different from previous
                if (source !== this.source) {
                    this.source = { info: source };
                    this.source.alreadyBookmarked = false;
                }

                // check for bookmarks existence
                if (this.bookmarks.length > 0) {
                    // check if source is already bookmarked
                    let alreadyBookmarked = this.bookmarks.find((bookmark) => {
                        return bookmark.id == this.source.info.id;
                    });

                    // set alreadyBookmarked value accordingly
                    if (alreadyBookmarked) { this.source.alreadyBookmarked = true; }
                }

                // update observable & local storage
                this.ObservablesService.setObservableData('source', this.source);
            } else {
                // send source object to observer and local storage
                this.ObservablesService.setObservableData('source', { info: source });
            }
        }
    }


    // LIFECYCLE HOOKS
    ngOnInit() {
        this.resetForm();
        this.getAllSources();
    }

}
