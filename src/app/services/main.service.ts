import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(){
    return this.http.get(`${environment.baseUrl}/users/fetch-all`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  approveUser(payload: any, id: any){
    return this.http.patch(`${environment.baseUrl}/users/enable-or-disable/${id}`, payload, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  getUserById(id: any){
    return this.http.get(`${environment.baseUrl}/users/profile/${id}`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  deleteUser(id: any){
    return this.http.delete(`${environment.baseUrl}/users/remove/${id}`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  getAllTenant(){
    return this.http.get(`${environment.baseUrl}/tenants/fetch-all`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  getTenantById(id: any){
    return this.http.get(`${environment.baseUrl}/tenants/profile-details/${id}`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  activateTenant(payload: any, id: any){
    return this.http.patch(`${environment.baseUrl}/tenants/activation/${id}`, payload, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  getApprovedRequest(){
    return this.http.get(`${environment.baseUrl}/credentials/list-of-approved-request`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  getPendingRequest(){
    return this.http.get(`${environment.baseUrl}/credentials/list-of-pending-request`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  getAllRequest(){
    return this.http.get(`${environment.baseUrl}/credentials/fetch-all-users-request`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  getRequestById(id: any){
    return this.http.get(`${environment.baseUrl}/credentials/fetch-single-user-request/${id}`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  assignRequest(id: any, payload: any){
    return this.http.patch<any>(`${environment.baseUrl}/credentials/assign-to-a-user/${id}`, payload, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  getAllRole(){
    return this.http.get(`${environment.baseUrl}/roles/fetch-all`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

}
