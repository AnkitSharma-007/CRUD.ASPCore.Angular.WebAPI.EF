import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/models/employee';
import { Store, select } from "@ngrx/store";
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { FetchEmployee, DeleteEmployee } from 'src/app/state/actions/employee.actions';
import { getEmployees } from 'src/app/state/reducers/employee.reducer';

@Component({
  selector: 'app-fetch-employee',
  templateUrl: './fetch-employee.component.html',
  styleUrls: ['./fetch-employee.component.css']
})
export class FetchEmployeeComponent implements OnInit {

  loading$: Observable<Boolean>;
  error$: Observable<Error>

  public empList: Observable<Employee[]>;

  temp: Employee[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(FetchEmployee());
    this.empList = this.store.pipe(select(getEmployees));
    this.loading$ = this.store.select(store => store.employee.loading);
  }

  delete(employeeID) {
    const ans = confirm('Do you want to delete employee with Id: ' + employeeID);
    if (ans) {
      this.store.dispatch(DeleteEmployee({ id: employeeID }));
    }
  }
}
