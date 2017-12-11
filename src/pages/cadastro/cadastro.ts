import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

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
})
export class CadastroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  presentToast(mensagem:string,duracao:number) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: duracao,
      position: 'bottom'
    });
    
    toast.present();
  }
  
  public cadastrar(){
    this.presentToast("Cadastro realizado com sucesso!!",3000);  
  }
}
