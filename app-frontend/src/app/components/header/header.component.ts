/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() public title: string;
  @Input() public isRegisterPage: boolean; // Usado para el caso de la pantalla de registro

  public logo: string = '../../../assets/img/logo-invisible.png'
  
  constructor() {
  }

  ngOnInit() {}

}
