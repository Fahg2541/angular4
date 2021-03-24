import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { SidebarService } from './Services/sidebar.service';
import { mainContentAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    mainContentAnimation()
  ]
})
export class AppComponent implements OnInit {
  title = 'angular3';
  sidebarState: string;

  constructor(
    private Sidebar: SidebarService
  ) { }

  ngOnInit() {
    this.Sidebar.sidebarStateObservable$.subscribe((newState: string) => {
      this.sidebarState = newState;
    });
  }
}
