import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ApiService } from './api.service';
import { AddContactComponent } from './add-contact/add-contact.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  contacts: any = [];
  error = null;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.api.getContacts().subscribe(
      (res) => {
        this.contacts = res;
      },
      (error) => {
        if (error) {
          this.error = 'Unexpected Error Occured!! Try reloading the page.';
        }
      }
    );
  }

  openDialog(): void {
    this.dialog
      .open(AddContactComponent)
      .afterClosed()
      .subscribe((data) => {
        if (data.firstName && data.phone) {
          this.api.createContact(data).subscribe(
            (res: any) => {
              if (res.id) {
                const contact = {
                  id: res.id,
                  firstName: data.firstName,
                  lastName: data.lastName,
                  phone: data.phone,
                  address: data.address,
                };

                this.contacts.push(contact);
                this.snackBar.open('Contact Inserted', '', {
                  duration: 2000,
                  panelClass: ['green-snackbar'],
                });
              }
            },
            (error) => {
              if (error) {
                alert('Unexpected Error Occured!!');
              }
            }
          );
        }
      });
  }

  editContact(contact) {
    this.dialog
      .open(EditContactComponent, {
        data: {
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          address: contact.address,
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data.id && data.firstName && data.phone) {
          this.api.updateContact(data).subscribe(
            (res) => {
              if (res) {
                let i = this.contacts.findIndex((contact) => {
                  return contact.id == data.id;
                });

                this.contacts.splice(i, 1, data);
                this.snackBar.open('Contact Updated', '', {
                  duration: 2000,
                });
              }
            },
            (error) => {
              if (error) {
                alert('Unexpected Error Occured!!');
              }
            }
          );
        }
      });
  }

  deleteContact(id) {
    this.api.deleteContact(id).subscribe(
      (res: any) => {
        let i = this.contacts.findIndex((contact) => {
          return contact.id == id;
        });

        this.contacts.splice(i, 1);
        this.snackBar.open('Contact Deleted', '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
        });
      },
      (error) => {
        if (error) {
          alert('Unexpected Error Occured!!');
        }
      }
    );
  }
}
