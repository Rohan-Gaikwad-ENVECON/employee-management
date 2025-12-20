# Employee Management System - Angular 18

A modern, production-ready employee management system built with Angular 18 standalone components.

## Features

✨ **Modern UI/UX**
- Beautiful gradient designs and animations
- Responsive layout for all devices
- Interactive status toggles
- Real-time search and filtering

🚀 **Full CRUD Operations**
- Create new employees
- View employee list with search
- Update employee information
- Delete employees with confirmation
- Toggle employee status (Active/Inactive)

🎯 **Production-Ready**
- TypeScript for type safety
- Reactive forms with validation
- HTTP error handling and retry logic
- Loading states and user feedback
- Clean architecture with services and models

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v18)

## Installation

1. Navigate to the project directory:
```bash
cd employee-management
```

2. Install dependencies:
```bash
npm install
```

## Configuration

Update the API URL in `src/app/services/employee.service.ts`:

```typescript
private apiUrl = 'http://localhost:7256/api/Employee'; // Update with your API URL
```

## Running the Application

### Development Server

```bash
npm start
```

or

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

### Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── employee-list/      # Employee list with search and actions
│   │   └── employee-form/      # Create/Edit employee form
│   ├── models/
│   │   └── employee.model.ts   # TypeScript interfaces
│   ├── services/
│   │   └── employee.service.ts # API communication service
│   ├── app.routes.ts           # Routing configuration
│   ├── app.config.ts           # Application configuration
│   ├── app.ts                  # Root component
│   └── app.html                # Root template
├── styles.css                  # Global styles
└── index.html                  # Main HTML file
```

## API Endpoints

The application expects the following API endpoints:

- `GET /api/Employee` - Get all employees
- `GET /api/Employee/{id}` - Get employee by ID
- `POST /api/Employee` - Create new employee
- `PUT /api/Employee` - Update employee
- `DELETE /api/Employee/{id}` - Delete employee

## Features in Detail

### Employee List
- Search employees by name, email, or employee code
- View all employee information in a table
- Click status badge to toggle active/inactive
- Edit and delete actions for each employee
- Empty state when no employees found

### Employee Form
- Create new employees with validation
- Edit existing employee information
- Form validation for all fields
- Employee code validation (uppercase letters and numbers only)
- Email validation
- Success/error messages
- Loading states during API calls

## Technologies Used

- **Angular 18** - Latest Angular framework with standalone components
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming
- **CSS3** - Modern styling with gradients and animations
- **Google Fonts** - Inter font family

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Author

Built with ❤️ using Angular 18
