import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TipoTicket} from './tipo-ticket.model';
import {Cliente} from './cliente.model';

@model()
export class Ticket extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaVenta: string;

  @belongsTo(() => TipoTicket)
  tipoTicketId: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<Ticket>) {
    super(data);
  }
}

export interface TicketRelations {
  // describe navigational properties here
}

export type TicketWithRelations = Ticket & TicketRelations;
