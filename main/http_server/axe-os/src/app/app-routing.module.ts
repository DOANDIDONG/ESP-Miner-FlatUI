import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SystemComponent } from './components/system/system.component';
import { UpdateComponent } from './components/update/update.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NetworkComponent } from './components/network/network.component';
import { SwarmComponent } from './components/swarm/swarm.component';
import { PoolComponent } from './components/pool/pool.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { ApModeGuard } from './guards/ap-mode.guard';

const TITLE_PREFIX = 'AxeOS';

const routes: Routes = [
  {
      path: 'ap',
      component: AppLayoutComponent,
      children: [
        {
          path: '',
          component: NetworkComponent,
          title: `${TITLE_PREFIX} Network`,
        }
      ]
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [ApModeGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        title: TITLE_PREFIX,
      },
      {
        path: 'system',
        component: SystemComponent,
        title: `${TITLE_PREFIX} System`,
      },
      {
        path: 'update',
        component: UpdateComponent,
        title: `${TITLE_PREFIX} Update`,
      },
      {
        path: 'network',
        component: NetworkComponent,
        title: `${TITLE_PREFIX} Network`,
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: `${TITLE_PREFIX} Settings`,
      },
      {
        path: 'swarm',
        component: SwarmComponent,
        title: `${TITLE_PREFIX} Swarm`,
      },
      {
        path: 'pool',
        component: PoolComponent,
        title: `${TITLE_PREFIX} Pool`,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
