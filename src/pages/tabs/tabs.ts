import { Component } from '@angular/core';

import { CompraPage } from '../compra/compra';
import { HistoricoPage } from '../historico/historico';
import { AtivoPage } from '../ativo/ativo';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AtivoPage;
  tab2Root = CompraPage;
  tab3Root = HistoricoPage;

  constructor() {

  }
}
