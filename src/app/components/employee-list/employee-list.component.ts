import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  loading = false;
  error: string | null = null;
  searchTerm = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    console.log('🔥 ngOnInit called');
    this.loadEmployees();
  }

  loadEmployees(): void {
    console.log('👉 loadEmployees() START');
    this.loading = true;
    this.error = null;

    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        console.log('✅ API DATA RECEIVED:', data);
        console.log('👉 data length:', data?.length);

        this.employees = data ?? [];
        this.filteredEmployees = [...this.employees];

        console.log('👉 employees:', this.employees);
        console.log('👉 filteredEmployees:', this.filteredEmployees);

        this.loading = false;
        console.log('👉 loading false');
      },
      error: (err) => {
        console.error('❌ API ERROR:', err);
        this.error = 'Failed to load employees.';
        this.loading = false;
      }
    });
  }

  filterEmployees(event: Event): void {
    console.log('👉 filterEmployees() CALLED');

    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();

    console.log('👉 searchTerm:', this.searchTerm);
    console.log('👉 employees before filter:', this.employees);

    this.filteredEmployees = this.employees.filter(emp =>
      emp.fullName.toLowerCase().includes(this.searchTerm) ||
      emp.email.toLowerCase().includes(this.searchTerm) ||
      emp.employeeCode.toLowerCase().includes(this.searchTerm)
    );

    console.log('👉 filteredEmployees AFTER filter:', this.filteredEmployees);
  }

  deleteEmployee(id: number, name: string): void {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          console.log('🗑️ Employee deleted');
          this.loadEmployees();
        },
        error: (err) => {
          console.error('❌ Delete error:', err);
          this.error = 'Failed to delete employee.';
        }
      });
    }
  }

  toggleStatus(employee: Employee): void {
    const updateDto = {
      id: employee.id,
      fullName: employee.fullName,
      email: employee.email,
      isActive: !employee.isActive
    };

    this.employeeService.updateEmployee(updateDto).subscribe({
      next: () => {
        console.log('🔁 Status updated');
        this.loadEmployees();
      },
      error: (err) => {
        console.error('❌ Update error:', err);
        this.error = 'Failed to update employee status.';
      }
    });
  }
}
