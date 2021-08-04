import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { style } from '@angular/animations';
import { SpiColumnType } from 'src/app/shared/components/spi-tables/spi-table/spi-column-type.model';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  messages = [
    { "weight": "100gm" },
    { "weight": "250gm" },
    { "weight": "500gm" },
    { "weight": "750gm" },
    { "weight": "1kg" },
  ];
  options = [
    { "Catergory": "One" },
    { "Catergory": "Two" },
    { "Catergory": "Three" },
    { "Catergory": "Four" },
  ];
  taxes = [
    { "tin": "2.5" },
    { "tin": "5" },
    { "tin": "6" },
    { "tin": "9" },
    { "tin": "12" },
    { "tin": "14" },
    { "tin": "18" },
    { "tin": "28" },
  ];
  addform: FormGroup = this.fb.group({
    Select_Category: ['', Validators.required,],
    Select_Sub_Category: [{ value: '', disabled: true }, Validators.required,],
    Product_name: [{ value: '', disabled: true }, Validators.required],
    Product_code: [{ value: '', disabled: true }, Validators.required],
    Brand: [{ value: '', disabled: true }, Validators.required],
    SKUS: [{ value: '', disabled: true }, Validators.required],
    Selling_price: [{ value: null, disabled: true }, Validators.required],
    MRP: [{ value: '', disabled: true }, Validators.required],
    Cost_price: [{ value: null, disabled: true }, Validators.required],
    Profit: [{ value: 10, disabled: true }, Validators.required],
    Loss: [{ value: 0 , disabled: true }, Validators.required],
    Discount: [{ value: 0 , disabled: true }, Validators.required],
    GST: [{ value: null, disabled: true }, Validators.required],
    Total: [{ value: '', disabled: true }, Validators.required],
    Quantity: [{ value: 1, disabled: true }, Validators.required],
    Expiry_date: [{ value: '', disabled: true }, Validators.required],
  });
  policies: any[];
  categories: any[];
  selectedSubCategory: any[] = [];
  selectedDocId: any; 
  mesuaringUnits: any[] = [];
  isLoading: boolean;
  constructor(private fb: FormBuilder, public afAuth: AngularFirestore, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProducatCategory();
    this.getMesuaringUnits();

    this.addform.controls['Cost_price'].valueChanges.subscribe(data => {
      this.setValues();
    });

    this.addform.controls['GST'].valueChanges.subscribe(data => {
      this.setValues();
    })

    this.addform.controls['Discount'].valueChanges.subscribe(data => {
      this.setValues();
    })
    
    this.addform.controls['Quantity'].valueChanges.subscribe(data => {
      this.setValues();
    })
  }

  setValues() {
    if (this.addform.controls['Cost_price'].value === null || this.addform.controls['GST'].value === null) return;
    const sellingPrice = this.addform.controls['Cost_price'].value + this.addform.controls['Cost_price'].value * this.addform.controls['GST'].value / 100;
    let profitSP = sellingPrice + sellingPrice * 0.1
    if(this.addform.controls['Discount'].value !== 0) {
      profitSP = sellingPrice + sellingPrice * (0.1 - this.addform.controls['Discount'].value / 100);
      if (profitSP < sellingPrice) {
        const loss = sellingPrice * (sellingPrice - profitSP )/ 100;
        this.addform.controls['Loss'].setValue(0)
        this.addform.controls['Profit'].setValue(0)
      } else if (profitSP >= sellingPrice) {
        this.addform.controls['Loss'].setValue(0)
        this.addform.controls['Profit'].setValue(10 - this.addform.controls['Discount'].value)
      } 
    }
    this.addform.controls['Selling_price'].setValue(profitSP * this.addform.controls['Quantity'].value);
    this.addform.controls['Total'].setValue((profitSP - sellingPrice) * this.addform.controls['Quantity'].value);
  }
  getMesuaringUnits() {
    this.afAuth.collection('Measuring_Units').snapshotChanges().subscribe(data => {
      this.mesuaringUnits = data.map(e => {
        return {
          id: e.payload.doc.id,
          value: e.payload.doc.data()
        } as any;
      })
      
    })
  }
  getProducatCategory() {
    this.afAuth.collection('Product_Categories').snapshotChanges().subscribe(data => {
      console.log(data)
      this.categories = data.map(e => {
        return {
          id: e.payload.doc.id,
          value: e.payload.doc.data()
        } as any;
      })
    })
   
  }

  onCategorySelection(category: any) {
    console.log(category)
    const selectedCategory = this.categories.find(x => x.value.Category_ID === category);
    console.log(selectedCategory)
    this.selectedDocId = selectedCategory?.id
    this.selectedSubCategory = selectedCategory?.value?.Sub_Category;
    this.addform.controls['Select_Sub_Category'].enable();
  }

  onSubCategorySelection(subCategory: any) {
    this.addform.enable();
    this.disableFields();
  }

  disableFields() {
    this.addform.controls['Profit'].disable();
    this.addform.controls['Loss'].disable();
    this.addform.controls['Total'].disable();
    this.addform.controls['Selling_price'].disable()
  }
  onSubmit() {
    console.warn(this.addform.value)
    this.isLoading = true;
    this.afAuth.collection('Product_List').add(this.addform.value).then( data => {
      this.snackbar.openFromComponent(NotificationComponent, {
        data: {
          customMsg: 'Product added successfully.',
          type: 'success',
        },
      });
      this.isLoading = false;
    }).catch(error => {
      this.snackbar.openFromComponent(NotificationComponent, {
        data: {
          customMsg: error.message,
          type: 'error',
          },
        });
      this.isLoading = false;
  })
  }

  clearInputMethod1() {
    this.addform.reset();
    this.addform.disable();
    this.addform.controls['Select_Category'].enable();
  }

  
}

