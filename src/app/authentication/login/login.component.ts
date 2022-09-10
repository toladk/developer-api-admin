import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  ismyTextFieldType!: boolean;

  year!: number;

  isSpinning = false;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9.]*$')]],
      password: ['', Validators.required],
    });

    this.year = new Date().getFullYear()

  }

  togglemyPasswordFieldType(){
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }

  submitLogin(): void{
    this.isSpinning = true;
    this.authService.login(this.loginForm.value).subscribe((result: any) => {
      if (result.isSuccess === true){
        this.isSpinning = false;
        this.notification.success('Login', 'User Logged In Successfully !!')
        sessionStorage.setItem('token', result.value)
        this.router.navigateByUrl('/main/dashboard');
      } else {
        this.isSpinning = false;
        this.notification.error('Login', result.error)
      }
    }, error => {
      this.isSpinning = false;
      this.notification.error('Login', error.error.Error)
    })
  }





}
