import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeCreateDto, EmployeeUpdateDto } from '../../models/employee.model';

@Component({
    selector: 'app-employee-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
    employeeForm: FormGroup;
    isEditMode = false;
    employeeId: number | null = null;
    loading = false;
    error: string | null = null;
    successMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private employeeService: EmployeeService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.employeeForm = this.fb.group({
            employeeCode: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]+$/)]],
            fullName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            isActive: [true]
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (id && id !== 'new') {
            this.isEditMode = true;
            this.employeeId = +id;
            this.loadEmployee(this.employeeId);
            // Disable employee code in edit mode
            this.employeeForm.get('employeeCode')?.disable();
        }
    }

    loadEmployee(id: number): void {
        this.loading = true;
        this.employeeService.getEmployeeById(id).subscribe({
            next: (employee) => {
                this.employeeForm.patchValue({
                    employeeCode: employee.employeeCode,
                    fullName: employee.fullName,
                    email: employee.email,
                    isActive: employee.isActive
                });
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Failed to load employee data. Please try again.';
                this.loading = false;
                console.error('Error loading employee:', err);
            }
        });
    }

    onSubmit(): void {
        if (this.employeeForm.invalid) {
            this.markFormGroupTouched(this.employeeForm);
            return;
        }

        this.loading = true;
        this.error = null;

        if (this.isEditMode && this.employeeId) {
            this.updateEmployee();
        } else {
            this.createEmployee();
        }
    }

    createEmployee(): void {
        const employeeData: EmployeeCreateDto = {
            employeeCode: this.employeeForm.value.employeeCode,
            fullName: this.employeeForm.value.fullName,
            email: this.employeeForm.value.email
        };

        this.employeeService.createEmployee(employeeData).subscribe({
            next: () => {
                this.successMessage = 'Employee created successfully!';
                this.loading = false;
                setTimeout(() => {
                    this.router.navigate(['/employees']);
                }, 1500);
            },
            error: (err) => {
                this.error = 'Failed to create employee. Please try again.';
                this.loading = false;
                console.error('Error creating employee:', err);
            }
        });
    }

    updateEmployee(): void {
        if (!this.employeeId) return;

        const employeeData: EmployeeUpdateDto = {
            id: this.employeeId,
            fullName: this.employeeForm.value.fullName,
            email: this.employeeForm.value.email,
            isActive: this.employeeForm.value.isActive
        };

        this.employeeService.updateEmployee(employeeData).subscribe({
            next: () => {
                this.successMessage = 'Employee updated successfully!';
                this.loading = false;
                setTimeout(() => {
                    this.router.navigate(['/employees']);
                }, 1500);
            },
            error: (err) => {
                this.error = 'Failed to update employee. Please try again.';
                this.loading = false;
                console.error('Error updating employee:', err);
            }
        });
    }

    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            control?.markAsTouched();
        });
    }

    getErrorMessage(fieldName: string): string {
        const control = this.employeeForm.get(fieldName);

        if (control?.hasError('required')) {
            return `${this.getFieldLabel(fieldName)} is required`;
        }

        if (control?.hasError('email')) {
            return 'Please enter a valid email address';
        }

        if (control?.hasError('minlength')) {
            return `${this.getFieldLabel(fieldName)} must be at least 2 characters`;
        }

        if (control?.hasError('pattern')) {
            return 'Employee code must contain only uppercase letters and numbers';
        }

        return '';
    }

    private getFieldLabel(fieldName: string): string {
        const labels: { [key: string]: string } = {
            employeeCode: 'Employee Code',
            fullName: 'Full Name',
            email: 'Email',
            isActive: 'Status'
        };
        return labels[fieldName] || fieldName;
    }

    cancel(): void {
        this.router.navigate(['/employees']);
    }
}
