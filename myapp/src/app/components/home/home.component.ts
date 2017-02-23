import { Component, OnInit, ElementRef , ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { User } from '../../models/user';
import { Student } from '../../models/student';
import { Router } from '@angular/router';
import  {loginSession}  from '../../service/global.session';
@Component({
// moduleId: module.id,
  selector: 'my-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
    @ViewChild('sCard') sCardElement: ElementRef;
    uName: String;
    users: User[];
    students: Student[];
    errorMessage: string;
    str: string;
    response: Response;
    constructor(private router: Router) {
    }

    ngOnInit() {
    //    console.log('Hello About' + loginSession.userName);
        if (!loginSession)  {
             this.router.navigate(['/slist/login'] );
        } else {
            this.uName = loginSession.userName;
            console.log('User Name', loginSession.userName);
        }
        this.connectWebSocket();
    }

    routeAbout( event: any) {
        let routTo = event.detail.routTo;
        switch (routTo) {
            case 'about': {this.router.navigate(['/slist/about'] );
                            break; }
            case 'logout': {this.router.navigate(['/slist/login'] );
                            break; }
        }
        if (this.sCardElement.nativeElement) {
            this.sCardElement.nativeElement.remove();
        }
    }

    connectWebSocket() {
        if ('WebSocket' in window) {
            let connection = new WebSocket('ws://localhost:8181/websocket');
            connection.onopen = function(){
                console.log('Connection open!');
                connection.send('Hey server');
            };
            connection.onmessage = function(e){
                let server_message = e.data;
                console.log('Mesage from server: ' + server_message);
            };
            connection.onerror = function(error){
                console.log('Error detected: ' + error);
            };
        }
    }
}
