using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EFNgApp.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EFNgApp.Controllers
{

    public class EmployeeController : Controller
    {
        EmployeeDataAccessLayer objemployee = new EmployeeDataAccessLayer();

        [HttpGet]
        [Route("api/Employee/Index")]
        public IEnumerable<TblEmployee> Index()
        {
            return objemployee.GetAllEmployees();
        }

        [HttpPost]
        [Route("api/Employee/Create")]
        public int Create([FromBody] TblEmployee employee)
        {
            return objemployee.AddEmployee(employee);
        }

        [HttpGet]
        [Route("api/Employee/Details/{id}")]
        public TblEmployee Details(int id)
        {
            return objemployee.GetEmployeeData(id);
        }

        [HttpPut]
        [Route("api/Employee/Edit")]
        public int Edit([FromBody]TblEmployee employee)
        {
            return objemployee.UpdateEmployee(employee);
        }

        [HttpDelete]
        [Route("api/Employee/Delete/{id}")]
        public int Delete(int id)
        {
            return objemployee.DeleteEmployee(id);
        }

        [HttpGet]
        [Route("api/Employee/GetCityList")]
        public IEnumerable<TblCities> Details()
        {
            return objemployee.GetCities();
        }
    }

}