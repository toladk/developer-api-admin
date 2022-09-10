import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './authentication/services/auth.service';
import { IdleService } from './authentication/services/idle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'developer-api-admin';

  constructor(
    private idleService: IdleService,
    private authService: AuthService,
    private notification: NzNotificationService
  ) {
    this.loadScripts()
  }

  ngOnInit(): void {
    this.initialIdleSettings();
  }

  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
       'assets/libs/jquery/jquery.min.js',
       'assets/libs/bootstrap/js/bootstrap.bundle.min.js',
       'assets/libs/metismenu/metisMenu.min.js',
       'assets/libs/simplebar/simplebar.min.js',
       'assets/libs/node-waves/waves.min.js',
       'assets/libs/feather-icons/feather.min.js',
       'assets/libs/apexcharts/apexcharts.min.js',
       'assets/libs/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.min.js',
       'assets/libs/admin-resources/jquery.vectormap/maps/jquery-jvectormap-world-mill-en.js',
       'assets/js/pages/dashboard.init.js',
       'assets/js/app.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
 }

  private initialIdleSettings() {
    const idleTimeoutInSeconds: number = environment.idleTimeInMinutes * 120;
    this.idleService.startWatching(idleTimeoutInSeconds).subscribe((isTimeOut: boolean) => {
      if (isTimeOut) {
          this.authService.logout()
          this.notification.error( 'Session', 'Session time-out, Please login !!' );
      }
    });
  }

}
