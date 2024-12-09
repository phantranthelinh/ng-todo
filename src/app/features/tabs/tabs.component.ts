import { Component } from '@angular/core';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabsGroupComponent } from './tabs-group/tabs-group.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  imports: [TabPanelComponent, TabsGroupComponent],
})
export class Tabs {
  tilte = 'Tabs ';
}
