import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BusyService } from '../Busy/busy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService, private busy: BusyService, private router: Router) { }
  public loginForm: FormGroup;
  private userName: string;
  private password: string;

  ngOnInit() {
    this.busy.show();
    this.loginForm = this.fb.group({
      UserName: ['teste', Validators.required],
      Password: ['teste123', Validators.required]
      
   });
   this.onChanges();
   this.busy.hide();
   this.userName = this.loginForm.value.UserName
   this.password = this.loginForm.value.Password
  }

  onChanges(){
    this.loginForm.valueChanges.subscribe(async values => {
      this.userName = values.UserName
      this.password = values.Password
    })
  }

  async login(){
    this.busy.show();
    this.onChanges();
    var login = await this.auth.login(this.userName, this.password);
    if(login == true){
      this.router.navigate(['stats']);
    }
    this.busy.hide();
  }

}
