import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    if (route.children.length === 0) return breadcrumbs;

    for (let child of route.children) {
      const routeConfig = child.routeConfig;
      if (!routeConfig || !routeConfig.data || !routeConfig.data['breadcrumb']) continue;

      const routeURL = routeConfig.path ? `/${routeConfig.path}` : '';
      const fullURL = `${url}${routeURL}`;

      let label = routeConfig.data['breadcrumb'];

      // Dynamic breadcrumb for parameters (like Residence ID)
      if (child.snapshot.params) {
        Object.keys(child.snapshot.params).forEach(param => {
          label = label.replace(`:${param}`, child.snapshot.params[param]);
        });
      }

      breadcrumbs.push({ label, url: fullURL });
      return this.createBreadcrumbs(child, fullURL, breadcrumbs);
    }

    return breadcrumbs;
  }
}
