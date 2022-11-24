import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {TipoDocumento} from './tipo-documento.model';
import {Ticket} from './ticket.model';
import {Atraccion} from './atraccion.model';
import {AtraccionCliente} from './atraccion-cliente.model';

@model()
export class Cliente extends Entity {
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
  primerNombre: string;

  @property({
    type: 'string',
  })
  segundoNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
  })
  segundoApellido?: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'number',
    required: true,
  })
  estatura: number;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @belongsTo(() => TipoDocumento)
  tipoDocumentoId: number;

  @hasMany(() => Ticket)
  tickets: Ticket[];

  @hasMany(() => Atraccion, {through: {model: () => AtraccionCliente}})
  atracciones: Atraccion[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
