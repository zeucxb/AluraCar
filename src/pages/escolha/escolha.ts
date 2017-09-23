import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  public carro;

  constructor(public navParams: NavParams) {
    this.carro = navParams.get('carroSelecionado');
  }
}