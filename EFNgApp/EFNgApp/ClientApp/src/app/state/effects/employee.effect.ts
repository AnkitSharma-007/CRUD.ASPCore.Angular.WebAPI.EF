import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EmployeeService } from "src/app/services/employee.service";
import { mergeMap, map, catchError, tap, switchMap } from "rxjs/operators";
import {
    LoadEmployeeSuccess, FetchEmployee, AddEmployee, AddEmployeeSuccess,
    DeleteEmployee, DeleteEmployeeSuccess, EditEmployee, EditEmployeeSuccess,
    LoadEmployeeFailure, AddEmployeeFailure, EditEmployeeFailure
} from "src/app/state/actions/employee.actions";
import { of } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class EmployeeEffect {
    constructor(
        private actions$: Actions,
        private _employeeService: EmployeeService,
        private _router: Router,
    ) { }

    loadEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchEmployee),
            switchMap(() =>
                this._employeeService.getEmployees().pipe(
                    map((employees) => LoadEmployeeSuccess({ employees })),
                    catchError(error => of(LoadEmployeeFailure({ error })))
                )
            )
        ),
    )

    addEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddEmployee),
            mergeMap(({ employee }) =>
                this._employeeService.saveEmployee(employee).pipe(
                    map(() => AddEmployeeSuccess({ employee })),
                    tap(() => this._router.navigate(['/fetch-employee'])),
                    catchError(error => of(AddEmployeeFailure({ error })))
                ),
            )
        )
    )

    editEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EditEmployee),
            mergeMap(({ employee }) =>
                this._employeeService.updateEmployee(employee).pipe(
                    map(() => EditEmployeeSuccess({ employee })),
                    tap(() => this._router.navigate(['/fetch-employee'])),
                    catchError(error => of(EditEmployeeFailure({ error })))
                ),
            )
        )
    )

    deleteEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeleteEmployee),
            mergeMap(({ id }) =>
                this._employeeService.deleteEmployee(id).pipe(
                    map(() => DeleteEmployeeSuccess({ id })),
                )
            ),
        )
    )
}