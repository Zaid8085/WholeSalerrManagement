import { Component, OnInit } from '@angular/core';
import { BoltMenuItem } from '../bolt-sidenav/bolt-menu-item.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  navigationOptions: BoltMenuItem[] = [];

  constructor() { }

  ngOnInit() {
    this.loadMenuOptions();    
  }

  loadMenuOptions() {
    this.navigationOptions = [
      {
        icon: 'list', label: 'Forms', route: '', url: '', title: 'Forms', disabled: true, isOpen: true, expandPriority: true,
        children: [
          { icon: 'storage', label: 'Get Records', route: './buttons', url: '', title: 'Buttons', disabled: false },
          { icon: 'confirmation_number', label: 'Confirmation', route: './confirm', url: '', title: 'Confirmation', disabled: false, isSelected: false },
          { icon: 'border_outer', label: 'Layout', route: './layout', url: '', title: 'Layout', disabled: false, isSelected: false },
          { icon: 'notification_important', label: 'Notifications', route: './notification', url: '', title: 'Notifications', disabled: false, isSelected: false },
        ]
      },      
      { icon: 'unfold_more', label: 'Accordions', route: './accordion', url: '', title: 'Accordions', disabled: false, isOpen: false },
      { icon: 'tab', label: 'Tabs', route: './tab', url: '', title: 'Tabs', disabled: false, isOpen: false },
      {
        icon: 'camera', label: 'PRISM Modules', route: '', url: '', title: 'PRISM Module', disabled: true, isOpen: false, expandPriority: false,
        children: [
          { icon: 'star_half', label: 'Project Workflow', route: '', url: 'http://bolt2-prism.test.att.com/project-ui', title: 'Project Module', disabled: false, isSelected: false },
          { icon: 'thumb_up', label: 'Change Management', route: '', url: 'http://bolt2-prism.test.att.com/request-ui', title: 'Change Management', disabled: false, isSelected: false },
          { icon: 'notes', label: 'Request', route: '', url: 'http://bolt2-prism.test.att.com/request-ui', title: 'Request Module', disabled: false, isSelected: false },
          { icon: 'lock', label: 'Admin', route: '', url: 'http://bolt2-prism.test.att.com/prism-ui', title: 'Admin Module', disabled: false, isSelected: false }
        ]
      },
    ];
  }

}
