import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SpiTableService } from '../../../spi-tables/spi-table.service';
import { Subscription } from 'rxjs';

@Component({
  selector: '[spi-body]',
  templateUrl: './spi-body.component.html',
  styleUrls: ['./spi-body.component.scss']
})
export class SpiBodyComponent implements OnInit {

  spiTableInfo: any;

  constructor(private spiTableService: SpiTableService) { }

  ngOnInit() { }
}
