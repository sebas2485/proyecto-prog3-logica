import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Reserva} from './reserva.model';
import {Ticket} from './ticket.model';

@model()
export class TipoTicket extends Entity {
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
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
    required: true,
  })
  tipoPago: string;

  @belongsTo(() => Reserva)
  reservaId: number;

  @hasMany(() => Ticket)
  tickets: Ticket[];

  constructor(data?: Partial<TipoTicket>) {
    super(data);
  }
}

export interface TipoTicketRelations {
  // describe navigational properties here
}

export type TipoTicketWithRelations = TipoTicket & TipoTicketRelations;
