import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Toolbar2Component } from '../../components/toolbar2/toolbar2.component';
import { TabsService } from '../../@services/tabs.service';

@Component({
  selector: 'app-survey-tabs',
  imports: [
    MatTabsModule,
    MatButtonModule,
    RouterLink,
    RouterOutlet,
    Toolbar2Component
  ],
  templateUrl: './survey-tabs.component.html',
  styleUrl: './survey-tabs.component.scss'
})
export class SurveyTabsComponent {
links = [
    { path: '/surveyTabs/fillin', name: 'fillin' },
    { path: '/surveyTabs/previewAns', name: 'previewAns' }
  ];
  activeLink = this.links[0].name;
  constructor(private tabsService: TabsService) { }
  ngOnInit() {
    this.tabsService.activeLinkfront$.subscribe((res) => {
      this.activeLink = res;
    })
  }
}
