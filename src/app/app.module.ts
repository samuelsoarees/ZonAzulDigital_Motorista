import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CompraPage } from '../pages/compra/compra';
import { HistoricoPage } from '../pages/historico/historico';
import { AtivoPage } from '../pages/ativo/ativo';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { PerfilPage } from '../pages/perfil/perfil';

@NgModule({
  declarations: [
    MyApp,
    CompraPage,
    HistoricoPage,
    AtivoPage,
    TabsPage,
    LoginPage,
    CadastroPage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      pageTransition : 'ios-transition',
      backButtonText : '',
      tabsHideOnSubPages : true,
      scrollAssist : false,
      autoFocusAssist : false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CompraPage,
    HistoricoPage,
    AtivoPage,
    TabsPage,
    LoginPage,
    CadastroPage,
    PerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
