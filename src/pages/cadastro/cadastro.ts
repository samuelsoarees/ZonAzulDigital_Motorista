import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

//Firebase
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

//models
import { usuario } from '../../models/usuario';
import { usuarioLogin } from '../../models/usuarioLogin';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
  providers: [AngularFireAuth]
})
export class CadastroPage {
  public user: usuario = { nome: '', cpf: '', saldo: 0 };
  public userLogin: usuarioLogin = {email: '', senha: ''};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  presentToast(mensagem: string, duracao: number) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: duracao,
      position: 'bottom'
    });

    toast.present();
  }

  public cadastrar(userLogin: usuarioLogin, user: usuario) {
    let toast = this.toastCtrl.create({ duration: 2000, position: 'bottom' });

    this.afAuth.auth.createUserWithEmailAndPassword(this.userLogin.email, this.userLogin.senha)
      .then((user: any) => {
        console.log(user);
        this.salvandoUsuario(user)
        toast.setMessage('Cadastro realizado com sucesso!!');
        toast.present();
      })
      .catch((error: any) => {

        console.log(error);
        if (error.code == 'auth/email-already-in-use') {

          toast.setMessage('O Email já está em uso.');
        } else if (error.code == 'auth/invalid-email') {

          toast.setMessage('O Email digitado não é valido.');
        } else if (error.code == 'auth/operation-not-allowed') {
          toast.setMessage('Não está abilitado criar usuários');
        } else if (error.code == 'auth/weak-password') {

          toast.setMessage('A senha digitada é muito fraca.');
        } else if (error.code == 'auth/network-request-failed') {
          toast.setMessage('Sem conexão com a internet.');
        }
        toast.present();
      })

  }

  salvandoUsuario(user) {
    this.afAuth.authState.subscribe(auth => {
      this.afDatabase.object(`usuario/${auth.uid}`).set(this.user)
        .then(() => {
          this.navCtrl.push(LoginPage);
        })
    })
  }
}
