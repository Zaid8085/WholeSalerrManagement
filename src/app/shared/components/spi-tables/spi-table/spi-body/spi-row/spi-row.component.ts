import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SpiTableService } from '../../../../spi-tables/spi-table.service';
import { SpiPaginator } from '../../../../spi-tables/spi-paginator.model';
import { Subscription } from 'rxjs';

let that = null;

@Component({
  selector: '[spi-row]',
  templateUrl: './spi-row.component.html',
  styleUrls: ['./spi-row.component.scss']
})
export class SpiRowComponent implements OnInit {
  @Input() childrow: any;
  @Input() rowIndex: any;
  @Input() spiTableSettings: any;
  expanded: boolean[] = [];
  tableId: string;
  tableLength: number;
  spiTableInfo: any;
  unsub: Subscription;

  constructor(private spiTableService: SpiTableService) { }

  ngOnInit() {
    this.tableId = this.spiTableSettings.tableId;
    this.spiTableService.setChildData(this.childrow);

    that = this;
    this.initRow();
  }


  initRow() {
    const table = document.getElementById(that.tableId);

    // If tableId has interpolation, this component will render first, meaning table wont be found. Retry until we find it.
    if (table === undefined || table === null) {
      setTimeout(that.initRow, 10);
      return;
    }

    // that.tableLength = table.getElementsByTagName('tbody')[0].rows.length;
    // that.expanded = new Array(that.tableLength).fill(false);    
  }

  createColumn() {
    setTimeout(() => {
      const tr = (<HTMLTableElement>document.getElementById(this.tableId)).rows[this.rowIndex + 1];
      const cell = tr.insertCell(0);
      cell.style.cursor = 'pointer';
      cell.innerHTML = '<span class="material-icons">expand_more</span>';
      cell.onclick = () => this.displayChildRow(cell, tr);
    }, 50);
  }

  displayChildRow(cell: any, tr: HTMLTableRowElement) {
    this.expanded[this.rowIndex] = !this.expanded[this.rowIndex];
    this.insertChildRow(tr.rowIndex - 1);
    cell.innerHTML = this.expanded[this.rowIndex] ? '<span class="material-icons">expand_less</span>' : '<span class="material-icons">expand_more</span>';
  }

  insertChildRow(newRowIndex: number) {
    const table = (<HTMLTableElement>document.getElementById(this.tableId)).getElementsByTagName('tbody')[0];
    if (this.expanded[this.rowIndex]) {
      const noOfColumns = (<HTMLTableElement>document.getElementById(this.tableId)).rows[1].cells.length;
      const row = table.insertRow(newRowIndex);
      const td = document.createElement('td');
      td.setAttribute('colspan', noOfColumns + '');
      td.setAttribute('spi-cell', '');
      td.style.backgroundColor = 'lightgray';
      this.spiTableService.setChildData(this.childrow || this.spiTableSettings.tableData[this.rowIndex - 1]);
      const child = this.spiTableService.appendComponentToBody(this.tableId);
      td.appendChild(child);
      row.appendChild(td);
    } else {
      table.deleteRow(newRowIndex);
    }
  }

}
