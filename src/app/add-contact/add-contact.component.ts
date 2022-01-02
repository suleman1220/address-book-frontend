import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  constructor(
    public diaogRef: MatDialogRef<AddContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data = {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
    };
  }

  ngOnInit(): void {}

  addContact(): void {
    this.diaogRef.close(this.data);
  }
}
