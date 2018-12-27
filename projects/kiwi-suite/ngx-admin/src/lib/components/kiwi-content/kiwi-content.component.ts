import { Component, ContentChild, TemplateRef, } from '@angular/core';

@Component({
  selector: 'kiwi-content',
  templateUrl: './kiwi-content.component.html',
})
export class KiwiContentComponent {
  @ContentChild('headerButtons') headerButtons: TemplateRef<any>;
  @ContentChild('aside') aside: TemplateRef<any>;

  headerHeight = 0;
}