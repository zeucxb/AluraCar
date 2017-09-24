import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Agendamento } from '../../domain/agendamento/agendamento';

@Injectable()
export class AgendamentoDao {
  constructor(private _storage: Storage) { }

  salva(agendamento: Agendamento) {
    const key = this._getKey(agendamento);
    return this._storage.set(key, agendamento);
  }

  private _getKey(agendamento: Agendamento) {
    return agendamento.email + agendamento.data.substr(0, 10);
  }

  ehAgendamentoDuplicado(agendamento: Agendamento) {
    const key = this._getKey(agendamento);

    return this._storage
      .get(key)
      .then(dado => dado ? true : false);
  }
}