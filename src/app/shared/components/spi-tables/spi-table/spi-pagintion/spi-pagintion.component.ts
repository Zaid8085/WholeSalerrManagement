import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { cloneDeep, forEach, debounce } from 'lodash';
import { SpiTableService } from '../../../spi-tables/spi-table.service';
import { SpiTableColumn } from '../../spi-table-column.model';
import { SpiTableSettings } from '../spi-table-settings.model';

@Component({
  selector: 'spi-pagintion',
  templateUrl: './spi-pagintion.component.html',
  styleUrls: ['./spi-pagintion.component.scss']
})
export class SpiPagintionComponent implements OnInit, AfterViewInit {

  @Input() spiTableSettings: SpiTableSettings;
  @Output() updatedSpiTableSettings = new EventEmitter();

  currentPage = 1;
  numberOfPages = 0;
  isNextDisable: boolean;
  isPreviousDisable: boolean;
  tableId: string;
  tableData: any = [];
  columns: SpiTableColumn[] = [];
  begin: number = 0;
  end: number;
  isNextClicked: boolean;
  filteredTableData: any[];
  previousClicked: boolean;
  debouncedFunction: any;
  isUserTyping: boolean = false; // Used to keep track if user is typing, thus we can override disabling input on table operation to enable smooth typing.
  prevFilter = '';
  filter = '';

  constructor(private spiTableService: SpiTableService) { }


  ngOnInit() {


    this.end = this.spiTableSettings.pagination.numberPerPage;
    this.tableData = cloneDeep(this.spiTableSettings.tableData);
    this.columns = this.spiTableSettings.tableColumns;

    this.numberOfPages = this.getNumberOfPages();
    this.updateDisabledState();
  }

  ngAfterViewInit() {
    this.tableId = this.spiTableSettings.tableId;
    this.filteredTableData = this.spiTableSettings.tableData;
  }


  changePageSize() {
    this.spiTableService._disableInteractions(this.tableId);
    this.deleteCell();

    const tableElem = <HTMLTableElement>document.getElementById(this.tableId);
    for (let i = 0; i < tableElem.rows[1].cells.length; i++) {
      for (let j = 1; j < tableElem.rows.length; j++) {
        const cell = tableElem.rows[j].cells[i];
        cell.style.display = '';
      }
    }


    this.currentPage = Math.ceil(this.begin === 0 ? 1 : this.begin / this.spiTableSettings.pagination.numberPerPage);
    this.updatePaginationBeginEnd();
    if (this.spiTableSettings.tableData.length <= this.spiTableSettings.pagination.numberPerPage) {
      this.currentPage = 1;
      this.end = this.spiTableSettings.tableData.length;
    }

    this.spiTableService._setCurrentPage(this.tableId, this.currentPage);

    const tblData = cloneDeep(this.spiTableSettings.tableData);
    this.tableData = tblData.slice(this.begin, this.end);
    this.updatedSpiTableSettings.emit(this.tableData);
    setTimeout(() => {
      this.numberOfPages = this.getNumberOfPages();
      this.updateDisabledState();
      if (this.spiTableSettings.hasChildRow) {
        this.spiTableService._insertChildColumnAndRows(this.tableId);
      }
      this.spiTableService._enableInteractions(this.tableId);
    }, 200);
    setTimeout(() => {
      this.spiTableService._resizeTable(this.tableId);
    }, 500);
  }

  deleteCell() {
    let length = (<HTMLTableElement>document.getElementById(this.tableId)).rows.length;
    const tr = (<HTMLTableElement>document.getElementById(this.tableId)).rows;
    const tableElem = (<HTMLTableElement>document.getElementById(this.tableId)).getElementsByTagName('tbody')[0];

    if (tableElem.rows.length === 0) {
      return;
    }

    if (this.spiTableSettings.hasChildRow) {
      tr[1].deleteCell(0);
    }
    if (tr[1].cells.length > this.spiTableSettings.tableColumns.length) {
      tr[1].deleteCell(this.spiTableSettings.tableColumns.length);
    }
    for (let i = 2; i < length; i++) {
      if (this.spiTableSettings.hasChildRow) {

        if (tr[i].cells && tr[i].cells.length === 1) {
          tableElem.deleteRow(i - 2);
          length = (<HTMLTableElement>document.getElementById(this.tableId)).rows.length; // what is purpose of this?
        }
        tr[i].deleteCell(0);
      }
      if (tr[i].cells.length > this.spiTableSettings.tableColumns.length) {
        tr[i].deleteCell(this.spiTableSettings.tableColumns.length);
      }
    }
  }

  insertChildRowColumn() {
    const th = document.createElement('th');
    th.style.width = '10px';
    th.setAttribute('id', 'childRowColumn');
    const tr = (<HTMLTableElement>document.getElementById(this.tableId)).rows[1];
    tr.insertBefore(th, tr.childNodes[0]);
  }

  updateNumberOfPages() {
    this.numberOfPages = this.getNumberOfPages();
  }

