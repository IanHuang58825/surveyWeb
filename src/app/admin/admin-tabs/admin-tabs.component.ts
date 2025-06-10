import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TabsService } from '../../@services/tabs.service';
import { Toolbar2Component } from "../../components/toolbar2/toolbar2.component";

@Component({
  selector: 'app-admin-tabs',
  imports: [
    MatTabsModule,
    MatButtonModule,
    RouterLink,
    RouterOutlet,
    Toolbar2Component
],
  templateUrl: './admin-tabs.component.html',
  styleUrl: './admin-tabs.component.scss'
})
export class AdminTabsComponent {
  links = [
    { path: '/adminTabs/build', name: 'build' },
    { path: '/adminTabs/previewQues', name: 'preview' }
  ];
  activeLink = this.links[0].name;
  constructor(private tabsService: TabsService) { }
  ngOnInit() {
    this.tabsService.activeLinkadmin$.subscribe((res) => {
      this.activeLink = res;
    })
  }
}
