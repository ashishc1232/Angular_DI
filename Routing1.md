

##  **Routing Types in Angular 18 (Standalone)**

Here's a breakdown of routing types with examples that we’ll **implement in code** below:

| Routing Type               | Purpose                                                | Example URL         | Code Implementation                                  |
| -------------------------- | ------------------------------------------------------ | ------------------- | ---------------------------------------------------- |
| **Basic Routing**          | Navigate between pages/components                      | `/home`             | Simple route with a component                        |
| **Parameterized Routing**  | Pass dynamic values in route                           | `/user/101`         | Use `:id` in route, and `ActivatedRoute` to fetch it |
| **Child Routes**           | Nested routing inside a parent component               | `/dashboard/stats`  | Use `children` array inside parent route             |
| **Lazy Loading Component** | Load a component only when route is accessed           | `/feature`          | Use `loadComponent: () => import(...)`               |
| **Lazy Loading Routes**    | Load a complete route group/file only when accessed    | `/admin`            | Use `loadChildren: () => import('./admin.routes')`   |
| **Route Guards**           | Protect routes based on conditions (auth, roles, etc.) | `/dashboard`        | Use `canActivate` with a functional guard            |
| **Wildcard Route**         | Catch-all for undefined paths                          | `/anything-invalid` | Use `path: '**'` to show NotFoundComponent           |

---

##  Complete Code Setup (Everything in One Project)

📁 **Folder Structure:**

```
src/
├── main.ts
├── auth.guard.ts
├── auth.service.ts
├── app/
│   ├── app.component.ts
│   └── app.routes.ts
├── home/home.component.ts
├── user/user.component.ts
├── dashboard/
│   ├── dashboard.component.ts
│   ├── details.component.ts
│   └── stats.component.ts
├── feature/feature.component.ts
├── admin.routes.ts
├── admin/admin.component.ts
├── not-found/not-found.component.ts
```

---

# `main.ts`

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
```

---

# `app/app.routes.ts`

```ts
import { Routes } from '@angular/router';
import { authGuard } from '../auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('../home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'user/:id',
    loadComponent: () => import('../user/user.component').then(m => m.UserComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('../dashboard/details.component').then(m => m.DetailsComponent)
      },
      {
        path: 'stats',
        loadComponent: () => import('../dashboard/stats.component').then(m => m.StatsComponent)
      }
    ]
  },
  {
    path: 'feature',
    loadComponent: () => import('../feature/feature.component').then(m => m.FeatureComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin.routes').then(m => m.adminRoutes)
  },
  {
    path: '**',
    loadComponent: () => import('../not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
```

---

# `app/app.component.ts`

```ts
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet],
  template: `
    <h1>Angular Routing Complete Example</h1>
    <nav>
      <a routerLink="/home">Home</a> |
      <a routerLink="/user/101">User</a> |
      <a routerLink="/dashboard">Dashboard</a> |
      <a routerLink="/feature">Feature</a> |
      <a routerLink="/admin">Admin</a> |
      <a routerLink="/random">Invalid Link</a>
    </nav>
    <hr />
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
```

---

## 🧱 All Components

###  `home/home.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `<h2>Home Component</h2><p>Welcome to the home page!</p>`,
})
export class HomeComponent {}
```

###  `user/user.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-user',
  template: `<h2>User Component</h2><p>User ID: {{ userId }}</p>`,
})
export class UserComponent implements OnInit {
  userId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
  }
}
```

###  `dashboard/dashboard.component.ts`

```ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [RouterModule, RouterOutlet],
  template: `
    <h2>Dashboard</h2>
    <a routerLink="">Details</a> |
    <a routerLink="stats">Stats</a>
    <router-outlet></router-outlet>
  `
})
export class DashboardComponent {}
```

###  `dashboard/details.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-details',
  template: `<p>Dashboard - Details View</p>`,
})
export class DetailsComponent {}
```

###  `dashboard/stats.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-stats',
  template: `<p>Dashboard - Stats View</p>`,
})
export class StatsComponent {}
```

---

###  `feature/feature.component.ts` (Lazy-loaded Component)

```ts
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-feature',
  template: `<h2>Lazy Loaded Feature Component</h2>`,
})
export class FeatureComponent {}
```

---

###  `admin.routes.ts` (Lazy-loaded Route Group)

```ts
import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
  }
];
```

---

###  `admin/admin.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-admin',
  template: `<h2>Admin Area (Lazy Route Group)</h2>`,
})
export class AdminComponent {}
```

---

###  `not-found/not-found.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-not-found',
  template: `<h2>404 - Page Not Found</h2>`,
})
export class NotFoundComponent {}
```

---

## 🔐 Guards & Services

###  `auth.service.ts`

```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn(): boolean {
    return true; // Change to false to block access to dashboard
  }
}
```

###  `auth.guard.ts`

```ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() || router.createUrlTree(['/home']);
};
```

---

##  How to Run

1. Create Angular 18 project:

   ```bash
   ng new routing-demo --standalone
   ```

2. Replace files with the code above

3. Run the app:

   ```bash
   ng serve
   ```

4. Navigate through:

   * `/home`
   * `/user/42`
   * `/dashboard`
   * `/feature`
   * `/admin`
   * `/anything-invalid`

---


