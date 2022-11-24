import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Reserva,
  TipoTicket,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaTipoTicketController {
  constructor(
    @repository(ReservaRepository) protected reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/tipo-tickets', {
    responses: {
      '200': {
        description: 'Array of Reserva has many TipoTicket',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoTicket)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TipoTicket>,
  ): Promise<TipoTicket[]> {
    return this.reservaRepository.tipoTickets(id).find(filter);
  }

  @post('/reservas/{id}/tipo-tickets', {
    responses: {
      '200': {
        description: 'Reserva model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoTicket)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Reserva.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoTicket, {
            title: 'NewTipoTicketInReserva',
            exclude: ['id'],
            optional: ['reservaId']
          }),
        },
      },
    }) tipoTicket: Omit<TipoTicket, 'id'>,
  ): Promise<TipoTicket> {
    return this.reservaRepository.tipoTickets(id).create(tipoTicket);
  }

  @patch('/reservas/{id}/tipo-tickets', {
    responses: {
      '200': {
        description: 'Reserva.TipoTicket PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoTicket, {partial: true}),
        },
      },
    })
    tipoTicket: Partial<TipoTicket>,
    @param.query.object('where', getWhereSchemaFor(TipoTicket)) where?: Where<TipoTicket>,
  ): Promise<Count> {
    return this.reservaRepository.tipoTickets(id).patch(tipoTicket, where);
  }

  @del('/reservas/{id}/tipo-tickets', {
    responses: {
      '200': {
        description: 'Reserva.TipoTicket DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TipoTicket)) where?: Where<TipoTicket>,
  ): Promise<Count> {
    return this.reservaRepository.tipoTickets(id).delete(where);
  }
}
