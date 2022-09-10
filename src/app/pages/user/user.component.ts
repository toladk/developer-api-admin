import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HotToastService } from '@ngneat/hot-toast'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList: any[] = [];

  p = 1;

  isSpinning = false;
  isSpinningView = false;

  visible = false;
  userDetails: any;

  constructor(
    private spinner: NgxSpinnerService,
    private mainService: MainService,
    private notification: NzNotificationService,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {

    this.getAlluser();

  }

  getAlluser(): void{
    this.isSpinning = true;
    this.mainService.getAllUsers().subscribe((result: any) => {
      if (result.IsSuccess === true){
        this.userList = result.Value;
        this.isSpinning = false;
      } else {
        this.isSpinning = false;
        this.toast.error(result.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
      }
    }, error => {
      this.isSpinning = false;
      this.toast.error(error.error.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
    })
  }

  approveUser(ID: any): void{
    this.isSpinning = true;
    const payload = {
      id: ID,
      status: 1,
      IsApproved: true
    }
    this.mainService.approveUser(payload, ID).subscribe((result: any) => {
      if (result.IsSuccess === true){
        this.toast.success(result.Value, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
        this.isSpinning = false;
        this.getAlluser();
      } else {
        this.isSpinning = false;
        this.toast.error(result.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
      }
    }, error => {
      this.isSpinning = false;
      this.toast.error(error.error.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
    })
  }

  rejectUser(ID: any): void{
    this.isSpinning = true;
    const payload = {
      id: ID,
      status: 2,
      IsApproved: false
    }
    this.mainService.approveUser(payload, ID).subscribe((result: any) => {
      if (result.IsSuccess === true){
        this.toast.success(result.Value, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
        this.isSpinning = false;
        this.getAlluser();
      } else {
        this.isSpinning = false;
        this.toast.error(result.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
      }
    }, error => {
      this.isSpinning = false;
      this.toast.error(error.error.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
    })
  }

  close(): void{
    this.visible = false;
  }

  viewUser(id: any): void{
    this.isSpinningView = true;
    this.visible = true;
    this.mainService.getUserById(id).subscribe((result: any) => {
      if (result.IsSuccess === true){
        this.isSpinningView = false;
        this.userDetails = result.Value;
      } else {
        this.isSpinningView = false;
        this.toast.error(result.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
      }
    }, error => {
      this.isSpinningView = false;
      this.toast.error(error.error.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
    })
  }

  deleteUser(id: any): void{
    this.isSpinning = true;
    this.mainService.deleteUser(id).subscribe((result: any) => {
      if (result.IsSuccess === true){
        this.isSpinning = false;
        this.toast.success(result.Value, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
        this.getAlluser();
      } else {
        this.isSpinning = false;
        this.toast.error(result.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
      }
    }, error => {
      this.isSpinning = false;
      this.toast.error(error.error.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
    })
  }


}
