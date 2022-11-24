import {Entity, model, property, hasMany} from '@loopback/repository';
import {TipoTicket} from './tipo-ticket.model';

@model()
export class Reserva extends Entity {
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
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @hasMany(() => TipoTicket)
  tipoTickets: TipoTicket[];

  constructor(data?: Partial<Reserva>) {
    super(data);
  }
}

export interface ReservaRelations {
  // describe navigational properties here
}

export type ReservaWithRelations = Reserva & ReservaRelations;
