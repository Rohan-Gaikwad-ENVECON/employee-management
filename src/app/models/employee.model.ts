export interface Employee {
    id: number;
    employeeCode: string;
    fullName: string;
    email: string;
    isActive: boolean;
    createdDate: Date;
}

export interface EmployeeCreateDto {
    employeeCode: string;
    fullName: string;
    email: string;
}

export interface EmployeeUpdateDto {
    id: number;
    fullName: string;
    email: string;
    isActive: boolean;
}
