import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HotToastService } from '@ngneat/hot-toast'

@Component({
  selector: 'app-clientrequest',
  templateUrl: './clientrequest.component.html',
  styleUrls: ['./clientrequest.component.css']
})
export class ClientrequestComponent implements OnInit {

  requestList: any[] = [];

  p = 1;

  isSpinning = false;
  isSpinningView = false;

  visible = false;
  requestDetails: any;

  constructor(
    private spinner: NgxSpinnerService,
    private mainService: MainService,
    private notification: NzNotificationService,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {

    this.getAllRequest()

  }

  getAllRequest(): void{
    this.isSpinning = true;
    this.mainService.getAllRequest().subscribe((result: any) => {
      if (result.IsSuccess === true){
        this.requestList = result.Value;
        this.isSpinning = false;
      } else {
        this.isSpinning = false;
        this.toast.error(result.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
      }
    }, error => {
      this.isSpinning = false;
      this.toast.error(error.error.Error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
    })
  }

  filterRequest(e: any): void{
    if(e.target.value === 'all'){
      this.isSpinning = true;
      this.mainService.getAllRequest().subscribe((result: any) => {
        if (result.IsSuccess === true){
          this.requestList = result.Value;
          this.isSpinning = false;
        } else {
          this.isSpinning = false;
          this.toast.error(result.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
        }
      }, error => {
        this.isSpinning = false;
        this.toast.error(error.error.Error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
      })
    } else if (e.target.value === 'pending'){
      this.isSpinning = true;
      this.mainService.getPendingRequest().subscribe((result: any) => {
        if (result.IsSuccess === true){
          this.requestList = result.Value;
          this.isSpinning = false;
        } else {
          this.isSpinning = false;
          this.toast.error(result.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
        }
      }, error => {
        this.isSpinning = false;
        this.toast.error(error.error.Error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
      })
    } else {
      this.isSpinning = true;
      this.mainService.getApprovedRequest().subscribe((result: any) => {
        if (result.IsSuccess === true){
          this.requestList = result.Value;
          this.isSpinning = false;
        } else {
          this.isSpinning = false;
          this.toast.error(result.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
        }
      }, error => {
        this.isSpinning = false;
        this.toast.error(error.error.Error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
      })
    }
  }

  viewRequest(id: any): void{
    this.visible = true;
    this.isSpinningView = true;
    this.mainService.getRequestById(id).subscribe((result: any) => {
      if (result.IsSuccess === true){
        this.requestDetails = result.Value;
        this.isSpinningView = false;
      } else {
        this.isSpinningView = false;
        this.toast.error(result.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
      }
    }, error => {
      this.isSpinningView = false;
      this.toast.error(error.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
    })
  }

  close(): void{
    this.visible = false;
  }

  assignRequest(id: any, userId: any): void{
    this.isSpinning = true;
    const payload = {
      userId: userId,
      decision: true
    }
    this.mainService.assignRequest(id, payload).subscribe((result: any) => {
      if (result.IsSuccess === true){
        this.isSpinning = false;
        this.toast.success(result.Value, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
      } else {
        this.isSpinning = false;
        this.toast.error(result.Error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
      }
    }, error => {
      this.isSpinning = false;
      this.toast.error(error.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
    })
  }

}
