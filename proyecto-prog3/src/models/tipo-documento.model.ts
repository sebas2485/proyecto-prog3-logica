import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class TipoDocumento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  abreviatura: string;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  constructor(data?: Partial<TipoDocumento>) {
    super(data);
  }
}

export interface TipoDocumentoRelations {
  // describe navigational properties here
}

export type TipoDocumentoWithRelations = TipoDocumento & TipoDocumentoRelations;
