import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  activeMenuItem: string = 'employee';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen to route changes to update active menu item
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateActiveMenuItem(event.url);
      });

    // Set initial active menu item based on current route
    this.updateActiveMenuItem(this.router.url);
  }

  private updateActiveMenuItem(url: string): void {
    if (url.includes('/master/employee')) {
      this.activeMenuItem = 'employee';
    } else if (url.includes('/master/admin')) {
      this.activeMenuItem = 'admin';
    } else if (url.includes('/master/department')) {
      this.activeMenuItem = 'department';
    } else if (url.includes('/master/configuration')) {
      this.activeMenuItem = 'configuration';
    }
  }
}

