import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const API_URL = 'https://bank-task-restapi.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

export class BanksDetailsServiceService {

  public responseCache = new Map();

  constructor(private http:HttpClient) { }

  getBankByAutoComplete(name:any): Observable<any> {
    const URL = API_URL + '/api/branches/autocomplete/'+ name;
    const data = this.responseCache.get(URL);
    
    if (data) {
      return of(data);
    }
    
    const response = this.http.get(URL, {observe: 'response'});
    response.subscribe(data => this.responseCache.set(URL, data));
    return response;
  }

  getBankByCity(name:any): Observable<any> {
    const URL = API_URL + '/api/branches/'+ name;
    const data = this.responseCache.get(URL);

    if (data) {
      return of(data);
    }
    
    const response = this.http.get(URL, {observe: 'response'});
    response.subscribe(data => this.responseCache.set(URL, data));
    return response;
  }

  getBankByIfsc(name:any): Observable<any> {
    const URL = API_URL + '/api/bankDetails/'+ name;
    const data = this.responseCache.get(URL);

    if (data) {
      return of(data);
    }
    
    const response = this.http.get(URL, {observe: 'response'});
    response.subscribe(data => this.responseCache.set(URL, data));
    return response;
  }

  public addToFavourite(fav) {
    window.sessionStorage.setItem(fav.ifsc, JSON.stringify(fav));
  }

  public getFavourite(id:any) {
    return JSON.parse(sessionStorage.getItem(id));
  }

}
