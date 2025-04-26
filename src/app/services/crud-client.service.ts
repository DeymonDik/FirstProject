import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class CrudClientService {

  domainServer:string = "http://localhost:8080";

  constructor(private http: HttpClient){ }
  
  getData(){
      const url = `${this.domainServer}/item/list`;
      return this.http.get(url); 
  }

  postData(item:Item){
    const url = `${this.domainServer}/item/create`;
    return this.http.post(url, item); 
  }

  putData(item:Item){
    if(!item.id)return;
    const url = `${this.domainServer}/item/change`;
    const params = new HttpParams().set("id", item.id);
    return this.http.put(url, item, {params}); 
  }

  deleteData(id: number){
    const url = `${this.domainServer}/item/delete`;
    const params = new HttpParams().set("id", id);
    return this.http.delete(url, {params}); 
  }
}
