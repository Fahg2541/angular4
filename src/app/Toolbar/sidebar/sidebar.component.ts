import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { SidebarService } from '../../Services/sidebar.service';
import { sidebarAnimation, iconAnimation, labelAnimation, labelAnimation1 } from '../../animation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    sidebarAnimation(),
    iconAnimation(),
    labelAnimation(),
    labelAnimation1()
  ]
})
export class SidebarComponent implements OnInit {

  sidebarState: string;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(
    private Sidebar: SidebarService
  ) { }

  ngOnInit(): void {
    this.Sidebar.sidebarStateObservable$.subscribe((newState: string) => {
      this.sidebarState = newState;
    });
  }

}
