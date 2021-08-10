import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tableData: any[] = [];

  constructor(private angularFirestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getDetailsOfEmployee();
  }

  getDetailsOfEmployee() {
    this.angularFirestore.collection('Employee_Details').snapshotChanges().subscribe(data => {

      this.tableData = [];
      data.forEach(e => {
        const obj = e.payload.doc.data();
        obj['docId'] = e.payload.doc.id;
        this.tableData.push(obj);
      })
    })
  }

}
