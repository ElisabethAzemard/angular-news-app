/* IMPORTS */
import { Component, OnInit, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ObservablesService } from '../../services/observable/observable.service';


/* DEFINITION & EXPORT */
@Component({
    selector: 'app-news-article',
    templateUrl: './news-article.component.html',
    styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit {

    // Input  data from parent component
    @Input() news: object;
    faHeart = faHeart;

    constructor() {
    }

    ngOnInit() {
    }

}
