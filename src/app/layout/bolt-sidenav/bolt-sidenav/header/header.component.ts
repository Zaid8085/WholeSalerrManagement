import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DistributorEntryComponent } from 'src/app/routes/distributor-entry/distributor-entry.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 ngOnchange() {
   DistributorEntryComponent:{this.ngOnchange.call(DistributorEntryComponent)};
 }
}
