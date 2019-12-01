import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from 'src/models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  myAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getCityList() {
    return this._http.get(this.myAppUrl + 'api/Employee/GetCityList')
      .pipe(map(
        response => {
          return response;
        }));
  }

  getEmployees() {
    console.log('service called');
    return this._http.get<Employee[]>(this.myAppUrl + 'api/Employee/Index').pipe(map(
      response => {
        return response;
      }));
  }

  getEmployeeById(id: number) {
    return this._http.get(this.myAppUrl + 'api/Employee/Details/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }

  saveEmployee(employee: Employee) {
    console.log('service called');
    return this._http.post(this.myAppUrl + 'api/Employee/Create', employee)
      .pipe(map(
        response => {
          return response;
        }));
  }

  updateEmployee(employee: Employee) {
    return this._http.put(this.myAppUrl + 'api/Employee/Edit', employee)
      .pipe(map(
        response => {
          return response;
        }));
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(this.myAppUrl + 'api/Employee/Delete/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }
}
