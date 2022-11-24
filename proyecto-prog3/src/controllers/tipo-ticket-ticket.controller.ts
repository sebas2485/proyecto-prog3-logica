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
  TipoTicket,
  Ticket,
} from '../models';
import {TipoTicketRepository} from '../repositories';

export class TipoTicketTicketController {
  constructor(
    @repository(TipoTicketRepository) protected tipoTicketRepository: TipoTicketRepository,
  ) { }

  @get('/tipo-tickets/{id}/tickets', {
    responses: {
      '200': {
        description: 'Array of TipoTicket has many Ticket',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ticket)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Ticket>,
  ): Promise<Ticket[]> {
    return this.tipoTicketRepository.tickets(id).find(filter);
  }

  @post('/tipo-tickets/{id}/tickets', {
    responses: {
      '200': {
        description: 'TipoTicket model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ticket)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoTicket.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticket, {
            title: 'NewTicketInTipoTicket',
            exclude: ['id'],
            optional: ['tipoTicketId']
          }),
        },
      },
    }) ticket: Omit<Ticket, 'id'>,
  ): Promise<Ticket> {
    return this.tipoTicketRepository.tickets(id).create(ticket);
  }

  @patch('/tipo-tickets/{id}/tickets', {
    responses: {
      '200': {
        description: 'TipoTicket.Ticket PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticket, {partial: true}),
        },
      },
    })
    ticket: Partial<Ticket>,
    @param.query.object('where', getWhereSchemaFor(Ticket)) where?: Where<Ticket>,
  ): Promise<Count> {
    return this.tipoTicketRepository.tickets(id).patch(ticket, where);
  }

  @del('/tipo-tickets/{id}/tickets', {
    responses: {
      '200': {
        description: 'TipoTicket.Ticket DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Ticket)) where?: Where<Ticket>,
  ): Promise<Count> {
    return this.tipoTicketRepository.tickets(id).delete(where);
  }
}
