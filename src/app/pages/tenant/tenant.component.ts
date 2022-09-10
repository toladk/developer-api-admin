import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HotToastService } from '@ngneat/hot-toast'

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {

  tenantList: any[] = [];

  p = 1;

  isSpinning = false;
  isSpinningView = false;

  visible = false;
  tenantDetails: any;

  constructor(
    private spinner: NgxSpinnerService,
    private mainService: MainService,
    private notification: NzNotificationService,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {

    this.getAllTenant()

  }

  getAllTenant(): void{
    this.isSpinning = true;
    this.mainService.getAllTenant().subscribe((result: any) => {
      if (result.IsSuccess === true){
        this.tenantList = result.Value;
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

  acitvationTenant(ID: any): void{
    this.isSpinning = true;
    const payload = {
      id: ID
    }
    this.mainService.activateTenant(payload, ID).subscribe((result: any) => {
      if (result.IsSuccess === true){
        this.toast.success(result.Value, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
        this.isSpinning = false;
        this.getAllTenant();
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

  viewTenant(id: any): void{
    this.isSpinningView = true;
    this.visible = true;
    this.mainService.getTenantById(id).subscribe((result: any) => {
      if (result.IsSuccess === true){
        this.isSpinningView = false;
        this.tenantDetails = result.Value;
      } else {
        this.isSpinningView = false;
        this.toast.error(result.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
      }
    }, error => {
      this.isSpinningView = false;
      this.toast.error(error.error.error, {duration: 5000, position: 'top-right', style: {padding: '16px', color: '#000'}});
    })
  }

}
