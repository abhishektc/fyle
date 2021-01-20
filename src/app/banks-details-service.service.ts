import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://bank-task-restapi.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

export class BanksDetailsServiceService {

  constructor(private http:HttpClient) { }

  getBankByAutoComplete(name:any): Observable<any> {
    return this.http.get(`${API_URL + '/api/branches/autocomplete'}/${name}`, {observe: 'response'});
  }

  getBankByCity(name:any): Observable<any> {
    return this.http.get(`${API_URL + '/api/branches'}/${name}`, {observe: 'response'});
  }

  getBankByIfsc(name:any): Observable<any> {
    return this.http.get(`${API_URL + '/api/bankDetails'}/${name}`,{observe: 'response'});
  }

  public addToFavourite(fav) {
    window.sessionStorage.setItem(fav.ifsc, JSON.stringify(fav));
  }

  public getFavourite(id:any) {
    return JSON.parse(sessionStorage.getItem(id));
  }

}
