import { Component } from '@angular/core';
import { CocinaPage } from '../cocina/cocina';
import { AyudaPage } from '../ayuda/ayuda';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CocinaPage;
  tab2Root = AyudaPage;

  constructor() {        
  }
}
