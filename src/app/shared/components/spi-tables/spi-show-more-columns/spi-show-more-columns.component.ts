import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { SpiTableService } from '../spi-table.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { SpiShowMoreColumnsService } from './spi-show-more-columns.service';

@Component({
  selector: 'spi-show-more-columns',
  templateUrl: './spi-show-more-columns.component.html',
  styleUrls: ['./spi-show-more-columns.component.scss']
})
export class SpiShowMoreColumnsComponent {


  rowData: any = null;
  labels: any[] = [];
  showDetails: boolean = false;
  flexPercentage: string = '100%';

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {

      this.labels = this.spiShowMoreColumnsService.getShowMoreColumnLabels();
      this.rowData = this.spiShowMoreColumnsService.getShowMoreColumnData();
      this.showDetails = true;
      if (this.labels.length > 1) {
        if (this.labels.length > 3 && this.labels.length % 2) {
          this.flexPercentage = '32%';
        } else {
          this.flexPercentage = '48%';
        }
      }
    }
  }
  constructor(private spiShowMoreColumnsService: SpiShowMoreColumnsService, private eRef: ElementRef) { }
}