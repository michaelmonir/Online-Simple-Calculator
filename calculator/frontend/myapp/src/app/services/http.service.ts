import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class HttpService {
  constructor(private http: HttpClient) { }

  AddRequest(num1:string, num2:string) : Observable<string>
  {
    return this.http.get("http://localhost:8080/add/" + num1 + "/" + num2 + "/",
      {responseType: 'text'});
  }

  DivideRequest(num1:string, num2:string) : Observable<string>
  {
    return this.http.get("http://localhost:8080/div/" + num1 + "/" + num2 + "/",
      {responseType: 'text'});
  }
  MultiplyRequest(num1:string, num2:string) : Observable<string>
  {
    return this.http.get("http://localhost:8080/mul/" + num1 + "/" + num2 + "/",
      {responseType: 'text'});
  }
  SubtractRequest(num1:string, num2:string) : Observable<string>
  {
    return this.http.get("http://localhost:8080/sub/" + num1 + "/" + num2 + "/",
      {responseType: 'text'});
  }
  SquareRequest(num:string) : Observable<string>
  {
    return this.http.get("http://localhost:8080/square/" + num + "/",
      {responseType: 'text'});
  }
  RootRequest(num:string) : Observable<string>
  {
    return this.http.get("http://localhost:8080/root/" + num + "/",
      {responseType: 'text'});
  }
  ReciprocalRequest(num:string) : Observable<string>
  {
    return this.http.get("http://localhost:8080/reciprocal/" + num + "/",
      {responseType: 'text'});
  }
  PercentRequest(num:string) : Observable<string>
  {
    return this.http.get("http://localhost:8080/percent/" + num + "/",
      {responseType: 'text'});
  }
  OneSideOperatorRequest(type:string, num:string) : Observable<string>
  {
    return this.http.get("http://localhost:8080/" + type + "/" + num + "/",
      {responseType: 'text'});
  }
}
