import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'gives',
        children: [
          {
            path: '',
            loadChildren: '../gives/gives.module#GivesPageModule'
          }
        ]
      },
      {
        path: 'wish',
        children: [
          {
            path: '',
            loadChildren: '../wish/wish.module#WishPageModule'
          }
        ]
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: '../chat/chat.module#ChatPageModule'
          }
        ]
      },
      {
        path: 'create',
        children: [
          {
            path: '',
            loadChildren: '../gives/create-give/create-give.module#GiveCreatePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/gives',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/gives',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
