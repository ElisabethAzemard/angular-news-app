/*
Import
*/
// Angular
import { Component, OnInit, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

//

/*
Componant configuration
*/
@Component({
  selector: 'app-item-post',
  templateUrl: './item-post.component.html'
})
//


/*
Componant class definition
*/
export class ItemPostComponent implements OnInit {

  // Input  data from parent component
  @Input() post: any;
  faHeart = faHeart;

  constructor() { }
  ngOnInit() { };
};
//
