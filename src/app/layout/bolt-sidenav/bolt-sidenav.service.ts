import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const PREF = 'bolt-sidenav-expand--pref';

@Injectable({
  providedIn: 'root'
})

export class BoltSidenavService {
  emitMenuOptions = new BehaviorSubject({});
  constructor() { }

  setSidenavExpanded(isExpand: boolean) {
    localStorage.setItem(PREF, isExpand + '');
  }

  getSidenavExpanded() {
    return localStorage.getItem(PREF) === 'true';
  }
}
