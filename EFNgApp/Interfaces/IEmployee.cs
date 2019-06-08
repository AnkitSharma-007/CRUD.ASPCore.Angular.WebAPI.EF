using EFNgApp.Models;
using System;
using System.Collections.Generic;

namespace EFNgApp.Interfaces
{
    public interface IEmployee
    {
        IEnumerable<TblEmployee> GetAllEmployees();
        int AddEmployee(TblEmployee employee);
        int UpdateEmployee(TblEmployee employee);
        TblEmployee GetEmployeeData(int id);
        int DeleteEmployee(int id);
        List<TblCities> GetCities();
    }
}
