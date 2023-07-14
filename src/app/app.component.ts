import { Component } from '@angular/core';
import { Router } from 'express';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyBookApp';
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  // constructor(private router:Router){}

  // onSubmit()
  // {
  //   this.router.navigate(['/stock'])
  // }

  // displayedColumns = [
  //   {
  //     name: 'id',
  //     title: 'ID',
  //     editType: '',
  //     disableEdit: false,
  //   },
  //   {
  //     name: 'username',
  //     title: 'User Name',
  //     editType: 'textbox',
  //     disableEdit: false,
  //   },
  //   {
  //     name: 'startDate',
  //     title: 'Start Date',
  //     editType: 'datepicker',
  //     disableEdit: false,
  //   },
  // ];

  // dataSource = [
  //   {
  //     id: '1',
  //     username: 'Delilah Rowe',
  //     startDate: '2020-01-12',
  //   },
  //   {
  //     id: '2',
  //     username: 'Kiara Collins',
  //     startDate: '2020-01-14',
  //   },
  //   {
  //     id: '3',
  //     username: 'Anabel Robel',
  //     startDate: '2020-01-30',
  //   },
  //   {
  //     id: '4',
  //     username: 'Bethany Goodwin',
  //     startDate: '2020-01-04',
  //   },
  //   {
  //     id: '5',
  //     username: 'Raymond Schultz',
  //     startDate: '2020-01-07',
  //   },
  //   {
  //     id: '6',
  //     username: 'Elvie Carter',
  //     startDate: '2020-01-25',
  //   },
  // ];

  // // To keep array of column names
  // tableColumns!: string[];

  // // Table edit feature variables
  // date = new FormControl(new Date());
  // tableFromGroup!: FormGroup;
  // controlOffset: number = 0;
  // controlIndex = {};
  // isEditMode = false;
  // fcm = ''; //formControlMapKey

  // constructor(private fb: FormBuilder) {
  //   this.getColNames();
  //   this.getFirstColName();
  // }

  // ngOnInit() {
  //   this.tableFromGroup = this.fb.group(this.getFrmGrp());
  // }

  // // Get first key name from data source to generate FormControl Pointer
  // getFirstColName() {
  //   this.fcm = Object.keys(this.dataSource[0])[0]; // id
  // }

  // // Toggle edit mode
  // toggleEdit() {
  //   this.isEditMode = !this.isEditMode;
  // }

  // // Fetch column names from definition
  // getColNames() {
  //   this.tableColumns = this.displayedColumns.map((col) => {
  //     return col.name;
  //   });
  // }

  // // Update respective form control value in datatable
  // onValueChange(columnName: any, colIndex: number, i: number) {
  //   const value =
  //     this.tableFromGroup.controls[
  //       this.controlIndex[this.dataSource[i][this.fcm] + colIndex]
  //     ].value;
  //   this.dataSource[i][columnName] = value;
  // }

  // // Generate dynamic form control for editable fields in the table
  // getFrmGrp() {
  //   let formControls = {};
  //   for (let i = 0; i < this.dataSource.length; i++) {
  //     for (let j = 0; j < this.displayedColumns.length; j++) {
  //       let columnName = this.displayedColumns[j].name;
  //       formControls[columnName + i + j] = new FormControl({
  //         value: this.dataSource[i][columnName],
  //         disabled: this.displayedColumns[j].disableEdit,
  //       });
  //       this.controlIndex[this.dataSource[i][this.fcm] + j] =
  //         columnName + i + j;
  //     }
  //   }
  //   return formControls;
  // }

 
  
  
}
