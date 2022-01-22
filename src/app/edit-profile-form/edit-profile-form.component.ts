import { Component, OnInit, Input, Inject } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
})
export class EditProfileFormComponent implements OnInit {
  Username = localStorage.getItem('user');
  userProfile = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<EditProfileFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  editUser(): void {
    this.fetchApiData
      .editUser(this.Username, this.userProfile)
      .subscribe((resp) => {
        this.dialogRef.close();

        // update profile in localstorage
        localStorage.setItem('Username', this.userProfile.Username);
        localStorage.setItem('Password', this.userProfile.Password);

        this.snackBar.open('Your profile was updated successfully!', 'OK', {
          duration: 4000,
        });
        setTimeout(() => {
          window.location.reload();
        });
      });
  }
}