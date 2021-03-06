import { Component, OnInit } from '@angular/core';
import { PageCreateComponent } from '../create/page-create.component';

@Component({
  templateUrl: '../create/page-create.component.html',
})
export class SubCreateComponent extends PageCreateComponent implements OnInit {

  private handle;

  ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe((params) => {
      this.handle = params.handle;
    });
  }

  getRedirectUrl(response) {
    return '/page-sub/' + this.handle + '/' + response + '/edit';
  }
}
