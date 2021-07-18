import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private route: Router) {

  }
  ngOnInit(): void {
    const user  = sessionStorage.getItem('user') || undefined;
    console.log(user)
    if(!!user) {
      this.route.navigate(['./layout'])
    } else {
      this.route.navigate(['./login'])
    }
  }
  title = 'WholeSalerrManagment';
}
