import { Component, ElementRef , ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicatorService } from '../../service/communication/communicator.service';
import { RequestMethod } from '@angular/http';
import { User } from '../../models/user';
import  userSession  =  require('../../service/global.session');


@Component({
//  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.html'
})
export class LoginComponent {
  @ViewChild('username') usrName: ElementRef;
  @ViewChild('toastid') toastId: ElementRef;
  @ViewChild('password') usrPassword: ElementRef;
  svalue: string;
  validation = false;
  errorMessage: string;
  constructor(private router: Router, private communicatorService: CommunicatorService) { }
   login(event: Event) {
        let usr: User = new User();
        usr.userName = this.usrName.nativeElement.svalue;
        usr.password = this.usrPassword.nativeElement.svalue;
        console.log('inside the login function for user:' + usr.userName);
        console.log(event);
        if ( usr.userName != null && usr.password != null) {
            this.checkCredentials(usr);
        }else {
            this.validation = true;
            this.toastId.nativeElement.showToast();
        }
    }

    checkCredentials(user: User) {
      let postUrl = 'http://localhost:8181/login';
      this.communicatorService.request(postUrl , RequestMethod.Post , user , '')
      .subscribe(response  => {console.log(':@@::::::::::::' + JSON.stringify(response.json().userName)); this.validation = false ;
       this.router.navigate(['/slist/home'] ); 
        userSession.loginSession = response.json(); } , error =>  {this.validation = true;this.toastId.nativeElement.showToast(); ; this.errorMessage = <any>error;  } );
       }
   
}
