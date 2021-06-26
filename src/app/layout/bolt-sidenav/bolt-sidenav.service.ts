import { Injectable } from '@angular/core';

const PREF = 'bolt-sidenav-expand--pref';

@Injectable({
  providedIn: 'root'
})

export class BoltSidenavService {

  constructor() { }

  setSidenavExpanded(isExpand: boolean) {
    localStorage.setItem(PREF, isExpand + '');
  }

  getSidenavExpanded() {
    return localStorage.getItem(PREF) === 'true';
  }
}
