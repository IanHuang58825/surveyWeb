import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Toolbar2Component } from '../../components/toolbar2/toolbar2.component';
import { HttpService } from '../../@services/http.service';
import { UserService } from '../../@services/user.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
    MatIconModule,
    Toolbar2Component,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username!: string;
  password!: string;
  constructor(
    private router: Router,
    private httpService: HttpService,
    private userService: UserService
  ) { }
  login() {
    // const req = {
    //   email: this.username,
    //   pwd: this.password,
    // }
    // console.log(req);

    // this.httpService.postApi('http://localhost:8080/user/login', req).subscribe((res: any) => {
    //   if(res.code == 200){
    //     document.cookie.split(";").forEach(cookie => {
    //       const name = cookie.split("=")[0].trim();
    //       document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    //     });

    //     document.cookie = res.email;
        this.router.navigateByUrl('/admin');
    //     console.log(document.cookie);

    //   } else {
    //     console.log("error");
    //   }
    // });
  }
}
