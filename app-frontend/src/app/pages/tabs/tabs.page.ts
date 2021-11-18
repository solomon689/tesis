import { Component, OnInit } from '@angular/core';
import { Tabs } from '../../models/tabs.models';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public tabs: Tabs[] = [
    {
      tabName: 'Perfil',
      icon: 'person-circle',
      url: 'profile'
    },
    {
      tabName: 'Comenzar',
      icon: 'location',
      url: 'travel'
    },
    {
      tabName: 'Contactos',
      icon: 'people',
      url: 'contacts'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
