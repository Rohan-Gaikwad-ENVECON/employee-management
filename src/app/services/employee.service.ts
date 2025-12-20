import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Employee, EmployeeCreateDto, EmployeeUpdateDto } from '../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private apiUrl = 'https://localhost:7256/api/Employee'; // Update with your API URL

    constructor(private http: HttpClient) { }

    /**
     * Get all employees*ngIf="!loading && filteredEmployees.length > 0"

     */
    getAllEmployees(): Observable<Employee[]> {
        debugger
        return this.http.get<Employee[]>(this.apiUrl)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    /**
     * Get employee by ID
     */
    getEmployeeById(id: number): Observable<Employee> {
        return this.http.get<Employee>(`${this.apiUrl}/${id}`)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    /**
     * Create new employee
     */
    createEmployee(employee: EmployeeCreateDto): Observable<Employee> {
        return this.http.post<Employee>(this.apiUrl, employee)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Update existing employee
     */
    updateEmployee(employee: EmployeeUpdateDto): Observable<Employee> {
        return this.http.put<Employee>(this.apiUrl, employee)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Delete employee
     */
    deleteEmployee(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Handle HTTP errors
     */
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}

