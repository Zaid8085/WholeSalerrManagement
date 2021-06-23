import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { BoltMenuItem } from '../bolt-menu-item.model';
import { BoltSidenavService } from '../bolt-sidenav.service';

@Component({
  selector: 'bolt-sidenav',
  templateUrl: './bolt-sidenav.component.html',
  styleUrls: ['./bolt-sidenav.component.scss']
})
export class BoltSidenavComponent implements OnInit {

  readonly sidenavMaxWidth: number = 16;
  readonly sidenavMinWidth: number = 4;
  sidenavWidth: number;
  sideNavDocked = true;
  @Input() navigationOptions: BoltMenuItem[] = [];  
  @Input() _demoOnly: boolean; // This is applicable only for the demo components
  @ViewChild('content') content: ElementRef;
  windowScrolled: boolean = false;

  constructor(public route: ActivatedRoute, private sidenavService: BoltSidenavService) {
    this.route = route;
  }

  ngOnInit() {
    this.getSidenavState();
        // this.content.nativeElement.addEventListener('wheel', () => {
        //   if ( this.content.nativeElement.scrollTop > 300) {
        //     this.windowScrolled = true;
        //   } else if ( this.content.nativeElement.scrollTop < 10) { 
        //     this.windowScrolled = false; 
        //   }
        //  });
  }

  scrollToTop() {
    this.windowScrolled = false;
    this.content.nativeElement.scrollTop = 0;
  }

  getSidenavState() {
    this.sideNavDocked = this.sidenavService.getSidenavExpanded();
    if (this.sideNavDocked) {
      this.sidenavWidth = this.sidenavMaxWidth;
    } else {
      this.sidenavWidth = this.sidenavMinWidth;
    }
  }

  /**
   * Toggles nav open and closed
   *
   */
  toggleNav() {
    if (this.sideNavDocked) {
      this.sidenavWidth = this.sidenavMinWidth;
    } else {
      this.sidenavWidth = this.sidenavMaxWidth;
    }
    this.sideNavDocked = !this.sideNavDocked;
  }

  /**
   * Toggles nav if user did not click on menu item
   *
   * @param event - click event
=  */
  sidenavClicked(event: MouseEvent) {
    if (!event) {
      this.toggleNav();
      return;
    }
    // TODO: toElement is deprecated and needs pollyfil. Correct this. https://github.com/microsoft/vscode/issues/64965
    // const elementsClasses = (event.srcElement || event.relatedTarget).className;
    // const parentsClasses = (event.srcElement || event.toElement).parentElement ?
    //   (event.srcElement || event.toElement).parentElement.className : '';
    // if (elementsClasses.includes('clickable-icon') ||
    //   (!elementsClasses.includes('mat-icon') &&
    //     !elementsClasses.includes('menu-item-content') &&
    //     !elementsClasses.includes('menu-item-label') &&
    //     !parentsClasses.includes('menu-item-content'))) {
    //   this.toggleNav();
    // }
  }

}
