import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../@services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { DelAcctDialogComponent } from '../del-acct-dialog/del-acct-dialog.component';



@Component({
  selector: 'app-work-space',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './work-space.component.html',
  styleUrl: './work-space.component.scss'
})
export class WorkSpaceComponent {
  readonly dialog = inject(MatDialog);
  oldPwd!: string;
  confirmPwd!: string;
  user = {
    email: '',
    oldPwd: '',
    pwd: '',
    name: ''
  };
  isDis = true;
  isDisabled = true;
  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const email = document.cookie;
    this.httpService.getUserInfo(email).subscribe((res: any) => {
      this.user.name = res.name;
      this.user.email = res.email;
      this.oldPwd = res.pwd;
      console.log(this.user);
    });
  }
  toggleEdit() {
    if (this.isDisabled) {
      this.isDisabled = false;
      this.isDis = false;
    } else {
      if (this.user.pwd == this.confirmPwd) {
        this.httpService.postApi('http://localhost:8080/user/update', this.user).subscribe((res: any) => {
          console.log(res);
          if (res.code == 200) {
            this.isDisabled = true;
            this.user.oldPwd = '';
            this.user.pwd = '';
            this.confirmPwd = '';
          }
          else {
            alert("password error");
            this.isDis = false;
          }
        });
        this.isDis = true;
      } else {
        alert("password error");
        this.isDis = false;
      }

    }
  }

  delAcct() {
    this.isDis = false;
    const email = document.cookie;
    console.log(email);
    const dialog = this.dialog.open(DelAcctDialogComponent, {
      width: '500px',
      height: '200px',
    });
    dialog.afterClosed().subscribe((res: any) => {
      let isDel = res;
      if (isDel) {
        this.httpService.delAccount(email).subscribe((res: any) => {
          console.log(res);
        });
        this.router.navigateByUrl('/home');
        document.cookie.split(";").forEach(cookie => {
          const name = cookie.split("=")[0].trim();
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
      }
      else {
        this.isDis = true;
      }
    });
  }

  cancel() {
    this.isDisabled = true;
    this.isDis = true;
  }
}
