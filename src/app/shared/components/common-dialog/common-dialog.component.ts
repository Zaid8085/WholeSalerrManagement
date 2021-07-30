import { Component, OnInit, Inject, ViewChildren, ComponentFactoryResolver, QueryList } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogProperty, InputType } from './Model/dialog-poperty';
import * as _ from 'lodash'
import { AddComponent } from './Model/add-component';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent implements OnInit {
  modifiedInputField = new Array();
  inputType: InputType;
  addComponent: AddComponent[];
  currentAdIndex = -1;
  isViewComments: boolean = false; 
  // @ViewChildren(DynamicComponentDirective ) appDynamicComponent: QueryList< DynamicComponentDirective>;
  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogProperty: DialogProperty,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    if (this.dialogProperty.message.text.indexOf('Estimate Guidelines for') > -1 || this.dialogProperty.message.text.indexOf('Comments') > -1) {
      this.isViewComments = true;
    }
    // var height = window.getComputedStyle(document.getElementById('common-dialog')).getPropertyValue('width')    
    if (this.dialogProperty.inputConfig && this.dialogProperty.inputConfig.length > 1) {
      var inputList = [];
      var j = 0;
      _.forEach(this.dialogProperty.inputConfig, (input, i) => {

        inputList.push(input)
        if (i % 2 != 0 && i != 0) {
          this.modifiedInputField.push(inputList);
          inputList = [];
          j++;
        } else if (this.dialogProperty.inputConfig.length == i + 1 && i % 2 == 0)
          this.modifiedInputField.push(inputList);
      })
    }
    // this.dialogRef.backdropClick().subscribe(() => this.dialogRef.close('backdropClicked'));
  }

  get InputType() {
    return InputType;
  }

  getFlex(i: any) {
    return (this.modifiedInputField[i].length == 1 ? 100 : 50)
  }
  onClick(value: any): void {
    if (this.dialogProperty.inputConfig) {
      _.forEach(this.dialogProperty.inputConfig, (input) => {
        if (input && input.inputText != '' && input.required == true) {
          this.dialogRef.close(true);
        } else if (input && input.inputText != '' && input.required == false && value != true) {
          this.dialogRef.close(true);
        } else if (input && input.inputText == '' && input.required == false && value != true) {
          this.dialogRef.close(true);
        } else if (!input && value != true) {
          this.dialogRef.close(true);
        } else if (value == true) {
          if (this.dialogProperty.buttonssecondary.text == 'Clear' || this.dialogProperty.buttonssecondary.text == 'Reset') {
            input.inputText = '';
          } else
            this.dialogRef.close();
        }
      });
    } else {
      if (value == true) {
        this.dialogRef.close();
      } else {
        this.dialogRef.close(true);
      }
    }
  }

  ngAfterViewInit(): void {
    // if(this.dialogProperty.showComponent){
    //   setTimeout(() => {
    //     this.loadComponent();
    //   }, 1000);
    // }    
  }

  // loadComponent(){       
  //   this.addComponent = this.demoService.getComponent(); 
  //   // this.currentAdIndex = (this.currentAdIndex + 1) % this.addComponent.length;
  //   const dynamicComp = this.addComponent[this.dialogProperty.showComponent.text];

  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComp.component);

  //   const viewContainerRef = this.appDynamicComponent.last.viewContainerRef;
  //   viewContainerRef.clear();

  //   const componentRef = viewContainerRef.createComponent(componentFactory);
  //   (<AddComponent>componentRef.instance).data = dynamicComp.data;
  // }
}
