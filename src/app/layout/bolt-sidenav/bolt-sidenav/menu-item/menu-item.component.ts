import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BoltMenuItem } from '../../bolt-menu-item.model';

@Component({
  selector: 'bolt-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnChanges {
  @Input() menuItem: BoltMenuItem;
  @Input() level: number;
  @Input() isexpand: boolean;
  @Input() menuItemChildren: BoltMenuItem[];
  @Input() navigationOptions: BoltMenuItem[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.defaultExpand(changes);
  }

  defaultExpand(changes: SimpleChanges) {
    if (changes.isexpand && changes.isexpand.currentValue === false) {
      this.navigationOptions.forEach((nav: BoltMenuItem) => {
        nav.isOpen = true;
      });
    } else if (changes.isexpand && changes.isexpand.currentValue === true) {
      this.navigationOptions.forEach((nav: BoltMenuItem) => {
        if (nav.expandPriority) {
          nav.isOpen = true;
        } else {
          nav.isOpen = false;
        }         
      });
    }
  }

  onMenuItemClicked(menuItem) {
    if (this.isGroup(menuItem)) {
      menuItem.isOpen = !menuItem.isOpen;
      this.navigationOptions.forEach((nav: BoltMenuItem) => {
        if (nav.label !== menuItem.label) {
          nav.isOpen = !nav.isOpen;
        }
      });
      return;
    } else if (menuItem.route !== '' && menuItem.url === '') {
      if (menuItem.children) {
        menuItem.children.forEach(child => {
          menuItem.label === child.label ? child.isSelected = true : child.isSelected = false;
        });
      }
    }
  }

  isGroup(menuItem): boolean {
    return menuItem.children && menuItem.children.length > 0;
  }

  get menuItemLeftPadding() {
    if (this.isexpand === false && this.level === 2) {
      return `${1 * 20}px`;
    }
    return `${this.level * 20}px`;
  }

  childrenHeight(menuItem) {
    if (!menuItem.children) {
      return;
    }
    return menuItem.isOpen ? `${menuItem.children.length * 48}px` : 0;
  }  
}
