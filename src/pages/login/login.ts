import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { usuarioLogin } from '../../models/usuarioLogin';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[AngularFireAuth]
})
export class LoginPage {

  public userLogin: usuarioLogin = {email: '', senha: ''};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  pushCadastro() {
    this.navCtrl.push(CadastroPage);
  }

  async login(userLogin: usuarioLogin) {
    let toast = this.toastCtrl.create({ duration: 2000, cssClass: 'toastOffline', position: 'bottom' });

    if (userLogin.email === undefined || userLogin.email === '') {
      toast.setMessage('O email não foi digitado.');
      toast.present();
    } else if (userLogin.senha === undefined || userLogin.senha === '') {
      toast.setMessage('A senha não foi digitada.');
      toast.present();
    } else {

      this.afAuth.auth.signInWithEmailAndPassword(userLogin.email, userLogin.senha)
        .then((user: any) => {
          this.navCtrl.setRoot(TabsPage);

        })
        .catch((error: any) => {

          console.log(error);
          if (error.code == 'auth/user-disabled') {
            toast.setMessage('Este email está desabilitado.');
          } else if (error.code == 'auth/network-request-failed') {
            toast.setMessage('Sem conexão com a internet.');
          } else if (error.code == 'auth/invalid-email') {
            toast.setMessage('O email digitado não é valido.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('Email não cadastrado');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('Senha invalida');
          }
          toast.present();
        })
    }
  }
}
