import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../@services/http.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  req = {
    email: '',
    pwd: '',
    name: ''
  }
  confPwd!: string;
  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  reg() {
    if (this.req.pwd == this.confPwd) {
      this.httpService.postApi('http://localhost:8080/user/add_info', this.req).subscribe((res: any) => {
        console.log(res);
        if (res.code == 200) {
          this.router.navigateByUrl('login');
        } else{
          alert("This email has been registered");
        }
      });
    } else {
      alert("password error");
    }
  }

  clear() {
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    this.router.navigateByUrl('/login');

  }

}
