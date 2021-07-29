import { Component, OnInit, Input } from '@angular/core';
import { SpiTableSettings } from '../spi-table/spi-table-settings.model';


@Component({
  selector: 'spi-spinner',
  templateUrl: './spi-spinner.component.html',
  styleUrls: ['./spi-spinner.component.scss']
})
export class SpiSpinnerComponent implements OnInit {
  @Input() spiTableSettings: SpiTableSettings;
  constructor() { }

  ngOnInit() {
  }

}
