import { Component, OnInit } from '@angular/core';
import { BoltMenuItem } from '../bolt-sidenav/bolt-menu-item.model';
import { BoltSidenavService } from "../bolt-sidenav/bolt-sidenav.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  navigationOptions: BoltMenuItem[] = [];

  constructor(private boltSidenavService: BoltSidenavService) { }

  ngOnInit() {
    this.loadMenuOptions();
  }

  loadMenuOptions() {
    this.navigationOptions = [
      {
        icon: 'dashboard', label: 'Dashboard', route: './dashboard', url: '', title: 'dashboard', disabled: false, isOpen: false, expandPriority: false,
      },
      {
        icon: 'local_grocery_store', label: 'Products', route: './garbage', url: '', title: 'Products', disabled: true, isOpen: true, expandPriority: true,
        children: [
          { icon: 'add_shopping_cart', label: 'Add Products', route: './add-product', url: '', title: 'Add Products', disabled: false },
          { icon: 'eject', label: 'Product Details ', route: './product-details', url: '', title: 'Product Details', disabled: false, isSelected: false },
        ]
      },
      {
        icon: 'face', label: 'Employee', route: './kjk', url: '', title: 'Employee', disabled: true, isOpen: true, expandPriority: false,
        children: [
          { icon: 'list', label: 'Employee Entry', route: 'employee-entry', url: '', title: 'Employee Entry', disabled: false },
          { icon: 'groups', label: 'Employee Details', route: 'employee-details', url: '', title: 'Employee Details', disabled: false },

        ]
      },
      {
        icon: 'supervised_user_circle', label: 'Distributor', route: './dummy', url: '', title: 'Distributor', disabled: true, isOpen: false, expandPriority: false,
        children: [
          { icon: 'add_icon', label: 'Distributor Entry', route: 'distributor-entry', url: '', title: 'Distributor Entry', disabled: false },
          { icon: 'supervisor_account', label: 'Distributor Details', route: 'distributor-details', url: '', title: 'Distributor Details', disabled: false },
        ]
      },
      {
        icon: 'file_copy', label: 'Invoicing', route: './bgt', url: '', title: 'Invoicing', disabled: false, isOpen: false, expandPriority: false
      },
      {
        icon: 'attach_money', label: 'Income', route: './income', url: '', title: 'Income', disabled: false, isOpen: false, expandPriority: false,

      },
      {
        icon: 'spa', label: 'Saloon', route: 'saloon', url: '', title: 'Saloon', disabled: false, isOpen: false, expandPriority: false,

      },
      {
        icon: 'emoji_people', label: 'Student Registration', route: './dummy', url: '', title: 'Student Registration', disabled: false, isOpen: false, expandPriority: false,
        children: [
          {icon: 'how_to_reg', label: 'Student Registration', route: 'student-registration', url: '', title: 'Student Registration', disabled: false, isOpen: false, expandPriority: false,},
          {icon: 'groups', label: 'Student Details', route: 'student-details', url: '', title: 'Student Details', disabled: false, isOpen: false, expandPriority: false,}
        ],
      },
      {
        icon: 'emoji_people', label: 'Dietician', route: './dummy', url: '', title: 'Dietician ', disabled: false, isOpen: false, expandPriority: false,
        children: [
          {icon: 'how_to_reg', label: 'Diet Plan', route: 'diet-plan', url: '', title: 'Diet Plan', disabled: false, isOpen: false, expandPriority: false,},
          {icon: 'groups', label: 'Diet Plan Settings', route: 'diet-plan-settings', url: '', title: 'Diet Plan Settings', disabled: false, isOpen: false, expandPriority: false,}
        ],
      }
    ]
    this.boltSidenavService.emitMenuOptions.next(this.navigationOptions)
  }

}
