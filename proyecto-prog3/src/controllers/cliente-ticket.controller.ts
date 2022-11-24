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
  Cliente,
  Ticket,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteTicketController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/tickets', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Ticket',
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
    return this.clienteRepository.tickets(id).find(filter);
  }

  @post('/clientes/{id}/tickets', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ticket)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticket, {
            title: 'NewTicketInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) ticket: Omit<Ticket, 'id'>,
  ): Promise<Ticket> {
    return this.clienteRepository.tickets(id).create(ticket);
  }

  @patch('/clientes/{id}/tickets', {
    responses: {
      '200': {
        description: 'Cliente.Ticket PATCH success count',
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
    return this.clienteRepository.tickets(id).patch(ticket, where);
  }

  @del('/clientes/{id}/tickets', {
    responses: {
      '200': {
        description: 'Cliente.Ticket DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Ticket)) where?: Where<Ticket>,
  ): Promise<Count> {
    return this.clienteRepository.tickets(id).delete(where);
  }
}