  getNumberOfPages() {
    return Math.ceil(this.spiTableSettings.tableData.length / this.spiTableSettings.pagination.numberPerPage);
  }

  nextPage() {
    this.disableInteractions();

    this.currentPage += 1;
    this.spiTableService._setCurrentPage(this.tableId, this.currentPage);
    this.isNextDisable = true;
    this.isNextClicked = true;
    this.previousClicked = false;

    this.deleteCell();
    this.updateAndRender();

    setTimeout(() => {
      if (this.spiTableSettings.hasChildRow) {
        this.spiTableService._insertChildColumnAndRows(this.tableId);
      }
      this.enableInteractions();
    }, 100);
  }

  previousPage() {
    this.disableInteractions();

    this.currentPage -= 1;
    this.spiTableService._setCurrentPage(this.tableId, this.currentPage);
    this.isPreviousDisable = true;
    this.previousClicked = true;
    this.isNextClicked = false;

    this.deleteCell();
    this.updateAndRender();

    setTimeout(() => {
      if (this.spiTableSettings.hasChildRow) {
        this.spiTableService._insertChildColumnAndRows(this.tableId);
      }
      this.enableInteractions();
    }, 100);
  }

  updatePaginationBeginEnd() {
    this.begin = ((this.currentPage - 1) * this.spiTableSettings.pagination.numberPerPage);
    this.end = this.begin + this.spiTableSettings.pagination.numberPerPage;

    if (this.end > this.spiTableSettings.tableData.length) {
      this.end = this.spiTableSettings.tableData.length;
    }
  }

  updateDisabledState() {
    if (this.spiTableSettings.tableData.length < this.spiTableSettings.pagination.numberPerPage) {
      this.isNextDisable = true;
      this.isPreviousDisable = true;
      return;
    }
    this.isNextDisable = this.currentPage === this.numberOfPages ? true : (this.spiTableSettings.tableData.length === 0 ? true : false);
    this.isPreviousDisable = this.currentPage === 1 ? true : false;
  }

  updateAndRender() {
    this.numberOfPages = this.getNumberOfPages();
    this.begin = ((this.currentPage - 1) * this.spiTableSettings.pagination.numberPerPage);
    this.updatePaginationBeginEnd();

    const tblDataClone = cloneDeep(this.spiTableSettings.tableData);
    this.tableData = tblDataClone.slice(this.begin, this.end);
    this.spiTableService.setTableData(this.tableData);
    this.updatedSpiTableSettings.emit(this.tableData);
    this.updateDisabledState();

    setTimeout(() => {
      this.spiTableService._resizeTable(this.tableId);
    }, 50);
  }




  applyFilter(event: any) {
    if (this.debouncedFunction) {
      this.debouncedFunction.cancel();
    }
    this.debouncedFunction = debounce(() => {
      this.callFilterFn(event);
    }, 500);
    this.debouncedFunction();
  }

  callFilterFn(event) {

    if (event + '' === this.prevFilter) {
      return;
    }

    this.prevFilter = event + '';

    const filteredData = [];
    this.filteredTableData.forEach(data => {
      let executed = false;
      forEach(this.columns, (column) => {
        if (!(typeof data[column.bind] === 'boolean') && (data[column.bind] + '').toLowerCase().includes((event + '').toLowerCase())) {
          filteredData.push(data);
          executed = true;
        }
        if (executed) {
          return false;
        }
      });
    });
    this.spiTableSettings.tableData = filteredData;
    this.disableInteractions();
    this.deleteCell();

    setTimeout(() => {
      this.updatePaginationBeginEnd();
      const tblData = cloneDeep(this.spiTableSettings.tableData);

      if (tblData.length > this.spiTableSettings.pagination.numberPerPage) {
        this.begin = ((this.currentPage - 1) * this.spiTableSettings.pagination.numberPerPage);
        this.tableData = tblData.slice(this.begin, this.end);
      } else {
        this.begin = 0;
        this.tableData = tblData;
      }

      this.numberOfPages = this.getNumberOfPages();
      this.updateDisabledState();
      this.updatedSpiTableSettings.emit(this.tableData);
      this.spiTableService.setTableData(this.tableData);
    }, 100);

    setTimeout(() => {
      if (this.spiTableSettings.hasChildRow) {
        if (this.tableData.length === 0) {
          this.enableInteractions();
          return;
        }
        this.spiTableService._insertChildColumnAndRows(this.tableId);
      }
      this.enableInteractions();
      this.spiTableService._resizeTable(this.tableId);
    }, 200);
  }

  disableInteractions() {
    this.spiTableService._disableInteractions(this.tableId);
  }

  enableInteractions() {
    this.spiTableService._enableInteractions(this.tableId);
  }

  isTableInOperation() {
    return this.spiTableService._isTableInOperation(this.tableId);
  }

  onFilterFocus() {
    this.isUserTyping = true;
  }

  onFilterBlur() {
    this.isUserTyping = false;
  }

  clearData() {
    this.filter = null;
    this.callFilterFn('');
  }

}
