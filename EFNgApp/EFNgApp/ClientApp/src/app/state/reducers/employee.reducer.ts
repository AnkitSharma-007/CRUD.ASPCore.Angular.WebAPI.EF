import { Employee } from "src/models/employee";
import * as EmployeeActions from 'src/app/state/actions/employee.actions';
import { createSelector, createReducer, on } from "@ngrx/store";
import { Action } from "@ngrx/store/src/models";
import { AppState } from "../app.state";

export interface EmployeeState {
    list: Employee[],
    loading: boolean,
    error: Error
}

export const initialState = {
    list: [],
    loading: false,
    error: undefined
};

export const employeeReducer = createReducer(
    initialState,
    on(EmployeeActions.FetchEmployee, state => (console.log('fetch reducer called'), {
        ...state,
        loading: true,

    })),
    on(EmployeeActions.LoadEmployeeSuccess, (state, { employees }) => (
        (console.log('LoadEmployeeSuccess reducer called'),
            {
                ...state,
                list: employees,
                loading: false
            })),
    ),

    on(EmployeeActions.LoadEmployeeFailure, (state, { error }) => (
        (console.log('LoadEmployeeSuccess reducer called'), {
            ...state,
            error: error,
            loading: false
        })),
    ),

    on(EmployeeActions.AddEmployee, state =>
        (console.log('AddEmployee reducer called'), {
            ...state,
            loading: true,
        })),

    on(EmployeeActions.AddEmployeeSuccess, (state, { employee }) =>
        (console.log('AddEmployeeSuccess reducer called'), {
            ...state,
            list: [...state.list, employee],
            loading: false,
        })),

    on(EmployeeActions.AddEmployeeFailure, (state, { error }) => (
        (console.log('AddEmployeeFailure reducer called'), {
            ...state,
            error: error,
            loading: false
        })),
    ),

    on(EmployeeActions.EditEmployee, state =>
        (console.log('EditEmployee reducer called'), {
            ...state,
            loading: true,
        })),

    on(EmployeeActions.EditEmployeeSuccess, (state, { employee }) => ({
        ...state,
        list: [...state.list, employee],
        loading: false,
    })),

    on(EmployeeActions.EditEmployeeFailure, (state, { error }) => (
        (console.log('EditEmployeeFailure reducer called'), {
            ...state,
            error: error,
            loading: false
        })),
    ),

    on(EmployeeActions.DeleteEmployee, state =>
        (console.log('DeleteEmployee reducer called'), {
            ...state,
            loading: true,

        })),

    on(EmployeeActions.DeleteEmployeeSuccess, (state, { id }) =>
        (console.log('DeleteEmployeeSuccess reducer called'), {
            ...state,
            list: state.list.filter(item => item.employeeId !== id),
            loading: false,
        })),
);

export function reducer(state: EmployeeState | undefined, action: Action) {
    return employeeReducer(state, action);
}

const getEmployeeFeatureState = (state: AppState) => state.employee;

export const getEmployees = createSelector(
    getEmployeeFeatureState,
    (state: EmployeeState) => state.list
);