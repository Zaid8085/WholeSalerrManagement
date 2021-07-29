import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpiShowMoreColumnsService {

  showMoreColumnLabels: any = [];
  showMoreColumnData: any = null;
  showMoreColumnRowToAccess: number = -1;

  constructor() { }

  setShowMoreColumnLabels(labels: any[]) {
    this.showMoreColumnLabels = labels;
  }

  setShowMoreColumnData(data: any) {
    this.showMoreColumnData = data;
  }

  setShowMoreColumnRowToAccess(index: number) {
    this.showMoreColumnRowToAccess = index;
  }

  getShowMoreColumnLabels() {
    return this.showMoreColumnLabels;
  }

  getShowMoreColumnData() {
    return this.showMoreColumnData;
  }

  getShowMoreColumnRowToAccess() {
    return this.showMoreColumnRowToAccess;
  }


}