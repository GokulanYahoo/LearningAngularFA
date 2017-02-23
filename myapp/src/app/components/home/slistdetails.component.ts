import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { Response } from '@angular/http';
import { SListDetailsService } from '../../service/slistdetails.service';
import { Student } from '../../models/Student';

@Component({
  selector: 'slist-details',
  templateUrl: './slistdetails.component.html'
})
export class SListDetailsComponent implements OnInit {
  private sLists: Student[];
  private pageNum: number = 1;
  private size: number = 10;
  response: Response;
  errorMessage: string;
  typeText: string;
  flag: boolean = false ;
  listenFunc: Function;
  private loaderFlag: boolean = false;
  private loadBtnLoader: boolean =true;

  constructor(private sListDetailsService: SListDetailsService , elementRef: ElementRef, renderer: Renderer) {
      this.listenFunc = renderer.listen(elementRef.nativeElement, 'searchEvent', (event) => {
      console.log('event :::' , event.detail.searchFilter);
      this.getFilteredElement(event.detail.searchFilter);
    });
  }

  ngOnInit() {
    let searchParam: Map<string, any> = new Map< string, any>();
    searchParam.set("pageNum", this.pageNum);
    searchParam.set("size", this.size);
    this.getSListDetails(searchParam);
    searchParam.set('name', 'Antony');
    // this.getSListDetails(searchParam); This is done for the filtering, once it is completed we can uncomment this.
  }
  _updateAttendance(event: any){
    let updatedDtls: any = {"rollNo": event.detail.studentRollNo, "status" : event.detail.studentStatus};
    this.sListDetailsService.updateSListDetails(updatedDtls);
    this.loadMore();
  }

  getSListDetails(searchParam: Map<String, String>) {
    this.flag = false;
    let subscription = this.sListDetailsService.getSListDetails(searchParam);
    subscription.subscribe(( data ) => {
      this.flag = true;
      this.sLists = [];
      this.sLists = data.json().studentDetails;
      console.log('getSListDetails details from server::: ', this.sLists);
      this.loaderFlag = false;
      this.loadBtnLoader = true;
    }, (error) => {
      console.log('error :::' , error );
      this.loaderFlag = false;
      this.loadBtnLoader = true;
    });
  }

  getFilteredElement(obj: any) {
      this.loaderFlag = true;
      this.loadBtnLoader = true;

    let pageNum: string = '1';
    let size: string = '10';
    let searchParam: Map<string, string> = new Map< string, string>();
     searchParam.set("pageNum", pageNum);
    searchParam.set("size", size);
    if (obj.RollNo) {
      searchParam.set('rollNo',obj.RollNo)
    }
     if (obj.Division) {
      searchParam.set('class',obj.division)
    }
     if (obj.Name) {
      searchParam.set('name',obj.Name)
    }
    // searchParam = this.objectToMap(obj);
    this.getSListDetails(searchParam);
  }

  loadMore() {
    this.loaderFlag = true;
    this.loadBtnLoader = false;
    let searchParam: Map<string, any> = new Map< string, any>();
    searchParam.set( "pageNum" , this.pageNum);
    searchParam.set( "size" , this.size);

    this.pageNum = this.pageNum + 1;
    this.getSListDetails(searchParam);
  }
}