import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private titleServive: Title
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let title = this.getTitle(this.activateRoute.snapshot.root)
        this.titleServive.setTitle(title)
      }
    })
  }

  private getTitle(routeSnapshot: ActivatedRouteSnapshot, title: string = '') {
    title = routeSnapshot.data && routeSnapshot.data['title'] ? routeSnapshot.data['title'] : title;
    if (routeSnapshot.firstChild) {
      title = this.getTitle(routeSnapshot.firstChild, title);
    }
    return title;
  }

}