import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Toolbar2Component } from '../../components/toolbar2/toolbar2.component';
import { TabsService } from '../../@services/tabs.service';

@Component({
  selector: 'app-update-tabs',
  imports: [
    MatTabsModule,
    MatButtonModule,
    RouterLink,
    RouterOutlet,
    Toolbar2Component
  ],
  templateUrl: './update-tabs.component.html',
  styleUrl: './update-tabs.component.scss'
})
export class UpdateTabsComponent {
links = [
    { path: '/updateTabs/updatebuild', name: 'updateBuild' },
    { path: '/updateTabs/previewUpdate', name: 'previewUpdate' }
  ];
  activeLink = this.links[0].name;
  constructor(private tabsService: TabsService) { }
  ngOnInit() {
    this.tabsService.activeLinkUpdate$.subscribe((res) => {
      this.activeLink = res;
    })
  }
}
