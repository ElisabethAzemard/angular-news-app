/* IMPORTS */
import { Component, OnInit, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ObservablesService } from '../../services/observable/observable.service';


/* DEFINITION & EXPORT */
@Component({
    selector: 'app-item-post',
    templateUrl: './item-post.component.html',
    styleUrls: ['./item-post.component.scss']
})
export class ItemPostComponent implements OnInit {

    // Input  data from parent component
    @Input() news: object;
    faHeart = faHeart;

    constructor(private ObservablesService: ObservablesService) {
    }

    ngOnInit() {
    }

}
