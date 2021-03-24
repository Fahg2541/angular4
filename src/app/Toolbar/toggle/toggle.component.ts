import { Component, OnInit, Input } from '@angular/core';
import { from } from 'rxjs';
import { SidebarService } from '../../Services/sidebar.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {

  @Input() sidenav: MatSidenav

  constructor(private Sidebar: SidebarService) { }

  toggleSideNav() {
    this.Sidebar.toggle();
  }

}
