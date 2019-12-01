import { EmployeeState } from "./reducers/employee.reducer";

export interface AppState {
    readonly employee: EmployeeState;
}

