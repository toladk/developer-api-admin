import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private router : Router
  ) { }

  isLoggedIn(){
    return !!sessionStorage.getItem('token');
  }

  signUp(data: any) {
    return this.http.post(`${environment.commonApi}/register`, data)
  }

  login(data: any) {
    return this.http.post(`${environment.commonApi}/adloginv3` , data)
  }

  logout() {
    this.router.navigateByUrl('/login');
    sessionStorage.removeItem('token');
  }

}
