import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = `${environment.apiUrl}/User`
  constructor(private http: HttpClient) {}

  signUp(userObj:any) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, userObj)
  }
  
  login(loginObj:any) : Observable<any> {
    console.log(`${this.baseUrl}/authenticate`);
    return this.http.post<any>(`${this.baseUrl}/authenticate`, loginObj)
  }
}
