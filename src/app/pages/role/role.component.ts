import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HotToastService } from '@ngneat/hot-toast'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roleList: any[] = [];

  p = 1;

  isSpinning = false;

  constructor(
    private spinner: NgxSpinnerService,
    private mainService: MainService,
    private notification: NzNotificationService,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {

    this.getAllRole()

  }

  getAllRole(): void{
    this.isSpinning = true;
    this.mainService.getAllRole().subscribe((result: any) => {
      if (result.IsSuccess === true){
        this.roleList = result.Value;
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
