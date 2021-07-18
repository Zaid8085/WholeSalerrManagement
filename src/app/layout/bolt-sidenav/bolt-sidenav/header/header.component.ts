import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { BoltMenuItem } from '../../bolt-menu-item.model';
import { BoltSidenavService } from '../../bolt-sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentURL: any;
  menuItem: BoltMenuItem;
  panelOpenState = false;
  constructor(public afAuth: AngularFireAuth, 
    private layoutService: BoltSidenavService, 
    private router: Router, 
    private route: ActivatedRoute,
    private snackbar: MatSnackBar) {
    this.currentURL = this.route['_routerState']['snapshot']['url']
  }

  ngOnInit(): void {

    this.layoutService.emitMenuOptions.subscribe((item: any) => {
      setTimeout(() => {
        this.currentURL = this.route['_routerState']['snapshot']['url']
        if (item && item.length > 0) {
          item.forEach(element => {
            console.log(element)
            const route = element.route.substring(1)
            if (this.currentURL.includes(route)) {
              this.menuItem = element;
            }
          });
        } else
          this.menuItem = item;
      }, 50);
  
    })
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      this.snackbar.openFromComponent(NotificationComponent, {
        data: {
          customMsg: 'You are successfully logged out.',
          type: 'success',
        },
      });
      sessionStorage.removeItem('user');
      this.router.navigate(['/login'])
    }).catch(error => {
      this.snackbar.openFromComponent(NotificationComponent, {
    data: {
      customMsg: error.message,
      type: 'error',
    },
  });
})
    
  }

}
