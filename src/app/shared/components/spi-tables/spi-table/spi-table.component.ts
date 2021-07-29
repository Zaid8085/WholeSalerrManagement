import { Component, OnInit, Input, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { SpiTableService } from '../spi-table.service';
import { SpiPaginator } from '../spi-paginator.model';
import { SpiTableSettings } from './spi-table-settings.model';
import { SelectionModel } from '@angular/cdk/collections';
import { SpiShowMoreColumnsService } from '../spi-show-more-columns/spi-show-more-columns.service';


export class SpiTableAlwaysShowColumn {
  columnIndex: number;
  width: number;
}
@Component({
  selector: '[spi-table]',
  templateUrl: './spi-table.component.html',
  styleUrls: ['./spi-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpiTableComponent implements OnInit, AfterViewInit {
  @Input() spiTableSettings: SpiTableSettings;
  @Input() spiPaginator: SpiPaginator = new SpiPaginator();
  tableId: string;
  labels: any[] = [];
  expandedChildRows: SelectionModel<string> = new SelectionModel<string>(); // Maps tableId + rowNumber to determine what's open/collapsed

  constructor(private spiTableService: SpiTableService, private spiShowMoreColumnsService: SpiShowMoreColumnsService) { }

  ngOnInit() {
    this.spiTableService.setTableConfig(this.spiTableSettings);
    this.tableId = this.spiTableSettings.tableId;
    this.spiTableService.setTableData(this.spiTableSettings.tableData);
    this.spiTableService.registerTable(this.tableId, this);

    if (!this.spiTableSettings.pagination.pageSizeOptions.includes(this.spiTableSettings.pagination.numberPerPage)) {
      this.spiTableSettings.pagination.pageSizeOptions.push(this.spiTableSettings.pagination.numberPerPage);
      this.spiTableSettings.pagination.pageSizeOptions.sort((a, b) => a - b);
    } else {
      // Update items per page default to user's choice
      this.spiTableSettings.pagination.numberPerPage = 5;
    }
  }

  ngAfterViewInit() {
    const tableElem = document.getElementById(this.tableId);
    tableElem.classList.add('mat-elevation-z8');
    tableElem.setAttribute('class', 'spi-tables-style');
    tableElem.style.overflow = 'none';

    window.addEventListener('resize', () => {
      const table = document.getElementById(this.tableId);
      if (table) {
        this.resize(this.tableId);
      }
    });
    this.spiTableService.setIsPaginate(this.spiTableSettings.pagination); // This needs tableId

    setTimeout(() => {
      this.resize(this.tableId);
    }, 1000); // reducing below 1000 can cause jank while icons and fonts load

  }

  hasShowMoreColumns(table: HTMLTableElement) {
    return table.querySelectorAll('#show-more-columns') && table.querySelectorAll('#show-more-columns').length > 0;
  }

  collapseChildRows(tableId: string) {
    const expandedRows = document.querySelectorAll(`#` + tableId + ` [class^='child-row-expanded-']`);
    for (let i = 0; i < expandedRows.length; i++) {
      //this.expandedChildRows.deselect(tableId + '-' + i);
      (expandedRows[i] as HTMLElement).click();
    }
  }

  restoreExpandedChildRows(table: HTMLTableElement) {
    // This wont work in current implementation
    return;
    /* const expandedRows = table.querySelectorAll(`#` + this.tableId + ` [class^='child-row-expanded-']`);
    for (let i = 0; i < expandedRows.length; i++) {
      this.expandedChildRows.select(tableId + '-' + i);
      (expandedRows[i] as HTMLElement).click();
    } */
  }

  deleteShowMoreColumnCells(table: HTMLTableElement) {
    for (let i = 1; i < table.rows.length; i++) {
      table.rows[i].deleteCell(table.rows[i].cells.length - 1);
    }
  }

  makeAllCellsVisible(table: HTMLTableElement) {
    for (let i = 0; i < table.rows[1].cells.length; i++) {
      for (let j = 1; j < table.rows.length; j++) {
        const cell = table.rows[j].cells[i];
        if (cell) {
          cell.style.display = '';
        }
      }
    }
  }

  makeColumnCellsHidden(table: HTMLTableElement, columnIndex: number) {
    for (let j = 1; j < table.rows.length; j++) {
      const cell = table.rows[j].cells[columnIndex];
      if (cell) { // this causes headers to not style correctly. When safety check in, no results found shows incorrectly
        cell.style.display = 'none';
      }
    }
  }

  findAlwaysShowCells(table: HTMLTableElement): [Array<SpiTableAlwaysShowColumn>, Map<number, boolean>] {
    const alwaysShowColumns: SpiTableAlwaysShowColumn[] = [];
    const alwaysShowColumnsMap: Map<number, boolean> = new Map<number, boolean>();

    for (let i = 0; i < table.rows[1].cells.length; i++) {
      let alwaysShowCell = null;
      for (let j = 1; j < table.rows.length; j++) {
        const cell = table.rows[j].cells[i];
        if (cell && cell.getAttribute('always-show')) {
          alwaysShowCell = cell;
        }
      }

      alwaysShowColumnsMap.set(i, false);
      if (alwaysShowCell) {
        const column = new SpiTableAlwaysShowColumn();
        column.width = alwaysShowCell.offsetWidth;
        column.columnIndex = i;
        alwaysShowColumns.push(column);
        alwaysShowColumnsMap.set(i, true);
      }
    }

    return [alwaysShowColumns, alwaysShowColumnsMap];
  }

  insertChildColumn(table: HTMLTableElement) {
    const th = document.createElement('th');
    th.style.width = '10px';
    th.setAttribute('id', 'childRowColumn');
    const tr = table.rows[1];
    tr.insertBefore(th, tr.childNodes[0]);
  }

  insertChildColumnAndRows(tableId) {
    const table = (<HTMLTableElement>document.getElementById(tableId));
    const length = table.rows.length;

    const childColumnHeader = table.querySelector('#childRowColumn');
    if (childColumnHeader !== undefined && childColumnHeader !== null) {
      return;
    }

    this.insertChildColumn(table);

    for (let r = 2; r < length; r++) {
      const tr = table.rows[r];
      const cell = tr.insertCell(0);
      cell.style.cursor = 'pointer';
      cell.innerHTML = '<span class="material-icons">expand_more</span>';
      cell.setAttribute('always-show', 'true');
      cell.onclick = () => this.displayChildRow(cell, tr, r, tableId);
    }
  }

  displayChildRow(cell: HTMLTableDataCellElement, tr: HTMLTableRowElement, r: number, tableId: string) {
    const adjustedIndex = r - 2;
    this.expandedChildRows.toggle(tableId + '-' + adjustedIndex);
    this.insertChildRow(tr.rowIndex - 1, r, tableId);

    if (this.expandedChildRows.isSelected(tableId + '-' + adjustedIndex)) {
      cell.classList.add('child-row-expanded-' + (adjustedIndex));
      cell.innerHTML = '<span class="material-icons">expand_less</span>';
    } else {
      cell.classList.remove('child-row-expanded-' + (adjustedIndex));
      cell.innerHTML = '<span class="material-icons">expand_more</span>';
    }
  }

  insertChildRow(newRowIndex: number, r: number, tableId: string) {
    const table = (<HTMLTableElement>document.getElementById(tableId)).getElementsByTagName('tbody')[0];
    const adjustedIndex = r - 2;

    if (this.expandedChildRows.isSelected(tableId + '-' + adjustedIndex)) {
      const noOfColumns = (<HTMLTableElement>document.getElementById(tableId)).rows[1].cells.length;
      const row = table.insertRow(newRowIndex);
      const td = document.createElement('td');
      td.setAttribute('colspan', noOfColumns + '');
      td.setAttribute('spi-cell', '');
      td.style.backgroundColor = 'lightgray';
      const child = this.spiTableService.appendComponentToBody(tableId);

      // When setting child data in, make sure we take into account how pagination might offset row index
      const currentPage = this.spiTableService._getCurrentPage(tableId);
      const index = ((currentPage - 1) * this.spiTableSettings.pagination.numberPerPage) + adjustedIndex;

      this.spiTableService.setChildData(this.spiTableSettings.tableData[index]);
      td.appendChild(child);
      row.appendChild(td);
    } else {
      table.deleteRow(newRowIndex);
    }
  }

  resize(tableId) {
    const tableContainer = document.getElementById(tableId + '-container');
    if (!tableContainer) {
      console.error('Please wrap spi table with an element which has an ID = "unique table id used"-container');
      return;
    }

    const table = <HTMLTableElement>document.getElementById(tableId);
    const tableWidth = tableContainer.offsetWidth;
    let showMoreColumnsNeeded = false;

    tableContainer.style.padding = '0 3px 0 3px !important';
    tableContainer.style.maxWidth = '100% !important';


    if (this.hasShowMoreColumns(table)) {
      this.deleteShowMoreColumnCells(table);
    }

    this.makeAllCellsVisible(table);

    if (this.spiTableSettings.hasChildRow) {
      this.insertChildColumnAndRows(tableId);
    }

    this.collapseChildRows(tableId);



    /// Find all alwaysShowCells and calculate total width
    const [alwaysShowColumns, alwaysShowColumnsMap] = this.findAlwaysShowCells(table);
    let alwaysShowColumnsWidth = 0;
    if (alwaysShowColumns.length > 0) {
      alwaysShowColumnsWidth = alwaysShowColumns.map(item => item.width).reduce((accumulation, current) => accumulation + current);
    }

    const headerCells = table.rows[1].cells;
    const labels = [];
    for (let i = 0; i < headerCells.length; i++) {
      if (alwaysShowColumnsMap.get(i)) {
        continue;
      }
      alwaysShowColumnsWidth = alwaysShowColumnsWidth + headerCells[i].offsetWidth;

      // If we exceed table width, ensure we hide cells as appropriate
      if (alwaysShowColumnsWidth > tableWidth) {
        showMoreColumnsNeeded = true;
        this.makeColumnCellsHidden(table, i);

        const index = this.spiTableSettings.hasChildRow ? i - 1 : i;
        if (!labels.includes(index)) {
          labels.push(index);
        }
      }
    }


    let totalColWidth = 0;
    for (let i = 0; i < table.rows[1].cells.length; i++) {
      totalColWidth = totalColWidth + table.rows[1].cells[i].offsetWidth;
    }

    if (totalColWidth > tableWidth) {
      this.resize(tableId);
      return;
    }

    // Insert and setup show more columns
    if (showMoreColumnsNeeded && this.spiTableSettings.tableData.length > 0) {

      if (table.rows.length > 0) {
        this.insertShowMoreColumnHeader(table);
      }

      for (let i = 2; i < table.rows.length; i++) {
        const cell = table.rows[i].insertCell();
        cell.style.cursor = 'pointer';
        cell.id = 'show-more-columns';
        cell.style.width = '10px';

        const child = this.spiTableService.appendShowMoreComponent();
        cell.onclick = () => {
          const label = this.spiTableSettings.tableColumns.filter((val, idx) => labels.includes(idx));
          this.spiShowMoreColumnsService.setShowMoreColumnLabels(label);
          this.spiShowMoreColumnsService.setShowMoreColumnData(this.spiTableService.tableData[i - 2]);
          this.spiShowMoreColumnsService.setShowMoreColumnRowToAccess(i);
        };
        cell.appendChild(child);
      }
    }
  }

  insertShowMoreColumnHeader(table: HTMLTableElement) {
    if (table.querySelector('#show-more-columns')) {
      return;
    }

    const th = document.createElement('th');
    const cell = table.rows[1].appendChild(th);
    cell.style.width = '10px';
    cell.style.backgroundColor = '#1976d2';
    cell.id = 'show-more-columns';
  }

  getTotalColumns() {
    if (this.spiTableSettings !== undefined) {
      if (this.spiTableSettings.hasChildRow) {
        return this.spiTableSettings.tableColumns.length + 1;
      } else {
        return this.spiTableSettings.tableColumns.length;
      }
    }
  }

}
