import { Component, ViewChild, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ExampleService } from './example.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'application';
  showHead: boolean | undefined;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date ;

  public modalRef: BsModalRef | undefined;
 

  @ViewChild('childModal', { static: false })
  childModal!: ModalDirective;


 
  userlogin:  any;
  appService: any;

  constructor(private apiservice: ExampleService,private router : Router,private idle: Idle, private keepalive: Keepalive){
    this.userlogin = localStorage.getItem('isUserLoggedIn');
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/user') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });

    idle.setIdle(600);
    idle.setTimeout(10);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onIdleEnd.subscribe(() => { 
      this.idleState = 'No longer idle.'
      this.reset();
    });
    
    idle.onTimeout.subscribe(() => {
      
      this.childModal.hide();
      this.idleState = 'Timed out!';
      this.timedOut = true;
      localStorage.setItem("isUserLoggedIn","false");
      this.router.navigate(['/login']);
    });

    
      idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
        this.childModal.show();  
      });
    
    
    
      idle.onTimeoutWarning.subscribe((countdown) => {
        if(this.userlogin){
          this.idleState = 'You will time out in ' + countdown + ' seconds!'
        }
      });
    
    if(this.userlogin === "true"){
      idle.watch()
      this.timedOut = false;
    }else{
      idle.stop();
    }
  }


  hideChildModal(){
    this.childModal.hide();
  }

  stay() {
    this.childModal.hide();
    this.reset();
  }

  logout() {
    this.childModal.hide();
    localStorage.setItem("isUserLoggedIn","false");
    this.router.navigate(['/home']);
  }


  reset() {
    this.idle.watch();
    this.timedOut = false;
  }
  

  value: string | undefined |null;
  
  ngOnInit(): void {
    this.value = localStorage.getItem('isUserLoggedIn');
  }
  

}

