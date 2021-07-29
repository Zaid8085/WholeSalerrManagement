import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SpiTableService } from '../../../spi-tables/spi-table.service';
import { cloneDeep } from 'lodash';
import { SpiTableColumn } from '../../spi-table-column.model';
import { Subscription } from 'rxjs';
import { SpiTableSettings } from '../spi-table-settings.model';
import { SpiColumnType } from '../spi-column-type.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: '[spi-header]',
  templateUrl: './spi-header.component.html',
  styleUrls: ['./spi-header.component.scss']
})
export class SpiHeaderComponent implements OnInit, AfterViewInit {
  ascendingSort: boolean = false;
  columns: SpiTableColumn[] = [];
  tableId: string;
  @Input() spiTableSettings: SpiTableSettings;
  @Output() updatedSpiTableSettings = new EventEmitter();

  constructor(private spiTableService: SpiTableService) { }

  ngOnInit() {
    this.columns = this.spiTableSettings.tableColumns;
    this.tableId = this.spiTableSettings.tableId;
  }

  ngAfterViewInit() {
    this.insertSortingIcons();
  }

  detectChanges(event) {
    this.updatedSpiTableSettings.emit(event);
  }

  getTotalColumns() {
    return this.spiTableService._getTotalColumns(this.tableId);
  }

  insertSortingIcons() {
    const indexOffset = this.spiTableSettings.hasChildRow ? 1 : 0;
    const table = document.getElementById(this.tableId);
    this.columns.forEach((column, columnIndex) => {
      if (column.disableSort) {
        return;
      }

      const th = table.getElementsByTagName('th')[columnIndex];
      const icon = document.createElement('span');

      if (column.type === SpiColumnType.String || column.type === SpiColumnType.Number || column.type === SpiColumnType.Date) {
        icon.innerHTML = '<span class="material-icons">arrow_drop_down</span>';
        icon.setAttribute('class', 'sort-icon');
        th.appendChild(icon);
        th.addEventListener('click', () => this.sortTable(columnIndex + indexOffset, icon));
      }
    });
  }

  deleteShowMoreAndChildColumns() {
    this.spiTableService._collapseChildRows(this.tableId);
    const length = (<HTMLTableElement>document.getElementById(this.tableId)).rows.length;
    const tr = (<HTMLTableElement>document.getElementById(this.tableId)).rows;

    if (this.spiTableSettings.hasChildRow) {
      //Deleting childrow header
      tr[1].deleteCell(0);
    }

    if (tr[1].cells.length > this.spiTableSettings.tableColumns.length) {
      tr[1].deleteCell(this.spiTableSettings.tableColumns.length);
    }

    for (let i = 2; i < length; i++) {
      if (this.spiTableSettings.hasChildRow) {
        tr[i].deleteCell(0);
      }

      if (tr[i].cells.length > this.spiTableSettings.tableColumns.length) {
        tr[i].deleteCell(this.spiTableSettings.tableColumns.length);
      }
    }
  }

  clearSortOpacity() {
    const tr = (<HTMLTableElement>document.getElementById(this.tableId)).rows;
    if (tr.length < 2) {
      return;
    }

    const th = tr[1].children;
    let startingIndex = 0;

    if (this.spiTableSettings.hasChildRow) {
      startingIndex = 1;
    }

    for (let i = startingIndex; i < th.length; i++) {
      const icon = <HTMLSpanElement>th[i].getElementsByClassName('sort-icon')[0];
      if (icon) {
        icon.style.opacity = '';
      }
    }
  }

  sortTable(column: number, icon: HTMLSpanElement) {

    if (this.spiTableSettings.tableData === undefined || this.spiTableSettings.tableData.length === 0) {
      return;
    }

    if (this.spiTableService._isTableInOperation(this.spiTableSettings.tableId)) {
      return;
    }

    const table = <HTMLTableElement>document.getElementById(this.tableId);

    this.spiTableService._disableInteractions(this.spiTableSettings.tableId);
    this.clearSortOpacity();
    this.deleteShowMoreAndChildColumns();


    this.ascendingSort = !this.ascendingSort;
    icon.innerHTML = this.ascendingSort ? '<span class="material-icons">arrow_drop_up</span>' : '<span class="material-icons">arrow_drop_down</span>';
    icon.style.opacity = '1';

    const tableData = cloneDeep(this.spiTableSettings.tableData);
    const cellBegin = this.spiTableSettings.hasChildRow ? 1 : 0;

    const columnIndex = Math.max(column - cellBegin, 0);
    if (this.columns[columnIndex].type === SpiColumnType.Number) {
      if (this.ascendingSort) {
        tableData.sort((a, b) => Number(a[this.columns[columnIndex].bind] !== null ? a[this.columns[columnIndex].bind] : 0) - Number(b[this.columns[columnIndex].bind] !== null ? b[this.columns[columnIndex].bind] : 0));
      } else {
        tableData.sort((a, b) => Number(b[this.columns[columnIndex].bind] !== null ? b[this.columns[columnIndex].bind] : 0) - Number(a[this.columns[columnIndex].bind] !== null ? a[this.columns[columnIndex].bind] : 0));
      }
    } else if (this.columns[columnIndex].type === SpiColumnType.Date) {
      if (this.ascendingSort) {
        tableData.sort((a: any, b: any) => Number(new Date(a[this.columns[columnIndex].bind])) - Number(new Date(b[this.columns[columnIndex].bind])));
      } else {
        tableData.sort((a: any, b: any) => Number(new Date(b[this.columns[columnIndex].bind])) - Number(new Date(a[this.columns[columnIndex].bind])));
      }
    } else {
      if (this.ascendingSort) {
        tableData.sort((a, b) => (a[this.columns[columnIndex].bind] !== null ? a[this.columns[columnIndex].bind] : '').localeCompare((b[this.columns[columnIndex].bind] !== null ? b[this.columns[columnIndex].bind] : '')));
      } else {
        tableData.sort((a, b) => (b[this.columns[columnIndex].bind] !== null ? b[this.columns[columnIndex].bind] : '').localeCompare((a[this.columns[columnIndex].bind] !== null ? a[this.columns[columnIndex].bind] : '')));
      }
    }
    this.spiTableService.setTableData(tableData);
    this.spiTableSettings.tableData = cloneDeep(tableData);
    this.updatedSpiTableSettings.emit(this.spiTableSettings);
    this.spiTableService._enableInteractions(this.tableId);


    setTimeout(() => {
      if (this.spiTableSettings.hasChildRow) {
        // We must perform an insert of the column because when we emit, Angular will start rendering the new table. We can't insert it afterwards.
        this.spiTableService._insertChildColumnAndRows(this.tableId);
      }

      this.spiTableService._enableInteractions(this.tableId);
      this.spiTableService._resizeTable(this.tableId);
    }, 50);
  }
}
