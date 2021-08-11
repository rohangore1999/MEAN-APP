import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../appModels/employee.model';

// IMP to handel cors between angular and node express
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  url = 'http://localhost:3000/employees'

  constructor(private http: HttpClient) { }

  addEmployee(emp:any){
    console.log(emp)
    return this.http.post(this.url, emp);
  }

  getEmployees(){
    return this.http.get(this.url)
  }

  deleteEmployee(id){
    return this.http.delete(`${this.url}/${id}`)
  }

  updateEmployee(emp:any){
    console.log(emp)
    console.log(typeof(emp[1]))
    return this.http.put(`${this.url}/${emp[1]}`,emp[0])
  }
}

