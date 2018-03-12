import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchEmployeeComponent } from '../fetchemployee/fetchemployee.component';
import { EmployeeService } from '../../services/empservice.service';

@Component({
    templateUrl: './AddEmployee.component.html'
})

export class createemployee implements OnInit {
    employeeForm: FormGroup;
    title: string = "Create";
    employeeId: number;
    errorMessage: any;
    cityList: Array<any> = [];

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _employeeService: EmployeeService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.employeeId = this._avRoute.snapshot.params["id"];
        }

        this.employeeForm = this._fb.group({
            employeeId: 0,
            name: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            department: ['', [Validators.required]],
            city: ['', [Validators.required]]
        })
    }

    ngOnInit() {

        this._employeeService.getCityList().subscribe(
            data => this.cityList = data
        )

        if (this.employeeId > 0) {
            this.title = "Edit";
            this._employeeService.getEmployeeById(this.employeeId)
                .subscribe(resp => this.employeeForm.setValue(resp)
                , error => this.errorMessage = error);
        }

    }

    save() {

        if (!this.employeeForm.valid) {
            return;
        }

        if (this.title == "Create") {
            this._employeeService.saveEmployee(this.employeeForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-employee']);
                }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
            this._employeeService.updateEmployee(this.employeeForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-employee']);
                }, error => this.errorMessage = error)
        }
    }

    cancel() {
        this._router.navigate(['/fetch-employee']);
    }

    get name() { return this.employeeForm.get('name'); }
    get gender() { return this.employeeForm.get('gender'); }
    get department() { return this.employeeForm.get('department'); }
    get city() { return this.employeeForm.get('city'); }
}