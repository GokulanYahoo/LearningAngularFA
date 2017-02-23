import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestMethod, BaseRequestOptions, Request } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class CommunicatorService {
    constructor(private http: Http) {}
        //constructor(private http: Http, private i18n: I18nService ) {}

    get(url: string, params?: any): Observable<Response> {
        return this.request(url, RequestMethod.Get, "", params);
    }

    post(url: string, body: any): Observable<Response> {
        return this.request(url, RequestMethod.Post, body);
    }

    public request(url: string, method: RequestMethod, body?: any, params?: any): Observable<Response> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //headers.append('Parameter',   params);
        console.log("inside the request metod:::");
        let resultObservables: Observable<Response>;
        let options = new BaseRequestOptions();
        options.headers = headers;
        options.url = url;
        options.method = method;
        options.body = body;
        options.withCredentials = true;
        options.search = params;

        let request = new Request(options);

        resultObservables = this.http.request(request).map((response: Response) => response)
                    .catch(this.handleError);

        return resultObservables;
    }

    private handleError(error: any) {

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    // set the accept-language header using the value from i18n service that holds the language currently selected by the user
    //private createAcceptLanguageHeader(headers:Headers) {

    //    headers.append('Accept-Language', this.i18n.getCurrentLang());
    //}
}
