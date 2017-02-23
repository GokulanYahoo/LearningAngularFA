import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { CommunicatorService } from './communication/communicator.service';
import { Observable }     from 'rxjs/Observable';
import { RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class SListDetailsService {

  private url = 'http://localhost:8181/getstudentlist';
  private updateUrl = 'http://localhost:8181/update';
  response: Response;
  private errorMessage: string;
  constructor(private communicatorService: CommunicatorService) {
  }

  getSListDetails(searchParam: Map<String, String>): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        searchParam.forEach((value: string, key: string) => {
          console.log(key, value);
          params.set(key, value);
        });
        return this.communicatorService.request(this.url, RequestMethod.Get, '' , params)
          .map( (response)  => {
            console.log( 'fetched using the http.request method in SListDetailsService' , response);
            return response;
          } ,
            error => this.errorMessage = <any>error);
  }

  updateSListDetails( updatedDtls: any) {
    console.log('Data to be updated:', updatedDtls);
    this.communicatorService.request(this.updateUrl , RequestMethod.Put , updatedDtls , '')
      .subscribe(response  => {console.log('updateSListDetails:@@::::::::::::' + JSON.stringify(response.json())); } ,
       error =>  { this.errorMessage = <any>error;  } );
  }
}
