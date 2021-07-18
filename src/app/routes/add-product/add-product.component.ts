import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  private dbPath = '/UserDetails';

  tutorialsRef: AngularFirestoreCollection<any> = null;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  ngOnInit(): void {
    console.log(this.tutorialsRef)
    this.tutorialsRef.snapshotChanges().subscribe(data => {
      console.log(data);
    });
  }
}
