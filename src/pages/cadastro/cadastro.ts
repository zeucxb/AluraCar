import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Http } from '@angular/http';

import { Carro } from '../../domain/carro/carro';
import { Agendamento } from '../../domain/agendamento/agendamento';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;
  public agendamento: Agendamento;

  private _alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _http: Http,
    private _alertCtrl: AlertController,
  ) {
    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');

    this.agendamento = new Agendamento(this.carro, this.precoTotal);

    this._alerta = this._alertCtrl
      .create({
        title: 'Aviso',
        buttons: [{
          text: 'OK',
          handler: () => {
            navCtrl.setRoot(HomePage)
          },
        }],
      });
  }

  agenda() {
    if (!this.agendamento.nome || !this.agendamento.endereco || !this.agendamento.email) {
      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Você deve preencher todas as informações',
        buttons: [{ text: 'OK' }],
      }).present();

      return;
    }

    this._http
      .get(`https://aluracar.herokuapp.com/salvarpedido?carro=${this.carro.nome}&nome=${this.agendamento.nome}&preco=${this.precoTotal}&endereco=${this.agendamento.endereco}&email=${this.agendamento.email}&dataAgendamento=${this.agendamento.data}`)
      .toPromise()
      .then(() => {
        this._alerta.setSubTitle('Agendamento realizado com sucesso.');
        this._alerta.present();
      })
      .catch(erro => {
        console.log(erro);
        this._alerta.setSubTitle('Não foi possível realizar o agendamento!');
        this._alerta.present();
      });
  }

}
