import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef } from '@angular/core';
import { SpiPaginator } from './Spi-paginator.model';
import { SpiTableColumn } from './Spi-table-column.model';

import { SpiTableSettings } from './Spi-table/Spi-table-settings.model';
import { SpiTableComponent } from './Spi-table/Spi-table.component';
import { SpiShowMoreColumnsComponent } from './spi-show-more-columns/spi-show-more-columns.component';

@Injectable({
  providedIn: 'root'
})
export class SpiTableService {
  rowCount: number;
  expandable: boolean;
  chidRowData: any;
  pagination: SpiPaginator;
  tableData: any = [];
  sortable: boolean;
  tableColumns: SpiTableColumn[];
  SpiTable: SpiTableSettings;

  componentMap: Map<string, any> = new Map<string, any>();
  tableOperationMap: Map<string, boolean> = new Map<string, boolean>();
  tableRefMap: Map<string, SpiTableComponent> = new Map<string, SpiTableComponent>();
  currentPageMap: Map<string, number> = new Map<string, number>();


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) { }

  appendComponentToBody(tableId: string = '') {
    // Create a component reference from the component 
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(this.getComponent(tableId))
      .create(this.injector);

    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    return domElem;
  }

  appendShowMoreComponent() {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(SpiShowMoreColumnsComponent)
      .create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    return domElem;
  }

  setComponent(component: any, tableId?: string) {
    if (tableId === undefined) {
      tableId = '';
    }
    this.componentMap.set(tableId, component);
  }

  getComponent(tableId: string) {
    if (this.componentMap.has(tableId)) {
      return this.componentMap.get(tableId);
    }

    return this.componentMap.get('');
  }

  setTableSize(size: number) {
    this.rowCount = size;
  }

  setIsExpandable(expandable: boolean) {
    this.expandable = expandable;
  }

  setChildData(childRow: any) {
    this.chidRowData = childRow;
  }

  setIsPaginate(pagination: SpiPaginator) {
    this.pagination = pagination;
  }

  setTableData(tableData: any) {
    this.tableData = tableData;
  }

  setSorting(isSortable: boolean) {
    this.sortable = isSortable;
  }

  setTableColumns(columns: SpiTableColumn[]) {
    this.tableColumns = columns;
  }

  setTableConfig(tableSettings: SpiTableSettings) {
    this.SpiTable = tableSettings;
  }

  _enableInteractions(tableId: string) {
    this.tableOperationMap.set(tableId, false);
  }

  _disableInteractions(tableId: string) {
    this.tableOperationMap.set(tableId, true);
  }

  _isTableInOperation(tableId: string): boolean {
    const result = this.tableOperationMap.get(tableId);
    if (result === undefined || result === false) {
      return false;
    }

    return true;
  }

  // setPaginationSize(itemsPerPage: number) {
  //   this.userCustomizationService.setPaginationSize(itemsPerPage);
  // }

  // getPaginationSize(): number {
  //   return this.userCustomizationService.getPaginationSize();
  // }

  registerTable(tableId: string, compRef: SpiTableComponent) {
    this.tableRefMap.set(tableId, compRef);
  }

  _resizeTable(tableId: string): void {
    const comp = this.tableRefMap.get(tableId);

    if (comp) {
      comp.resize(tableId);
    }
  }

  _getTotalColumns(tableId: string): number {
    const comp = this.tableRefMap.get(tableId);
    if (comp) {
      return comp.getTotalColumns();
    }
    return 0;
  }

  _collapseChildRows(tableId: string): void {
    const comp = this.tableRefMap.get(tableId);

    if (comp) {
      comp.collapseChildRows(tableId);
    }
  }

  _insertChildColumnAndRows(tableId: string): void {
    const comp = this.tableRefMap.get(tableId);

    if (comp) {
      comp.insertChildColumnAndRows(tableId);
    }
  }

  _setCurrentPage(tableId: string, page: number): void {
    this.currentPageMap.set(tableId, page);
  }

  _getCurrentPage(tableId: string): number {
    if (this.currentPageMap.has(tableId)) {
      return this.currentPageMap.get(tableId);
    }

    return 1;
  }

}

