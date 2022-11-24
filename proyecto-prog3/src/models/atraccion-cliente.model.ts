import {Entity, model, property} from '@loopback/repository';

@model()
export class AtraccionCliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  atraccionId?: number;

  @property({
    type: 'number',
  })
  clienteId?: number;

  constructor(data?: Partial<AtraccionCliente>) {
    super(data);
  }
}

export interface AtraccionClienteRelations {
  // describe navigational properties here
}

export type AtraccionClienteWithRelations = AtraccionCliente & AtraccionClienteRelations;
