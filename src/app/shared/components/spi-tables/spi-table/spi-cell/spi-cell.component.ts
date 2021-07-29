import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[spi-cell]',
  templateUrl: './spi-cell.component.html',
  styleUrls: ['./spi-cell.component.scss']
})
export class SpiCellComponent implements OnInit {
  @Input() childrow: any;
  @Input() expandable: any;
  @Input() alwaysShow?: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
