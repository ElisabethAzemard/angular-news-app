/* IMPORTS */
import { Component, OnInit, Input } from '@angular/core';

import { CrudService } from "../../services/crud/crud.service";
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';

/* DEFINITION & EXPORT */
@Component({
  selector: 'app-single-bookmark',
  templateUrl: './single-bookmark.component.html',
  styleUrls: ['./single-bookmark.component.scss']
})
export class SingleBookmarkComponent implements OnInit {

  // PROPERTIES
  @Input() bookmark;
  @Input() sourceId;
  private faHeartBroken = faHeartBroken;
  private bookmarkNews: any = false;


  // DEPENDENCIES INJECTION
  constructor(private CrudService: CrudService) { }

  private toggleBookmarkNews = async (sourceId) => {
    if (!this.bookmarkNews) {
      this.bookmarkNews = await this.CrudService.getBookmarkNews(`sources=${sourceId}`);
    } else {
      this.bookmarkNews = false;
    }
  }

  ngOnInit() {
  }

}
