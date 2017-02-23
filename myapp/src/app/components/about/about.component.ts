import { Component, OnInit } from '@angular/core';
import { Response,URLSearchParams } from '@angular/http';
import { CommunicatorService } from '../../service/communication/communicator.service';
//import { HttpCommunicationClient } from '../../service/communication/httpCommunicationClient.service';
import { User} from '../../models/user';
import { Student} from '../../models/student';


@Component({
    selector: 'my-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    private url = "http://localhost:8182/getstudentlist";
    private postUrl="http://localhost:8182/login";
    users: User[];
    students:Student[];
    errorMessage: string;
    str:string;
    response:Response;
    constructor(private communicatorService: CommunicatorService) {
        // Do stuff 
    }

    ngOnInit() {
        console.log('Hello About');
        this.userDtlsDisplay();
        this.userDtlsSubmit();
    }

    userDtlsDisplay() {
        let studentReponse:any;
        let params: URLSearchParams = new URLSearchParams();
        params.set('pageNum', '1');
        params.set('size', '2');
        this.communicatorService.get(this.url,params).subscribe(
            response => {studentReponse=response.json(); console.log("fetched using the http.request method " + studentReponse.studentDetails[0].studentName)},
            error => this.errorMessage = <any>error);
    }

     //   this.communicatorService.getDtls(this.url).subscribe(
    //        response => {this.users=response.json(); console.log("All:::::: " + this.users[0].id)},
    //        error => this.errorMessage = <any>error);
   // }

    userDtlsSubmit() {
        let str:User={"password":"admin456","userName": "john"};
        this.communicatorService.post(this.postUrl,str)
                     .subscribe(
                       response  => console.log(":@@::::::::::::"+JSON.stringify(response.json())),
                       error =>  this.errorMessage = <any>error);
    }
}
