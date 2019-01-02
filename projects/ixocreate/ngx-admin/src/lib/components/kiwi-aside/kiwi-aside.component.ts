import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'kiwi-aside',
  templateUrl: './kiwi-aside.component.html',
})
export class KiwiAsideComponent implements OnInit, OnDestroy {

  @HostBinding('class.aside-menu') asideMenu = true;

  @Input() display: any = 'lg';

  @Input() set visible(visible: boolean) {
    if (visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  private asideMenuCssClasses: Array<string> = [
    'aside-menu-show',
    'aside-menu-sm-show',
    'aside-menu-md-show',
    'aside-menu-lg-show',
    'aside-menu-xl-show',
  ];

  constructor() {
  }

  ngOnInit() {
    document.querySelector('body').classList.add('aside-menu-fixed');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('aside-menu-lg-show');
  }

  show(): void {
    if (this.display !== false) {
      let cssClass;
      this.display ? cssClass = `aside-menu-${this.display}-show` : cssClass = this.asideMenuCssClasses[0];
      document.querySelector('body').classList.add(cssClass);
    }
  }

  hide(): void {
    if (this.display !== false) {
      let cssClass;
      this.display ? cssClass = `aside-menu-${this.display}-show` : cssClass = this.asideMenuCssClasses[0];
      document.querySelector('body').classList.remove(cssClass);
    }
  }
}